import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Company } from "src/company/models";
import { User } from "src/user/models/user.model";

@ObjectType()
class CompanySuggestionData {
  @Field()
  name: string;

  @Field()
  shortDescription: string;

  @Field()
  fullDescription: string;

  @Field()
  notes: string;

  @Field(() => ID)
  authorId: string;
}

@ObjectType()
export class CreateCompanySuggestion {
  @Field(() => ID)
  id: string;

  @Field()
  data: CompanySuggestionData;

  @Field()
  notes: string;

  @Field(() => ID)
  authorId: string;
}

@ObjectType()
export class UpdateCompanySuggestion {
  @Field(() => ID)
  id: string;

  @Field(() => Company)
  company: Company;

  @Field()
  data: CompanySuggestionData;

  @Field()
  notes: string;

  @Field(() => User)
  author: User;
}
