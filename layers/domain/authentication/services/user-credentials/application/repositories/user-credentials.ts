import "reflect-metadata";
import { injectable, inject } from "inversify";
import { UserCredentials } from "@domain/aggregate";
import { UserCredentialsAggregateRepository, EventsRepositrory } from "@interfaces";
import { dependencies } from "@dependencies";

@injectable() export class UserCredentialsRepository implements UserCredentialsAggregateRepository {

  @inject(dependencies.EventsRepositrory) private events: EventsRepositrory

  async get(id: string): Promise<UserCredentials> {

    const events = await this.events.read(id)
    const aggregate = UserCredentials.getCurrentState(events)
    return aggregate
    
  }

}