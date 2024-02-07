import { Query, Resolver } from "@nestjs/graphql";
import { Review } from "./review.model";

const review: Review = {
  id: "fdfdzedze",
  content:
    "Aliquid aut accusamus doloremque omnis. Harum vel dolorem unde reprehenderit et. Deserunt alias alias possimus magnam molestiae ut laboriosam at. Qui perspiciatis assumenda et beatae tempore tempore optio. Velit minima voluptas et.",
  product: {
    id: "fesfesf",
    slug: "ffdefefefez",
    name: "Centrale Whole Milk UHT 500ml",
  },
  rating: 4,
  author: {
    id: "8489",
    isMember: false,
    isVerified: false,
    name: "Yahya Eddhissa",
  },
};

@Resolver(() => Review)
export class ReviewResolver {
  @Query(() => Review, { name: "review" })
  public async getReview(): Promise<Review> {
    return Promise.resolve(review);
  }
}
