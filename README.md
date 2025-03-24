## **moult - out with old, in with the new!**

This repository contains everything that makes up the moult project.

## Backend for Frontend (BFF) Service

The BFF service acts as an intermediary layer between the frontend clients and backend services. It's designed to handle user-related operations and events.

### Structure

- **Prisma**: Database ORM for PostgreSQL connectivity
  - Located at `layers/experience/services/bff/application/prisma`
  - Includes User model with fields for id, name, email, phone_number, and username

### Deployment

```bash
# Navigate to the BFF service directory
cd layers/experience/services/bff

# Generate Prisma client
npm run prisma:generate

# Deploy to AWS
npm run deploy

# Push schema changes to the database
npm run prisma:push
```

### Infrastructure

- **Database**: PostgreSQL instance in AWS RDS
- **Authentication**: AWS Cognito User Pool with support for email and phone number as username
