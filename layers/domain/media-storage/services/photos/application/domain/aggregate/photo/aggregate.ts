import { AggregateRoot, DomainEvent } from '@shared'
import { PhotoAttributes } from './attributes'
import { CreatePhotoParams } from './types'
import { PhotoDTO } from '@domain/models'
import { PHOTO_DOMAIN_EVENTS } from '@domain/events'
import { v4 } from 'uuid'

export class Photo extends AggregateRoot {
  protected readonly attributes: PhotoAttributes = new PhotoAttributes()
  protected domainEvents: Array<PHOTO_DOMAIN_EVENTS> = []

  constructor(attributes: Partial<PhotoDTO>) {
    super()
    this.attributes.parse(attributes)
  }

  getDomainEvents(): Array<PHOTO_DOMAIN_EVENTS> {
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
      name: 'PHOTO_SNAPSHOT',
      payload: this.attributes.collective(),
      source: 'moult.domain.media-storage.services.photos',
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
    } as PHOTO_DOMAIN_EVENTS)
    // version % 9 === 0 && this.takeSnapshot() // 10th should be a snapshot
  }

  static getCurrentState(events: Array<PHOTO_DOMAIN_EVENTS>) {
    if (!events.length) throw new Error('No events to replay')

    const id = events[0].id // get aggregate id
    const photo = new Photo({ id })

    // if a snapshot is present in the events start at the snapshot and only apply events after that

    console.log('events pre snapshot', events)

    let snapshot_index = 0
    const snapshot = events.find((event, index) => {
      const is_snapshot = event.name === 'PHOTO_SNAPSHOT'
      if (is_snapshot) {
        snapshot_index = index
        return is_snapshot
      }
    })

    events = snapshot ? events.slice(snapshot_index) : events

    console.log('events post snapshot', events)

    for (const event of events) {
      switch (event.name) {
        case 'PHOTO_CREATED':
        case 'PHOTO_SNAPSHOT':
          photo.attributes.parse(event.payload)
          break
        default:
          throw new Error('Unrecognized domain event for aggregate User')
      }
    }

    photo.clearDomainEvents()

    return photo
  }

  static create(attributes: CreatePhotoParams): Photo {
    const { user_id } = attributes
    const photo = new Photo({ creator: user_id })

    console.log('photo', photo.attributes.collective())

    // if (!user_credentials.attributes.isPutable()) throw new NotPutable(); TODO: debug is putable

    photo.registerDomainEvent({
      name: 'PHOTO_CREATED',
      payload: photo.attributes.collective(),
      source: 'Photo',
      date: new Date(),
    })

    return photo
  }

  toDTO(): PhotoDTO {
    return this.attributes.collective()
  }
}
