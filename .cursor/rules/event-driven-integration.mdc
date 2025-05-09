# Event-Driven Integration

This rule provides guidance for implementing event-driven integration between the Username Management service and the Cognito service.

## Event Structure

- Follow the existing domain event structure:

```typescript
interface USERNAME_GENERATED_DOMAIN_EVENT {
  id: string
  source: string
  name: 'USERNAME_GENERATED'
  payload: UsernameAssignmentDTO
  version: number
  date: Date
}
```

## Event Publishing

- Use the existing event publishing mechanism in the Username Management service
- Ensure events are properly formatted and contain all necessary information
- Include appropriate error handling and logging for event publishing failures

## Event Consumption

- Implement an event consumer in the Cognito service to listen for `USERNAME_GENERATED` events
- Use AWS EventBridge for event routing between services
- Create a new Lambda function to handle the event and update Cognito user attributes

## Implementation Pattern

1. **Event Producer (Username Management Service)**:

   - Generate username
   - Publish event with username and user ID

2. **Event Bus (AWS EventBridge)**:

   - Route events based on event pattern
   - Ensure proper event filtering

3. **Event Consumer (Cognito Service)**:
   - Create a new Lambda function to handle `USERNAME_GENERATED` events
   - Extract username and user ID from the event
   - Update Cognito user attributes with the generated username

## Error Handling

- Implement dead-letter queues (DLQs) for failed event processing
- Add retry logic for transient failures
- Log detailed error information for debugging
- Consider implementing a compensating transaction for rollback if needed

## Testing

- Unit test event producers and consumers
- Integration test the complete event flow
- Test error scenarios and recovery mechanisms
