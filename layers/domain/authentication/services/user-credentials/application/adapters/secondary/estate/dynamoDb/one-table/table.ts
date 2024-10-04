import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { Table } from 'dynamodb-onetable';
import { Dynamo } from 'dynamodb-onetable/Dynamo';
import { configureEnviromentVariables } from "@shared";

const {
  USER_CREDENTIALS_DYNAMODB_TABLE_NAME,
  REGION
} = configureEnviromentVariables();

const client = new Dynamo({
  client: new DynamoDBClient({
    region: REGION || "eu-central-1",
  })
});

export const table = new Table({
  name: USER_CREDENTIALS_DYNAMODB_TABLE_NAME,
  client,
  schema: {
    format: 'onetable:1.1.0',
    version: '0.0.1',
    indexes: {
      primary: { hash: 'PK', sort: 'SK' },
      CreatorIndex: { hash: 'CreatorIndexPK', sort: 'CreatorIndexSK', follow: true },
      EntityIndex: { hash: "EntityIndexPK", sort: 'EntityIndexSK', follow: true, },
      EmailIndex: { hash: "EmailIndexPK", follow: true },
      PhoneNumberIndex: { hash: "PhoneNumberIndexPK", follow: true },
      UsernameIndex: { hash: "UsernameIndexPK", follow: true }
    },
    models: {}
  },
  partial: true
});