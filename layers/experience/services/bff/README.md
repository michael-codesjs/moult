# User Service

This service handles user-related operations in the Moult application, including maintaining a materialized view of user data in PostgreSQL.

## Features

- Listens for Cognito user events (creation and username updates)
- Maintains a materialized view of user data in PostgreSQL
- Uses Prisma for database operations

## Setup

1. Install dependencies:

```bash
npm install
```

2. Generate Prisma client:

```bash
npm run prisma:generate
```

3. Generate environment variables:

```bash
npm run generate-env
```

4. Deploy the service:

```bash
npm run deploy
```

## Database Schema

The service maintains a `user_view` table with the following structure:

- `id`: String (Primary Key)
- `name`: String
- `email`: String? (Unique)
- `phone_number`: String? (Unique)
- `preferred_username`: String? (Unique)
- `created_at`: DateTime
- `updated_at`: DateTime

## Lambda Functions

### handleUserCreated

Triggered by Cognito's PostConfirmation event. Creates a new record in the user_view table when a user completes registration.

### handleUsernameUpdated

Triggered by Cognito's PreTokenGeneration event. Updates the preferred_username in the user_view table when a user changes their username.

## Environment Variables

- `DATABASE_URL`: PostgreSQL connection string (retrieved from SSM)
- `NODE_ENV`: Current stage (dev/prod)
