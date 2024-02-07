import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { CompanySuggestion, CreateCompanySuggestionInput } from "./models";
import { CompanySuggestionService } from "./company-suggestion.service";

@Resolver(() => CompanySuggestion)
export class CompanySuggestionResolver {
  constructor(
    private readonly companySuggestionService: CompanySuggestionService,
  ) {}

  @Query(() => [CompanySuggestion], { name: "companySuggestions" })
  public async getCompanySuggestions(): Promise<CompanySuggestion[]> {
    return this.companySuggestionService.getCompanySuggestions();
  }

  @Query(() => CompanySuggestion, { name: "companySuggestion" })
  public async getCompanySuggestion(@Args("id") id: string) {
    return this.companySuggestionService.getCompanySuggestionById(id);
  }

  /**
   * Creates a new company suggestion.
   *
   * @param input - The input data for creating the company suggestion.
   * @returns A Promise that resolves to the created Company object.
   */
  @Mutation(() => CompanySuggestion)
  public async createCompanySuggestion(
    @Args("input") input: CreateCompanySuggestionInput,
  ): Promise<CompanySuggestion> {
    return this.companySuggestionService.createCompanySuggestion(input);
  }

  /**
   * Approves a company suggestion and creates a new company based on the suggestion.
   *
   * @param id - The identifier of the company suggestion to be approved.
   * @returns A Promise that resolves to the created Company object.
   */
  @Mutation(() => CompanySuggestion)
  public async approveCompanySuggestion(
    @Args("id") id: string,
  ): Promise<CompanySuggestion> {
    return this.companySuggestionService.approveCompanySuggestion(id);
  }

  /**
   * Rejects a company suggestion and updates its status accordingly.
   *
   * @param id - The identifier of the company suggestion to be rejected.
   * @returns A Promise that resolves to the rejected CompanySuggestion object.
   */
  @Mutation(() => CompanySuggestion)
  public async rejectCompanySuggestion(
    @Args("id") id: string,
  ): Promise<CompanySuggestion> {
    return this.companySuggestionService.rejectCompanySuggestion(id);
  }
}
