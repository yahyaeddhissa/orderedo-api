import {
  Field,
  ID,
  InputType,
  ObjectType,
  createUnionType,
} from "@nestjs/graphql";
import { User } from "src/user/models/user.model";

@ObjectType()
export class FullDescriptionParagraph {
  @Field()
  title: string;

  @Field()
  text: string;
}

@ObjectType()
export class Product {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field({ nullable: true })
  shortDescription?: string;

  @Field(() => [FullDescriptionParagraph], { nullable: true })
  fullDescription?: FullDescriptionParagraph[];

  @Field({ nullable: true })
  averageRating?: number;
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

export type ProductResult = PendingProduct | PublicProduct | RejectedProduct;

export const ProductResult = createUnionType({
  name: "ProductResult",
  types: () => [PublicProduct, PendingProduct, RejectedProduct] as const,
});

@InputType()
export class FullDescriptionParagraphInput {
  @Field()
  title: string;

  @Field()
  text: string;
}

@InputType()
export class ProductCreateInput {
  @Field()
  name: string;

  @Field()
  shortDescription: string;

  @Field(() => [FullDescriptionParagraphInput])
  fullDescription: FullDescriptionParagraphInput[];
}
