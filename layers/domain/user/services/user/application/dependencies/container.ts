import "reflect-metadata"; // import first
import * as interfaces from "@interfaces";
import { Users, Events } from "@use-cases";
import { Container } from "inversify";
import { dependencies } from "./dependencies";
import { UserRepository, EventsRepositrory } from "@repositories";
import { UserDynamoDbAdapter, EventBridgeEventsAdapter } from "@adapters/secondary";

const container = new Container();

container.bind<interfaces.UserUseCase>(dependencies.UserUseCases).to(Users);
container.bind<interfaces.EventsUseCase>(dependencies.EventsUseCases).to(Events);
container.bind<interfaces.UserRepository>(dependencies.UserRepository).to(UserRepository);
container.bind<interfaces.EventsRepositrory>(dependencies.EventsRepositrory).to(EventsRepositrory);
container.bind<interfaces.UserDatabaseAdapter>(dependencies.UserRepository).to(UserDynamoDbAdapter);
container.bind<interfaces.EventsAdapter>(dependencies.EventsAdapter).to(EventBridgeEventsAdapter);

export { container };