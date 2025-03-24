import Chance from 'chance'
import { createUser } from '..'
import { UserDomainCommandsRepositroy } from '@repositories'

jest.mock('../../repositories')

const chance = new Chance()

describe('Create User', () => {
  let mockedUserDomainCommandsRepositoryClass: jest.MockedObjectDeep<
    typeof UserDomainCommandsRepositroy
  > = jest.mocked(UserDomainCommandsRepositroy)

  it(".sends 'CREATE_USER' domain command to the user domain.", async () => {
    mockedUserDomainCommandsRepositoryClass.prototype.sendCreateUserCommand.mockImplementationOnce(
      () => Promise.resolve(),
    )
    const id = chance.guid()

    await createUser({ id })

    const instance: jest.Mocked<UserDomainCommandsRepositroy> = jest.mocked(
      mockedUserDomainCommandsRepositoryClass.mock.instances[0],
    )

    expect(mockedUserDomainCommandsRepositoryClass).toHaveBeenCalled()
    expect(instance.sendCreateUserCommand).toHaveBeenCalled()
    expect(instance.sendCreateUserCommand).toHaveBeenCalledWith({ id })
  })
})
