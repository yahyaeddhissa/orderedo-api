import { Field, ID, InputType, ObjectType } from "@nestjs/graphql";
import { UserEntity } from "../entities";

/**
 * Represents a user in the system.
 *
 * @remarks
 * This class serves as a GraphQL ObjectType, DTO (Data Transfer Object), and
 * business object representing user information.
 */
@ObjectType()
export class User {
  /**
   * Creates a User object based on a UserEntity.
   *
   * @param userEntity - The UserEntity from the database.
   * @returns A User object created from the UserEntity.
   */
  public static fromEntity(entity: Partial<UserEntity>): User {
    if (!entity) return null;
    const { id, firstName, lastName, email, isMember, isVerified } = entity;

    return {
      id,
      name: `${firstName} ${lastName}`,
      email,
      isMember,
      isVerified,
    };
  }

  /**
   * Creates an array of User objects based on an array of UserEntity objects.
   *
   * @param userEntities - An array of UserEntity objects from the database.
   * @returns An array of User objects created from the UserEntity objects.
   */
  public static fromEntities(userEntities: UserEntity[]): User[] {
    return userEntities.map(User.fromEntity);
  }

  @Field(() => ID)
  id: string;

  @Field()
  email: string;

  @Field()
  name: string;

  @Field()
  isVerified: boolean;

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
