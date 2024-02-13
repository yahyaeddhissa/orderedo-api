import {
  Field,
  ID,
  InputType,
  InterfaceType,
  ObjectType,
} from "@nestjs/graphql";
import { User } from "src/user/models/user.model";

@ObjectType()
export class FullDescriptionParagraph {
  @Field()
  title: string;

  @Field()
  text: string;
}

@InterfaceType({
  resolveType(product) {
    if (product.approvedBy) {
      return PublicProduct;
    }
    if (product.rejectedBy) {
      return RejectedProduct;
    }
    return PendingProduct;
  },
})
export abstract class Product {
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

@ObjectType({
  implements: () => [Product],
})
export class PendingProduct extends Product {
  @Field(() => User)
  author: User;
}

@ObjectType({
  implements: () => [Product],
})
export class RejectedProduct extends Product {
  @Field(() => User)
  author: User;

  @Field(() => User)
  rejectedBy: User;
}

@ObjectType({
  implements: () => [Product],
})
export class PublicProduct extends Product {
  @Field(() => User)
  approvedBy: User;
}

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
