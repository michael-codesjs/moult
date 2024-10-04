import "reflect-metadata";
import { UserCredentialsDTO } from "@domain/models";
import { UserDatabaseAdapter } from "@interfaces";
import { userCredentials } from "./one-table";
import { injectable } from "inversify";

/** UserCredentials entity DynamoDB secondary adapter. */
@injectable() export class UserCredentialsDynamoDbAdapter implements UserDatabaseAdapter {

  async get(id: string): Promise<UserCredentialsDTO> {
    const item: UserCredentialsDTO = await userCredentials.get({ id }); // get userCredentials entity properties.
    return item;
  }

  async update(params: UserCredentialsDTO): Promise<UserCredentialsDTO> {
    return await userCredentials.update(params as never); // update userCredentials entity properties.
  }

  async put(params: UserCredentialsDTO): Promise<UserCredentialsDTO> {
    return await userCredentials.create(params as never);
  }

  async delete(id: string): Promise<void> {
    await userCredentials.remove({ id });
  }

  async getByEmail(email: string): Promise<UserCredentialsDTO> {
    return await userCredentials.get({ email, creatorType: "USER_CREDENTIALS" }, { index: "EmailIndex" });
  }

  async getByPhoneNumber(phoneNumber: string): Promise<UserCredentialsDTO> {
    return await userCredentials.get({ phoneNumber, creatorType: "USER_CREDENTIALS" }, { index: "PhoneNumberIndex" });
  }

  async getByUsername(username: string): Promise<UserCredentialsDTO> {
    return await userCredentials.get({ username, creatorType: "USER_CREDENTIALS" }, { index: "UsernameIndex" });
  }

}