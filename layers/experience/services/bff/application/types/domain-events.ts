import { DomainEvent } from '@shared'

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
