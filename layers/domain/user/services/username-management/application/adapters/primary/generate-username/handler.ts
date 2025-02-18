import { EventBridgeEvent } from 'aws-lambda';
import { 
  UsernameGenerationError,
  UsernameAssignment,
  UsernameAssignmentStatus
} from '../../../domain/types';
import { normalizeFullName, generateUniqueUsername, validateUsername } from '../../../domain/utils';
import { incrementUsernameCounter } from '../../secondary/dynamodb/username-counter';
import { createUsernameAssignment } from '../../secondary/dynamodb/username-assignment';
import { publishUserUsernameGenerated } from '../../secondary/events/event-bridge/adapter';

interface UserCreatedEvent {
  userId: string;
  fullName: string;
  email: string;
}

/**
 * Lambda handler for generating unique usernames when users are created
 * @param event EventBridge event containing USER_CREATED event
 */
export const handler = async (event: EventBridgeEvent<'USER_CREATED', UserCreatedEvent>): Promise<void> => {
  try {
    const { userId, fullName } = event.detail;
    
    // Normalize the full name to create base username
    const baseUsername = normalizeFullName(fullName);
    
    // Get and increment the counter for this base username
    const counter = await incrementUsernameCounter(baseUsername);
    
    // Generate the unique username
    const username = generateUniqueUsername(baseUsername, counter);
    
    // Validate the generated username
    validateUsername(username);

    const generatedAt = new Date().toISOString();

    // Create username assignment
    const assignment: UsernameAssignment = {
      username,
      baseUsername,
      counter,
      userId,
      generatedAt,
      status: UsernameAssignmentStatus.ACTIVE
    };

    await createUsernameAssignment(assignment);

    // Publish username generated event
    await publishUserUsernameGenerated({
      userId,
      username,
      baseUsername,
      counter,
      generatedAt
    });

  } catch (error) {
    console.error('Error generating username:', error);
    throw error;
  }
}; 