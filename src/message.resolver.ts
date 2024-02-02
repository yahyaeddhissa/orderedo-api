import { Query, Resolver } from "@nestjs/graphql";

@Resolver("Message")
export class MessageResolver {
  @Query("helloWorld")
  async helloWorld() {
    return { content: "Hello World" };
  }
}
