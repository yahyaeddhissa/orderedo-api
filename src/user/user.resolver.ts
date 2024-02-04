import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { UserService } from "./user.service";
import { CreateUserInput, User } from "./types";

@Resolver("User")
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query("users")
  async users() {
    return this.userService.users();
  }

  @Mutation("createUser")
  async createUser(@Args("input") input: CreateUserInput): Promise<User> {
    const user = await this.userService.createUser(input);
    console.log(user);

    return user;
  }
}
