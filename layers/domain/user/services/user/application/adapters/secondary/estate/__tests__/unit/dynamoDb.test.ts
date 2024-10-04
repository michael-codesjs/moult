import { UserDTO } from "@typings";
import { UserDynamoDbAdapter } from "../../dynamoDb";
import { user } from "../../dynamoDb/one-table/model";
import { getRandomUserAttributes } from "@utilities/testing";

jest.mock("../../dynamoDb/one-table/model");

describe("DynamoDbDatabaseAdapter", () => {

  let mockedEstateModel: jest.Mocked<typeof user> = jest.mocked(user);
  let adapter: UserDynamoDbAdapter;

  beforeEach(() => {
    adapter = new UserDynamoDbAdapter();
  });

  test(".get", async () => {

    // Arrange
    const dummyEstate = getRandomUserAttributes();
    const dummyEstateStore = { [dummyEstate.id]: dummyEstate };

    mockedEstateModel.get.mockImplementationOnce(async (params: Partial<UserDTO>) => dummyEstateStore[params.id]);

    // Act
    const item = await adapter.get(dummyEstate.id); // get estate item via adapter

    // Assert
    expect(mockedEstateModel.get).toHaveBeenCalledTimes(1);
    expect(item).toStrictEqual(dummyEstateStore[dummyEstate.id]);

  });

  test(".put", async () => {

    // Arrange
    const dummyEstateStore: Record<string, UserDTO> = {};
    const dummyEstate = getRandomUserAttributes();

    mockedEstateModel.create.mockImplementationOnce(async (params: UserDTO) => {
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
    const dummyEstate = getRandomUserAttributes();
    const dummyEstateStore = { [dummyEstate.id]: dummyEstate };

    mockedEstateModel.update.mockImplementationOnce(async (params: Partial<UserDTO>) => {
      dummyEstateStore[params.id] = {
        ...dummyEstateStore[params.id],
        ...params
      };
      return dummyEstateStore[params.id];
    });

    // Act

    const postUpdateDummyEstate = {
      ...getRandomUserAttributes(),
      id: dummyEstate.id
    };

    const item = await adapter.update(postUpdateDummyEstate);

    // Assert

    expect(mockedEstateModel.update).toHaveBeenCalledTimes(1);
    expect(dummyEstateStore[dummyEstate.id]).toStrictEqual(item);

  });

});