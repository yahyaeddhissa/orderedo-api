import {
  Field,
  InputType,
  ObjectType,
  registerEnumType,
} from "@nestjs/graphql";
import { SuggestionStatus } from "src/shared/types/suggestion-status";
import { User } from "src/user/models/user.model";
import { ProductSuggestionEntity } from "../entities";

registerEnumType(SuggestionStatus, { name: "SuggestionStatus" });

@ObjectType()
class ProductSuggestionManufacturer {
  @Field()
  id: string;

  @Field()
  name: string;
}

@ObjectType()
export class ProductSuggestion {
  public static fromEntity({
    id,
    name,
    shortDescription,
    fullDescription,
    notes,
    status,
  }: ProductSuggestionEntity): ProductSuggestion {
    return {
      id,
      name,
      shortDescription,
      fullDescription,
      notes,
      status,
    };
  }

  public static fromEntities(
    entities: ProductSuggestionEntity[],
  ): ProductSuggestion[] {
    return entities.map(this.fromEntity);
  }

  @Field()
  id: string;

  @Field()
  name: string;

  // Create a custom ProductSuggestionCompany type in order to avoid circular dependency
  @Field(() => ProductSuggestionManufacturer)
  manufacturer?: ProductSuggestionManufacturer;

  @Field()
  shortDescription: string;

  @Field()
  fullDescription: string;

  @Field()
  notes: string;

  @Field(() => SuggestionStatus)
  status: SuggestionStatus;

  // Create a custom ProductSuggestionAuthor type in order to avoid circular dependency
  @Field(() => User)
  author?: User;
}

@InputType()
export class CreateProductSuggestionInput {
  @Field()
  name: string;

  @Field()
  shortDescription: string;

  @Field()
  fullDescription: string;

  @Field()
  notes: string;

  @Field()
  authorId: string;

  @Field()
  manufacturerId: string;
}
