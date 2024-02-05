import { InjectRepository } from "@nestjs/typeorm";
import { ProductEntity, ProductSuggestionEntity } from "./entities";
import { Repository } from "typeorm";
import slugify from "slugify";
import { Injectable } from "@nestjs/common";
import {
  CreateProductSuggestionInput,
  Product,
  ProductSuggestion,
} from "./models";
import { SuggestionStatus } from "src/shared/types/suggestion-status";

/**
 * Service for managing products and company suggestions.
 *
 * @remarks
 * This service provides functionality for handling product-related operations
 * and managing suggestions for new companies.
 */
@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductSuggestionEntity)
    private readonly productSuggestionRepository: Repository<ProductSuggestionEntity>,

    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
  ) {}

  /**
   * Fetches a specific product suggestion by ID.
   *
   * @param id - The identifier of the product suggestion.
   * @returns A Promise that resolves to the ProductSuggestion object.
   */
  async getProductSuggestionById(id: string): Promise<ProductSuggestion> {
    const suggestion = await this.productSuggestionRepository.findOneBy({ id });
    return ProductSuggestion.fromEntity(suggestion);
  }

  /**
   * Fetches a specific product by ID.
   *
   * @param id - The identifier of the product.
   * @returns A Promise that resolves to the Product object.
   */
  async getProductById(id: string): Promise<Product> {
    return this.productRepository.findOneBy({ id });
  }

  /**
   * Creates a new product suggestion.
   *
   * @param input - The input data for creating the product suggestion.
   * @returns A Promise that resolves to the created ProductSuggestion object.
   * @throws {Error} If there is an issue creating or saving the product suggestion.
   */
  async createProductSuggestion(
    input: CreateProductSuggestionInput,
  ): Promise<ProductSuggestion> {
    const suggestionEntity = this.productSuggestionRepository.create(input);
    const suggestion =
      await this.productSuggestionRepository.save(suggestionEntity);
    return ProductSuggestion.fromEntity(suggestion);
  }

  /**
   * Approves a product suggestion and creates a new product based on the suggestion.
   *
   * @param id - The identifier of the product suggestion to be approved.
   * @returns A Promise that resolves to the created Product object.
   * @throws {Error} If there is an issue approving the suggestion or creating the product.
   */
  async approveProductSuggestion(id: string): Promise<Product> {
    const suggestion = await this.productSuggestionRepository.findOneBy({ id });
    suggestion.status = SuggestionStatus.APPROVED;

    const productEntity = this.productRepository.create({
      name: suggestion.name,
      slug: slugify(suggestion.name),
      shortDescription: suggestion.shortDescription,
      fullDescription: suggestion.fullDescription,
      manufacturerId: suggestion.manufacturerId,
    });

    const product = await this.productRepository.save(productEntity);
    await this.productSuggestionRepository.save(suggestion);

    return product;
  }

  /**
   * Rejects a product suggestion and updates its status accordingly.
   *
   * @param id - The identifier of the product suggestion to be rejected.
   * @returns A Promise that resolves to the rejected ProductSuggestion object.
   * @throws {Error} If there is an issue rejecting the suggestion or updating its status.
   */
  async rejectProductSuggestion(id: string): Promise<ProductSuggestion> {
    const suggestion = await this.productSuggestionRepository.findOneBy({ id });
    suggestion.status = SuggestionStatus.REJECTED;

    return ProductSuggestion.fromEntity(
      await this.productSuggestionRepository.save(suggestion),
    );
  }
}
