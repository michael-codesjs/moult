# Username Management Service

This service is responsible for generating and managing unique usernames within the Moult platform. It provides functionality to create unique usernames from user's full names and track username assignments.

## Architecture

The service follows a layered architecture:

- **Application Layer**: Contains the business logic and API endpoints
- **Infrastructure Layer**: Contains the Terraform configuration for AWS resources

### Application Components

- Domain types and utilities for username generation
- Lambda functions for generating usernames and retrieving assignments
- DynamoDB adapters for data persistence

### Infrastructure Components

- DynamoDB tables for username counts and assignments
- SSM Parameters for configuration
- IAM roles and permissions

## API Endpoints

### Generate Username

```http
POST /username/generate
```

Request body:
```json
{
  "fullName": "string",
  "userId": "string" (optional)
}
```

Response:
```json
{
  "username": "string",
  "baseUsername": "string",
  "counter": number,
  "userId": "string" (if provided),
  "generatedAt": "string"
}
```

### Get User Assignments

```http
GET /username/assignments/{userId}
```

Response:
```json
{
  "assignments": [
    {
      "username": "string",
      "baseUsername": "string",
      "counter": number,
      "userId": "string",
      "generatedAt": "string",
      "status": "ACTIVE" | "INACTIVE"
    }
  ]
}
```

## Database Schema

### Username Counts Table

- `baseUsername` (String) - Partition Key
- `count` (Number)

### Username Assignments Table

- `username` (String) - Partition Key
- `userId` (String) - Sort Key
- `baseUsername` (String)
- `counter` (Number)
- `generatedAt` (String)
- `status` (String)

Indexes:
- UserIdIndex (GSI) - Query by userId
- BaseUsernameIndex (GSI) - Query by baseUsername

## Development

### Prerequisites

- Node.js 18.x
- AWS CLI configured
- Terraform 1.0+

### Setup

1. Install dependencies:
```bash
cd application
npm install
```

2. Deploy infrastructure:
```bash
cd infrastructure
terraform init
terraform apply
```

3. Deploy application:
```bash
cd application
npm run deploy
```

## Testing

Run the test suite:
```bash
cd application
npm test
``` 