import { InjectRepository } from "@nestjs/typeorm";
import {
  CompanyEntity,
  ProductEntity,
  ProductSuggestionEntity,
} from "./entities";
import { Repository } from "typeorm";
import {
  CreateProductSuggestionInput,
  Product,
  ProductSuggestion,
  ProductSuggestionStatus,
} from "./types";
import { Args } from "@nestjs/graphql";
import slugify from "slugify";

export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private productRepository: Repository<ProductEntity>,

    @InjectRepository(ProductSuggestionEntity)
    private productSuggestionRepository: Repository<ProductSuggestionEntity>,

    @InjectRepository(CompanyEntity)
    private readonly companyRepository: Repository<CompanyEntity>,
  ) {}

  private serializeProductSuggestion({
    id,
    name,
    fullDescription,
    shortDescription,
    status,
    notes,
    author,
  }: ProductSuggestionEntity): ProductSuggestion {
    return {
      id,
      name,
      manufacturer: "Centrale",
      fullDescription,
      shortDescription,
      status,
      notes,
      author,
    };
  }

  // private serializeProduct({
  //   id,
  //   name,
  //   fullDescription,
  //   shortDescription,
  //   manufacturer,
  //   slug,
  // }: ProductEntity): Product{
  //   return {
  //     id,
  //     name,
  //     fullDescription,
  //     shortDescription,

  //   };
  // }

  async findAll(): Promise<ProductEntity[]> {
    return this.productRepository.find();
  }

  async findById(id: string): Promise<ProductEntity> {
    return this.productRepository.findOneBy({ id });
  }

  async createProductSuggestion({
    authorId,
    name,
    shortDescription,
    fullDescription,
    manufacturerName,
    notes,
  }: CreateProductSuggestionInput): Promise<ProductSuggestion> {
    const manufacturer = await this.companyRepository.findOneBy({
      name: manufacturerName,
    });

    const suggestion = new ProductSuggestionEntity();
    suggestion.name = name;
    suggestion.shortDescription = shortDescription;
    suggestion.fullDescription = fullDescription;
    suggestion.notes = notes;
    suggestion.author.id = authorId;
    suggestion.manufacturer = manufacturer;

    return this.serializeProductSuggestion(
      await this.productSuggestionRepository.save(suggestion),
    );
  }

  async approveProductSuggestion(@Args("id") id: string): Promise<Product> {
    const suggestion = await this.productSuggestionRepository.findOneBy({ id });
    suggestion.status = ProductSuggestionStatus.APPROVED;

    const product = new ProductEntity();
    product.slug = slugify(suggestion.name);
    product.name = suggestion.name;
    product.shortDescription = suggestion.shortDescription;
    product.fullDescription = suggestion.fullDescription;
    product.manufacturer = suggestion.manufacturer;

    return;
  }
}
