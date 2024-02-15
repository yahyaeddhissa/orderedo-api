import { InjectRepository } from "@nestjs/typeorm";
import { ProductEntity } from "./entities";
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
    const {
      id,
      name,
      averageRating,
      fullDescription,
      shortDescription,
      reviewCount,
    } = entity;

    return {
      id,
      name,
      averageRating,
      fullDescription,
      shortDescription,
      reviewCount,
    } as Product;
  }

  public async createProduct(data: ProductCreateInput): Promise<Product> {
    const product = this.productRepository.create({
      ...data,
    });

    try {
      const createdProduct = await this.productRepository.save(product);
      console.log(createdProduct);

      return this.findProduct(createdProduct.id);
    } catch (error) {
      throw new BadRequestException(
        "Failed to create product: " + error.message,
      );
    }
  }

  public async findProduct(id: string): Promise<Product | null> {
    console.log(id);

    const entity = await this.productRepository.findOne({
      where: { id },
    });
    console.log(entity);

    return entity ? this.fromEntity(entity) : null;
  }
}
