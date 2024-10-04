import { injectable, inject } from "inversify";
import { UserRepository, UserUseCase } from "@interfaces";
import { dependencies } from "@dependencies";
import { UserDTO } from "@typings";
import { User } from "@domain/entities";
import { UsernameAttributeInUseError } from "../errors";

type CreateUserParams = {
    id?: string,
    name: string,
    email?: string,
    phoneNumber?: string,
    dateOfBirth?: Date,
};

type UpdateUserParams = {
    id: string,
    name?: string,
    email?: string,
    phoneNumber?: string,
    dateOfBirth?: Date,
    gender: "MALE" | "FEMALE"
};

@injectable() export class Users implements UserUseCase {

    @inject(dependencies.UserRepository) private repository: UserRepository;

    /** Throws a 'UsernameAttributeInUseError' if a user other than the specified current user exists with the supplied username attributes. */
    private async failIfUserWithEitherUsernameAttributesExists(params: { currentUser: string, email?: string, phoneNumber?: string }) {

         if("email" in params) {
            const user = await this.repository.getByEmail(params.email);
            if(!user) return;
            if(user && user.toDTO().id !== params.currentUser) throw new UsernameAttributeInUseError("email");
        }

        if("phoneNumber" in params) {
            const user = await this.repository.getByPhoneNumber(params.phoneNumber);
            if(!user) return;
            if(user && user.toDTO().id !== params.currentUser) throw new UsernameAttributeInUseError("phone number");
        }

    }

    async createUser(params: CreateUserParams): Promise<UserDTO> {
        
        this.failIfUserWithEitherUsernameAttributesExists({ currentUser: params.id, ...params });
        const user = User.create(params);
        await this.repository.put(user);
        
        return user.toDTO();
    
    }

    async getUser(id: string): Promise<UserDTO> {
        const user = await this.repository.get(id);
        return user.toDTO();
    }

    async updateUser(params: UpdateUserParams): Promise<UserDTO> {

        const { id, ...rest } = params;
        let user = await this.repository.get(id);

        this.failIfUserWithEitherUsernameAttributesExists({ currentUser: id, ...params });
        
        user.update(rest); // set attributes to be updated.

        const postUpdateUser = await this.repository.update(user); // update persited estate.

        return postUpdateUser.toDTO();

    }

    async deleteUser(id: string): Promise<void> {
        await this.repository.delete(id);
    }


}