import { DomainCommand } from '@shared'

export type CreateUserDomainCommand = DomainCommand<
  'moult.services.cognito.confirmSignUp',
  'CREATE_USER',
  { id: string; [k: string]: any }
>

export type CheckIfUserWithUsernameAttributeExistsCommand = DomainCommand<
  'moult.services.cognito.preSignUp',
  'CHECK_IF_USER_WITH_USERNAME_ATTRIBUTES_EXISTS',
  { phoneNumber?: string; email?: string }
>
