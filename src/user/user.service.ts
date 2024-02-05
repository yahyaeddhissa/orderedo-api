import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "./entities";
import { Repository } from "typeorm";
import { CreateUserInput, User } from "./types";

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

  async users(): Promise<User[]> {
    return this.userRepository.find();
  }

  /**
   * Creates a new user.
   *
   * @param data - The input data for creating the user.
   * @returns A Promise that resolves to the created User object.
   */
  async createUser(data: CreateUserInput): Promise<User> {
    const user = this.userRepository.create(data);
    return this.userRepository.save(user);
  }
}
