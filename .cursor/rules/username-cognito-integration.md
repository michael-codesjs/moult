# Username-Cognito Integration

This rule provides guidance for integrating the username management service with the Cognito service to assign generated usernames to Cognito users.

## Architecture Overview

- **Username Management Service**: Located in `layers/domain/user/services/username-management`

  - Responsible for generating unique usernames based on user's full name
  - Publishes a `USERNAME_GENERATED_DOMAIN_EVENT` when a username is generated

- **Cognito Service**: Located in `layers/experience/services/cognito`
  - Handles AWS Cognito user pool operations
  - Contains hooks for pre-sign-up, post-authentication, etc.

## Integration Points

1. **Username Generation Trigger**:

   - When a new user is created in Cognito, we need to trigger username generation
   - This could happen in the pre-sign-up or post-authentication flow

2. **Username Assignment**:

   - After a username is generated, it needs to be assigned to the Cognito user
   - This requires updating the Cognito user attributes

3. **Event Flow**:
   - Cognito service should listen for `USERNAME_GENERATED_DOMAIN_EVENT`
   - When received, update the Cognito user with the generated username

## Coding Standards

- Use snake_case for variable names
- Use camelCase for function names
- Maintain clear error handling and logging
- Follow existing patterns for AWS SDK v3 usage
- Ensure proper event handling between services

## Implementation Guidelines

1. Create a new use case in the Cognito service to handle username assignment
2. Implement an event listener for `USERNAME_GENERATED_DOMAIN_EVENT`
3. Add functionality to update Cognito user attributes with the generated username
4. Ensure proper error handling and retries for AWS operations
5. Add appropriate logging for debugging and monitoring

## Testing Approach

1. Unit test the new use cases and functions
2. Integration test the event flow between services
3. End-to-end test the complete user creation and username assignment flow
