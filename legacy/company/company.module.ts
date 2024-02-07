import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CompanyEntity, CompanySuggestionEntity } from "./entities";
import { CompanyService } from "./company.service";
import { CompanyResolver } from "./company.resolver";
import { CompanySuggestionResolver } from "./company-suggestion.resolver";
import { CompanySuggestionService } from "./company-suggestion.service";

const TypeOrmEntities = TypeOrmModule.forFeature([
  CompanyEntity,
  CompanySuggestionEntity,
]);

@Module({
  providers: [
    CompanyService,
    CompanySuggestionService,
    CompanyResolver,
    CompanySuggestionResolver,
  ],
  imports: [TypeOrmEntities],
  exports: [TypeOrmModule],
})
export class CompanyModule {}
