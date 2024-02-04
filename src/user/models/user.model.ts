import { Field, InputType, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class User {
  @Field()
  id: string;

  @Field()
  username: string;

  @Field()
  email: string;

  @Field()
  name: string;

  @Field()
  isVerified: boolean;

  @Field()
  isMember: boolean;
}

@InputType()
export class CreateUserInput {
  @Field()
  name: string;

  @Field()
  username: string;

  @Field()
  email: string;
}
