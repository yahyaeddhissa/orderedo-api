import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "./entities";
import { Repository } from "typeorm";
import { CreateUserInput, User } from "./models/user.model";

/**
 * Service for managing user-related operations.
 *
 * @remarks
 * This service provides methods for retrieving user information and creating new users.
 * It interfaces with the UserEntity and UserRepository for database interactions.
 */
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  /**
   * Creates a User object based on a UserEntity.
   *
   * @param userEntity - The UserEntity from the database.
   * @returns A User object created from the UserEntity.
   */
  public fromEntity(entity: Partial<UserEntity>): User {
    if (!entity) return null;
    const { id, firstName, lastName, email, isMember } = entity;

    return {
      id,
      name: `${firstName} ${lastName}`,
      email,
      isMember,
    };
  }

  /**
   * Creates an array of User objects based on an array of UserEntity objects.
   *
   * @param userEntities - An array of UserEntity objects from the database.
   * @returns An array of User objects created from the UserEntity objects.
   */
  public fromEntities(userEntities: UserEntity[]): User[] {
    return userEntities.map(this.fromEntity);
  }

  async users(): Promise<User[]> {
    const users = await this.userRepository.find();
    return this.fromEntities(users);
  }

  /**
   * Creates a new user.
   *
   * @param data - The input data for creating the user.
   * @returns A Promise that resolves to the created User object.
   */
  async createUser(data: CreateUserInput): Promise<User> {
    const userEntity = this.userRepository.create(data);
    const user = await this.userRepository.save(userEntity);
    return this.fromEntity(user);
  }
}
