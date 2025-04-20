import 'reflect-metadata' // import first
import * as interfaces from '@interfaces'
import { User } from '@use-cases'
import { Container } from 'inversify'
import { dependencies } from './dependencies'
import { EventsRepositrory, UserRepository } from '@repositories'
import {
  EventBridgeEventsAdapter,
  EventStoreAdapter,
} from '@adapters/secondary'

const container = new Container()

container
  .bind<interfaces.EventBusAdapter>(dependencies.EventBusAdapter)
  .to(EventBridgeEventsAdapter)
container
  .bind<interfaces.EventStoreAdapter>(dependencies.EventStoreAdapter)
  .to(EventStoreAdapter)
container
  .bind<interfaces.EventsRepositrory>(dependencies.EventsRepositrory)
  .to(EventsRepositrory)
container
  .bind<interfaces.UserAggregateRepository>(dependencies.UserRepository)
  .to(UserRepository)
container.bind<interfaces.UserUseCase>(dependencies.UserUseCase).to(User)

export { container }
