import { Field, ID, InputType, ObjectType } from "@nestjs/graphql";

/**
 * Represents a user in the system.
 *
 * @remarks
 * This class serves as a GraphQL ObjectType, DTO (Data Transfer Object), and
 * business object representing user information.
 */
@ObjectType()
export class User {
  @Field(() => ID)
  id: string;

  @Field({ nullable: true })
  email?: string;

  @Field()
  name: string;

  @Field()
  isMember: boolean;
}

/**
 * Represents the input data for creating a new user.
 *
 * @remarks
 * This class serves as a GraphQL InputType, defining the expected input structure
 * for creating a new user.
 */
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
