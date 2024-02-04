import { Field, ObjectType, registerEnumType } from "@nestjs/graphql";
import { Company } from "src/company/models";
import { SuggestionStatus } from "src/shared/types/suggestion-status";
import { User } from "src/user/models/user.model";

registerEnumType(SuggestionStatus);

@ObjectType()
export class ProductSuggestion {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field(() => Company)
  manufacturer: Company;

  @Field()
  shortDescription: string;

  @Field()
  fullDescription: string;

  @Field()
  notes: string;

  @Field(() => SuggestionStatus)
  status: SuggestionStatus;

  @Field(() => User)
  author: User;
}
