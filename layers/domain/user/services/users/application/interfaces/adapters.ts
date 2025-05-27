import { USER_DOMAIN_EVENTS } from '@domain/events'
import { UserDTO } from '@domain/models'
import { DomainEvent } from '@moult/sdk'

export interface UserDatabaseAdapter {
  put(dto: UserDTO): Promise<UserDTO>
  get(id: string): Promise<UserDTO>
  update(dto: UserDTO): Promise<UserDTO>
  delete(id: string): Promise<void>
  getByEmail(email: string): Promise<UserDTO>
  getByPhoneNumber(phoneNumber: string): Promise<UserDTO>
  getByUsername(username: string): Promise<UserDTO>
}

export interface EventBusAdapter {
  publish(events: Array<DomainEvent>): Promise<void>
}

export interface EventStoreAdapter {
  write(events: Array<USER_DOMAIN_EVENTS>): Promise<Array<number>>
  read(id: string): Promise<Array<USER_DOMAIN_EVENTS>>
  writeSnapshotEvents(
    events: Array<USER_DOMAIN_EVENTS & { version: number }>,
  ): Promise<void>
}
