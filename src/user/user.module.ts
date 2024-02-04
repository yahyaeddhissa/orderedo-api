import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "./entities";

const TypeOrmEntities = TypeOrmModule.forFeature([UserEntity]);

@Module({
  imports: [TypeOrmEntities],
  exports: [TypeOrmModule],
})
export class UserModule {}
