
import { EventBridgeClient, PutEventsCommand } from "@aws-sdk/client-eventbridge";
import { EventAdapter } from "@interfaces";
import { configureEnviromentVariables, DomainEvent } from "@shared";

const { REGION, CENTRAL_EVENT_BUS_NAME } = configureEnviromentVariables();

export class EventBridgeAdapter implements EventAdapter {

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