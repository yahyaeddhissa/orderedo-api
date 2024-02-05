import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CompanyEntity, CompanySuggestionEntity } from "./entities";
import { CompanyService } from "./company.service";
import { CompanyResolver } from "./company.resolver";
import { CompanySuggestionResolver } from "./company-suggestion.resolver";

const TypeOrmEntities = TypeOrmModule.forFeature([
  CompanyEntity,
  CompanySuggestionEntity,
]);

@Module({
  providers: [CompanyService, CompanyResolver, CompanySuggestionResolver],
  imports: [TypeOrmEntities],
  exports: [TypeOrmModule],
})
export class CompanyModule {}
