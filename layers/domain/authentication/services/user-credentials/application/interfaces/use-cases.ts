import { UserCredentialsDTO } from "@domain/models/user-credentials"

type CreateUserCredentialsParams = {
    id?: string,
    username?: string,
    email?: string,
    phoneNumber?: string,
    password: string
};

type UpdateUserCredentialsParams = {
    id: string,
    username?: string,
    email?: string,
    phoneNumber?: string
};

export interface UserCredentialsUseCase {
    createUserCredentials(params: CreateUserCredentialsParams): Promise<UserCredentialsDTO>,
    getUserCredentials(id: string): Promise<UserCredentialsDTO>,
    updateUserCredentials(params: UpdateUserCredentialsParams): Promise<UserCredentialsDTO>,
    deleteUserCredentials(id: string): Promise<void>
};

export interface EventsUseCase {
    publishUserCredentialsCreatedEvent(params: UserCredentialsDTO): Promise<void>,
    publishUserCredentialsUpdatedEvent(params: UserCredentialsDTO): Promise<void>
};