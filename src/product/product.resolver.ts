import { Args, Query, Resolver } from "@nestjs/graphql";
import { ProductService } from "./product.service";

@Resolver("Product")
export class ProductResolver {
  constructor(private readonly productService: ProductService) {}
  @Query()
  async product(@Args("id") id: string) {
    return this.productService.findById(id);
  }

  @Query()
  async products() {
    return this.productService.findAll();
  }
}
