import { Field, ID, InputType, ObjectType } from "@nestjs/graphql";
import { Product } from "src/product/models";
import { TextBlock } from "src/shared/models";
import { User } from "src/user/models";

@ObjectType()
export class Review {
  @Field(() => ID)
  id: string;

  @Field(() => User)
  author: User;

  @Field(() => Product)
  product: Product;

  @Field()
  rating: number;

  @Field()
  title: string;

  @Field(() => [TextBlock])
  overall: TextBlock[];

  @Field(() => [TextBlock])
  advantages: TextBlock[];

  @Field(() => [TextBlock])
  disadvantages: TextBlock[];
}

@InputType()
export class ReviewInput {
  @Field(() => ID)
  authorId: string;

  @Field(() => ID)
  aproductId: string;

  @Field()
  rating: number;

  @Field()
  title: string;

  @Field(() => [TextBlock])
  overall: TextBlock[];

  @Field(() => [TextBlock])
  advantages: TextBlock[];

  @Field(() => [TextBlock])
  disadvantages: TextBlock[];
}

// @ObjectType()
// export class PendingReview extends Review {}

// @ObjectType()
// export class PublicReview extends Review {
//   @Field(() => User)
//   approvedBy: User;
// }

// @ObjectType()
// export class RejectedReview extends Review {
//   @Field(() => User)
//   rejectedBy: User;
// }

// export const ReviewResult = createUnionType({
//   name: "ReviewResult",
//   types: () => [PendingReview, PublicReview, RejectedReview] as const,
// });
