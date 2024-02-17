import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { Review, ReviewInput } from "./models";
import { ReviewService } from "./review.service";

// const review: PublicReview = {
//   id: "fdfdzedze",
//   content:
//     "Aliquid aut accusamus doloremque omnis. Harum vel dolorem unde reprehenderit et. Deserunt alias alias possimus magnam molestiae ut laboriosam at. Qui perspiciatis assumenda et beatae tempore tempore optio. Velit minima voluptas et.",
//   product: {
//     id: "fesfesf",
//     name: "Centrale Whole Milk UHT 500ml",
//   },
//   rating: 4,
//   author: {
//     id: "8489",
//     isMember: false,
//     name: "Yahya Eddhissa",
//   },
//   approvedBy: {
//     id: "9545456",
//     name: "Hanabi Hyuga",
//     isMember: true,
//   },
// };

@Resolver(() => Review)
export class ReviewResolver {
  constructor(private readonly reviewService: ReviewService) {}

  @Query(() => Review, {
    name: "review",
    description: "Returns a Review resource by ID.",
  })
  public async findReview(@Args("id") id: string): Promise<Review> {
    return this.reviewService.findReview({ id });
  }

  @Query(() => [Review], { name: "reviewsByProduct" })
  public async findProductReviews(
    @Args("id") productId: string,
  ): Promise<Review[]> {
    return this.reviewService.findReviews({ productId });
  }

  @Mutation(() => Review, { name: "reviewCreate" })
  public async createReview(
    @Args("input") input: ReviewInput,
  ): Promise<Review> {
    return this.reviewService.createReview(input);
  }
}
