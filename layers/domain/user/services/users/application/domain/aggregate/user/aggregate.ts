import { USER_DOMAIN_EVENTS } from '@domain/events'
import {
  AggregateRoot,
  DomainEvent,
  NotPutable,
  NotUpdateable,
} from '@moult/sdk'
import { UserDTO } from '@domain/models'
import { UserAttributes } from './attributes'
import { CreateUserParams, UpdateUserParams } from './types'

export class User extends AggregateRoot {
  protected readonly attributes: UserAttributes = new UserAttributes()
  protected domainEvents: Array<USER_DOMAIN_EVENTS> = []

  constructor(attributes: Partial<UserDTO>) {
    super()
    this.attributes.parse(attributes)
  }

  getDomainEvents(): Array<USER_DOMAIN_EVENTS> {
    const events = Array.from(this.domainEvents)
    this.clearDomainEvents()
    return events
  }

  protected clearDomainEvents(): void {
    this.domainEvents = []
  }

  public takeSnapshot(version: number) {
    if (version % 10 !== 0)
      throw new Error('Snapshot version must be a multiple of 10')
    this.registerDomainEvent({
      name: 'USER_SNAPSHOT',
      payload: this.attributes.collective(),
      source: 'moult.domain.user.services.user',
      date: new Date(),
    })
  }

  protected registerDomainEvent(
    domain_event: Omit<DomainEvent, 'version' | 'id'>,
  ) {
    const id = this.attributes.get('id')
    this.domainEvents.push({
      ...domain_event,
      id,
    } as USER_DOMAIN_EVENTS)
    // version % 9 === 0 && this.takeSnapshot() // 10th should be a snapshot
  }

  static getCurrentState(events: Array<USER_DOMAIN_EVENTS>) {
    if (!events.length) throw new Error('No events to replay')

    const id = events[0].id // get aggregate id
    const user_credential = new User({ id })

    // if a snapshot is present in the events start at the snapshot and only apply events after that

    console.log('events pre snapshot', events)

    let snapshot_index = 0
    const snapshot = events.find((event, index) => {
      const is_snapshot = event.name === 'USER_SNAPSHOT'
      if (is_snapshot) {
        snapshot_index = index
        return is_snapshot
      }
    })

    events = snapshot ? events.slice(snapshot_index) : events

    console.log('events post snapshot', events)

    for (const event of events) {
      switch (event.name) {
        case 'USER_CREATED':
        case 'USER_SNAPSHOT':
          user_credential.attributes.parse(event.payload)
          break
        case 'USER_UPDATED':
          user_credential.attributes.set(event.payload)
          break
        case 'USER_SIGNATURE_UPDATED':
          user_credential.attributes.set({ signature: event.payload.signature })
          break
        default:
          throw new Error('Unrecognized domain event for aggregate User')
      }
    }

    user_credential.clearDomainEvents()

    return user_credential
  }

  static create(attributes: CreateUserParams): User {
    if (!attributes.email && !attributes.phone_number && !attributes.username) {
      // at least one username param is required
      throw new Error(
        'At least one username parameter is to be supplied on creation.',
      )
    }

    const user_credentials = new User(attributes)

    console.log('user_credentials', user_credentials.attributes.collective())

    // if (!user_credentials.attributes.isPutable()) throw new NotPutable(); TODO: debug is putable

    user_credentials.registerDomainEvent({
      name: 'USER_CREATED',
      payload: user_credentials.attributes.collective(),
      source: 'User',
      date: new Date(),
    })

    return user_credentials
  }

  update(attributes: UpdateUserParams) {
    const { name, email, phone_number } = attributes
    this.attributes.set({ name, email, phone_number })

    const isUpdateable = this.attributes.isUpdateable()

    if (!isUpdateable) throw new NotUpdateable()

    this.registerDomainEvent({
      name: 'USER_UPDATED',
      payload: attributes,
      source: 'User',
      date: new Date(),
    })
  }

  updateSignature(signature: string) {
    this.attributes.set({ signature })

    // const isUpdateable = this.attributes.isUpdateable()
    // if (!isUpdateable) throw new NotUpdateable() TODO: debug is updateable

    this.registerDomainEvent({
      name: 'USER_SIGNATURE_UPDATED',
      payload: { signature },
      source: 'moult.domain.user.users',
      date: new Date(),
    })
  }

  public toDTO(): UserDTO {
    return this.attributes.collective()
  }

  public static fromDTO(params: UserDTO) {
    return new User(params)
  }
}
