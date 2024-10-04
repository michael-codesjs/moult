import { UserDTO } from "@typings/user"

type CreateUserParams = {
    id?: string,
    name: string,
    email?: string,
    phoneNumber?: string,
    gender?: "MALE" | "FEMALE",
    dateOfBirth?: Date
};

type UpdateUserParams = {
    id: string,
    name?: string,
    email?: string,
    phoneNumber?: string,
    gender?: "MALE" | "FEMALE",
    dateOfBirth?: Date
};

export interface UserUseCase {
    createUser(params: CreateUserParams): Promise<UserDTO>,
    getUser(id: string): Promise<UserDTO>,
    updateUser(params: UpdateUserParams): Promise<UserDTO>,
    deleteUser(id: string): Promise<void>
};

export interface EventsUseCase {
    publishUserCreatedEvent(params: UserDTO): Promise<void>,
    publishUserUpdatedEvent(params: UserDTO): Promise<void>
};