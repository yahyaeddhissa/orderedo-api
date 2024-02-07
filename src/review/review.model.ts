import { Field, ID, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class ReviewProduct {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field()
  slug: string;
}

@ObjectType()
export class ReviewAuthor {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  isVerified: boolean;

  @Field()
  isMember: boolean;
}

@ObjectType()
export class ReviewApprover {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;
}

@ObjectType()
export class Review {
  @Field(() => ID)
  id: string;

  @Field(() => ReviewAuthor)
  author: ReviewAuthor;

  @Field(() => ReviewProduct)
  product: ReviewProduct;

  @Field()
  rating: number;

  @Field()
  content: string;

  @Field(() => ReviewApprover)
  approver: ReviewApprover;
}
