import { UserDomainCommandsRepositroy } from '@repositories'

export type CreateUserUseCaseParams = { id: string; [k: string]: string }
export type CreateUserUseCase = (
  params: CreateUserUseCaseParams,
) => Promise<void>

export const createUser: CreateUserUseCase = async (params) => {
  const userDomainCommandsRepository = new UserDomainCommandsRepositroy()
  await userDomainCommandsRepository.sendCreateUserCommand(params)
}
