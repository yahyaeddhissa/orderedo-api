import { Field, ObjectType } from "@nestjs/graphql";
import { Product, ProductSuggestion } from "src/product/models";
import { CompanyEntity } from "../entities";
import { CompanySuggestion } from ".";

@ObjectType()
export class Company {
  public static fromEntity(entity: Partial<CompanyEntity>): Company {
    if (!entity) return undefined;
    const { id, name, suggestions, products, productSuggestions } = entity;
    return {
      id,
      name,
      suggestions: suggestions && CompanySuggestion.fromEntities(suggestions),
      products: products && Product.fromEntities(products),
      productSuggestions:
        productSuggestions &&
        ProductSuggestion.fromEntities(productSuggestions),
    };
  }

  public static fromEntities(entities: CompanyEntity[]): Company[] {
    return entities.map((entity) => this.fromEntity(entity));
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
