import { Field, ID, InputType, ObjectType } from "@nestjs/graphql";
import { TextBlock } from "src/shared/models";

@ObjectType()
export class Product {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field({ nullable: true })
  shortDescription?: string;

  @Field(() => [TextBlock], { nullable: true })
  fullDescription?: TextBlock[];

  @Field({ nullable: true })
  averageRating?: number;
}

@InputType()
export class ProductInput {
  @Field()
  name: string;

  @Field()
  shortDescription: string;

  @Field(() => [TextBlock])
  fullDescription: TextBlock[];
}

// @InterfaceType({
//   resolveType(product) {
//     if (product.approvedBy) {
//       return PublicProduct;
//     }
//     if (product.rejectedBy) {
//       return RejectedProduct;
//     }
//     return PendingProduct;
//   },
// })
// export abstract class Product {
//   @Field(() => ID)
//   id: string;

//   @Field()
//   name: string;

//   @Field({ nullable: true })
//   shortDescription?: string;

//   @Field(() => [FullDescriptionParagraph], { nullable: true })
//   fullDescription?: FullDescriptionParagraph[];

//   @Field({ nullable: true })
//   averageRating?: number;
// }

// @ObjectType({
//   implements: () => [Product],
// })
// export class PendingProduct extends Product {
//   @Field(() => User)
//   author: User;
// }

// @ObjectType({
//   implements: () => [Product],
// })
// export class RejectedProduct extends Product {
//   @Field(() => User)
//   author: User;

//   @Field(() => User)
//   rejectedBy: User;
// }

// @ObjectType({
//   implements: () => [Product],
// })
// export class PublicProduct extends Product {
//   @Field(() => User)
//   approvedBy: User;
// }
