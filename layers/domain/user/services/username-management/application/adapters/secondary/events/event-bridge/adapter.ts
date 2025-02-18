import { EventBridgeClient, PutEventsCommand } from "@aws-sdk/client-eventbridge";

const eventBridgeClient = new EventBridgeClient({});
const EVENT_BUS_NAME = process.env.EVENT_BUS_NAME;

export interface UserUsernameGeneratedEvent {
  userId: string;
  username: string;
  baseUsername: string;
  counter: number;
  generatedAt: string;
}

export async function publishUserUsernameGenerated(event: UserUsernameGeneratedEvent): Promise<void> {
  const command = new PutEventsCommand({
    Entries: [
      {
        EventBusName: EVENT_BUS_NAME,
        Source: "moult.user.username-management",
        DetailType: "USER_USERNAME_GENERATED",
        Detail: JSON.stringify(event),
        Time: new Date()
      }
    ]
  });

  try {
    await eventBridgeClient.send(command);
  } catch (error) {
    console.error('Failed to publish USER_USERNAME_GENERATED event:', error);
    throw error;
  }
} 