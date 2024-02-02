import { Module } from "@nestjs/common";
import { ProductResolver } from "./product.resolver";
import { ProductService } from "./product.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProductEntity } from "./product.entity";

@Module({
  providers: [ProductService, ProductResolver],
  imports: [TypeOrmModule.forFeature([ProductEntity])],
  exports: [TypeOrmModule],
})
export class ProductModule {}
