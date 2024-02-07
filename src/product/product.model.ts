import { Field, ID, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class Product {
  @Field(() => ID)
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
}
