import { Field, ObjectType } from "@nestjs/graphql";
import { Product, ProductSuggestion } from "src/product/models";
import { CompanyEntity } from "../entities";
import { CompanySuggestion } from ".";

@ObjectType()
export class Company {
  public static fromEntity({ id, name, suggestions }: CompanyEntity): Company {
    return {
      id,
      name,
      suggestions: CompanySuggestion.fromEntities(suggestions),
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

  @Field(() => [CompanySuggestion])
  suggestions?: CompanySuggestion[];
}
