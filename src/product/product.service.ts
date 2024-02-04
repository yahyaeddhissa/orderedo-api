import { InjectRepository } from "@nestjs/typeorm";
import {
  CompanyEntity,
  CompanySuggestionEntity,
  ProductEntity,
  ProductSuggestionEntity,
} from "./entities";
import { Repository } from "typeorm";
import {
  CompanySuggestion,
  CreateCompanySuggestionInput,
  CreateProductSuggestionInput,
  Product,
  ProductSuggestion,
  SuggestionStatus,
} from "./types";
import slugify from "slugify";

export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private productRepository: Repository<ProductEntity>,

    @InjectRepository(ProductSuggestionEntity)
    private productSuggestionRepository: Repository<ProductSuggestionEntity>,

    @InjectRepository(CompanyEntity)
    private readonly companyRepository: Repository<CompanyEntity>,

    @InjectRepository(CompanySuggestionEntity)
    private readonly companySuggestionRepository: Repository<CompanySuggestionEntity>,
  ) {}

  async findAll(): Promise<ProductEntity[]> {
    return this.productRepository.find();
  }

  async findById(id: string): Promise<ProductEntity> {
    return this.productRepository.findOneBy({ id });
  }

  /**
   * Creates a new company suggestion.
   *
   * @param input - The input data for creating the company suggestion.
   * @param author - The author (user) of the company suggestion.
   * @returns A Promise that resolves to the created CompanySuggestionEntity object.
   * @throws {Error} If there is an issue creating or saving the company suggestion.
   */
  async createCompanySuggestion(
    input: CreateCompanySuggestionInput,
  ): Promise<CompanySuggestion> {
    const suggestion = this.companySuggestionRepository.create(input);

    const createdSuggestion =
      await this.companySuggestionRepository.save(suggestion);

    return createdSuggestion;
  }

  /**
   * Approves a company suggestion and creates a new company based on the suggestion.
   *
   * @param id - The identifier of the company suggestion to be approved.
   * @returns A Promise that resolves to the created CompanyEntity object.
   * @throws {Error} If there is an issue approving the suggestion or creating the company.
   */
  async approveCompanySuggestion(id: string): Promise<CompanyEntity> {
    const suggestion = await this.companySuggestionRepository.findOneBy({ id });
    suggestion.status = SuggestionStatus.APPROVED;

    const companyEntity = this.companyRepository.create({
      name: suggestion.name,
    });

    const company = await this.companyRepository.save(companyEntity);
    await this.companySuggestionRepository.save(suggestion);

    return company;
  }

  /**
   * Rejects a company suggestion and updates its status accordingly.
   *
   * @param id - The identifier of the company suggestion to be rejected.
   * @returns A Promise that resolves to the rejected CompanySuggestionEntity object.
   * @throws {Error} If there is an issue rejecting the suggestion or updating its status.
   */
  async rejectCompanySuggestion(id: string): Promise<CompanySuggestionEntity> {
    const suggestion = await this.companySuggestionRepository.findOneBy({ id });
    suggestion.status = SuggestionStatus.REJECTED;

    const rejectedSuggestion =
      await this.companySuggestionRepository.save(suggestion);

    return rejectedSuggestion;
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
    const suggestion = this.productSuggestionRepository.create(input);
    return this.productSuggestionRepository.save(suggestion);
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

    return this.productSuggestionRepository.save(suggestion);
  }
}
