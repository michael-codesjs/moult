import { USER_CREDENTIALS_DOMAIN_EVENTS } from '@domain/events';
import { AggregateRoot, DomainEvent, NotPutable, NotUpdateable } from '@shared';
import { UserCredentialsDTO } from '@domain/models';
import { UserCredentialsAttributes } from './attributes';
import { CreateUserCredentialsParams, UpdateUserCredentialsParams } from './types';

export class UserCredentials extends AggregateRoot {

  protected readonly attributes: UserCredentialsAttributes = new UserCredentialsAttributes();
  protected domainEvents: Array<USER_CREDENTIALS_DOMAIN_EVENTS> = [];

  protected eventVersion: number = 0

  constructor(attributes: Partial<UserCredentialsDTO>) {
    super();
    this.attributes.parse(attributes);
  }

  getDomainEvents(): Array<USER_CREDENTIALS_DOMAIN_EVENTS> {
    const events = Array.from(this.domainEvents);
    this.clearDomainEvents()
    return events;
  }

  protected clearDomainEvents(): void {
    this.domainEvents = []
  }

  protected takeSnapshot() {
    this.registerDomainEvent({
      name: 'USER_CREDENTIALS_SNAPSHOT',
      payload: this.attributes.collective(),
      source: 'UserCredentials',
      date: new Date(),
    })
  }

  protected registerDomainEvent(domainEvent: Omit<DomainEvent, 'version' | 'id'>) {
    const version = ++this.eventVersion;
    const id = this.attributes.get('id')
    this.domainEvents.push({ ...domainEvent, version, id } as USER_CREDENTIALS_DOMAIN_EVENTS);
    version % 9 === 0 && this.takeSnapshot() // 10th should be a snapshot
  }

  static getCurrentState(events: Array<USER_CREDENTIALS_DOMAIN_EVENTS>) {

    if(!events.length) throw new Error('No events to replay')

    const id = events[0].payload.id // get aggregate id
    const user_credential = new UserCredentials({ id })

    // if a snapshot is present in the events start at the snapshot and only apply events after that

    let snapshot_index = 0;
    const snapshot = events.find((event, index) => {
      const is_snapshot = event.name === 'USER_CREDENTIALS_SNAPSHOT'
      if(is_snapshot) {
        snapshot_index = index
        return is_snapshot
      }
    })

    events = snapshot ? events.slice(snapshot_index) : events

    for(const event of events) {
      switch(event.name) {
        case 'USER_CREDENTIALS_CREATED':
        case 'USER_CREDENTIALS_SNAPSHOT':
          user_credential.attributes.parse(event.payload)
        case 'USER_CREDENTIALS_UPDATED':
          user_credential.attributes.set(event.payload)
        default:
          throw new Error('Unrecognized domain event for aggregate UserCredentials')
      }
    }

    return user_credential

  }

  static create(attributes: CreateUserCredentialsParams): UserCredentials {

    if (!attributes.email && !attributes.phoneNumber && !attributes.username) { // at least one username param is required
      throw new Error('At least one username parameter is to be supplied on creation.');
    }

    const user_credentials = new UserCredentials(attributes);

    if (!user_credentials.attributes.isPutable()) throw new NotPutable();

    user_credentials.registerDomainEvent({
      name: 'USER_CREDENTIALS_CREATED',
      payload: user_credentials.attributes.collective(),
      source: 'UserCredentials',
      date: new Date(),
    });

    return user_credentials;

  }

  update(attributes: UpdateUserCredentialsParams) {

    const { username, email, phoneNumber } = attributes;
    this.attributes.set({ username, email, phoneNumber });

    const isUpdateable = this.attributes.isUpdateable();

    if (!isUpdateable) throw new NotUpdateable();

    this.registerDomainEvent({
      name: 'USER_CREDENTIALS_UPDATED',
      payload: attributes,
      source: 'UserCredentials',
      date: new Date()
    });

  }

  public toDTO(): UserCredentialsDTO {
    return this.attributes.collective();
  }

  public static fromDTO(params: UserCredentialsDTO) {
    return new UserCredentials(params);
  }

}