# Signature Management Service

This service is responsible for generating and managing unique signatures within the Moult platform. It provides functionality to create unique signatures from user's full names and track signature assignments.

## Architecture

The service follows a layered architecture:

- **Application Layer**: Contains the business logic and API endpoints
- **Infrastructure Layer**: Contains the Terraform configuration for AWS resources

### Application Components

- Domain types and utilities for signature generation
- Lambda functions for generating signatures and retrieving assignments
- DynamoDB adapters for data persistence

### Infrastructure Components

- DynamoDB tables for signature counts and assignments
- SSM Parameters for configuration
- IAM roles and permissions

## API Endpoints

### Generate Signature

```http
POST /signature/generate
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
  "signature": "string",
  "baseSignature": "string",
  "counter": number,
  "userId": "string" (if provided),
  "generatedAt": "string"
}
```

### Get User Assignments

```http
GET /signature/assignments/{userId}
```

Response:

```json
{
  "assignments": [
    {
      "signature": "string",
      "baseSignature": "string",
      "counter": number,
      "userId": "string",
      "generatedAt": "string",
      "status": "ACTIVE" | "INACTIVE"
    }
  ]
}
```

## Database Schema

### Signature Counts Table

- `baseSignature` (String) - Partition Key
- `count` (Number)

### Signature Assignments Table

- `signature` (String) - Partition Key
- `userId` (String) - Sort Key
- `baseSignature` (String)
- `counter` (Number)
- `generatedAt` (String)
- `status` (String)

Indexes:

- UserIdIndex (GSI) - Query by userId
- BaseSignatureIndex (GSI) - Query by baseSignature

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
