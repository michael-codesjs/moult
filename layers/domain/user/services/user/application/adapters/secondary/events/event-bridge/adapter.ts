
import { EventBridgeClient, PutEventsCommand } from "@aws-sdk/client-eventbridge";
import { EventsAdapter } from "@interfaces";
import { configureEnviromentVariables, DomainEvent } from "@shared";
import { injectable } from "inversify";

const { REGION, CENTRAL_EVENT_BUS_NAME } = configureEnviromentVariables();

@injectable() export class EventBridgeEventsAdapter implements EventsAdapter {

  client = new EventBridgeClient({ region: REGION || "eu-central-1" });

  async publish(events: Array<DomainEvent>): Promise<void> {

    const putEventsCommand: PutEventsCommand = new PutEventsCommand({
      Entries: events.map(
        domainEvent => ({
          DetailType: domainEvent.name,
          Detail: JSON.stringify(domainEvent),
          Source: domainEvent.source,
          EventBusName: CENTRAL_EVENT_BUS_NAME,
          Time: domainEvent.date
        })
      )
    });

    await this.client.send(putEventsCommand);

  };

}