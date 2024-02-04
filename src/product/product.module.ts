import { Module } from "@nestjs/common";
import { ProductResolver } from "./product.resolver";
import { ProductService } from "./product.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import {
  CompanyEntity,
  CompanySuggestionEntity,
  ProductEntity,
  ProductSuggestionEntity,
} from "./entities";

const TypeOrmEntities = TypeOrmModule.forFeature([
  ProductEntity,
  ProductSuggestionEntity,
  CompanyEntity,
  CompanySuggestionEntity,
]);

@Module({
  providers: [ProductService, ProductResolver],
  imports: [TypeOrmEntities],
  exports: [TypeOrmModule],
})
export class ProductModule {}
