import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { SuggestionStatus } from "src/shared/types/suggestion-status";
import { User } from "src/user/models/user.model";
import { CompanySuggestionEntity } from "../entities";
import { Company } from ".";

@ObjectType()
export class CompanySuggestion {
  public static fromEntity({
    id,
    name,
    notes,
    status,
    author,
    company,
  }: CompanySuggestionEntity): CompanySuggestion {
    return {
      id,
      name,
      notes,
      status,
      author: author && User.fromEntity(author),
      company: company ? Company.fromEntity(company) : null,
    };
  }

  public static fromEntities(
    entities: CompanySuggestionEntity[],
  ): CompanySuggestion[] {
    if (!entities) return [];
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

  @Field(() => Company, {
    nullable: true,
    description:
      "Refers to the company the suggestion refers to. Null if it's a new company suggestion.",
  })
  company?: Company;
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
