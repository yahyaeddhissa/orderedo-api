import { Module } from "@nestjs/common";
import { ProductResolver } from "./product.resolver";
import { TypeOrmModule } from "@nestjs/typeorm";
import {
  PendingProductEntity,
  ProductEntity,
  PublicProductEntity,
  RejectedProductEntity,
} from "./entities";
import { UserModule } from "src/user/user.module";
import { ProductService } from "./product.service";
import { UserService } from "src/user/user.service";

const ProductEntities = TypeOrmModule.forFeature([
  ProductEntity,
  PendingProductEntity,
  PublicProductEntity,
  RejectedProductEntity,
]);

@Module({
  providers: [ProductResolver, ProductService, UserService],
  imports: [ProductEntities, UserModule],
})
export class ProductModule {}
