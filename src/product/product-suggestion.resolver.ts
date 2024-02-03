import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { CreateProductSuggestionInput, ProductSuggestion } from "./types";
import { ProductService } from "./product.service";

@Resolver("ProductSuggestion")
export class ProductSuggestionResolver {
  constructor(private readonly productService: ProductService) {}

  @Mutation()
  async createProductSuggestion(
    @Args("input") input: CreateProductSuggestionInput,
  ): Promise<ProductSuggestion> {
    return this.productService.createProductSuggestion(input);
  }

  @Mutation()
  async approveProductSuggestion() {
    return;
  }

  @Mutation()
  async declineProductSuggestion() {
    return;
  }
}
