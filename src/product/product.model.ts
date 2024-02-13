import { Field, ID, ObjectType, createUnionType } from "@nestjs/graphql";
import { User } from "src/user/models/user.model";

@ObjectType()
export class Product {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  slug: string;

  @Field()
  shortDescription: string;

  @Field()
  fullDescription: string;

  @Field()
  averageRating: number;
}

@ObjectType()
export class PendingProduct extends Product {
  @Field(() => User)
  author: User;
}

@ObjectType()
export class RejectedProduct extends Product {
  @Field(() => User)
  author: User;

  @Field(() => User)
  rejectedBy: User;
}

@ObjectType()
export class PublicProduct extends Product {
  @Field(() => User)
  approvedBy: User;
}

export const ProductResult = createUnionType({
  name: "ProductResult",
  types: () => [PublicProduct, PendingProduct, RejectedProduct] as const,
});
