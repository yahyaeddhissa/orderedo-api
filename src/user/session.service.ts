import { Injectable, UnauthorizedException } from "@nestjs/common";
import { Repository } from "typeorm";
import { SessionEntity } from "./entities";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./models";
import { UserService } from "./user.service";

@Injectable()
export class SessionService {
  constructor(
    @InjectRepository(SessionEntity)
    private readonly sessionRepository: Repository<SessionEntity>,

    private readonly userService: UserService,
  ) {}

  private generateSessionToken(): string {
    return Math.random().toString(36).substring(2) + Date.now().toString(36);
  }

  public async create(user: User): Promise<SessionEntity> {
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

    return this.sessionRepository.save({
      userId: user.id,
      data: "{}",
      token: this.generateSessionToken(),
      expiresAt,
    });
  }

  public async validate(token: string): Promise<User | null> {
    const session = await this.sessionRepository.findOne({
      where: { token },
      relations: { user: true },
    });
    if (!session) return null;
    if (new Date() > session.expiresAt) return null;
    return this.userService.fromEntity(session.user);
  }

  public async refresh(token: string): Promise<SessionEntity> {
    const session = await this.sessionRepository.findOne({
      where: { token },
    });
    if (!session) throw new UnauthorizedException("Invalid Session!");

    const newToken = this.generateSessionToken();

    session.token = newToken;
    session.expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

    return this.sessionRepository.save(session);
  }
}
