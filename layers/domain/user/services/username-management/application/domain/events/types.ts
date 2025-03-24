import { DomainCommand, DomainEvent } from '@shared'
import { UsernameAssignmentDTO } from '@domain/models'

export interface UserCreatedEventPayload {
  entity_type: string
  id: string
  creator: string
  creator_type: string
  created: string
  modified: string | null
  discontinued: boolean
  email: string | null
  phone_number: string
  name: string
  email_verified: boolean | null
  phone_number_verified: string
  password: string | null
}

export type GENERATE_USERNAME_DOMAIN_COMMAND = DomainCommand<
  string,
  'USER_CREATED',
  UserCreatedEventPayload
>

export type GetUsernameAssignmentCommandPayload = {
  user_id: string
  username: string
}
export type GET_USERNAME_ASSIGNMENT_COMMAND = DomainCommand<
  string,
  'GET_USERNAME_ASSIGNMENT',
  GetUsernameAssignmentCommandPayload
>

export type USERNAME_GENERATED_DOMAIN_EVENT = DomainEvent<
  string,
  'USERNAME_GENERATED',
  UsernameAssignmentDTO
>

export type USERNAME_DOMAIN_EVENTS = USERNAME_GENERATED_DOMAIN_EVENT
