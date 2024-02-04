import { Field, ObjectType } from "@nestjs/graphql";
import { Product, ProductSuggestion } from "src/product/models";

@ObjectType()
export class Company {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field(() => [Product])
  products: Product[];

  @Field(() => [ProductSuggestion])
  productSuggestions: ProductSuggestion[];
}
