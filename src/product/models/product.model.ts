import { Field, ObjectType } from "@nestjs/graphql";
import { Company } from "src/company/models";
import { ProductEntity } from "../entities";

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

  @Field(() => Company)
  manufacturer?: Company;
}
