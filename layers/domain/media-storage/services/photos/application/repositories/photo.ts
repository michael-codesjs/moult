import 'reflect-metadata'
import { injectable, inject } from 'inversify'
import { Photo } from '@domain/aggregate'
import { PhotoAggregateRepository, EventsRepositrory } from '@interfaces'
import { dependencies } from '@dependencies'

@injectable()
export class PhotoRepository implements PhotoAggregateRepository {
  @inject(dependencies.EventsRepositrory) private events: EventsRepositrory

  async get(id: string): Promise<Photo> {
    const events = await this.events.read(id)
    const aggregate = Photo.getCurrentState(events)
    return aggregate
  }
}
