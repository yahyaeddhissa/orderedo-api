import { Field, ObjectType } from "@nestjs/graphql";
import { ProductEntity } from "../entities";

@ObjectType()
class ProductManufacturer {
  @Field()
  id: string;

  @Field()
  name: string;
}

@ObjectType()
export class Product {
  public static fromEntity({
    id,
    name,
    slug,
    shortDescription,
    fullDescription,
    reviewCount,
    averageRating,
  }: ProductEntity): Product {
    return {
      id,
      name,
      slug,
      shortDescription,
      fullDescription,
      reviewCount,
      averageRating,
    };
  }

  public static fromEntities(entities: ProductEntity[]): Product[] {
    return entities.map(this.fromEntity);
  }

  @Field()
  id: string;

  @Field()
  name: string;

  @Field()
  slug: string;

  @Field()
  shortDescription: string;

  @Field()
  fullDescription: string;

  @Field()
  averageRating: number;

  @Field()
  reviewCount: number;

  @Field(() => ProductManufacturer)
  manufacturer?: ProductManufacturer;
}
