import "reflect-metadata"; // import first
import { injectable } from "inversify";
import { container, dependencies } from "@dependencies";
import { User } from "@domain/entities";
import { UserRepository, UserUseCase } from "@interfaces";
import { getRandomUserAttributes } from "@utilities/testing";
import { Users } from "@use-cases";
import { UserDTO } from "@typings/user";

jest.mock("@domain/entities");

describe("User use-case", () => {

    const mockedUserClass: jest.MockedObjectDeep<typeof User> = jest.mocked(User);
    let users: UserUseCase;

    @injectable() class MockUserRepository implements UserRepository {
        update() { return Promise.resolve({} as User) }
        put() { return Promise.resolve({} as User) }
        get() { return Promise.resolve({} as User); }
        delete() { return Promise.resolve(); }
        getByEmail() { return Promise.resolve({} as User) }
        getByPhoneNumber() { return Promise.resolve({} as User) }
    }

    container
        .bind<UserRepository>(dependencies.UserRepository)
        .to(MockUserRepository);

    beforeEach(() => {
        users = container.get<Users>(dependencies.UserUseCases);
    });

    afterEach(() => jest.clearAllMocks());

    test(".createUser returns user DTO", async () => {

        const userDTO = getRandomUserAttributes();

        jest
            .spyOn(Users.prototype, "failIfUserWithEitherUsernameAttributesExists" as any)
            .mockImplementationOnce(() => { });

        mockedUserClass.create
            .mockImplementationOnce(() => new User(userDTO));

        mockedUserClass.prototype.toDTO
            .mockImplementationOnce(() => userDTO);

        const mockedPut = jest
            .spyOn(MockUserRepository.prototype, "put")
            .mockImplementationOnce(() => Promise.resolve(new User(userDTO)));

        const users = container.get<Users>(dependencies.UserUseCases);

        const createUserParams: Parameters<typeof users.createUser>[0] = {
            id: userDTO.id,
            name: userDTO.name,
            dateOfBirth: userDTO.dateOfBirth,
            email: userDTO.email,
            phoneNumber: userDTO.phoneNumber
        };

        const resolvedDTO = await users.createUser(createUserParams);

        expect(mockedUserClass.create).toHaveBeenCalled();
        expect(mockedPut).toHaveBeenCalled();
        expect(resolvedDTO).toStrictEqual(userDTO);

    });

    test(".getUser return user DTO", async () => {

        const userDTO: UserDTO = getRandomUserAttributes();

        const mockedRepositoryGet = jest
            .spyOn(MockUserRepository.prototype, "get")
            .mockImplementationOnce(() => Promise.resolve(new User(userDTO)));

        mockedUserClass.prototype.toDTO.mockImplementationOnce(() => userDTO);

        const resolvedDTO = await users.getUser(userDTO.id);

        expect(mockedRepositoryGet).toHaveBeenCalled();
        expect(resolvedDTO).toStrictEqual(userDTO);

    });

});