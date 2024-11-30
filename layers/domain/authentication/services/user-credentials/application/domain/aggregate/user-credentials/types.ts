import { DomainEvent } from "@shared";

export type CreateUserCredentialsParams = {
    id?: string
    username?: string,
    email?: string,
    phoneNumber?: string,
    password: string,
};

export type UpdateUserCredentialsParams = {
    username?: string,
    email?: string,
    phoneNumber?: string,
}