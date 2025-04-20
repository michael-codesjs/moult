# Moult BFF Service with AppSync GraphQL API

This service provides a Backend for Frontend (BFF) layer with an AWS AppSync GraphQL API, powered by Prisma.

## Architecture

The architecture uses:

- AWS AppSync for the GraphQL API
- AWS Lambda for resolvers via Prisma
- Prisma ORM for database access

## Deployment

To deploy the service and GraphQL API:

```bash
# Deploy to dev environment
npm run deploy:dev

# Or deploy to a specific stage
serverless deploy --stage <stage-name>
```

## GraphQL Schema

The GraphQL schema is located at `application/prisma/appsync/schema.gql`. The resolvers are generated from Prisma and configured in `application/prisma/appsync/resolvers.yaml`.

## AppSync API Usage

After deployment, you can interact with the GraphQL API:

1. Find your API endpoint and API key in the AWS AppSync Console
2. Use the AppSync Console to run queries and mutations
3. Or connect from your client application using the API key for authentication

### Example Query

```graphql
query GetUser {
  getUser(where: { id: "user-id" }) {
    id
    name
    email
  }
}
```

### Example Mutation

```graphql
mutation CreateUser {
  createUser(
    data: {
      name: "John Doe"
      email: "john@example.com"
      phone_number: "+1234567890"
    }
  ) {
    id
    name
    email
  }
}
```

## Useful Commands

```bash
# Validate GraphQL schema
serverless appsync validate-schema

# Get introspection schema
serverless appsync get-introspection --format SDL --output schema.graphql

# Open the AWS AppSync console
serverless appsync console

# View logs
serverless appsync logs

# Flush cache if enabled
serverless appsync flush-cache
```

## Development

To extend the GraphQL API:

1. Update the Prisma schema if needed
2. Update the GraphQL schema in `application/prisma/appsync/schema.gql`
3. Add additional resolvers in `application/prisma/appsync/resolvers.yaml`
4. Implement any custom resolver logic in Lambda handlers

## License

Private
