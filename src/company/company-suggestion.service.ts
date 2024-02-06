import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CompanySuggestionEntity } from "./entities";
import { Repository } from "typeorm";
import { CompanySuggestion, CreateCompanySuggestionInput } from "./models";
import { SuggestionStatus } from "src/shared/types/suggestion-status";
import { CompanyService } from "./company.service";

@Injectable()
export class CompanySuggestionService {
  constructor(
    @InjectRepository(CompanySuggestionEntity)
    private readonly companySuggestionRepository: Repository<CompanySuggestionEntity>,

    private readonly companyService: CompanyService,
  ) {}

  /**
   * Retrieves multiple company suggestions based on their IDs.
   *
   * @param ids - An array of identifiers for the company suggestions.
   * @returns A Promise that resolves to an array of CompanySuggestion objects.
   */
  public async getCompanySuggestions(): Promise<CompanySuggestion[]> {
    return CompanySuggestion.fromEntities(
      await this.companySuggestionRepository.find({
        relations: { author: true, company: true },
      }),
    );
  }

  /**
   * Retrieves a company suggestion by its ID.
   *
   * @param id - The identifier of the company suggestion.
   * @returns A Promise that resolves to the CompanySuggestion object.
   */
  async getCompanySuggestionById(id: string): Promise<CompanySuggestion> {
    const companySuggestion = await this.companySuggestionRepository.findOne({
      where: { id },
      relations: { author: true, company: true },
    });

    if (!companySuggestion) {
      throw new Error(`Company suggestion with ID ${id} not found.`);
    }

    return CompanySuggestion.fromEntity(companySuggestion);
  }

  /**
   * Creates a new company suggestion.
   *
   * @param input - The input data for creating the company suggestion.
   * @param author - The author (user) of the company suggestion.
   * @returns A Promise that resolves to the created CompanySuggestionEntity object.
   * @throws {Error} If there is an issue creating or saving the company suggestion.
   */
  async createCompanySuggestion(
    input: CreateCompanySuggestionInput,
  ): Promise<CompanySuggestion> {
    const suggestion = this.companySuggestionRepository.create(input);

    const createdSuggestion =
      await this.companySuggestionRepository.save(suggestion);

    return CompanySuggestion.fromEntity(createdSuggestion);
  }

  /**
   * Approves a company suggestion and creates a new company based on the suggestion.
   *
   * @param id - The identifier of the company suggestion to be approved.
   * @returns A Promise that resolves to the created CompanyEntity object.
   * @throws {Error} If there is an issue approving the suggestion or creating the company.
   */
  async approveCompanySuggestion(id: string): Promise<CompanySuggestion> {
    const suggestion = await this.companySuggestionRepository.findOneBy({ id });

    if (suggestion.status === SuggestionStatus.REJECTED) {
      throw new BadRequestException("The suggestion is already rejected.");
    }

    if (suggestion.status === SuggestionStatus.APPROVED) {
      throw new BadRequestException("The suggestion is already approved.");
    }

    const exists = await this.companyService.findCompany({
      name: suggestion.name,
    });

    if (exists) {
      throw new BadRequestException("A company with this name already exists.");
    }

    suggestion.status = SuggestionStatus.APPROVED;

    if (!suggestion.company) {
      const company = await this.companyService.createCompany({
        name: suggestion.name,
      });
      suggestion.companyId = company.id;
    } else {
      const { name } = suggestion;
      await this.companyService.updateCompany(suggestion.companyId, { name });
    }

    const approvedSuggestion =
      await this.companySuggestionRepository.save(suggestion);
    console.log(approvedSuggestion);

    return CompanySuggestion.fromEntity(
      await this.companySuggestionRepository.findOne({
        where: {
          id: approvedSuggestion.id,
        },
        relations: {
          author: true,
          company: true,
        },
      }),
    );
  }

  /**
   * Rejects a company suggestion and updates its status accordingly.
   *
   * @param id - The identifier of the company suggestion to be rejected.
   * @returns A Promise that resolves to the rejected CompanySuggestionEntity object.
   * @throws {Error} If there is an issue rejecting the suggestion or updating its status.
   */
  async rejectCompanySuggestion(id: string): Promise<CompanySuggestion> {
    const suggestion = await this.companySuggestionRepository.findOneBy({ id });
    suggestion.status = SuggestionStatus.REJECTED;

    const rejectedSuggestion =
      await this.companySuggestionRepository.save(suggestion);

    return CompanySuggestion.fromEntity(rejectedSuggestion);
  }
}
