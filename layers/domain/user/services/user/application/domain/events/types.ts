import { DomainCommand, DomainEvent } from "@shared";
import { UserDTO } from "@typings";

export type GetUserDomainCommandPayload = { id: string };
export type GET_USER_DOMAIN_COMMAND = DomainCommand<string, "GET_USER", GetUserDomainCommandPayload, "1.0.0">;

export type CreateUserDomainCommandPayload = {
  id?: string,
  name: string,
  email?: string,
  phoneNumber?: string,
  gender?: "MALE" | "FEMALE",
  dateOfBirth?: Date,
};

export type CREATE_USER_DOMAIN_COMMAND = DomainCommand<
  string,
  "CREATE_ESTATE",
  CreateUserDomainCommandPayload,
  "1.0.0"
>;

export type UpdateUserDomainCommandPayload = {
  id: string,
  name?: string,
  email?: string,
  phoneNumber?: string,
  dateOfBirth?: Date,
  gender?: "MALE" | "FEMALE"
};

export type UPDATE_USER_DOMAIN_COMMAND = DomainCommand<
  string,
  "UPDATE_ESTATE",
  UpdateUserDomainCommandPayload,
  "1.0.0"
>;

export type DeleteUserDomainCommandPayload = { id: string };

export type DELETE_USER_DOMAIN_COMMAND = DomainCommand<
  string,
  "DELETE_USER",
  DeleteUserDomainCommandPayload,
  "1.0.0"
>;

export type USER_CREATED_DOMAIN_EVENT = DomainEvent<
  string,
  "USER_CREATED",
  UserDTO,
  "1.0.0"
>;

export type USER_UPDATED_DOMAIN_EVENT = DomainEvent<
  string,
  "USER_UPDATED",
  UserDTO,
  "1.0.0"
>;