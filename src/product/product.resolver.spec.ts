import { Test } from "@nestjs/testing";
import { ProductResolver } from "./product.resolver";
import { ProductService } from "./product.service";

describe("ProductResolver", () => {
  let resolver: ProductResolver;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        ProductResolver,
        {
          provide: ProductService,
          useFactory: () => ({
            findProduct: jest.fn((id: string) =>
              id === "1234"
                ? Promise.resolve({
                    id: "1234",
                    name: "Mock Product",
                    averageRating: 4.5,
                    shortDescription:
                      "Just a mock product for testing purposes",
                    fullDescription: [{ title: "Title", text: "Content" }],
                  })
                : null,
            ),
          }),
        },
      ],
    }).compile();

    resolver = module.get(ProductResolver);
  });

  it("should be defined", () => {
    expect(resolver).toBeDefined();
  });

  describe("findProduct", () => {
    it("should find a product by its id", async () => {
      const product = await resolver.findProduct("1234");
      expect(product).toEqual({
        id: "1234",
        name: "Mock Product",
        averageRating: 4.5,
        shortDescription: "Just a mock product for testing purposes",
        fullDescription: [{ title: "Title", text: "Content" }],
      });
    });
    it("should return null if the product was not found", async () => {
      const product = await resolver.findProduct("12345");
      expect(product).toBeNull();
    });
  });
});
