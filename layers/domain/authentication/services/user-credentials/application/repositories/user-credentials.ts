import "reflect-metadata";
import { injectable, inject } from "inversify";
import { UserCredentials } from "@domain/entities";
import { UserCredentialsRepository as IUserCredentialsRepository, UserDatabaseAdapter } from "@interfaces";
import { dependencies } from "@dependencies";

@injectable() export class UserCredentialsRepository implements IUserCredentialsRepository {

  @inject(dependencies.UserCredentialsDatabaseAdapter) private adapter: UserDatabaseAdapter;

  async get(id: string): Promise<UserCredentials> {
    const postGetDTO = await this.adapter.get(id);
    return UserCredentials.fromDTO(postGetDTO);
  }

  async update(userCredentials: UserCredentials): Promise<UserCredentials> {
    const dto = userCredentials.toDTO();
    const postUpdateDTO = await this.adapter.update(dto);
    return UserCredentials.fromDTO(postUpdateDTO);
  }

  async put(userCredentials: UserCredentials): Promise<UserCredentials> {
    const dto = userCredentials.toDTO();
    const postPutDTO = await this.adapter.put(dto);
    return UserCredentials.fromDTO(postPutDTO);
  }

  async delete(id: string): Promise<void> {
    await this.adapter.delete(id);
  }

  async getByEmail(email: string): Promise<UserCredentials> {
    const userCredentialsDTO = await this.adapter.getByEmail(email);
    return userCredentialsDTO ? UserCredentials.fromDTO(userCredentialsDTO) : null;
  }

  async getByPhoneNumber(phoneNumber: string): Promise<UserCredentials> {
    const userCredentialsDTO = await this.adapter.getByPhoneNumber(phoneNumber);
    return userCredentialsDTO ? UserCredentials.fromDTO(userCredentialsDTO) : null;
  }

  async getByUsername(username: string): Promise<UserCredentials> {
    const userCredentialsDTO = await this.adapter.getByUsername(username);
    return userCredentialsDTO ? UserCredentials.fromDTO(userCredentialsDTO) : null;
  }

}