import { Model } from 'dynamodb-onetable'
import { event_store_table, event_count_table } from './table'
import { PHOTO_DOMAIN_EVENTS } from '@domain/events'

// Define the event model
export const events = new Model<PHOTO_DOMAIN_EVENTS>(
  event_store_table,
  'PHOTO',
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
          mime_type: { type: String },
          file_size: { type: Number },
          file_extension: { type: String },
          file_key: { type: String },
          file_storage_type: { type: String },
        },
      },
      date: { type: Date },
      version: { type: Number },
    },
  },
)

// Define a counter model for versioning
export const events_counter = new Model<{
  aggregate_id: string
  counter: number
}>(event_count_table, 'COUNTER', {
  fields: {
    aggregate_id: { type: String, required: true },
    counter: { type: Number, required: true, default: 0 },
  },
})
