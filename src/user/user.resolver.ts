import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { UserService } from "./user.service";
import { CreateUserInput, LogInResponse, User } from "./models";
import { AuthService } from "./auth.service";
import { AuthGuard } from "./auth.guard";
import { UseGuards } from "@nestjs/common";

@Resolver(() => User)
export class UserResolver {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @UseGuards(AuthGuard)
  @Query(() => [User])
  async users() {
    return this.userService.users();
  }

  @Mutation(() => User)
  async createUser(@Args("input") input: CreateUserInput): Promise<User> {
    const user = await this.userService.createUser(input);
    console.log(user);

    return user;
  }

  @Mutation(() => LogInResponse)
  async logIn(
    @Args("email") email: string,
    @Args("passowrd") password: string,
  ): Promise<LogInResponse> {
    const session = await this.authService.login(email, password);
    return {
      token: session.token,
    };
  }
}
