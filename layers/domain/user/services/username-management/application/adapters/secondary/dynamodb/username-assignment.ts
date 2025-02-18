import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand, QueryCommand } from "@aws-sdk/lib-dynamodb";
import { UsernameAssignment, UsernameGenerationError, UsernameGenerationErrorCode } from "../../../domain/types";

const ddbClient = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(ddbClient);

const USERNAME_ASSIGNMENTS_TABLE = process.env.USERNAME_ASSIGNMENTS_TABLE;

/**
 * Creates a new username assignment record
 * @param assignment The username assignment to create
 * @returns The created username assignment
 */
export async function createUsernameAssignment(assignment: UsernameAssignment): Promise<UsernameAssignment> {
  try {
    const putCommand = new PutCommand({
      TableName: USERNAME_ASSIGNMENTS_TABLE,
      Item: assignment,
      ConditionExpression: "attribute_not_exists(username)"
    });

    await docClient.send(putCommand);
    return assignment;
  } catch (error) {
    console.error('Failed to create username assignment:', error);
    throw new UsernameGenerationError(
      'Failed to create username assignment',
      UsernameGenerationErrorCode.USERNAME_ASSIGNMENT_FAILED
    );
  }
}

/**
 * Gets all username assignments for a user
 * @param userId The user ID to get assignments for
 * @returns Array of username assignments
 */
export async function getUsernameAssignments(userId: string): Promise<UsernameAssignment[]> {
  try {
    const queryCommand = new QueryCommand({
      TableName: USERNAME_ASSIGNMENTS_TABLE,
      KeyConditionExpression: "userId = :userId",
      ExpressionAttributeValues: {
        ":userId": userId
      }
    });

    const response = await docClient.send(queryCommand);
    return (response.Items || []) as UsernameAssignment[];
  } catch (error) {
    console.error('Failed to get username assignments:', error);
    return [];
  }
}

/**
 * Gets all assignments for a base username
 * @param baseUsername The base username to get assignments for
 * @returns Array of username assignments
 */
export async function getBaseUsernameAssignments(baseUsername: string): Promise<UsernameAssignment[]> {
  try {
    const queryCommand = new QueryCommand({
      TableName: USERNAME_ASSIGNMENTS_TABLE,
      IndexName: 'BaseUsernameIndex',
      KeyConditionExpression: "baseUsername = :baseUsername",
      ExpressionAttributeValues: {
        ":baseUsername": baseUsername
      }
    });

    const response = await docClient.send(queryCommand);
    return (response.Items || []) as UsernameAssignment[];
  } catch (error) {
    console.error('Failed to get base username assignments:', error);
    return [];
  }
} 