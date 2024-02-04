import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { CompanyService } from "./company.service";
import {
  Company,
  CompanySuggestion,
  CreateCompanySuggestionInput,
} from "../product/types";

@Resolver("Company")
export class CompanyResolver {
  constructor(private readonly companyService: CompanyService) {}

  /**
   * Creates a new company suggestion.
   *
   * @param input - The input data for creating the company suggestion.
   * @returns A Promise that resolves to the created Company object.
   */
  @Mutation()
  async createCompanySuggestion(
    @Args("input") input: CreateCompanySuggestionInput,
  ): Promise<CompanySuggestion> {
    return this.companyService.createCompanySuggestion(input);
  }

  /**
   * Approves a company suggestion and creates a new company based on the suggestion.
   *
   * @param id - The identifier of the company suggestion to be approved.
   * @returns A Promise that resolves to the created Company object.
   */
  @Mutation()
  async approveCompanySuggestion(@Args("id") id: string): Promise<Company> {
    return this.companyService.approveCompanySuggestion(id);
  }

  /**
   * Rejects a company suggestion and updates its status accordingly.
   *
   * @param id - The identifier of the company suggestion to be rejected.
   * @returns A Promise that resolves to the rejected CompanySuggestion object.
   */
  @Mutation()
  async rejectCompanySuggestion(
    @Args("id") id: string,
  ): Promise<CompanySuggestion> {
    return this.companyService.rejectCompanySuggestion(id);
  }
}
