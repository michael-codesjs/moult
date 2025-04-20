import { Photo } from '@domain/aggregate'
import { PHOTO_DOMAIN_EVENTS } from '@domain/events'
import { DomainEvent } from '@shared'

export interface PhotoAggregateRepository {
  get(id: string): Promise<Photo>
}

export interface EventsRepositrory {
  /* Returns if a snapshot was taken, and at which version */
  write(events: PHOTO_DOMAIN_EVENTS[]): Promise<number[]>
  writeSnapshotEvents(events: PHOTO_DOMAIN_EVENTS[]): Promise<void>
  read(id: string): Promise<PHOTO_DOMAIN_EVENTS[]>
  publish(events: DomainEvent<any, any>[]): Promise<void>
}
