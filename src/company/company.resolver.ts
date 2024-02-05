import { Resolver } from "@nestjs/graphql";
import { CompanyService } from "./company.service";
import { Company } from "./models";

@Resolver(() => Company)
export class CompanyResolver {
  constructor(private readonly companyService: CompanyService) {}
}
