import { DomainEvent } from '@shared'

export interface UserDomainCommandAdapter {
  sendCreateUserCommand: (params: {
    id: string
    [k: string]: string
  }) => Promise<void>
  sendCheckIfUserWithUsernameAttributeExistsCommand: (params: {
    phoneNumber?: string
    email?: string
  }) => Promise<boolean>
}

export interface EventAdapter {
  publish(events: Array<DomainEvent>): Promise<void>
}
