import { DomainEvent } from '@shared'

export type USER_AUTHENTICATED_DOMAIN_EVENT = DomainEvent<
  'postAuthentication',
  'USER_AUTHENTICATED',
  { id: string; isNewDevice: boolean }
>

export type SIGNATURE_GENERATED_DOMAIN_EVENT = DomainEvent<
  'moult.user.username-management',
  'SIGNATURE_GENERATED',
  {
    entity_type: string
    id: string
    creator_type: string
    creator: string
    created: Date
    modified: Date
    discontinued: boolean
    signature: string
    base_signature: string
    counter: number
    user_id: string
    generated_at: string
    status: string
  }
>

export type USER_UPDATED_DOMAIN_EVENT = DomainEvent<
  'moult.domain.users.services.user',
  'USER_UPDATED',
  {
    id: string
    name?: string
    email?: string
    phone_number?: string
    bio?: string
    profile_picture?: string
  }
>
