import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { ProductService } from "./product.service";
import {
  CreateProductSuggestionInput,
  Product,
  ProductSuggestion,
} from "./models";

/**
 * GraphQL resolver for product-related and company-related operations.
 *
 * @remarks
 * This resolver provides query mutation methods for reading, creating, approving, and rejecting
 * product and company suggestions.
 */
@Resolver(() => Product)
export class ProductResolver {
  constructor(private readonly productService: ProductService) {}

  /**
   * Query to fetch a specific product suggestion by ID.
   *
   * @param id - The identifier of the product suggestion.
   * @returns A Promise that resolves to the ProductSuggestion object.
   */
  @Query(() => ProductSuggestion)
  async productSuggestion(@Args("id") id: string): Promise<ProductSuggestion> {
    return this.productService.getProductSuggestionById(id);
  }

  /**
   * Query to fetch a specific product by ID.
   *
   * @param id - The identifier of the product.
   * @returns A Promise that resolves to the Product object.
   */
  @Query(() => Product)
  async product(@Args("id") id: string): Promise<Product> {
    return this.productService.getProductById(id);
  }

  /**
   * Creates a new product suggestion.
   *
   * @param input - The input data for creating the product suggestion.
   * @returns A Promise that resolves to the created Product object.
   */
  @Mutation(() => ProductSuggestion)
  async createProductSuggestion(
    @Args("input") input: CreateProductSuggestionInput,
  ): Promise<ProductSuggestion> {
    return this.productService.createProductSuggestion(input);
  }

  /**
   * Approves a product suggestion and creates a new product based on the suggestion.
   *
   * @param id - The identifier of the product suggestion to be approved.
   * @returns A Promise that resolves to the created Product object.
   */
  @Mutation(() => Product)
  async approveProductSuggestion(@Args("id") id: string): Promise<Product> {
    return this.productService.approveProductSuggestion(id);
  }

  /**
   * Rejects a product suggestion and updates its status accordingly.
   *
   * @param id - The identifier of the product suggestion to be rejected.
   * @returns A Promise that resolves to the rejected ProductSuggestion object.
   */
  @Mutation(() => ProductSuggestion)
  async rejectProductSuggestion(
    @Args("id") id: string,
  ): Promise<ProductSuggestion> {
    return this.productService.rejectProductSuggestion(id);
  }
}
