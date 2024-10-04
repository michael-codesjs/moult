import "reflect-metadata"; // import first
import * as interfaces from "@interfaces";
import { UserCredentials, Events } from "@use-cases";
import { Container } from "inversify";
import { dependencies } from "./dependencies";
import { UserCredentialsRepository, EventsRepositrory } from "@repositories";
import { UserCredentialsDynamoDbAdapter, EventBridgeEventsAdapter } from "@adapters/secondary";

const container = new Container();

container.bind<interfaces.UserCredentialsUseCase>(dependencies.UserCredentialsUseCases).to(UserCredentials);
container.bind<interfaces.EventsUseCase>(dependencies.EventsUseCases).to(Events);
container.bind<interfaces.UserCredentialsRepository>(dependencies.UserCredentialsRepository).to(UserCredentialsRepository);
container.bind<interfaces.EventsRepositrory>(dependencies.EventsRepositrory).to(EventsRepositrory);
container.bind<interfaces.UserDatabaseAdapter>(dependencies.UserCredentialsDatabaseAdapter).to(UserCredentialsDynamoDbAdapter);
container.bind<interfaces.EventsAdapter>(dependencies.EventsAdapter).to(EventBridgeEventsAdapter);

export { container };