import { injectable, inject } from "inversify";
import { UserAggregateRepository, UserUseCase } from "@interfaces";
import { dependencies } from "@dependencies";
import { UserDTO } from "@domain/models";
import { User as UserEntity } from "@domain/aggregate";
import { UsernameAttributeInUseError } from "../errors";
import { EventsRepositrory } from "@repositories/events";

type CreateUserParams = {
    id?: string,
    username?: string,
    email?: string,
    phoneNumber?: string,
    password: string,
};

type UpdateUserParams = {
    id: string,
    username?: string,
    email?: string,
    phoneNumber?: string
};

@injectable() export class User implements UserUseCase {

    @inject(dependencies.UserRepository) private repository: UserAggregateRepository;
    @inject(dependencies.EventsRepositrory) private events: EventsRepositrory

    /** Throws a 'UsernameAttributeInUseError' if a user other than the specified current user exists with the supplied username attributes. */
    private async failIfUserWithEitherUsernameAttributesExists(params: { currentUser: string, email?: string, phoneNumber?: string, username?: string }) {

        //  if("email" in params) {
        //     const user = await this.repository.getByEmail(params.email);
        //     if(!user) return;
        //     if(user && user.toDTO().id !== params.currentUser) throw new UsernameAttributeInUseError("email");
        // }

        // if("phoneNumber" in params) {
        //     const user = await this.repository.getByPhoneNumber(params.phoneNumber);
        //     if(!user) return;
        //     if(user && user.toDTO().id !== params.currentUser) throw new UsernameAttributeInUseError("phone number");
        // }

        // if("username" in params) {
        //     const user = await this.repository.getByUsername(params.username);
        //     if(!user) return;
        //     if(user && user.toDTO().id !== params.currentUser) throw new UsernameAttributeInUseError("phone number");
        // }

    }

    async createUser(params: CreateUserParams): Promise<UserDTO> {
        
        // this.failIfUserWithEitherUsernameAttributesExists({ currentUser: params.id, ...params });
        const user_credential = UserEntity.create(params);
        const events = user_credential.getDomainEvents()

        await this.events.write(events)
        await this.events.publish(events)

        return user_credential.toDTO()
    
    }

    async getUser(id: string): Promise<UserDTO> {
        const userCredentials = await this.repository.get(id)
        return userCredentials.toDTO();
    }

    async updateUser(params: UpdateUserParams): Promise<UserDTO> {

        // const { id, ...rest } = params;
        // let userCredentials = await this.repository.get(id);

        // this.failIfUserWithEitherUsernameAttributesExists({ currentUser: id, ...params });
        
        // userCredentials.update(rest); // set attributes to be updated.

        // const postUpdateUser = await this.repository.update(userCredentials); // update persited estate.

        // return postUpdateUser.toDTO();
        return {} as any

    }

    async deleteUser(id: string): Promise<void> {
        // await this.repository.delete(id);
        return {} as any
    }


}