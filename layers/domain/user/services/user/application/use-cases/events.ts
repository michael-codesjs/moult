import { dependencies } from "@dependencies";
import { USER_CREATED_DOMAIN_EVENT, USER_UPDATED_DOMAIN_EVENT } from "@domain/events";
import { EventsRepositrory, EventsUseCase } from "@interfaces";
import { UserDTO } from "@typings";
import { inject, injectable } from "inversify";

@injectable() export class Events implements EventsUseCase {

    @inject(dependencies.EventsRepositrory) private repository: EventsRepositrory;

    async publishUserCreatedEvent(params: UserDTO): Promise<void> {

        const domainEvent: USER_CREATED_DOMAIN_EVENT = {
            name: "USER_CREATED",
            payload: params,
            version: "1.0.0",
            date: new Date(),
            source: "events.publishUserCreatedEvent"
        };

        await this.repository.publish([domainEvent]);

    }

    async publishUserUpdatedEvent(params: UserDTO): Promise<void> {

        const domainEvent: USER_UPDATED_DOMAIN_EVENT = {
            name: "USER_UPDATED",
            payload: params,
            version: "1.0.0",
            date: new Date(),
            source: "events.publishUserUpdatedEvent"
        };

        await this.repository.publish([domainEvent]);

    }

}