import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { ProductCreateInput, Product } from "./models";
import { ProductService } from "./product.service";

// const product: PublicProduct = {
//   id: "dzdfqfef7e8545465",
//   name: "Centrale Whole UHT Milk 500 ml",
//   averageRating: 4.6,
//   shortDescription:
//     "Full-cream milk 0.5 L is perfect for taking care of everyone in the family, its unique flavour preserves all the nutritional values of traditional milk.",
//   fullDescription: [
//     {
//       title: "What is Centrale Whole Milk 0.5 L",
//       text: "The half-litre format is easy to transport and very useful for households with few members that don't consume traditional Tetrapak cartons. Also, its modern packaging includes a stopper to make it easier to serve and store in your fridge. Just unscrew it and it's ready to serve! You can find 0.5 L full-cream milk in your usual supermarket and buy the Tetrapak cartons individually or in packs of six. Whatever is most convenient for you.",
//     },
//   ],
//   approvedBy: {
//     id: "165165",
//     name: "Yahya Eddhissa",
//     email: "zefzfezfe@fefe.com",
//     isMember: true,
//   },
// };

// const product: PendingProduct = {
//   id: "dzdfqfef7e8545465",
//   name: "Centrale Whole UHT Milk 500 ml",
//   averageRating: 4.6,
//   shortDescription:
//     "Full-cream milk 0.5 L is perfect for taking care of everyone in the family, its unique flavour preserves all the nutritional values of traditional milk.",
//   fullDescription: [
//     {
//       title: "What is Centrale Whole Milk 0.5 L",
//       text: "The half-litre format is easy to transport and very useful for households with few members that don't consume traditional Tetrapak cartons. Also, its modern packaging includes a stopper to make it easier to serve and store in your fridge. Just unscrew it and it's ready to serve! You can find 0.5 L full-cream milk in your usual supermarket and buy the Tetrapak cartons individually or in packs of six. Whatever is most convenient for you.",
//     },
//   ],
//   author: {
//     id: "165165",
//     name: "Yahya Eddhissa",
//     email: "zefzfezfe@fefe.com",
//     isMember: true,
//   },
// };

@Resolver(() => Product)
export class ProductResolver {
  constructor(private readonly productService: ProductService) {}

  @Query(() => Product, { name: "product" })
  public async findProduct(@Args("id") id: string): Promise<Product | null> {
    const product = await this.productService.findProduct(id);
    return product;
  }

  @Mutation(() => Product)
  public async createProduct(
    @Args("input") input: ProductCreateInput,
  ): Promise<Product> {
    return this.productService.createProduct(input);
  }
}
