import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { SuggestionStatus } from "src/shared/types/suggestion-status";
import { User } from "src/user/models/user.model";
import { CompanySuggestionEntity } from "../entities";
import { Company } from ".";

@ObjectType()
class CompanySuggestionCompany {
  @Field()
  id: string;

  @Field()
  name: string;
}

@ObjectType()
export class CompanySuggestion {
  public static fromEntity(
    entity: Partial<CompanySuggestionEntity>,
  ): CompanySuggestion {
    if (!entity) return undefined;
    const { id, name, notes, status, author, company } = entity;
    return {
      id,
      name,
      notes,
      status,
      author: author && User.fromEntity(author),
      company: company && Company.fromEntity(company),
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

  @Field(() => CompanySuggestionCompany, {
    nullable: true,
    description:
      "Refers to the company the suggestion refers to. Null if it's a new company suggestion.",
  })
  company?: CompanySuggestionCompany;
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
