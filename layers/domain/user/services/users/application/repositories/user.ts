import 'reflect-metadata'
import { injectable, inject } from 'inversify'
import { User } from '@domain/aggregate'
import { UserAggregateRepository, EventsRepositrory } from '@interfaces'
import { dependencies } from '@dependencies'

@injectable()
export class UserRepository implements UserAggregateRepository {
  @inject(dependencies.EventsRepositrory) private events: EventsRepositrory

  async get(id: string): Promise<User> {
    const events = await this.events.read(id)
    const aggregate = User.getCurrentState(events)
    return aggregate
  }
}
