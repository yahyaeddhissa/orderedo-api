// import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
// import { Contribution } from "./contribution.model";

// const contribution: Contribution = {
//   id: "fvsvsdv46545",
//   user: {
//     id: "487848",
//     email: "fzzfzefez@ezfze.com",
//     name: "Yahya Eddhissa",
//     isMember: false,
//     isVerified: false,
//   },
// };

// @Resolver(() => Contribution)
// export class ContributionResolver {
//   @Query(() => Contribution)
//   public async getContribution(@Args("id") id: string): Promise<Contribution> {
//     console.log(id);
//     return contribution;
//   }

//   @Mutation(() => Contribution)
//   public async createContribution(): Promise<Contribution> {
//     return;
//   }
// }
