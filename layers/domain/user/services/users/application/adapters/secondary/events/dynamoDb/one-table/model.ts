import { Model } from 'dynamodb-onetable'
import { events_store_table, event_counts_table } from './table'
import { USER_DOMAIN_EVENTS } from '@domain/events'

// Define the event model
export const events = new Model<USER_DOMAIN_EVENTS>(
  events_store_table,
  'USER',
  {
    fields: {
      id: { type: String, required: true },
      source: { type: String },
      name: { type: String },
      payload: {
        type: Object,
        schema: {
          entity_type: { type: String, required: false },
          id: { type: String, required: false },
          creator: { type: String, required: false },
          creator_type: { type: String, required: false },
          created: { type: Date, required: false },
          modified: { type: Date, required: false },
          discontinued: { type: Boolean, required: false },
          email: { type: String, required: false },
          phone_number: { type: String, required: false },
          email_verified: { type: Boolean, required: false },
          phone_number_verified: { type: Boolean, required: false },
          password: { type: String, required: false },
          signature: { type: String, required: false },
          name: { type: String, required: false },
          bio: { type: String, required: false },
        },
      },
      date: { type: Date },
      version: { type: Number },
    },
  },
)

// Define a counter model for versioning
export const event_counts = new Model<{
  aggregate_id: string
  counter: number
}>(event_counts_table, 'COUNTER', {
  fields: {
    aggregate_id: { type: String, required: true },
    counter: { type: Number, required: true, default: 0 },
  },
})
