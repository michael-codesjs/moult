import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { UsernameGenerationError } from '../../../domain/types';
import { getUsernameAssignments } from '../../secondary/dynamodb/username-assignment';

/**
 * Lambda handler for retrieving username assignments for a user
 * @param event API Gateway event
 * @returns API Gateway response
 */
export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    const userId = event.pathParameters?.userId;

    if (!userId) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'User ID is required' })
      };
    }

    const assignments = await getUsernameAssignments(userId);

    return {
      statusCode: 200,
      body: JSON.stringify({ assignments })
    };
  } catch (error) {
    console.error('Error retrieving username assignments:', error);

    if (error instanceof UsernameGenerationError) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          error: error.message,
          code: error.code
        })
      };
    }

    return {
      statusCode: 500,
      body: JSON.stringify({
        error: 'Internal server error',
        code: 'INTERNAL_SERVER_ERROR'
      })
    };
  }
}; 