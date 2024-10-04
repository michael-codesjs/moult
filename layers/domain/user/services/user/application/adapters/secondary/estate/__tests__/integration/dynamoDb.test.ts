import { UserDynamoDbAdapter } from "../../dynamoDb";
import { user } from "../../dynamoDb/one-table/model";
import { getRandomUserAttributes } from "../../../../../utilities/testing";

describe("DynamoDbDatabaseAdpater", () => {

  let adapter: UserDynamoDbAdapter;
  /** created user resources to be remove from the db */
  let userResourceIds: Array<string> = [];

  const createUser = async () => {
    const userProps = getRandomUserAttributes();
    userResourceIds.push(userProps.id);
    return await user.create(userProps as never);
  }

  beforeEach(() => {
    adapter = new UserDynamoDbAdapter();
  });

  afterEach(async () => {
    for (let x = 0; x < userResourceIds.length; x++) {
      const id = userResourceIds.pop();
      await user.remove({ id });
    }
  });

  test(".get", async () => {
    const preGetUser = await createUser(); // persist user entity to dynamoDb table
    const postGetUser = await adapter.get(preGetUser.id) // get persisted user entity from dynamoDb table
    expect(postGetUser).toStrictEqual(preGetUser); // assert
  });

  test(".update", async () => {

    const preUpdateuser = await createUser(); // persist user entity to dynamoDb table.

    const postUpdateProps = {
      ...getRandomUserAttributes(),
      id: preUpdateuser.id
    }; // generate new entity properties.

    await adapter.update(postUpdateProps) // update persisted user entity via adapter.
    const postUpdateuser = await user.get({ id: preUpdateuser.id }); // get updated user entity from table.

    expect(postUpdateuser).toStrictEqual(postUpdateProps); // assert.

  });

  test(".put", async () => {

    const attributes = getRandomUserAttributes(); // generate new entity properties.
    const result = await adapter.put(attributes); // persist entity properties to dynamoDb table.
    const postPutuser = await user.get({ id: attributes.id });

    expect(attributes).toStrictEqual(result); // assert.
    expect(result).toStrictEqual(postPutuser); // asset.

  });

  test(".delete", async () => {
    const preDeleteuser = await createUser();
    await adapter.delete(preDeleteuser.id);
    const postDeleteRecord = await user.get({ id: preDeleteuser.id });
    expect(postDeleteRecord).toBeUndefined();
  });

  test(".get by email", async () => {
    const preGetUser = await createUser(); // persist user entity to dynamoDb table
    const postGetUser = await adapter.getByEmail(preGetUser.email) // get persisted user entity from dynamoDb table
    expect(postGetUser).toStrictEqual(preGetUser); // assert
  });

  test(".get by phoneNumber", async () => {
    const preGetUser = await createUser(); // persist user entity to dynamoDb table
    const postGetUser = await adapter.getByPhoneNumber(preGetUser.phoneNumber) // get persisted user entity from dynamoDb table
    expect(postGetUser).toStrictEqual(preGetUser); // assert
  });

});