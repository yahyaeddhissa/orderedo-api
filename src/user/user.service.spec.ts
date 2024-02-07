import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UserService } from "./user.service";
import { UserEntity } from "./entities";
import { User, CreateUserInput } from "./models/user.model";

// Read the Nestjs testing documentation and come back
describe("UserService", () => {
  let service: UserService;
  let userRepository: Repository<UserEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(UserEntity),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    userRepository = module.get<Repository<UserEntity>>(
      getRepositoryToken(UserEntity),
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  describe("createUser", () => {
    it("should create a new user", async () => {
      const createUserInput: CreateUserInput = {
        firstName: "John",
        lastName: "Doe",
        email: "john@example.com",
        password: "password123",
      };
      const newUserEntity: UserEntity = {
        id: "1",
        ...createUserInput,
        isMember: false,
        isVerified: false,
      };
      const createdUser: UserEntity = {
        ...newUserEntity,
        id: "1",
      };
      jest.spyOn(userRepository, "create").mockReturnValueOnce(newUserEntity);
      jest.spyOn(userRepository, "save").mockResolvedValueOnce(createdUser);

      const result = await service.createUser(createUserInput);

      expect(result).toEqual(User.fromEntity(createdUser));
    });
  });
});
