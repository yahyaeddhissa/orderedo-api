import { CompanySuggestion } from "./company-suggestion.model";
import { CompanySuggestionEntity } from "../entities/company-suggestion.entity";
import { SuggestionStatus } from "src/shared/types/suggestion-status";

describe("CompanySuggestion", () => {
  describe("fromEntity", () => {
    it("should create a CompanySuggestion object from a CompanySuggestionEntity", () => {
      const companySuggestionEntity: CompanySuggestionEntity = {
        id: "1",
        name: "Suggestion A",
        notes: "Test notes",
        status: SuggestionStatus.PENDING,
        author: null,
        company: null,
      };
      const companySuggestion = CompanySuggestion.fromEntity(
        companySuggestionEntity,
      );
      expect(companySuggestion.id).toBe(companySuggestionEntity.id);
      expect(companySuggestion.name).toBe(companySuggestionEntity.name);
      expect(companySuggestion.notes).toBe(companySuggestionEntity.notes);
      expect(companySuggestion.status).toBe(companySuggestionEntity.status);
      expect(companySuggestion.author).toBeNull();
      expect(companySuggestion.company).toBeNull();
    });

    it("should handle invalid or incomplete data", () => {
      const companySuggestionEntity: Partial<CompanySuggestionEntity> = {
        id: "1",
        name: "CompanyName",
      };
      const companySuggestion = CompanySuggestion.fromEntity(
        companySuggestionEntity,
      );
      expect(companySuggestion.notes).toBeUndefined();
      expect(companySuggestion.status).toBeUndefined();
      expect(companySuggestion.author).toBeUndefined();
      expect(companySuggestion.company).toBeUndefined();
    });
  });

  describe("fromEntities", () => {
    it("should create an array of CompanySuggestion objects from an array of CompanySuggestionEntity objects", () => {
      const companySuggestionEntities: CompanySuggestionEntity[] = [
        {
          id: "1",
          name: "Suggestion A",
          notes: "Test notes",
          status: SuggestionStatus.PENDING,
          author: null,
          company: null,
        },
        {
          id: "2",
          name: "Suggestion B",
          notes: "Another test",
          status: SuggestionStatus.APPROVED,
          author: null,
          company: null,
        },
      ];
      const companySuggestions = CompanySuggestion.fromEntities(
        companySuggestionEntities,
      );
      expect(companySuggestions.length).toBe(companySuggestionEntities.length);
      companySuggestions.forEach((companySuggestion, index) => {
        expect(companySuggestion.id).toBe(companySuggestionEntities[index].id);
        expect(companySuggestion.name).toBe(
          companySuggestionEntities[index].name,
        );
        expect(companySuggestion.notes).toBe(
          companySuggestionEntities[index].notes,
        );
        expect(companySuggestion.status).toBe(
          companySuggestionEntities[index].status,
        );
        expect(companySuggestion.author).toBeNull();
        expect(companySuggestion.company).toBeNull();
      });
    });

    it("should return an empty array when no entities are passed", () => {
      const companySuggestions = CompanySuggestion.fromEntities([]);
      expect(companySuggestions).toEqual([]);
    });

    it("should handle an array with null values", () => {
      const companySuggestionEntities: CompanySuggestionEntity[] = [
        null,
        null,
        null,
      ];
      const companySuggestions = CompanySuggestion.fromEntities(
        companySuggestionEntities,
      );
      expect(companySuggestions).toEqual([undefined, undefined, undefined]);
    });
  });
});
