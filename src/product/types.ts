import { User } from "src/user/types";

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

export enum ProductSuggestionStatus {
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
  status: ProductSuggestionStatus;
  author: Partial<User>;
}

export interface CreateProductSuggestionInput {
  name: string;
  shortDescription: string;
  fullDescription: string;
  manufacturerName: string;
  notes: string;
  authorId: string;
}
