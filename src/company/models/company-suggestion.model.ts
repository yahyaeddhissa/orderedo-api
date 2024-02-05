import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { SuggestionStatus } from "src/shared/types/suggestion-status";
import { User } from "src/user/models/user.model";
import { CompanySuggestionEntity } from "../entities";

@ObjectType()
export class CompanySuggestion {
  public static fromEntity({
    id,
    name,
    notes,
    status,
  }: CompanySuggestionEntity): CompanySuggestion {
    return {
      id,
      name,
      notes,
      status,
    };
  }

  public static fromEntities(
    entities: CompanySuggestionEntity[],
  ): CompanySuggestion[] {
    return entities.map(this.fromEntity);
  }

  @Field()
  id: string;

  @Field()
  name: string;

  @Field(() => SuggestionStatus)
  status: SuggestionStatus;

  @Field(() => User)
  author?: User;

  @Field()
  notes: string;
}

@InputType()
export class CreateCompanySuggestionInput {
  @Field()
  name: string;

  @Field()
  notes: string;

  @Field()
  authorId: string;
}
