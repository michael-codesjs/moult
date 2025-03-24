import { DomainCommand, DomainEvent } from '@shared'
import { UserDTO } from '@domain/models'

export type GetUserDomainCommandPayload = { id: string }
export type GET_USER_DOMAIN_COMMAND = DomainCommand<
  string,
  'GET_USER',
  GetUserDomainCommandPayload
>

export type CreateUserDomainCommandPayload = {
  id?: string
  username?: string
  email?: string
  phone_number?: string
  password: string
  name: string
}
export type CREATE_USER_DOMAIN_COMMAND = DomainCommand<
  string,
  'CREATE_ESTATE',
  CreateUserDomainCommandPayload
>

export type UpdateUserDomainCommandPayload = {
  id: string
  username?: string
  email?: string
  phone_number?: string
}
export type UPDATE_USER_DOMAIN_COMMAND = DomainCommand<
  string,
  'UPDATE_USER',
  UpdateUserDomainCommandPayload
>

export type DeleteUserDomainCommandPayload = { id: string }

export type DELETE_USER_DOMAIN_COMMAND = DomainCommand<
  string,
  'DELETE_USER',
  DeleteUserDomainCommandPayload
>

export type USER_CREATED_DOMAIN_EVENT = DomainEvent<
  string,
  'USER_CREATED',
  UserDTO
>
export type USER_UPDATED_DOMAIN_EVENT = DomainEvent<
  string,
  'USER_UPDATED',
  Partial<UserDTO>
>
export type USER_DELETE_DOMAIN_EVENT = DomainEvent<string, 'USER_DELETED', {}>
export type USER_SNAPSHOT_DOMAIN_EVENT = DomainEvent<
  string,
  'USER_SNAPSHOT',
  UserDTO
>
export type USER_USERNAME_UPDATED_DOMAIN_EVENT = DomainEvent<
  string,
  'USER_USERNAME_UPDATED',
  { username: string; id: string }
>

export type USER_DOMAIN_EVENTS =
  | USER_CREATED_DOMAIN_EVENT
  | USER_UPDATED_DOMAIN_EVENT
  | USER_SNAPSHOT_DOMAIN_EVENT
  | USER_USERNAME_UPDATED_DOMAIN_EVENT
