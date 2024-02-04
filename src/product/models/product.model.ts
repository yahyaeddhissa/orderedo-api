import { Field, ObjectType } from "@nestjs/graphql";
import { Company } from "src/company/models";

@ObjectType()
export class Product {
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
  manufacturer: Company;
}
