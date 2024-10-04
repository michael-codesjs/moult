import { UserCredentialsDynamoDbAdapter } from "../../dynamoDb";
import { userCredentials } from "../../dynamoDb/one-table/model";
import { getRandomUserCredentialsAttributes } from "../../../../../utilities/testing";

describe("DynamoDbDatabaseAdpater", () => {

  let adapter: UserCredentialsDynamoDbAdapter;
  /** created userCredentials resources to be remove from the db */
  let userCredentialsResourceIds: Array<string> = [];

  const createUser = async () => {
    const userCredentialsProps = getRandomUserCredentialsAttributes();
    userCredentialsResourceIds.push(userCredentialsProps.id);
    return await userCredentials.create(userCredentialsProps as never);
  }

  beforeEach(() => {
    adapter = new UserCredentialsDynamoDbAdapter();
  });

  afterEach(async () => {
    for (let x = 0; x < userCredentialsResourceIds.length; x++) {
      const id = userCredentialsResourceIds.pop();
      await userCredentials.remove({ id });
    }
  });

  test(".get", async () => {
    const preGetUser = await createUser(); // persist userCredentials entity to dynamoDb table
    const postGetUser = await adapter.get(preGetUser.id) // get persisted userCredentials entity from dynamoDb table
    expect(postGetUser).toStrictEqual(preGetUser); // assert
  });

  test(".update", async () => {

    const preUpdateuserCredentials = await createUser(); // persist userCredentials entity to dynamoDb table.

    const postUpdateProps = {
      ...getRandomUserCredentialsAttributes(),
      id: preUpdateuserCredentials.id
    }; // generate new entity properties.

    await adapter.update(postUpdateProps) // update persisted userCredentials entity via adapter.
    const postUpdateuserCredentials = await userCredentials.get({ id: preUpdateuserCredentials.id }); // get updated userCredentials entity from table.

    expect(postUpdateuserCredentials).toStrictEqual(postUpdateProps); // assert.

  });

  test(".put", async () => {

    const attributes = getRandomUserCredentialsAttributes(); // generate new entity properties.
    const result = await adapter.put(attributes); // persist entity properties to dynamoDb table.
    const postPutuserCredentials = await userCredentials.get({ id: attributes.id });

    expect(attributes).toStrictEqual(result); // assert.
    expect(result).toStrictEqual(postPutuserCredentials); // asset.

  });

  test(".delete", async () => {
    const preDeleteuserCredentials = await createUser();
    await adapter.delete(preDeleteuserCredentials.id);
    const postDeleteRecord = await userCredentials.get({ id: preDeleteuserCredentials.id });
    expect(postDeleteRecord).toBeUndefined();
  });

  test(".get by email", async () => {
    const preGetUser = await createUser(); // persist userCredentials entity to dynamoDb table
    const postGetUser = await adapter.getByEmail(preGetUser.email) // get persisted userCredentials entity from dynamoDb table
    expect(postGetUser).toStrictEqual(preGetUser); // assert
  });

  test(".get by phoneNumber", async () => {
    const preGetUser = await createUser(); // persist userCredentials entity to dynamoDb table
    const postGetUser = await adapter.getByPhoneNumber(preGetUser.phoneNumber) // get persisted userCredentials entity from dynamoDb table
    expect(postGetUser).toStrictEqual(preGetUser); // assert
  });

});