import { HttpException, HttpStatus, Injectable, Req } from "@nestjs/common";
import bcrypt from "bcrypt";
import { Request } from "express";
import { UserService } from "./user.service";
import { User } from "./models";
import { SessionService } from "./session.service";
import { SessionEntity } from "./entities";

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly sessionService: SessionService,
  ) {}

  private async passworMatch(password: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(password, hash);
  }

  private async validateUser(email: string, password: string): Promise<User> {
    const user = await this.userService.findEntityByEmail(email);
    if (!user)
      throw new HttpException(
        "No user with that email",
        HttpStatus.BAD_REQUEST,
      );
    const passwordMatch: boolean = await this.passworMatch(
      password,
      user.password,
    );
    if (!passwordMatch)
      throw new HttpException("Invalid credentials", HttpStatus.BAD_REQUEST);

    return this.userService.fromEntity(user);
  }

  async login(email: string, password: string): Promise<SessionEntity> {
    const user = await this.validateUser(email, password);
    const session = await this.sessionService.create(user);
    return session;
  }

  async logout(@Req() request: Request): Promise<any> {
    request.session.destroy(() => {
      return {
        message: "Logout successful",
        statusCode: HttpStatus.OK,
      };
    });
  }
}
