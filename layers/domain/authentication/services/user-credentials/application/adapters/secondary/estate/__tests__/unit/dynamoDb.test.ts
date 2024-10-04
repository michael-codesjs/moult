import { UserCredentialsDTO } from "@domain/models";
import { UserCredentialsDynamoDbAdapter } from "../../dynamoDb";
import { userCredentials } from "../../dynamoDb/one-table/model";
import { getRandomUserCredentialsAttributes } from "@utilities/testing";

jest.mock("../../dynamoDb/one-table/model");

describe("DynamoDbDatabaseAdapter", () => {

  let mockedEstateModel: jest.Mocked<typeof userCredentials> = jest.mocked(userCredentials);
  let adapter: UserCredentialsDynamoDbAdapter;

  beforeEach(() => {
    adapter = new UserCredentialsDynamoDbAdapter();
  });

  test(".get", async () => {

    // Arrange
    const dummyEstate = getRandomUserCredentialsAttributes();
    const dummyEstateStore = { [dummyEstate.id]: dummyEstate };

    mockedEstateModel.get.mockImplementationOnce(async (params: Partial<UserCredentialsDTO>) => dummyEstateStore[params.id]);

    // Act
    const item = await adapter.get(dummyEstate.id); // get estate item via adapter

    // Assert
    expect(mockedEstateModel.get).toHaveBeenCalledTimes(1);
    expect(item).toStrictEqual(dummyEstateStore[dummyEstate.id]);

  });

  test(".put", async () => {

    // Arrange
    const dummyEstateStore: Record<string, UserCredentialsDTO> = {};
    const dummyEstate = getRandomUserCredentialsAttributes();

    mockedEstateModel.create.mockImplementationOnce(async (params: UserCredentialsDTO) => {
      dummyEstateStore[params.id] = params;
      return params;
    });

    // Act
    const item = await adapter.put(dummyEstate);

    // Assert

    expect(mockedEstateModel.create).toHaveBeenCalledTimes(1);
    expect(dummyEstateStore).toHaveProperty(dummyEstate.id);
    expect(dummyEstateStore[dummyEstate.id]).toStrictEqual(dummyEstate);

  });

  test(".update", async () => {

    // Arrange
    const dummyEstate = getRandomUserCredentialsAttributes();
    const dummyEstateStore = { [dummyEstate.id]: dummyEstate };

    mockedEstateModel.update.mockImplementationOnce(async (params: Partial<UserCredentialsDTO>) => {
      dummyEstateStore[params.id] = {
        ...dummyEstateStore[params.id],
        ...params
      };
      return dummyEstateStore[params.id];
    });

    // Act

    const postUpdateDummyEstate = {
      ...getRandomUserCredentialsAttributes(),
      id: dummyEstate.id
    };

    const item = await adapter.update(postUpdateDummyEstate);

    // Assert

    expect(mockedEstateModel.update).toHaveBeenCalledTimes(1);
    expect(dummyEstateStore[dummyEstate.id]).toStrictEqual(item);

  });

});