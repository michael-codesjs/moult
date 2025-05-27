import { DomainCommand, DomainEvent } from '@moult/sdk'

export type CreatePhotoDomainCommandPayload = {
  user_id: string
}

export type PhotoCreatedDomainEventPayload = {
  entity_type: string
  id: string
  creator: string
  creator_type: string
  created: string
  modified: string | null
  discontinued: boolean
  user_id: string
  object_key: string
  file_name?: string
  content_type?: string
  size?: number
  metadata?: Record<string, string>
  tags?: string[]
}

export type CREATE_PHOTO_DOMAIN_COMMAND = DomainCommand<
  string,
  'CREATE_PHOTO',
  CreatePhotoDomainCommandPayload
>

export type PHOTO_SNAPSHOT_DOMAIN_EVENT = DomainEvent<
  string,
  'PHOTO_SNAPSHOT',
  any
>

export type PHOTO_CREATED_DOMAIN_EVENT = DomainEvent<
  string,
  'PHOTO_CREATED',
  PhotoCreatedDomainEventPayload
>

export type PHOTO_DOMAIN_COMMANDS = CREATE_PHOTO_DOMAIN_COMMAND

export type PHOTO_DOMAIN_EVENTS =
  | PHOTO_CREATED_DOMAIN_EVENT
  | PHOTO_SNAPSHOT_DOMAIN_EVENT
