// import {
//   Field,
//   ID,
//   ObjectType,
//   createUnionType,
//   registerEnumType,
// } from "@nestjs/graphql";
// import { Product } from "src/product/product.model";
// import { User } from "src/user/models/user.model";

// @ObjectType()
// export class Review {
//   @Field(() => ID)
//   id: string;

//   @Field(() => User)
//   user: User;

//   product: Product;
//   rating: number;
//   comment: string;
// }

// export const ContributionContent: Review | Alternative = createUnionType({
//   name: "ContributionContent",
//   types: () => [Review, Edit, Alternative] as const,
// });

// export enum ContributionStatusEnum {
//   PENDING,
//   APPROVED,
//   REJECTED,
// }

// export const ContributionStatus = registerEnumType(ContributionStatusEnum, {
//   name: "ContributionStatus",
// });

// @ObjectType()
// export class Contribution {
//   @Field(() => ID)
//   id: string;

//   @Field(() => User)
//   user: User;

//   @Field()
//   status;

//   @Field(() => ContributionContent)
//   content: Review | Edit | Alternative;
// }

// // @InputType()
// // export class CreateContributionInput {
// //   @Field(() => ID)
// //   userId: string;

// //   @Field(() => ID)
// //   contentId: string;

// //   @Field()
// //   contentType: "REVIEW" | "ALTERNATIVE" | "EDIT";

// //   @Field(() => ID)
// //   productId: string;
// // }
