import { Field, InputType, ObjectType } from "@nestjs/graphql";

@InputType()
export class TextBlockInput {
  @Field()
  title: string;

  @Field()
  text: string;
}

@ObjectType()
export class TextBlock {
  @Field()
  title: string;

  @Field()
  text: string;
}
