import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { ProductService } from "./product.service";
import {
  Company,
  CompanySuggestion,
  CreateCompanySuggestionInput,
  CreateProductSuggestionInput,
  Product,
  ProductSuggestion,
} from "./types";

/**
 * GraphQL resolver for product-related and company-related operations.
 *
 * @remarks
 * This resolver provides query mutation methods for reading, creating, approving, and rejecting
 * product and company suggestions.
 */
@Resolver("Product")
export class ProductResolver {
  constructor(private readonly productService: ProductService) {}

  /**
   * Creates a new company suggestion.
   *
   * @param input - The input data for creating the company suggestion.
   * @returns A Promise that resolves to the created Company object.
   */
  @Mutation()
  async createCompanySuggestion(
    @Args("input") input: CreateCompanySuggestionInput,
  ): Promise<CompanySuggestion> {
    return this.productService.createCompanySuggestion(input);
  }

  /**
   * Approves a company suggestion and creates a new company based on the suggestion.
   *
   * @param id - The identifier of the company suggestion to be approved.
   * @returns A Promise that resolves to the created Company object.
   */
  @Mutation()
  async approveCompanySuggestion(@Args("id") id: string): Promise<Company> {
    return this.productService.approveCompanySuggestion(id);
  }

  /**
   * Rejects a company suggestion and updates its status accordingly.
   *
   * @param id - The identifier of the company suggestion to be rejected.
   * @returns A Promise that resolves to the rejected CompanySuggestion object.
   */
  @Mutation()
  async rejectCompanySuggestion(
    @Args("id") id: string,
  ): Promise<CompanySuggestion> {
    return this.productService.rejectCompanySuggestion(id);
  }

  /**
   * Query to fetch a specific product suggestion by ID.
   *
   * @param id - The identifier of the product suggestion.
   * @returns A Promise that resolves to the ProductSuggestion object.
   */
  @Query("productSuggestion")
  async getProductSuggestion(
    @Args("id") id: string,
  ): Promise<ProductSuggestion> {
    return this.productService.getProductSuggestionById(id);
  }

  /**
   * Creates a new product suggestion.
   *
   * @param input - The input data for creating the product suggestion.
   * @returns A Promise that resolves to the created Product object.
   */
  @Mutation()
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
  @Mutation()
  async approveProductSuggestion(@Args("id") id: string): Promise<Product> {
    return this.productService.approveProductSuggestion(id);
  }

  /**
   * Rejects a product suggestion and updates its status accordingly.
   *
   * @param id - The identifier of the product suggestion to be rejected.
   * @returns A Promise that resolves to the rejected ProductSuggestion object.
   */
  @Mutation()
  async rejectProductSuggestion(
    @Args("id") id: string,
  ): Promise<ProductSuggestion> {
    return this.productService.rejectProductSuggestion(id);
  }
}
