import { Field, ObjectType } from "@nestjs/graphql";
import { User } from "src/user/models/user.model";

@ObjectType()
export class CompanySuggestion {
  @Field()
  id: string;

  @Field()
  name: string;

  // @Column({
  //   type: "enum",
  //   enum: SuggestionStatus,
  //   default: SuggestionStatus.PENDING,
  // })
  // status: SuggestionStatus;

  @Field(() => User)
  author: User;

  @Field()
  notes: string;
}
