import { dependencies } from "@dependencies/dependencies";
import { USER_CREDENTIALS_DOMAIN_EVENTS } from "@domain/events";
import { EventBusAdapter, EventStoreAdapter, EventsRepositrory as IEventsRepositrory } from "@interfaces";
import { inject, injectable } from "inversify";

@injectable() export class EventsRepositrory implements IEventsRepositrory {

  @inject(dependencies.EventBusAdapter) private bus: EventBusAdapter;
  @inject(dependencies.EventStoreAdapter) private store: EventStoreAdapter

  async publish(events: Array<USER_CREDENTIALS_DOMAIN_EVENTS>) {
    return await this.bus.publish(events);
  }

  async write(events: Array<USER_CREDENTIALS_DOMAIN_EVENTS>) {
    return await this.store.write(events)
  }

  async read(id: string) {
    return await this.store.read(id)
  }

}