import 'reflect-metadata'
import { EventStoreAdapter as IEventStoreAdapter } from '@interfaces'
import { injectable } from 'inversify'
import { PHOTO_DOMAIN_EVENTS } from '@domain/events'
import { events_counter, events } from './one-table'

/** Photo event store DynamoDB secondary adapter. */
@injectable()
export class DynamoDbEventStoreAdapter implements IEventStoreAdapter {
  async read(id: string) {
    const page = await events.find({ id }, { limit: 10, reverse: true })
    const list = page.map((item) => item)
    console.log('list', list)
    return list
  }

  async write(domain_events: Array<PHOTO_DOMAIN_EVENTS>) {
    const snapshot_versions: Array<number> = []

    for (const event of domain_events) {
      let version = 1
      let snapshot_version: number | null = null
      // Use the counter model with atomic increment to get the next version
      const counter_result = await events_counter.upsert(
        {
          aggregate_id: event.id,
          counter: 0,
        },
        {
          add: { counter: 1 },
          return: 'UPDATED_NEW',
        },
      )

      version = counter_result.counter

      console.log('counter_result', counter_result)

      if (counter_result.counter % 10 === 0) {
        // is snapshot version
        snapshot_version = counter_result.counter
        // increment again
        const second_counter_result = await events_counter.upsert(
          {
            aggregate_id: event.id,
            counter: 0,
          },
          {
            add: { counter: 1 },
            return: 'UPDATED_NEW',
          },
        )
        console.log('second_counter_result', second_counter_result)
        version = second_counter_result.counter
      }

      if (snapshot_version) {
        snapshot_versions.push(snapshot_version)
      }

      // Create the event with the next version
      await events.create({
        ...event,
        version,
      } as unknown as never)
    }

    return snapshot_versions
  }

  async writeSnapshotEvents(domain_events: Array<PHOTO_DOMAIN_EVENTS>) {
    // no version logic for snapshot events, version already pre assigned above
    for (const event of domain_events) {
      await events.create(event as unknown as never)
    }
  }
}
