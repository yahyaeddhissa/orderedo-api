import { InjectRepository } from "@nestjs/typeorm";
import { ProductEntity, ProductStatus } from "./entities";
import { Repository } from "typeorm";
import {
  PendingProduct,
  Product,
  ProductCreateInput,
  PublicProduct,
  RejectedProduct,
} from "./models";
import { BadRequestException } from "@nestjs/common";
import { UserService } from "src/user/user.service";

export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,

    private readonly userService: UserService,
  ) {}

  public fromEntity(entity: ProductEntity): Product {
    const product: Product = {
      id: entity.id,
      name: entity.name,
      averageRating: entity.averageRating,
      fullDescription: entity.fullDescription,
      shortDescription: entity.shortDescription,
    };

    switch (entity.status) {
      case ProductStatus.PENDING:
        return {
          author: this.userService.fromEntity(entity.pendingSuggestion.author),
          ...product,
        } as PendingProduct;
      case ProductStatus.REJECTED:
        return {
          author: this.userService.fromEntity(entity.pendingSuggestion.author),
          rejectedBy: this.userService.fromEntity(
            entity.rejectedSuggestion.rejector,
          ),
          ...product,
        } as RejectedProduct;
      case ProductStatus.PUBLIC:
        return {
          approvedBy: this.userService.fromEntity(
            entity.approvedSuggestion.approver,
          ),
          ...product,
        } as PublicProduct;
      default:
        throw new BadRequestException("Invalid product status");
    }
  }

  public async createProduct(data: ProductCreateInput): Promise<Product> {
    const product = this.productRepository.create(data);
    try {
      const createdProduct = await this.productRepository.save(product);
      return this.fromEntity(createdProduct);
    } catch {
      throw new BadRequestException("Something went wrong.");
    }
  }
}
