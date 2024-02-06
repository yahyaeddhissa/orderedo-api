import { UserEntity } from "../entities";
import { User } from "./user.model";

describe("User", () => {
  describe("fromEntity", () => {
    it("should create a User object from a UserEntity", () => {
      const userEntity: UserEntity = {
        id: "1",
        firstName: "John",
        lastName: "Doe",
        email: "john@example.com",
        isMember: true,
        isVerified: false,
        password: "password123",
      };
      const user = User.fromEntity(userEntity);
      expect(user.id).toBe(userEntity.id);
      expect(user.name).toBe(`${userEntity.firstName} ${userEntity.lastName}`);
      expect(user.email).toBe(userEntity.email);
      expect(user.isMember).toBe(userEntity.isMember);
      expect(user.isVerified).toBe(userEntity.isVerified);
    });

    it("should return undefined when no entity is passed", () => {
      const user = User.fromEntity(null);
      expect(user).toBeNull();
    });
  });

  describe("fromEntities", () => {
    it("should create an array of User objects from an array of UserEntity objects", () => {
      const userEntities = [
        {
          id: "1",
          firstName: "John",
          lastName: "Doe",
          email: "john@example.com",
          isMember: true,
          isVerified: false,
          password: "password123",
        },
        {
          id: "2",
          firstName: "Jane",
          lastName: "Smith",
          email: "jane@example.com",
          isMember: false,
          isVerified: true,
          password: "password123",
        },
      ];
      const users = User.fromEntities(userEntities);
      expect(users.length).toBe(userEntities.length);
      users.forEach((user, index) => {
        expect(user.id).toBe(userEntities[index].id);
        expect(user.name).toBe(
          `${userEntities[index].firstName} ${userEntities[index].lastName}`,
        );
        expect(user.email).toBe(userEntities[index].email);
        expect(user.isMember).toBe(userEntities[index].isMember);
        expect(user.isVerified).toBe(userEntities[index].isVerified);
      });
    });

    it("should return an empty array when no entities are passed", () => {
      const users = User.fromEntities([]);
      expect(users).toEqual([]);
    });
  });
});
