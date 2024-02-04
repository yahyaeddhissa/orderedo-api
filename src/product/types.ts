import { User } from "src/user/types";

export interface CompanySuggestion {
  id: string;
  name: string;
  notes: string;
  status: SuggestionStatus;
  author: User;
}

export interface CreateCompanySuggestionInput {
  name: string;
  notes: string;
  authorId: string;
}

export interface Company {
  id: string;
  name: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  manufacturer: Company;
  shortDescription: string;
  averageRating: number;
  reviewCount: number;
  fullDescription: string;
}

export enum SuggestionStatus {
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
}

export interface ProductSuggestion {
  id: string;
  name: string;
  shortDescription: string;
  fullDescription: string;
  manufacturer: Company;
  notes: string;
  status: SuggestionStatus;
  author: Partial<User>;
}

export interface CreateProductSuggestionInput {
  name: string;
  shortDescription: string;
  fullDescription: string;
  notes: string;
  authorId: string;
  manufacturerId: string;
}
