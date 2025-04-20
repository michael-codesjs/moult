import {
  EventBridgeClient,
  PutEventsCommand,
} from '@aws-sdk/client-eventbridge'
import { USER_DOMAIN_EVENTS } from '@domain/events'
import { EventBusAdapter } from '@interfaces'
import { configureEnviromentVariables } from '@shared'
import { injectable } from 'inversify'

const { REGION, CENTRAL_EVENT_BUS_NAME } = configureEnviromentVariables()

@injectable()
export class EventBridgeEventsAdapter implements EventBusAdapter {
  client = new EventBridgeClient({ region: REGION || 'eu-central-1' })

  async publish(events: Array<USER_DOMAIN_EVENTS>): Promise<void> {
    const putEventsCommand: PutEventsCommand = new PutEventsCommand({
      Entries: events.map((domainEvent) => ({
        DetailType: domainEvent.name,
        Detail: JSON.stringify(domainEvent),
        Source: domainEvent.source,
        EventBusName: CENTRAL_EVENT_BUS_NAME,
        Time: domainEvent.date,
      })),
    })

    console.log('putEventsCommand payload:', putEventsCommand.input)

    const result = await this.client.send(putEventsCommand)

    console.log('result:', result)
  }
}
