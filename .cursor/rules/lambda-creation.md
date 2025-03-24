# Lambda Creation Pattern

When creating new Lambda functions in the Moult project, follow these guidelines:

## Directory Structure

Each Lambda function should be organized in its own directory under `application/adapters/primary/` with the following files:

```
application/adapters/primary/
└── function-name/
    ├── definition.ts  # Lambda configuration
    └── handler.ts     # Lambda implementation
```

## Definition File

The definition file should export a `definition` constant with the Lambda configuration:

```typescript
import { AWS, handlerPath } from '@shared'

export const definition: AWS.ServerlessLambdaFunction = {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    // Event triggers (EventBridge, API Gateway, etc.)
  ],
  // Optional IAM permissions and environment variables
}
```

## Handler File

The handler file should follow these patterns:

1. **EventBridge Events**: Use the `withCommonInput` pattern:

```typescript
import {
  withCommonInput,
  withLambdaIOStandard,
  CommonInputHandler,
} from '@shared'
import { prisma } from '../../../lib/prisma' // If using Prisma

// Define event type with UPPERCASE_SNAKE_CASE
type EVENT_TYPE_NAME = {
  // Properties
}

// Input mapper function
const inputMapper = async (input: EVENT_TYPE_NAME) => {
  // Implementation
}

// Handler definition
export const handler: CommonInputHandler<EVENT_TYPE_NAME, void> =
  withCommonInput(inputMapper, { singular: true as true })

// Export the Lambda handler
export const main = withLambdaIOStandard(handler)
```

2. **HTTP Events**: Follow the API Gateway pattern in other services.

## Event Naming Conventions

For event types, use uppercase snake case (e.g., `USER_CREATED`, `USER_USERNAME_UPDATED`) to match domain conventions.

## Exports

In the `application/adapters/primary/index.ts` file, export all function definitions:

```typescript
import { definition as function1 } from './function1/definition'
import { definition as function2 } from './function2/definition'

export { function1, function2 }
```

## Serverless Configuration

In the `serverless.ts` file, import all functions:

```typescript
import { AWS } from '@shared'
import * as functions from './application/adapters/primary'

const serverlessConfiguration: AWS.Service = {
  // Other configuration
  functions,
}

module.exports = serverlessConfiguration
```
