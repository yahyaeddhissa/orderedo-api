// import { Company } from "./company.model";
// import { CompanyEntity } from "../entities/company.entity";

// describe("Company", () => {
//   describe("fromEntity", () => {
//     it("should create a Company object from a CompanyEntity", () => {
//       const companyEntity: CompanyEntity = {
//         id: "1",
//         name: "Example Company",
//       };
//       const company = Company.fromEntity(companyEntity);
//       expect(company.id).toBe(companyEntity.id);
//       expect(company.name).toBe(companyEntity.name);
//     });

//     it("should handle partial or incomplete data", () => {
//       const companyEntity: Partial<CompanyEntity> = {
//         id: "1",
//       };
//       const company = Company.fromEntity(companyEntity);
//       expect(company.name).toBeUndefined();
//     });
//   });

//   describe("fromEntities", () => {
//     it("should create an array of Company objects from an array of CompanyEntity objects", () => {
//       const companyEntities: CompanyEntity[] = [
//         {
//           id: "1",
//           name: "Company A",
//         },
//         {
//           id: "2",
//           name: "Company B",
//         },
//       ];
//       const companies = Company.fromEntities(companyEntities);
//       expect(companies.length).toBe(companyEntities.length);
//       companies.forEach((company, index) => {
//         expect(company.id).toBe(companyEntities[index].id);
//         expect(company.name).toBe(companyEntities[index].name);
//       });
//     });

//     it("should return an empty array when no entities are passed", () => {
//       const companies = Company.fromEntities([]);
//       expect(companies).toEqual([]);
//     });

//     it("should handle an array with null values", () => {
//       const companyEntities: CompanyEntity[] = [null, null, null];
//       const companies = Company.fromEntities(companyEntities);
//       expect(companies).toEqual([undefined, undefined, undefined]);
//     });
//   });
// });
