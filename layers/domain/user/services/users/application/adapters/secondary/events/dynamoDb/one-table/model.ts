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
          entity_type: { type: String },
          id: { type: String },
          creator: { type: String },
          creator_type: { type: String },
          created: { type: Date },
          modified: { type: Date },
          discontinued: { type: Boolean },
          email: { type: String },
          phone_number: { type: String },
          email_verified: { type: Boolean },
          phone_number_verified: { type: Boolean },
          password: { type: String },
          username: { type: String },
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
