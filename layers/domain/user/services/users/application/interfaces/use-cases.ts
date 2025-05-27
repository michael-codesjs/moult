import { UserDTO } from '@domain/models'

type CreateUserParams = {
  id?: string
  email?: string
  phone_number?: string
  password?: string
  name?: string
  bio?: string
}

type UpdateUserParams = {
  id: string
  username?: string
  email?: string
  phoneNumber?: string
}

type UpdateSignatureParams = {
  id: string
  signature: string
}

export interface UserUseCase {
  createUser(params: CreateUserParams): Promise<UserDTO>
  getUser(id: string): Promise<UserDTO>
  updateUser(params: UpdateUserParams): Promise<UserDTO>
  updateSignature(params: UpdateSignatureParams): Promise<UserDTO>
  deleteUser(id: string): Promise<void>
}

export interface EventsUseCase {
  publishUserCreatedEvent(params: UserDTO): Promise<void>
  publishUserUpdatedEvent(params: UserDTO): Promise<void>
}
