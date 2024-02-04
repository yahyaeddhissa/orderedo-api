import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "./entities";
import { ProductSuggestionEntity } from "src/product/entities";
import { CompanySuggestionEntity } from "src/company/entities";

const TypeOrmEntities = TypeOrmModule.forFeature([
  UserEntity,
  ProductSuggestionEntity,
  CompanySuggestionEntity,
]);

@Module({
  imports: [TypeOrmEntities],
  exports: [TypeOrmModule],
})
export class UserModule {}
