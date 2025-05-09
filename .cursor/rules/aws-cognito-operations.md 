# AWS Cognito Operations

This rule provides guidance for working with AWS Cognito in the context of username assignment.

## AWS SDK Usage

- Use AWS SDK v3 for all Cognito operations
- Import specific clients and commands to minimize bundle size
- Follow the command pattern for all AWS operations

```typescript
import {
  CognitoIdentityProviderClient,
  AdminUpdateUserAttributesCommand,
} from '@aws-sdk/client-cognito-identity-provider'

const client = new CognitoIdentityProviderClient({ region: 'us-east-1' })
const command = new AdminUpdateUserAttributesCommand({
  UserPoolId: 'user-pool-id',
  Username: 'user-sub-id',
  UserAttributes: [
    {
      Name: 'preferred_username',
      Value: 'generated-username',
    },
  ],
})

const response = await client.send(command)
```

## Error Handling

- Implement proper error handling for all AWS operations
- Use specific error types for different failure scenarios
- Implement retries for transient errors
- Log detailed error information for debugging

```typescript
try {
  const response = await client.send(command)
  // Handle success
} catch (error) {
  if (error.name === 'UserNotFoundException') {
    // Handle specific error
  } else if (error.name === 'ServiceError') {
    // Implement retry logic for transient errors
  } else {
    // Handle unexpected errors
    console.error('Unexpected error updating Cognito user attributes', {
      error_message: error.message,
      error_name: error.name,
      user_id: user_id,
    })
    throw error
  }
}
```

## Username Attribute Mapping

- Use the `preferred_username` attribute for storing generated usernames
- Ensure the attribute is marked as readable in the Cognito user pool settings
- Consider adding additional attributes if needed for tracking username status

## Testing

- Use mocks for AWS SDK in unit tests
- Create integration tests with actual AWS resources in a test environment
- Test error scenarios and retry logic
