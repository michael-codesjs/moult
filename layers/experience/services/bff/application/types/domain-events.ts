import { DomainEvent } from '@moult/sdk'

export type USER_AUTHENTICATED_DOMAIN_EVENT = DomainEvent<
  'postAuthentication',
  'USER_AUTHENTICATED',
  { id: string; isNewDevice: boolean }
>

export type USERNAME_GENERATED_DOMAIN_EVENT = DomainEvent<
  'moult.user.username-management',
  'USERNAME_GENERATED',
  {
    entity_type: string
    id: string
    creator_type: string
    creator: string
    created: Date
    modified: Date
    discontinued: boolean
    username: string
    basename: string
    counter: number
    user_id: string
    generated_at: string
    status: string
  }
>

export type USER_CREATED_DOMAIN_EVENT = DomainEvent<
  'moult.user.users',
  'USER_CREATED',
  {
    entity_type: string
    id: string
    creator_type: string
    creator: string
    created: Date
    modified: Date
    discontinued: boolean
    username: string
    basename: string
    counter: number
    user_id: string
    generated_at: string
    status: string
  }
>

export type USER_UPDATED_EVENT = DomainEvent<
  'moult.user.users',
  'USER_UPDATED',
  {
    id: string
    name?: string
    email?: string
    phone_number?: string
    bio?: string
    profile_picture?: string
    updated_at?: string
    created_at?: string
    creator_type?: string
    creator?: string
    entity_type?: string
    modified?: string
    discontinued?: boolean
  }
>
