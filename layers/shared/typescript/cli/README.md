# Moult CLI

A command-line tool for managing Moult microservices deployment and operations.

## Installation

Install the CLI tool globally:

```bash
npm install -g @moult/cli-tools
```

Or link it locally for development:

```bash
# From the cli directory
npm link
```

## Usage

### Initializing a New Service

To create a new service:

```bash
moult initialize
# or the shorter version
moult init
```

This interactive command will:

1. Ask what type of component you want to create (currently only services are supported)
2. Ask which layer the service belongs to (domain, infrastructure, platform)
3. If domain layer is selected, ask for the domain name
4. Ask for the service name
5. Generate a complete service structure with all necessary files

If run in an existing service directory without configuration, it will prompt you to configure that service.

### Generating Environment Variables

To generate environment variables from your service configuration:

```bash
moult env
```

This will create a `.env` file in the current directory based on the `environment` section in your `config.mlt` file.

The `config.mlt` file should contain an `environment` section with key-value pairs where:

- The key is the environment variable name
- The value is the SSM parameter path to fetch the value from

Example `config.mlt`:

```json
{
  "type": "service",
  "layer": "domain",
  "domain": "user",
  "name": "users",
  "environment": {
    "DATABASE_URL": "/moult/${stage}/infrastructure/storage/postgres/url",
    "EVENT_BUS_NAME": "/moult/${stage}/infrastructure/io/event-bus/central/name",
    "EVENT_BUS_ARN": "/moult/${stage}/infrastructure/io/event-bus/central/arn"
  }
}
```

You can specify a stage for the environment variables:

```bash
moult env --stage prod
# or using the shorthand
moult env -s prod
```

The ${stage} placeholder in SSM paths will be replaced with the actual stage value.

### Deploying a Service

To deploy a service, navigate to the service directory and run:

```bash
moult deploy
```

By default, this deploys both infrastructure and application to the `dev` stage.

For services without an infrastructure folder (like the Cognito service), the CLI automatically detects this and only deploys the serverless application.

#### Deploy Options

**Deploy to a specific stage**:

```bash
moult deploy --stage prod
# or using the shorthand
moult deploy -s prod
```

**Force Terraform initialization**:

```bash
moult deploy --force-init
# or using the shorthand
moult deploy -f
```

**Deploy only the serverless application**:

```bash
moult deploy --app
# or using the shorthand
moult deploy -a
```

**Deploy only the infrastructure**:

```bash
moult deploy --infra
# or using the shorthand
moult deploy -i
```

You can combine these options as needed:

```bash
# Deploy only the application to production
moult deploy -a -s prod

# Deploy only the infrastructure with forced initialization
moult deploy -i -f
```

## Features

- Auto-detects service and domain name from current directory structure
- Initializes new services with proper folder structure and configuration
- Configures existing services that lack Moult configuration
- Generates environment variables from SSM parameters based on service configuration
- Intelligently detects whether a service has infrastructure or is app-only
- Initializes Terraform with proper backend configuration when needed
- Deploys both infrastructure and application components separately or together
- Uses consistent state management across all services
- Provides clear, colorful terminal output with progress indicators

## Development

### Build the CLI

```bash
npm run build
```

### Watch for changes

```bash
npm run build:watch
```

### Run tests

```bash
npm test
```
