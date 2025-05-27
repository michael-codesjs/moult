import { DomainCommand } from '@moult/sdk'

export type CreateUserDomainCommand = DomainCommand<
  'moult.experience.services.bff',
  'CREATE_USER',
  { id: string; [k: string]: any }
>

export type UpdateUserDomainCommand = DomainCommand<
  'moult.experience.services.bff',
  'UPDATE_USER',
  { id: string; [k: string]: any }
>

export type UpdateUserSignatureDomainCommand = DomainCommand<
  'moult.experience.services.bff',
  'UPDATE_USER_SIGNATURE',
  { id: string; signature: string }
>

export type CheckIfUserWithUsernameAttributeExistsCommand = DomainCommand<
  'moult.services.cognito.preSignUp',
  'CHECK_IF_USER_WITH_USERNAME_ATTRIBUTES_EXISTS',
  { phoneNumber?: string; email?: string }
>
