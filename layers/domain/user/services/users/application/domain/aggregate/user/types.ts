import { DomainEvent } from '@shared'

export type CreateUserParams = {
  id?: string
  username?: string
  email?: string
  phone_number?: string
  password: string
}

export type UpdateUserParams = {
  name?: string
  email?: string
  phone_number?: string
}
