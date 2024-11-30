import { DomainCommand, DomainEvent } from "@shared";
import { UserCredentialsDTO } from "@domain/models";

export type GetUserDomainCommandPayload = { id: string };
export type GET_USER_CREDENTIALS_DOMAIN_COMMAND = DomainCommand<string, "GET_USER_CREDENTIALS", GetUserDomainCommandPayload>;

export type CreateUserCredentialsDomainCommandPayload = { id?: string, username?: string, email?: string, phoneNumber?: string, password: string };
export type CREATE_USER_CREDENTIALS_DOMAIN_COMMAND = DomainCommand<string, "CREATE_ESTATE", CreateUserCredentialsDomainCommandPayload>;

export type UpdateUserCredentialsDomainCommandPayload = { id: string, username?: string, email?: string, phoneNumber?: string };
export type UPDATE_USER_CREDENTIALS_DOMAIN_COMMAND = DomainCommand<string, "UPDATE_USER_CREDENTIALS", UpdateUserCredentialsDomainCommandPayload>;

export type DeleteUserDomainCommandPayload = { id: string };
export type DELETE_USER_CREDENTIALS_DOMAIN_COMMAND = DomainCommand<string, "DELETE_USER", DeleteUserDomainCommandPayload>;

export type USER_CREDENTIALS_CREATED_DOMAIN_EVENT = DomainEvent<string, "USER_CREDENTIALS_CREATED", UserCredentialsDTO>;
export type USER_CREDENTIALS_UPDATED_DOMAIN_EVENT = DomainEvent<string, "USER_CREDENTIALS_UPDATED", Partial<UserCredentialsDTO>>;
export type USER_CREDENTIALS_DELETE_DOMAIN_EVENT = DomainEvent<string, "USER_CREDENTIALS_DELETED", {}>;
export type USER_CREDENTIALS_SNAPSHOT_DOMAIN_EVENT = DomainEvent<string, "USER_CREDENTIALS_SNAPSHOT", UserCredentialsDTO>;

export type USER_CREDENTIALS_DOMAIN_EVENTS =
    USER_CREDENTIALS_CREATED_DOMAIN_EVENT |
    USER_CREDENTIALS_UPDATED_DOMAIN_EVENT |
    USER_CREDENTIALS_SNAPSHOT_DOMAIN_EVENT 