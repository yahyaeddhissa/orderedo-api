import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CompanyEntity } from "./entities";
import { Repository } from "typeorm";
import { Company } from "./models";

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(CompanyEntity)
    private readonly companyRepository: Repository<CompanyEntity>,
  ) {}

  /**
   * Retrieves a company by its ID.
   *
   * @param id - The identifier of the company.
   * @returns A Promise that resolves to the Company object.
   * @throws {NotFoundException} If the company with the specified ID is not found.
   */
  async getCompanyById(id: string): Promise<Company> {
    const company = await this.companyRepository.findOneBy({ id });

    if (!company) {
      throw new NotFoundException(`Company with ID ${id} not found.`);
    }

    return Company.fromEntity(company);
  }

  /**
   * Creates a new company.
   *
   * @param name - The name of the company.
   * @returns A Promise that resolves to the created Company object.
   */
  async createCompany(data: { name: string }): Promise<Company> {
    const companyEntity = this.companyRepository.create(data);
    const createdCompany = await this.companyRepository.save(companyEntity);
    return Company.fromEntity(createdCompany);
  }

  /**
   * Updates a company.
   *
   * @param id - The identifier of the company to update.
   * @param name - The new name of the company.
   * @returns A Promise that resolves to the updated Company object.
   * @throws {NotFoundException} If the company with the specified ID is not found.
   */
  async updateCompany(id: string, data: { name: string }): Promise<Company> {
    const company = await this.companyRepository.findOneBy({ id });

    if (!company) {
      throw new NotFoundException(`Company with ID ${id} not found.`);
    }

    Object.assign(company, data);
    const updatedCompany = await this.companyRepository.save(company);

    return Company.fromEntity(updatedCompany);
  }
}
