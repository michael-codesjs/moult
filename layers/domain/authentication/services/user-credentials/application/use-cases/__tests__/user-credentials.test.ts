import { UserCredentials as UserCredentialsEntity } from "@domain/entities";
import { UserCredentialsRepository } from "@interfaces";
import { UserCredentialsDTO } from "@domain/models/user-credentials";
import { UserCredentials } from "@use-cases";
import { getRandomUserCredentialsAttributes } from "@utilities/testing";
import { Container, injectable } from "inversify";
import "reflect-metadata"; // import first

const dependencies = Object.freeze({
    UserCredentialsUseCases: Symbol.for("UserCredentialsUseCases"),
    UserCredentialsRepository: Symbol.for("UserCredentialsRepository")
});

const container = new Container();

container.bind(dependencies.UserCredentialsUseCases).to(UserCredentials);


jest.mock("@domain/entities");

describe("User use-case", () => {

    const mockedUserClass: jest.MockedObjectDeep<typeof UserCredentialsEntity> = jest.mocked(UserCredentialsEntity);
    let userCredentials: UserCredentials;

    @injectable() class MockUserCredentialsRepository implements UserCredentialsRepository {
        update() { return Promise.resolve({} as UserCredentialsEntity) }
        put() { return Promise.resolve({} as UserCredentialsEntity) }
        get() { return Promise.resolve({} as UserCredentialsEntity); }
        delete() { return Promise.resolve(); }
        getByEmail() { return Promise.resolve({} as UserCredentialsEntity) }
        getByPhoneNumber() { return Promise.resolve({} as UserCredentialsEntity) }
        getByUsername(username: string) { return Promise.resolve({} as UserCredentialsEntity) }
    }

    container
        .bind<UserCredentialsRepository>(dependencies.UserCredentialsRepository)
        .to(MockUserCredentialsRepository);

    beforeEach(() => {
        userCredentials = container.get<UserCredentials>(dependencies.UserCredentialsUseCases);
    });

    afterEach(() => jest.clearAllMocks());

    test(".createUserCredentials returns user credentials DTO", async () => {

        const userCredentialsDTO = getRandomUserCredentialsAttributes();

        jest
            .spyOn(UserCredentials.prototype, "failIfUserWithEitherUsernameAttributesExists" as any)
            .mockImplementationOnce(() => { });

        mockedUserClass.create
            .mockImplementationOnce(() => new UserCredentialsEntity(userCredentialsDTO));

        mockedUserClass.prototype.toDTO
            .mockImplementationOnce(() => userCredentialsDTO);

        const mockedPut = jest
            .spyOn(MockUserCredentialsRepository.prototype, "put")
            .mockImplementationOnce(() => Promise.resolve(new UserCredentialsEntity(userCredentialsDTO)));

        const createUserParams: Parameters<typeof userCredentials.createUserCredentials>[0] = {
            id: userCredentialsDTO.id,
            username: userCredentialsDTO.username,
            email: userCredentialsDTO.email,
            phoneNumber: userCredentialsDTO.phoneNumber,
            password: userCredentialsDTO.password
        };

        const resolvedDTO = await userCredentials.createUserCredentials(createUserParams);

        expect(mockedUserClass.create).toHaveBeenCalled();
        expect(mockedPut).toHaveBeenCalled();
        expect(resolvedDTO).toStrictEqual(userCredentialsDTO);

    });

    test(".getUser return user DTO", async () => {

        const userCredentialsDTO: UserCredentialsDTO = getRandomUserCredentialsAttributes();

        const mockedRepositoryGet = jest
            .spyOn(MockUserCredentialsRepository.prototype, "get")
            .mockImplementationOnce(() => Promise.resolve(new UserCredentialsEntity(userCredentialsDTO)));

        mockedUserClass.prototype.toDTO.mockImplementationOnce(() => userCredentialsDTO);

        const resolvedDTO = await userCredentials.getUserCredentials(userCredentialsDTO.id);

        expect(mockedRepositoryGet).toHaveBeenCalled();
        expect(resolvedDTO).toStrictEqual(userCredentialsDTO);

    });

});