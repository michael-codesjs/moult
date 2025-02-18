import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, UpdateCommand, GetCommand } from "@aws-sdk/lib-dynamodb";
import { UsernameGenerationError, UsernameGenerationErrorCode } from "../../../domain/types";

const ddbClient = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(ddbClient);

const USERNAME_COUNTS_TABLE = process.env.USERNAME_COUNTS_TABLE;

interface UsernameCountRecord {
  baseUsername: string;
  count: number;
}

/**
 * Increments and returns the counter for a given base username
 * @param baseUsername The base username to get a counter for
 * @returns The new counter value
 */
export async function incrementUsernameCounter(baseUsername: string): Promise<number> {
  try {
    const updateCommand = new UpdateCommand({
      TableName: USERNAME_COUNTS_TABLE,
      Key: { baseUsername },
      UpdateExpression: "SET #count = if_not_exists(#count, :zero) + :increment",
      ExpressionAttributeNames: {
        "#count": "count"
      },
      ExpressionAttributeValues: {
        ":zero": 0,
        ":increment": 1
      },
      ReturnValues: "UPDATED_NEW"
    });

    const response = await docClient.send(updateCommand);
    return response.Attributes?.count as number;
  } catch (error) {
    console.error('Failed to increment username counter:', error);
    throw new UsernameGenerationError(
      'Failed to generate unique username counter',
      UsernameGenerationErrorCode.COUNTER_UPDATE_FAILED
    );
  }
}

/**
 * Gets the current counter value for a base username
 * @param baseUsername The base username to get the counter for
 * @returns The current counter value or 0 if not found
 */
export async function getCurrentCounter(baseUsername: string): Promise<number> {
  try {
    const getCommand = new GetCommand({
      TableName: USERNAME_COUNTS_TABLE,
      Key: { baseUsername }
    });

    const response = await docClient.send(getCommand);
    return (response.Item as UsernameCountRecord)?.count || 0;
  } catch (error) {
    console.error('Failed to get current username counter:', error);
    return 0;
  }
} 