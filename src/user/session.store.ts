import { SessionData, Store } from "express-session";
import { Repository } from "typeorm";
import { SessionEntity } from "./entities";
import { InjectRepository } from "@nestjs/typeorm";

export class SessionStore extends Store {
  @InjectRepository(SessionEntity)
  private readonly sessionRepository: Repository<SessionEntity>;

  public async get(
    sid: string,
    callback: (err: any, session?: SessionData) => void,
  ): Promise<void> {
    try {
      const session = await this.sessionRepository.findOne({
        where: { id: sid },
        relations: { user: true },
      });
      if (!session) return callback(null);
      const data = JSON.parse(session.data);
      const user = session.user;
      return callback(null, { user, ...data });
    } catch (error) {
      return callback(error);
    }
  }

  set(sid: string, session: SessionData, callback?: (err?: any) => void): void {
    let data: string;
    try {
      data = JSON.stringify(session);
    } catch (error) {
      callback && callback(error);
      throw error;
    }

    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    try {
      this.sessionRepository.save({ id: sid, data, expiresAt });
      return;
    } catch (error) {
      return callback && callback(error);
    }
  }

  destroy(sid: string, callback?: (err?: any) => void): void {
    try {
      this.sessionRepository.delete(sid);
      return callback && callback(null);
    } catch (error) {
      return callback && callback(error);
    }
  }
}
