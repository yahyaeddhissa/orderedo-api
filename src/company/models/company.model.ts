import { Field, ObjectType } from "@nestjs/graphql";
import { Product, ProductSuggestion } from "src/product/models";
import { CompanyEntity } from "../entities";

@ObjectType()
export class Company {
  public static fromEntity({ id, name }: CompanyEntity): Company {
    return {
      id,
      name,
    };
  }
  @Field()
  id: string;

  @Field()
  name: string;

  @Field(() => [Product])
  products?: Product[];

  @Field(() => [ProductSuggestion])
  productSuggestions?: ProductSuggestion[];
}
