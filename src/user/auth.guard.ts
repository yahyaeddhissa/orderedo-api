import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { SessionService } from "./session.service";
import { GqlExecutionContext } from "@nestjs/graphql";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly sessionService: SessionService) {}

  public async canActivate(ctx: ExecutionContext): Promise<boolean> {
    const context = GqlExecutionContext.create(ctx).getContext();

    const token = this.extractTokenFromHeader(context);
    if (!token) {
      throw new UnauthorizedException();
    }
    // Add token encryption
    const user = await this.sessionService.validate(token);

    if (!user) return false;

    context.user = user;

    return true;
  }

  private extractTokenFromHeader(context: any): string | null {
    const token = context.req.headers["authorization"];
    if (!token) return null;
    return token;
  }
}
