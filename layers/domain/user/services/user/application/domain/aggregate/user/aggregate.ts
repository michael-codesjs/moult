import { USER_DOMAIN_EVENTS } from '@domain/events';
import { AggregateRoot, DomainEvent, NotPutable, NotUpdateable } from '@shared';
import { UserDTO } from '@domain/models';
import { UserAttributes } from './attributes';
import { CreateUserParams, UpdateUserParams } from './types';

export class User extends AggregateRoot {

  protected readonly attributes: UserAttributes = new UserAttributes();
  protected domainEvents: Array<USER_DOMAIN_EVENTS> = [];

  protected eventVersion: number = 0

  constructor(attributes: Partial<UserDTO>) {
    super();
    this.attributes.parse(attributes);
  }

  getDomainEvents(): Array<USER_DOMAIN_EVENTS> {
    const events = Array.from(this.domainEvents);
    this.clearDomainEvents()
    return events;
  }

  protected clearDomainEvents(): void {
    this.domainEvents = []
  }

  protected takeSnapshot() {
    this.registerDomainEvent({
      name: 'USER_SNAPSHOT',
      payload: this.attributes.collective(),
      source: 'User',
      date: new Date(),
    })
  }

  protected registerDomainEvent(domainEvent: Omit<DomainEvent, 'version' | 'id'>) {
    const version = ++this.eventVersion;
    const id = this.attributes.get('id')
    this.domainEvents.push({ ...domainEvent, version, id } as USER_DOMAIN_EVENTS);
    version % 9 === 0 && this.takeSnapshot() // 10th should be a snapshot
  }

  static getCurrentState(events: Array<USER_DOMAIN_EVENTS>) {

    if(!events.length) throw new Error('No events to replay')

    const id = events[0].payload.id // get aggregate id
    const user_credential = new User({ id })

    // if a snapshot is present in the events start at the snapshot and only apply events after that

    let snapshot_index = 0;
    const snapshot = events.find((event, index) => {
      const is_snapshot = event.name === 'USER_SNAPSHOT'
      if(is_snapshot) {
        snapshot_index = index
        return is_snapshot
      }
    })

    events = snapshot ? events.slice(snapshot_index) : events

    for(const event of events) {
      switch(event.name) {
        case 'USER_CREATED':
        case 'USER_SNAPSHOT':
          user_credential.attributes.parse(event.payload)
        case 'USER_UPDATED':
          user_credential.attributes.set(event.payload)
        default:
          throw new Error('Unrecognized domain event for aggregate User')
      }
    }

    return user_credential

  }

  static create(attributes: CreateUserParams): User {

    if (!attributes.email && !attributes.phone_number && !attributes.username) { // at least one username param is required
      throw new Error('At least one username parameter is to be supplied on creation.');
    }

    const user_credentials = new User(attributes);

    console.log('user_credentials', user_credentials.attributes.collective())

    // if (!user_credentials.attributes.isPutable()) throw new NotPutable(); TODO: debug is putable

    user_credentials.registerDomainEvent({
      name: 'USER_CREATED',
      payload: user_credentials.attributes.collective(),
      source: 'User',
      date: new Date(),
    });

    return user_credentials;

  }

  update(attributes: UpdateUserParams) {

    const { username, email, phone_number } = attributes;
    this.attributes.set({ username, email, phone_number });

    const isUpdateable = this.attributes.isUpdateable();

    if (!isUpdateable) throw new NotUpdateable();

    this.registerDomainEvent({
      name: 'USER_UPDATED',
      payload: attributes,
      source: 'User',
      date: new Date()
    });

  }

  public toDTO(): UserDTO {
    return this.attributes.collective();
  }

  public static fromDTO(params: UserDTO) {
    return new User(params);
  }

}