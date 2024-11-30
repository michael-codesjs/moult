import { injectable, inject } from "inversify";
import { UserCredentialsAggregateRepository, UserCredentialsUseCase } from "@interfaces";
import { dependencies } from "@dependencies";
import { UserCredentialsDTO } from "@domain/models";
import { UserCredentials as UserCredentialsEntity } from "@domain/aggregate";
import { UsernameAttributeInUseError } from "../errors";
import { EventsRepositrory } from "@repositories/events";

type CreateUserCredentialsParams = {
    id?: string,
    username?: string,
    email?: string,
    phoneNumber?: string,
    password: string,
};

type UpdateUserCredentialsParams = {
    id: string,
    username?: string,
    email?: string,
    phoneNumber?: string
};

@injectable() export class UserCredentials implements UserCredentialsUseCase {

    @inject(dependencies.UserCredentialsRepository) private repository: UserCredentialsAggregateRepository;
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

    async createUserCredentials(params: CreateUserCredentialsParams): Promise<UserCredentialsDTO> {
        
        // this.failIfUserWithEitherUsernameAttributesExists({ currentUser: params.id, ...params });
        const user_credential = UserCredentialsEntity.create(params);
        const events = user_credential.getDomainEvents()

        await this.events.write(events)
        await this.events.publish(events)

        return user_credential.toDTO()
    
    }

    async getUserCredentials(id: string): Promise<UserCredentialsDTO> {
        const userCredentials = await this.repository.get(id)
        return userCredentials.toDTO();
    }

    async updateUserCredentials(params: UpdateUserCredentialsParams): Promise<UserCredentialsDTO> {

        // const { id, ...rest } = params;
        // let userCredentials = await this.repository.get(id);

        // this.failIfUserWithEitherUsernameAttributesExists({ currentUser: id, ...params });
        
        // userCredentials.update(rest); // set attributes to be updated.

        // const postUpdateUserCredentials = await this.repository.update(userCredentials); // update persited estate.

        // return postUpdateUserCredentials.toDTO();
        return {} as any

    }

    async deleteUserCredentials(id: string): Promise<void> {
        // await this.repository.delete(id);
        return {} as any
    }


}