import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "./entities";
import { UserService } from "./user.service";
import { UserResolver } from "./user.resolver";

const TypeOrmEntities = TypeOrmModule.forFeature([UserEntity]);

@Module({
  providers: [UserService, UserResolver],
  imports: [TypeOrmEntities],
  exports: [TypeOrmModule],
})
export class UserModule {}
