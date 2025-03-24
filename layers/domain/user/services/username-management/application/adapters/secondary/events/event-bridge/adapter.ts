import { USERNAME_GENERATED_DOMAIN_EVENT } from '@domain/events'
import { configureEnviromentVariables } from '@shared'
import {
  EventBridgeClient,
  PutEventsCommand,
} from '@aws-sdk/client-eventbridge'

// Environment configuration
const { CENTRAL_EVENT_BUS_NAME, REGION } = configureEnviromentVariables()
const region = REGION || 'eu-central-1'

// Event source constant
const EVENT_SOURCE = 'moult.user.username-management'

/**
 * Publishes a username generated event to EventBridge
 *
 * This function handles the communication with AWS EventBridge service
 * to publish domain events when a username is generated.
 *
 * @param event - The domain event containing username assignment data
 * @returns Promise that resolves when the event is successfully published
 * @throws Error if the event publishing fails
 */
export async function publishUserUsernameGenerated(
  event: USERNAME_GENERATED_DOMAIN_EVENT,
): Promise<void> {
  // Create the EventBridge client with minimal configuration
  // to avoid initialization issues in Lambda environment
  const client = new EventBridgeClient({
    region,
    customUserAgent: undefined,
  })

  try {
    // Create the event entry
    const entry = {
      EventBusName: CENTRAL_EVENT_BUS_NAME,
      Source: EVENT_SOURCE,
      DetailType: event.name,
      Detail: JSON.stringify(event),
      Time: new Date(),
    }

    // Create and configure the PutEvents command
    const command = new PutEventsCommand({
      Entries: [entry],
    })

    // Log essential information for debugging
    console.log(`Publishing event to ${CENTRAL_EVENT_BUS_NAME}`, {
      eventId: event.id,
      eventType: event.name,
      username: event.payload.username,
      userId: event.payload.user_id,
    })

    // Send the command to EventBridge
    const response = await client.send(command)

    // Log success with minimal information
    console.log(`Event published successfully`, {
      eventId: event.id,
      eventType: event.name,
      failedEntryCount: response.FailedEntryCount || 0,
    })
  } catch (error) {
    // Log detailed error information
    console.error('Failed to publish event to EventBridge', {
      eventId: event.id,
      eventType: event.name,
      errorMessage: error.message,
      errorName: error.name,
      errorStack: error.stack,
    })

    // Rethrow with clear error message
    throw new Error(
      `EventBridge publish error: ${error.message || 'Unknown error'}`,
    )
  }
}
