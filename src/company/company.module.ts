import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CompanyEntity, CompanySuggestionEntity } from "./entities";
import { CompanyService } from "./company.service";
import { CompanyResolver } from "./company.resolver";

const TypeOrmEntities = TypeOrmModule.forFeature([
  CompanyEntity,
  CompanySuggestionEntity,
]);

@Module({
  providers: [CompanyService, CompanyResolver],
  imports: [TypeOrmEntities],
  exports: [TypeOrmModule],
})
export class ProductModule {}
