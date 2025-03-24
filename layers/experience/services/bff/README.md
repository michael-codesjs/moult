# Backend for Frontend (BFF) Service

This service acts as an intermediary layer between the frontend clients and backend services. It's designed to handle user-related operations and events.

## Structure

- **Prisma**: Database ORM for PostgreSQL connectivity
  - Located at `application/prisma`
  - Includes User model with fields for id, name, email, phone_number, and username
- **Adapters**: Handle incoming events and requests
  - Primary adapters: Handle user creation and username updates
  - Secondary adapters: Connect to external systems

## Deployment

```bash
# Install dependencies
npm install

# Generate Prisma client
npm run prisma:generate

# Deploy to AWS
npm run deploy

# Push schema changes to the database
npm run prisma:push
```

## Infrastructure

- **Database**: PostgreSQL instance in AWS RDS
- **Authentication**: AWS Cognito User Pool with support for email and phone_number as username
  - Non-case sensitive usernames
  - Minimum password length: 7 characters
  - Admin-only account recovery

## Event Handling

The service processes the following events:

- `USER_CREATED`: Creates a user record in the database when a user signs up
- `USERNAME_UPDATED`: Updates a user's username in the database

## Environment Setup

The service requires the following environment variables:

- `DATABASE_URL`: PostgreSQL connection string
