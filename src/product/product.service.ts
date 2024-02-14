import { InjectRepository } from "@nestjs/typeorm";
import { ProductEntity, ProductStatus } from "./entities";
import { Repository } from "typeorm";
import { Product, ProductCreateInput } from "./models";
import { BadRequestException } from "@nestjs/common";
import { UserService } from "src/user/user.service";

export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,

    private readonly userService: UserService,
  ) {}

  public fromEntity(entity: ProductEntity): Product {
    const { id, name, averageRating, fullDescription, shortDescription } =
      entity;

    return {
      id,
      name,
      averageRating,
      fullDescription,
      shortDescription,
      ...(entity.status === ProductStatus.PENDING
        ? {
            author: this.userService.fromEntity(
              entity.pendingSuggestion.author,
            ),
          }
        : entity.status === ProductStatus.REJECTED
          ? {
              author: this.userService.fromEntity(
                entity.pendingSuggestion.author,
              ),
              rejectedBy: this.userService.fromEntity(
                entity.rejectedSuggestion.rejector,
              ),
            }
          : {
              approvedBy: this.userService.fromEntity(
                entity.approvedSuggestion.approver,
              ),
            }),
    } as Product;
  }

  public async createProduct(data: ProductCreateInput): Promise<Product> {
    const product = this.productRepository.create(data);

    try {
      const createdProduct = await this.productRepository.save(product);
      return this.fromEntity(createdProduct);
    } catch (error) {
      throw new BadRequestException(
        "Failed to create product: " + error.message,
      );
    }
  }

  public async findProduct(id: string): Promise<Product | null> {
    const entity = await this.productRepository.findOneBy({ id });
    return entity ? this.fromEntity(entity) : null;
  }
}
