import { Query, Resolver } from "@nestjs/graphql";
import { ProductResult, PublicProduct } from "./product.model";

const product: PublicProduct = {
  id: "dzdfqfef7e8545465",
  slug: "centrale-whole-uht-milk-500ml",
  name: "Centrale Whole UHT Milk 500 ml",
  averageRating: 4.6,
  shortDescription:
    "Full-cream milk 0.5 L is perfect for taking care of everyone in the family, its unique flavour preserves all the nutritional values of traditional milk.",
  fullDescription: `Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.
    The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.`,
  approvedBy: {
    id: "165165",
    name: "Yahya Eddhissa",
    email: "zefzfezfe@fefe.com",
    isMember: true,
    isVerified: true,
  },
};

@Resolver(() => ProductResult)
export class ProductResolver {
  @Query(() => ProductResult, { name: "product" })
  public async getProduct(): Promise<typeof ProductResult> {
    return Promise.resolve(product);
  }
}
