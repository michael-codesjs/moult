import "reflect-metadata";
import { UserDTO } from "@typings";
import { UserDatabaseAdapter } from "@interfaces";
import { user, table } from "./one-table";
import { injectable } from "inversify";

/** User entity DynamoDB secondary adapter. */
@injectable() export class UserDynamoDbAdapter implements UserDatabaseAdapter {

  async get(id: string): Promise<UserDTO> {
    const item: UserDTO = await user.get({ id }); // get user entity properties.
    return item;
  }

  async update(params: UserDTO): Promise<UserDTO> {
    return await user.update(params as never); // update user entity properties.
  }

  async put(params: UserDTO): Promise<UserDTO> {
    return await user.create(params as never);
  }

  async delete(id: string): Promise<void> {
    await user.remove({ id });
  }

  async getByEmail(email: string): Promise<UserDTO> {
    return await user.get({ email, creatorType: "USER" }, { index: "EmailIndex" });
  }

  async getByPhoneNumber(phoneNumber: string): Promise<UserDTO> {
    return await user.get({ phoneNumber, creatorType: "USER" }, { index: "PhoneNumberIndex" });
  }

}