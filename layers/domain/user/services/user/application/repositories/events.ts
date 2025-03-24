import { dependencies } from '@dependencies/dependencies'
import { USER_DOMAIN_EVENTS, USER_SNAPSHOT_DOMAIN_EVENT } from '@domain/events'
import {
  EventBusAdapter,
  EventStoreAdapter,
  EventsRepositrory as IEventsRepositrory,
} from '@interfaces'
import { inject, injectable } from 'inversify'

@injectable()
export class EventsRepositrory implements IEventsRepositrory {
  @inject(dependencies.EventBusAdapter) private bus: EventBusAdapter
  @inject(dependencies.EventStoreAdapter) private store: EventStoreAdapter

  async publish(events: Array<USER_DOMAIN_EVENTS>) {
    return await this.bus.publish(events)
  }

  async write(events: Array<USER_DOMAIN_EVENTS>): Promise<Array<number>> {
    return await this.store.write(events)
  }

  async writeSnapshotEvents(
    events: Array<USER_SNAPSHOT_DOMAIN_EVENT & { version: number }>,
  ) {
    return await this.store.writeSnapshotEvents(events)
  }

  async read(id: string) {
    return await this.store.read(id)
  }
}
