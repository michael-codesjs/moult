import { DomainCommand, DomainEvent } from '@shared'
import { SignatureAssignmentDTO } from '@domain/models'

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

export type GENERATE_SIGNATURE_DOMAIN_COMMAND = DomainCommand<
  string,
  'USER_CREATED',
  UserCreatedEventPayload
>

export type GetSignatureAssignmentCommandPayload = {
  user_id: string
  signature: string
}
export type GET_SIGNATURE_ASSIGNMENT_COMMAND = DomainCommand<
  string,
  'GET_SIGNATURE_ASSIGNMENT',
  GetSignatureAssignmentCommandPayload
>

export type SIGNATURE_GENERATED_DOMAIN_EVENT = DomainEvent<
  string,
  'SIGNATURE_GENERATED',
  SignatureAssignmentDTO
>

export type SIGNATURE_DOMAIN_EVENTS = SIGNATURE_GENERATED_DOMAIN_EVENT
