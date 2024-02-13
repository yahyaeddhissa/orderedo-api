import { Field, ID, ObjectType, createUnionType } from "@nestjs/graphql";
import { Product } from "src/product/models";
import { User } from "src/user/models/user.model";

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
  content: string;
}

@ObjectType()
export class PendingReview extends Review {}

@ObjectType()
export class PublicReview extends Review {
  @Field(() => User)
  approvedBy: User;
}

@ObjectType()
export class RejectedReview extends Review {
  @Field(() => User)
  rejectedBy: User;
}

export const ReviewResult = createUnionType({
  name: "ReviewResult",
  types: () => [PendingReview, PublicReview, RejectedReview] as const,
});
