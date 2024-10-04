import { dependencies } from "@dependencies";
import { USER_CREDENTIALS_CREATED_DOMAIN_EVENT, USER_CREDENTIALS_UPDATED_DOMAIN_EVENT } from "@domain/events";
import { EventsRepositrory, EventsUseCase } from "@interfaces";
import { UserCredentialsDTO } from "@domain/models";
import { inject, injectable } from "inversify";

@injectable() export class Events implements EventsUseCase {

    @inject(dependencies.EventsRepositrory) private repository: EventsRepositrory;

    async publishUserCredentialsCreatedEvent(params: UserCredentialsDTO): Promise<void> {

        const domainEvent: USER_CREDENTIALS_CREATED_DOMAIN_EVENT = {
            name: "USER_CREDENTIALS_CREATED",
            payload: params,
            version: "1.0.0",
            date: new Date(),
            source: "moult.domains.authentication.authentication"
        };

        await this.repository.publish([domainEvent]);

    }

    async publishUserCredentialsUpdatedEvent(params: UserCredentialsDTO): Promise<void> {

        const domainEvent: USER_CREDENTIALS_UPDATED_DOMAIN_EVENT = {
            name: "USER_CREDENTIALS_UPDATED",
            payload: params,
            version: "1.0.0",
            date: new Date(),
            source: "moult.domains.authentication.authentication"
        };

        await this.repository.publish([domainEvent]);

    }

}