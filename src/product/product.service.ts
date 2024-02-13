import { InjectRepository } from "@nestjs/typeorm";
import { ProductEntity, ProductStatus } from "./entities";
import { Repository } from "typeorm";
import {
  PendingProduct,
  Product,
  ProductCreateInput,
  ProductResult,
  PublicProduct,
  RejectedProduct,
} from "./models";
import { BadRequestException } from "@nestjs/common";
import { match } from "ts-pattern";
import { UserService } from "src/user/user.service";

export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,

    private readonly userService: UserService,
  ) {}

  public fromEntity(entity: ProductEntity): ProductResult {
    const product: Product = {
      id: entity.id,
      name: entity.name,
      averageRating: entity.averageRating,
      fullDescription: entity.fullDescription,
      shortDescription: entity.shortDescription,
    };

    return match<ProductStatus, ProductResult>(entity.status)
      .with(ProductStatus.PENDING, () => {
        const author = entity.pendingSuggestion.author;
        return {
          author: this.userService.fromEntity(author),
          ...product,
        } as PendingProduct;
      })
      .with(ProductStatus.REJECTED, () => {
        const author = entity.pendingSuggestion.author;
        const rejectedBy = entity.rejectedSuggestion.rejector;
        return {
          author: this.userService.fromEntity(author),
          rejectedBy: this.userService.fromEntity(rejectedBy),
          ...product,
        } as RejectedProduct;
      })
      .with(ProductStatus.PUBLIC, () => {
        const author = entity.pendingSuggestion.author;
        const approvedBy = entity.approvedSuggestion.approver;
        return {
          author: this.userService.fromEntity(author),
          approvedBy: this.userService.fromEntity(approvedBy),
          ...product,
        } as PublicProduct;
      })
      .run();
  }

  public async createProduct(data: ProductCreateInput): Promise<ProductResult> {
    const product = this.productRepository.create(data);
    try {
      const createdProduct = await this.productRepository.save(product);
      return this.fromEntity(createdProduct);
    } catch {
      throw new BadRequestException("Something went wrong.");
    }
  }
}
