import { UserDTO } from '@domain/models'

type CreateUserParams = {
  id?: string
  username?: string
  email?: string
  phoneNumber?: string
  password: string
}

type UpdateUserParams = {
  id: string
  username?: string
  email?: string
  phoneNumber?: string
}

type UpdateUsernameParams = {
  id: string
  username: string
}

export interface UserUseCase {
  createUser(params: CreateUserParams): Promise<UserDTO>
  getUser(id: string): Promise<UserDTO>
  updateUser(params: UpdateUserParams): Promise<UserDTO>
  updateUsername(params: UpdateUsernameParams): Promise<UserDTO>
  deleteUser(id: string): Promise<void>
}

export interface EventsUseCase {
  publishUserCreatedEvent(params: UserDTO): Promise<void>
  publishUserUpdatedEvent(params: UserDTO): Promise<void>
}
