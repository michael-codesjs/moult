import 'reflect-metadata'
import { Container } from 'inversify'
import { dependencies } from './constants'
import {
  PhotoAggregateRepository,
  EventsRepositrory as IEventsRepository,
  EventBusAdapter as IEventBusAdapter,
  EventStoreAdapter as IEventStoreAdapter,
} from '@interfaces'
import { PhotoRepository, EventsRepositrory } from '@repositories'
import {
  DynamoDbEventStoreAdapter,
  EventBridgeEventsAdapter,
} from '@adapters/secondary'

const container = new Container()

container
  .bind<PhotoAggregateRepository>(dependencies.PhotoAggregateRepository)
  .to(PhotoRepository)

container
  .bind<IEventsRepository>(dependencies.EventsRepositrory)
  .to(EventsRepositrory)

container
  .bind<IEventBusAdapter>(dependencies.EventBusAdapter)
  .to(EventBridgeEventsAdapter)

container
  .bind<IEventStoreAdapter>(dependencies.EventStoreAdapter)
  .to(DynamoDbEventStoreAdapter)

export { container }
