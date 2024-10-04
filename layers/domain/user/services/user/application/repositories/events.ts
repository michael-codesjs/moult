import { dependencies } from "@dependencies/dependencies";
import { EventsAdapter, EventsRepositrory as IEventsRepositrory } from "@interfaces";
import { DomainEvent as TDomainEvent } from "@shared";
import { inject, injectable } from "inversify";

@injectable() export class EventsRepositrory implements IEventsRepositrory {

  @inject(dependencies.EventsAdapter) private adapter: EventsAdapter;

  async publish(events: Array<TDomainEvent>) {
    return await this.adapter.publish(events);
  }

}