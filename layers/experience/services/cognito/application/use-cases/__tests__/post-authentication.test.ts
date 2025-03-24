import { DomainEventsRepository } from '@repositories'
import { USER_AUTHENTICATED_DOMAIN_EVENT } from '@typings/domain-events'
import Chance from 'chance'
import { postAuthentication } from '..'

jest.mock('../../repositories')

const chance = new Chance()

describe('Post Authentication', () => {
  beforeAll(() => {
    jest.useFakeTimers()
  })

  let mockedUserDomainCommandsRepositoryClass: jest.MockedObjectDeep<
    typeof DomainEventsRepository
  > = jest.mocked(DomainEventsRepository)

  it(".publishes 'USER_AUTHENTICATED' domain event.", async () => {
    mockedUserDomainCommandsRepositoryClass.prototype.publish.mockImplementationOnce(
      () => Promise.resolve(),
    )

    const id = chance.guid()
    const isNewDevice = chance.bool()

    await postAuthentication({ id, isNewDevice })

    const instance: jest.Mocked<DomainEventsRepository> = jest.mocked(
      mockedUserDomainCommandsRepositoryClass.mock.instances[0],
    )

    const UserAuthenticatedDomainEvent: USER_AUTHENTICATED_DOMAIN_EVENT = {
      name: 'USER_AUTHENTICATED',
      source: 'postAuthentication',
      payload: { id, isNewDevice },
      date: new Date(),
      version: '1.0.0',
    }

    expect(mockedUserDomainCommandsRepositoryClass).toHaveBeenCalled()
    expect(instance.publish).toHaveBeenCalled()
    expect(instance.publish).toHaveBeenCalledWith([
      UserAuthenticatedDomainEvent,
    ])
  })
})
