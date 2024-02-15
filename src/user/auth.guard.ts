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
    try {
      // Add token encryption
      const user = this.sessionService.validate(token);
      context.user = user;
    } catch (error) {
      throw error;
    }
    return true;
  }

  private extractTokenFromHeader(context: any): string | null {
    const token = context.req.headers["authorization"];
    if (!token) return null;
    return token;
  }
}
