import "reflect-metadata"; // import first
import * as interfaces from "@interfaces";
import { UserCredentials } from "@use-cases";
import { Container } from "inversify";
import { dependencies } from "./dependencies";
import { EventsRepositrory, UserCredentialsRepository } from "@repositories";
import { EventBridgeEventsAdapter, EventStoreAdapter } from "@adapters/secondary";

const container = new Container();
 
container.bind<interfaces.EventBusAdapter>(dependencies.EventBusAdapter).to(EventBridgeEventsAdapter);
container.bind<interfaces.EventStoreAdapter>(dependencies.EventStoreAdapter).to(EventStoreAdapter);
container.bind<interfaces.EventsRepositrory>(dependencies.EventsRepositrory).to(EventsRepositrory)
container.bind<interfaces.UserCredentialsAggregateRepository>(dependencies.UserCredentialsRepository).to(UserCredentialsRepository)
container.bind<interfaces.UserCredentialsUseCase>(dependencies.UserCredentialsUseCase).to(UserCredentials);

export { container };