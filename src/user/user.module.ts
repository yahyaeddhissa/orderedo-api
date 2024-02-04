import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "./entities";
import { ProductSuggestionEntity } from "src/product/entities";
import { CompanySuggestionEntity } from "src/company/entities";
import { UserService } from "./user.service";
import { UserResolver } from "./user.resolver";

const TypeOrmEntities = TypeOrmModule.forFeature([
  UserEntity,
  ProductSuggestionEntity,
  CompanySuggestionEntity,
]);

@Module({
  providers: [UserService, UserResolver],
  imports: [TypeOrmEntities],
  exports: [TypeOrmModule],
})
export class UserModule {}
