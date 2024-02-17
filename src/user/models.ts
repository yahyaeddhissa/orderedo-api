import { Field, ID, InputType, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class User {
  @Field(() => ID)
  id: string;

  @Field({ nullable: true })
  email?: string;

  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field()
  isMember: boolean;
}

@InputType()
export class CreateUserInput {
  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field()
  email: string;

  @Field()
  password: string;
}

@ObjectType()
export class LogInResponse {
  @Field()
  token: string;
}
