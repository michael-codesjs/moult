import "reflect-metadata";
import { EventStoreAdapter as IEventStoreAdapter } from "@interfaces";
import { events } from "./one-table";
import { injectable } from "inversify";
import { USER_CREDENTIALS_DOMAIN_EVENTS } from "@domain/events";

/** User entity DynamoDB secondary adapter. */
@injectable() export class EventStoreAdapter implements IEventStoreAdapter {

  async read(id: string) {
    const page = await events.find({ id }, { limit: 10, reverse: true })
    const list = page.map(item => item)
    return list
  }

  async write(domain_events: Array<USER_CREDENTIALS_DOMAIN_EVENTS>) {
    for(const event of domain_events) {
      await events.create(event as unknown as never)
    }
  }

}