import { Args, Query, Resolver } from "@nestjs/graphql";
import { PublicReview, ReviewResult } from "./review.model";

const review: PublicReview = {
  id: "fdfdzedze",
  content:
    "Aliquid aut accusamus doloremque omnis. Harum vel dolorem unde reprehenderit et. Deserunt alias alias possimus magnam molestiae ut laboriosam at. Qui perspiciatis assumenda et beatae tempore tempore optio. Velit minima voluptas et.",
  product: {
    id: "fesfesf",
    name: "Centrale Whole Milk UHT 500ml",
  },
  rating: 4,
  author: {
    id: "8489",
    isMember: false,
    name: "Yahya Eddhissa",
  },
  approvedBy: {
    id: "9545456",
    name: "Hanabi Hyuga",
    isMember: true,
  },
};

@Resolver(() => ReviewResult)
export class ReviewResolver {
  @Query(() => ReviewResult, { name: "review" })
  public async getReview(@Args("id") id: string): Promise<typeof ReviewResult> {
    console.log(id);
    return Promise.resolve(review);
  }

  @Query(() => [ReviewResult], { name: "productReviews" })
  public async getProductReviews(
    @Args("id") id: string,
  ): Promise<(typeof ReviewResult)[]> {
    console.log(id);
    return Promise.resolve([review, review, review]);
  }
}
