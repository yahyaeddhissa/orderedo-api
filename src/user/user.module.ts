import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SessionEntity, UserEntity } from "./entities";
import { UserService } from "./user.service";
import { UserResolver } from "./user.resolver";
import { AuthService } from "./auth.service";
import { SessionService } from "./session.service";

const TypeOrmEntities = TypeOrmModule.forFeature([UserEntity, SessionEntity]);

@Module({
  providers: [UserService, AuthService, SessionService, UserResolver],
  imports: [TypeOrmEntities],
  exports: [TypeOrmModule],
})
export class UserModule {}
