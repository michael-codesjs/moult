import "reflect-metadata";
import { injectable, inject } from "inversify";
import { User } from "@domain/entities";
import { UserRepository as IUserRepository, UserDatabaseAdapter } from "@interfaces";
import { dependencies } from "@dependencies";

@injectable() export class UserRepository implements IUserRepository {

  @inject(dependencies.UserDatabaseAdapter) private adapter: UserDatabaseAdapter;

  async get(id: string): Promise<User> {
    const postGetDTO = await this.adapter.get(id);
    return User.fromDTO(postGetDTO);
  }

  async update(estate: User): Promise<User> {
    const dto = estate.toDTO();
    const postUpdateDTO = await this.adapter.update(dto);
    return User.fromDTO(postUpdateDTO);
  }

  async put(estate: User): Promise<User> {
    const dto = estate.toDTO();
    const postPutDTO = await this.adapter.put(dto);
    return User.fromDTO(postPutDTO);
  }

  async delete(id: string): Promise<void> {
    await this.adapter.delete(id);
  }

  async getByEmail(email: string): Promise<User> {
    const userDTO = await this.adapter.getByEmail(email);
    return userDTO ? User.fromDTO(userDTO) : null;
  }

  async getByPhoneNumber(phoneNumber: string): Promise<User> {
    const userDTO = await this.adapter.getByPhoneNumber(phoneNumber);
    return userDTO ? User.fromDTO(userDTO) : null;
  }

}