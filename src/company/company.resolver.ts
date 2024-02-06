import { Args, ID, Query, Resolver } from "@nestjs/graphql";
import { CompanyService } from "./company.service";
import { Company } from "./models";

@Resolver(() => Company)
export class CompanyResolver {
  constructor(private readonly companyService: CompanyService) {}

  /**
   * GraphQL query to fetch a company by its ID.
   *
   * @param id - The ID of the company to fetch.
   * @returns The company with the specified ID.
   */
  @Query(() => Company, { name: "company" })
  async getCompany(
    @Args("id", { type: () => ID }) id: string,
  ): Promise<Company> {
    return this.companyService.findCompany({ id });
  }
}
