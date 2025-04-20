import { DynamoDBClient } from '@aws-sdk/client-dynamodb'
import { Table } from 'dynamodb-onetable'
import { Dynamo } from 'dynamodb-onetable/Dynamo'
import { configureEnviromentVariables } from '@shared'

const {
  PHOTOS_EVENTS_STORE_DYNAMODB_TABLE_NAME,
  PHOTO_EVENT_COUNT_DYNAMODB_TABLE_NAME,
  REGION,
} = configureEnviromentVariables()

const client = new Dynamo({
  client: new DynamoDBClient({
    region: REGION || 'eu-central-1',
  }),
})

export const event_store_table = new Table({
  name: PHOTOS_EVENTS_STORE_DYNAMODB_TABLE_NAME,
  client,
  schema: {
    format: 'onetable:1.1.0',
    version: '0.0.1',
    indexes: {
      primary: { hash: 'id', sort: 'version' },
    },
    models: {},
  },
  partial: true,
})

export const event_count_table = new Table({
  name: PHOTO_EVENT_COUNT_DYNAMODB_TABLE_NAME,
  client,
  schema: {
    format: 'onetable:1.1.0',
    version: '0.0.1',
    indexes: {
      primary: { hash: 'aggregate_id' },
    },
    models: {},
  },
  partial: true,
})
