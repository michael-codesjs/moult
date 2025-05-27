import chalk from 'chalk'
import ora from 'ora'
import path from 'path'
import fs from 'fs'
import { promisify } from 'util'
import { exec } from 'child_process'
import inquirer from 'inquirer'

const execAsync = promisify(exec)
const mkdirAsync = promisify(fs.mkdir)
const writeFileAsync = promisify(fs.writeFile)
const readFileAsync = promisify(fs.readFile)

interface ServiceConfig {
  type: 'service'
  layer: string
  domain?: string
  name: string
  environment?: Record<string, string>
}

export const initializeCommand = async () => {
  console.clear()

  const cwd = process.cwd()

  // Check if we're already in a service directory
  if (fs.existsSync(path.join(cwd, 'serverless.ts'))) {
    if (fs.existsSync(path.join(cwd, 'config.mlt'))) {
      console.log(
        chalk.yellow(
          'This directory already contains a Moult service with configuration.',
        ),
      )
      process.exit(0)
    } else {
      console.log(
        chalk.yellow(
          'Detected an existing service without Moult configuration.',
        ),
      )
      await configureExistingService(cwd)
      process.exit(0)
    }
  }

  // First question - what are we creating?
  const { type } = await inquirer.prompt([
    {
      type: 'list',
      name: 'type',
      message: 'What do you want to create?',
      choices: [{ name: 'Service', value: 'service' }],
    },
  ])

  if (type === 'service') {
    await initializeService(cwd)
  }
}

async function configureExistingService(cwd: string) {
  // Try to infer the layer and service name from the current path
  const pathParts = cwd.split(path.sep)
  const serviceIndex = pathParts.indexOf('services')

  let inferredLayer = ''
  let inferredDomain = ''
  let inferredServiceName = ''

  if (serviceIndex !== -1 && serviceIndex < pathParts.length - 1) {
    inferredServiceName = pathParts[serviceIndex + 1]

    if (serviceIndex >= 3) {
      inferredLayer = pathParts[serviceIndex - 1]
      inferredDomain = pathParts[serviceIndex - 2]
    }
  }

  // Ask for confirmation or correction
  const { layer } = await inquirer.prompt([
    {
      type: 'list',
      name: 'layer',
      message: 'Which layer does this service belong to?',
      default: inferredLayer || undefined,
      choices: [
        { name: 'Data', value: 'data' },
        { name: 'Domain', value: 'domain' },
        { name: 'Experience', value: 'experience' },
        { name: 'Platform', value: 'platform' },
        { name: 'Shared', value: 'shared' },
      ],
    },
  ])

  let domain
  if (layer === 'domain') {
    const domainAnswer = await inquirer.prompt([
      {
        type: 'input',
        name: 'domain',
        message: 'What domain does this service belong to?',
        default: inferredDomain || undefined,
        validate: (input) =>
          input.trim().length > 0 ? true : 'Domain name cannot be empty',
      },
    ])
    domain = domainAnswer.domain
  }

  const { serviceName } = await inquirer.prompt([
    {
      type: 'input',
      name: 'serviceName',
      message: 'What is the name of this service?',
      default: inferredServiceName || undefined,
      validate: (input) =>
        input.trim().length > 0 ? true : 'Service name cannot be empty',
    },
  ])

  // Save config
  const config: ServiceConfig = {
    type: 'service',
    layer,
    domain: layer === 'domain' ? domain : undefined,
    name: serviceName,
    environment: {
      EVENT_BUS_NAME: `/moult/\${stage}/infrastructure/io/event-bus/central/name`,
      EVENT_BUS_ARN: `/moult/\${stage}/infrastructure/io/event-bus/central/arn`,
      API_URL: `/moult/\${stage}/infrastructure/io/central/api/url`,
    },
  }

  await writeFileAsync(
    path.join(cwd, 'config.mlt'),
    JSON.stringify(config, null, 2),
  )

  console.log(chalk.green(`✓ Service configuration saved to config.mlt`))
}

async function initializeService(cwd: string) {
  // Ask for layer
  const { layer } = await inquirer.prompt([
    {
      type: 'list',
      name: 'layer',
      message: 'Which layer will this service be in?',
      choices: [
        { name: 'Domain', value: 'domain' },
        { name: 'Infrastructure', value: 'infrastructure' },
        { name: 'Platform', value: 'platform' },
      ],
    },
  ])

  // If domain layer, ask for domain name
  let domain
  if (layer === 'domain') {
    const domainAnswer = await inquirer.prompt([
      {
        type: 'input',
        name: 'domain',
        message: 'What is the domain name?',
        validate: (input) =>
          input.trim().length > 0 ? true : 'Domain name cannot be empty',
      },
    ])
    domain = domainAnswer.domain
  }

  // Ask for service name
  const { serviceName } = await inquirer.prompt([
    {
      type: 'input',
      name: 'serviceName',
      message: 'What is the name of the service?',
      validate: (input) =>
        input.trim().length > 0 ? true : 'Service name cannot be empty',
    },
  ])

  // Create service directory
  const spinner = ora(`Creating ${serviceName} service...`).start()

  try {
    const servicePath = path.join(cwd, serviceName)

    // Create main directories
    await mkdirAsync(servicePath, { recursive: true })
    await mkdirAsync(path.join(servicePath, 'application'), { recursive: true })
    await mkdirAsync(path.join(servicePath, 'infrastructure'), {
      recursive: true,
    })
    await mkdirAsync(path.join(servicePath, 'scripts'), { recursive: true })

    // Create application subdirectories
    const applicationSubdirs = [
      'adapters',
      'domain',
      'dependencies',
      'errors',
      'interfaces',
      'repositories',
      'types',
      'use-cases',
      'utilities',
    ]

    for (const dir of applicationSubdirs) {
      await mkdirAsync(path.join(servicePath, 'application', dir), {
        recursive: true,
      })
    }

    // Create basic files
    await createServiceFiles(layer, domain, serviceName, servicePath)

    // Generate blueprint application files
    await generateBlueprintFiles(layer, domain, serviceName, servicePath)

    // Save config
    const config: ServiceConfig = {
      type: 'service',
      layer,
      domain: layer === 'domain' ? domain : undefined,
      name: serviceName,
      environment: {
        EVENT_BUS_NAME: `/moult/\${stage}/infrastructure/io/event-bus/central/name`,
        EVENT_BUS_ARN: `/moult/\${stage}/infrastructure/io/event-bus/central/arn`,
        API_URL: `/moult/\${stage}/infrastructure/io/central/api/url`,
      },
    }

    await writeFileAsync(
      path.join(servicePath, 'config.mlt'),
      JSON.stringify(config, null, 2),
    )

    spinner.succeed(
      chalk.green(
        `${serviceName} service created successfully at ${servicePath}`,
      ),
    )
    console.log(chalk.blue('\nNext steps:'))
    console.log(chalk.white(`  1. cd ${serviceName}`))
    console.log(chalk.white('  2. npm install'))
    console.log(chalk.white('  3. Start building your service!'))
  } catch (error) {
    spinner.fail(`Failed to create service: ${error.message}`)
  }
}

async function createServiceFiles(
  layer: string,
  domain: string | undefined,
  serviceName: string,
  servicePath: string,
) {
  // Create package.json
  const packageJson = {
    name: `@moult/${layer === 'domain' && domain ? `${domain}-` : ''}${serviceName}-service`,
    version: '0.9.0',
    description: `${serviceName} service`,
    main: 'serverless.ts',
    repository: 'https://github.com/michael-codesjs/moult',
    author: 'Michael Phiri(github@michael-codesjs)',
    license: 'MIT',
    scripts: {
      deploy: 'moult deploy',
      'deploy:application': 'sls deploy',
      destroy:
        'sls remove && cd infrastructure && terraform init && terraform destroy -auto-approve',
      'generate-env': 'moult env',
      test: 'jest --silent',
      'test:silent': 'moult env && jest --silent',
    },
    dependencies: {
      '@moult/data-infrastructure': '*',
      '@moult/platform-infrastructure': '*',
      inversify: '^6.0.1',
      'reflect-metadata': '^0.1.13',
      validator: '^13.9.0',
      '@middy/core': '^4.2.6',
      '@middy/input-output-logger': '^4.2.6',
      'aws-sigv4-fetch': '^1.3.0',
      'correlation-id': '^5.0.0',
      dotenv: '^16.0.3',
      'dynamodb-onetable': '^2.7.5',
      uuid: '^9.0.0',
    },
    devDependencies: {
      '@aws-sdk/client-eventbridge': '^3.279.0',
      '@aws-sdk/client-ssm': '^3.282.0',
      '@serverless/typescript': '^3.3.0',
      '@types/aws-lambda': '^8.10.71',
      '@types/jest': '^29.4.0',
      '@types/node': '^14.14.25',
      '@types/ora': '^3.2.0',
      '@types/validator': '^13.7.14',
      '@types/minimist': '^1.2.2',
      '@types/chance': '^1.1.3',
      '@types/uuid': '^9.0.1',
      chalk: '2',
      esbuild: '^0.14.11',
      jest: '^29.3.1',
      ora: '2',
      serverless: '^3.2.0',
      'serverless-esbuild': '^1.23.3',
      'serverless-iam-roles-per-function': '^3.2.0',
      'ts-jest': '^29.0.3',
      'ts-node': '^10.9.1',
      typescript: '^4.9.5',
      minimist: '^1.2.8',
    },
    resolutions: {
      uuid: '9.0.0',
    },
  }

  await writeFileAsync(
    path.join(servicePath, 'package.json'),
    JSON.stringify(packageJson, null, 2),
  )

  // Create tsconfig.json
  const tsconfig = {
    compilerOptions: {
      target: 'ES5',
      moduleResolution: 'node',
      esModuleInterop: true,
      resolveJsonModule: true,
      noUnusedLocals: false,
      noUnusedParameters: false,
      experimentalDecorators: true,
      removeComments: true,
      skipLibCheck: true,
      sourceMap: true,
      outDir: 'dist',
      baseUrl: 'application',
      paths: {
        '@moult/sdk': ['../../../../../shared/typescript/sdk/src/index.ts'],
        '@adapters/*': ['adapters/*'],
        '@domain/*': ['domain/*'],
        '@dependencies/*': ['dependencies/*'],
        '@dependencies': ['dependencies/index.ts'],
        '@errors': ['errors/index.ts'],
        '@interfaces/*': ['interfaces/*'],
        '@interfaces': ['interfaces/index.ts'],
        '@repositories/*': ['repositories/*'],
        '@repositories': ['repositories/index.ts'],
        '@typings/*': ['types/*'],
        '@typings': ['types/index.ts'],
        '@use-cases/*': ['use-cases/*'],
        '@use-cases': ['use-cases/index.ts'],
        '@utilities/*': ['utilities/*'],
      },
    },
    references: [{ path: '../../../../shared/typescript/sdk' }],
    include: ['serverless.ts', 'application/**/*.ts'],
    'ts-node': {
      require: ['tsconfig-paths/register'],
    },
    typeAcquisition: {
      include: ['jest'],
    },
  }

  await writeFileAsync(
    path.join(servicePath, 'tsconfig.json'),
    JSON.stringify(tsconfig, null, 2),
  )

  // Create jest.config.ts
  const jestConfig = `import { pathsToModuleNameMapper, JestConfigWithTsJest } from 'ts-jest'
import { compilerOptions } from './tsconfig.json'

const jestConfig: JestConfigWithTsJest = {
  preset: 'ts-jest',
  verbose: true,
  maxConcurrency: 10,
  testTimeout: 2000000,
  testEnvironment: 'node',
  testMatch: ['**/*.test.ts'],
  modulePaths: [compilerOptions.baseUrl],
  moduleNameMapper: {
    ...pathsToModuleNameMapper(compilerOptions.paths),
    '^@shared$':
      '<rootDir>/../../../../../layers/shared/typescript/sdk/src/index.ts',
  },
  transform: {
    '^.+\\.ts?$': [
      'ts-jest',
      {
        tsconfig: './tsconfig.json',
        isolatedModules: true,
      },
    ],
  },
  moduleDirectories: ['node_modules'],
}

export default jestConfig
`

  await writeFileAsync(path.join(servicePath, 'jest.config.ts'), jestConfig)

  // Create serverless.ts
  const serverlessTs = `import { AWS } from '@moult/sdk'

/** Serverless configuration for the '${serviceName}' service. */
const serverlessConfiguration: AWS.Service = {
  service: 'moult-${layer === 'domain' && domain ? `${domain}-` : ''}${serviceName}',
  frameworkVersion: '3',

  provider: {
    name: 'aws',
    region: 'eu-central-1',
    stage: 'dev',
    runtime: 'nodejs18.x',

    apiGateway: {
      restApiId:
        '\${ssm:/moult/\${self:custom.stage}/infrastructure/io/central/api/id}',
      restApiRootResourceId:
        '\${ssm:/moult/\${self:custom.stage}/infrastructure/io/central/api/root-resource-id}',
    },

    environment: {
      CENTRAL_EVENT_BUS_ARN:
        '\${ssm:/moult/\${self:custom.stage}/infrastructure/io/event-bus/central/arn}',
      CENTRAL_EVENT_BUS_NAME:
        '\${ssm:/moult/\${self:custom.stage}/infrastructure/io/event-bus/central/name}',
    },
  },

  package: {
    individually: true,
  },

  plugins: ['serverless-esbuild', 'serverless-iam-roles-per-function'],

  custom: {
    region: '\${opt:region, self:provider.region}',
    stage: '\${opt:stage, self:provider.stage}',

    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk'],
      target: 'node18',
      define: { 'require.resolve': undefined },
      platform: 'node',
      concurrency: 1,
    },
  },

  functions: {},
}

module.exports = serverlessConfiguration
`

  await writeFileAsync(path.join(servicePath, 'serverless.ts'), serverlessTs)

  // Create infrastructure/index.tf
  const indexTf = `terraform {
  backend "s3" {}
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "5.1.0"
    }
  }
}

provider "aws" {
  region = "eu-central-1"
}

locals {
  service_name = "${serviceName}"
  stage        = var.stage
  tags = {
    service     = local.service_name
    stage       = local.stage
    terraform   = true
  }
}

variable "stage" {
  description = "The stage of the deployment (dev/prod)"
  type        = string
  default     = "dev"
}
`

  await writeFileAsync(
    path.join(servicePath, 'infrastructure', 'index.tf'),
    indexTf,
  )
}

async function generateBlueprintFiles(
  layer: string,
  domain: string | undefined,
  serviceName: string,
  servicePath: string,
) {
  // Generate application structure
  const applicationPath = path.join(servicePath, 'application')

  // Generate adapters directory
  await generateAdaptersFiles(serviceName, applicationPath)

  // Generate domain directory
  await generateDomainFiles(serviceName, applicationPath)

  // Generate interfaces directory
  await generateInterfacesFiles(serviceName, applicationPath)

  // Generate dependencies directory
  await generateDependenciesFiles(serviceName, applicationPath)

  // Generate repositories directory
  await generateRepositoriesFiles(serviceName, applicationPath)

  // Generate use-cases directory
  await generateUseCasesFiles(serviceName, applicationPath)

  // Generate errors directory
  await generateErrorsFiles(serviceName, applicationPath)
}

async function generateAdaptersFiles(
  serviceName: string,
  applicationPath: string,
) {
  const adaptersPath = path.join(applicationPath, 'adapters')
  const primaryPath = path.join(adaptersPath, 'primary')
  const secondaryPath = path.join(adaptersPath, 'secondary')

  // Create primary and secondary directories
  await mkdirAsync(primaryPath, { recursive: true })
  await mkdirAsync(secondaryPath, { recursive: true })

  // Primary adapters index.ts
  const primaryIndexContent = `// Export all primary adapters here
`
  await writeFileAsync(path.join(primaryPath, 'index.ts'), primaryIndexContent)

  // Secondary adapters index.ts
  const secondaryIndexContent = `// Export all secondary adapters here
`
  await writeFileAsync(
    path.join(secondaryPath, 'index.ts'),
    secondaryIndexContent,
  )

  // Create a sample adapter (create entity)
  const createEntityPath = path.join(
    primaryPath,
    `create-${serviceName.endsWith('s') ? serviceName.slice(0, -1) : serviceName}`,
  )
  await mkdirAsync(createEntityPath, { recursive: true })

  // Create sample adapter files
  const createEntityIndexContent = `export { definition as create${capitalizeFirstLetter(serviceName.endsWith('s') ? serviceName.slice(0, -1) : serviceName)} } from './definition'
`
  await writeFileAsync(
    path.join(createEntityPath, 'index.ts'),
    createEntityIndexContent,
  )

  const createEntityDefinitionContent = `import { AWS, handlerPath } from '@moult/sdk'

// 'create${capitalizeFirstLetter(serviceName.endsWith('s') ? serviceName.slice(0, -1) : serviceName)}' lambda function sls definition.
export const definition: AWS.ServerlessLambdaFunction = {
  description: 'Create ${serviceName.endsWith('s') ? serviceName.slice(0, -1) : serviceName} lambda function/adapter.',
  handler: \`\${handlerPath(__dirname)}/handler.main\`,
  events: [
    {
      http: {
        path: '/${serviceName}',
        method: 'POST',
        cors: true,
        authorizer: 'AWS_IAM',
        private: false,
      },
    },
  ],
  iamRoleStatements: [
    {
      Effect: 'Allow',
      Action: [
        'dynamodb:GetItem',
        'dynamodb:UpdateItem',
        'dynamodb:Query',
        'dynamodb:PutItem',
      ],
      Resource: [
        '\${ssm:/moult/\${self:custom.stage}/domain/${serviceName}/infrastructure/storage/table/arn}',
      ],
    },
    {
      Effect: 'Allow',
      Action: ['events:PutEvents'],
      Resource:
        '\${ssm:/moult/\${self:custom.stage}/infrastructure/io/event-bus/central/arn}',
    },
  ],
  environment: {
    TABLE_NAME:
      '\${ssm:/moult/\${self:custom.stage}/domain/${serviceName}/infrastructure/storage/table/name}',
  },
}
`
  await writeFileAsync(
    path.join(createEntityPath, 'definition.ts'),
    createEntityDefinitionContent,
  )

  const entityName = capitalizeFirstLetter(
    serviceName.endsWith('s') ? serviceName.slice(0, -1) : serviceName,
  )
  const createEntityHandlerContent = `import 'reflect-metadata'
import { CREATE_${entityName.toUpperCase()}_DOMAIN_COMMAND } from '@domain/events'
import {
  withCommonInput,
  withLambdaIOStandard,
  CommonInputHandler,
} from '@moult/sdk'
import { ${entityName}DTO } from '@domain/models'
import { container, dependencies } from '@dependencies'
import { ${entityName}UseCase } from '@interfaces'

const inputMapper = async (
  input: CREATE_${entityName.toUpperCase()}_DOMAIN_COMMAND,
): Promise<${entityName}DTO> => {
  console.log('input', input)

  const ${entityName.toLowerCase()}UseCase: ${entityName}UseCase = container.get(dependencies.${entityName}UseCase)
  return await ${entityName.toLowerCase()}UseCase.create${entityName}(input.payload)
}

/** 'create${entityName}' lambda function handler. */
export const handler: CommonInputHandler<CREATE_${entityName.toUpperCase()}_DOMAIN_COMMAND, ${entityName}DTO> =
  withCommonInput(inputMapper, {
    singular: true as true,
  })

/** 'create${entityName}' lambda function handler wrapped in required middleware. */
export const main = withLambdaIOStandard(handler)
`
  await writeFileAsync(
    path.join(createEntityPath, 'handler.ts'),
    createEntityHandlerContent,
  )
}

async function generateDomainFiles(
  serviceName: string,
  applicationPath: string,
) {
  const domainPath = path.join(applicationPath, 'domain')
  const modelsPath = path.join(domainPath, 'models')
  const eventsPath = path.join(domainPath, 'events')
  const aggregatePath = path.join(domainPath, 'aggregate')

  // Create domain subdirectories
  await mkdirAsync(modelsPath, { recursive: true })
  await mkdirAsync(eventsPath, { recursive: true })
  await mkdirAsync(aggregatePath, { recursive: true })

  // Generate entity model
  const entityName = capitalizeFirstLetter(
    serviceName.endsWith('s') ? serviceName.slice(0, -1) : serviceName,
  )

  // models/index.ts
  const modelsIndexContent = `export * from './${entityName.toLowerCase()}'
`
  await writeFileAsync(path.join(modelsPath, 'index.ts'), modelsIndexContent)

  // models/entity.ts
  const entityModelContent = `import { Resource } from '@moult/sdk'

export interface ${entityName}DTO extends Resource {
  id: string
  createdAt: string
  updatedAt: string
  // Add your entity properties here
}

export interface Create${entityName}DTO {
  // Add properties needed to create your entity
}

export interface Update${entityName}DTO {
  id: string
  // Add properties that can be updated
}
`
  await writeFileAsync(
    path.join(modelsPath, `${entityName.toLowerCase()}.ts`),
    entityModelContent,
  )

  // events/index.ts
  const eventsIndexContent = `export * from './types'
`
  await writeFileAsync(path.join(eventsPath, 'index.ts'), eventsIndexContent)

  // events/types.ts
  const entityUppercase = entityName.toUpperCase()
  const eventsTypesContent = `import { DomainCommand } from '@moult/sdk'
import { Create${entityName}DTO, Update${entityName}DTO } from '../models'

// Domain Commands
export type CREATE_${entityUppercase}_DOMAIN_COMMAND = DomainCommand<'CREATE_${entityUppercase}', Create${entityName}DTO>
export type UPDATE_${entityUppercase}_DOMAIN_COMMAND = DomainCommand<'UPDATE_${entityUppercase}', Update${entityName}DTO>

// Domain Events
export type ${entityUppercase}_CREATED_DOMAIN_EVENT = DomainCommand<'${entityUppercase}_CREATED', Create${entityName}DTO & { id: string }>
export type ${entityUppercase}_UPDATED_DOMAIN_EVENT = DomainCommand<'${entityUppercase}_UPDATED', Update${entityName}DTO>
`
  await writeFileAsync(path.join(eventsPath, 'types.ts'), eventsTypesContent)

  // aggregate/index.ts
  const aggregateIndexContent = `import { ${entityName}DTO } from '../models'

export class ${entityName}Aggregate {
  constructor(private readonly entity: ${entityName}DTO) {}

  // Add your aggregate methods here
  
  toDTO(): ${entityName}DTO {
    return { ...this.entity }
  }
}
`
  await writeFileAsync(
    path.join(aggregatePath, 'index.ts'),
    aggregateIndexContent,
  )
}

async function generateInterfacesFiles(
  serviceName: string,
  applicationPath: string,
) {
  const interfacesPath = path.join(applicationPath, 'interfaces')

  // Create interfaces directory
  await mkdirAsync(interfacesPath, { recursive: true })

  const entityName = capitalizeFirstLetter(
    serviceName.endsWith('s') ? serviceName.slice(0, -1) : serviceName,
  )

  // index.ts
  const indexContent = `export * from './repositories'
export * from './use-cases'
export * from './adapters'
`
  await writeFileAsync(path.join(interfacesPath, 'index.ts'), indexContent)

  // repositories.ts
  const repositoriesContent = `import { ${entityName}DTO, Create${entityName}DTO, Update${entityName}DTO } from '@domain/models'

/**
 * Repository interface for ${entityName} entity.
 */
export interface ${entityName}Repository {
  /**
   * Create a new ${entityName.toLowerCase()}.
   */
  create(data: Create${entityName}DTO): Promise<${entityName}DTO>

  /**
   * Find a ${entityName.toLowerCase()} by ID.
   */
  findById(id: string): Promise<${entityName}DTO | null>

  /**
   * Update a ${entityName.toLowerCase()}.
   */
  update(data: Update${entityName}DTO): Promise<${entityName}DTO>

  /**
   * Delete a ${entityName.toLowerCase()} by ID.
   */
  delete(id: string): Promise<void>
}
`
  await writeFileAsync(
    path.join(interfacesPath, 'repositories.ts'),
    repositoriesContent,
  )

  // use-cases.ts
  const useCasesContent = `import { ${entityName}DTO, Create${entityName}DTO, Update${entityName}DTO } from '@domain/models'

/**
 * Use case interface for ${entityName} operations.
 */
export interface ${entityName}UseCase {
  /**
   * Create a new ${entityName.toLowerCase()}.
   */
  create${entityName}(data: Create${entityName}DTO): Promise<${entityName}DTO>

  /**
   * Get a ${entityName.toLowerCase()} by ID.
   */
  get${entityName}(id: string): Promise<${entityName}DTO>

  /**
   * Update a ${entityName.toLowerCase()}.
   */
  update${entityName}(data: Update${entityName}DTO): Promise<${entityName}DTO>

  /**
   * Delete a ${entityName.toLowerCase()} by ID.
   */
  delete${entityName}(id: string): Promise<void>
}
`
  await writeFileAsync(
    path.join(interfacesPath, 'use-cases.ts'),
    useCasesContent,
  )

  // adapters.ts
  const adaptersContent = `import { EventBridgeEvent } from 'aws-lambda'
import { DomainCommand, DomainEvent } from '@moult/sdk'

/**
 * Interface for EventBridge adapter.
 */
export interface EventBridgeAdapter {
  /**
   * Publish a domain event to EventBridge.
   */
  publishEvent<T extends DomainEvent<string, any>>(event: T): Promise<void>
}

/**
 * Interface for DynamoDB adapter.
 */
export interface DynamoDBAdapter<T> {
  /**
   * Create a new item.
   */
  create(item: Partial<T>): Promise<T>

  /**
   * Get an item by ID.
   */
  get(id: string): Promise<T | null>

  /**
   * Update an existing item.
   */
  update(item: Partial<T>): Promise<T>

  /**
   * Delete an item by ID.
   */
  delete(id: string): Promise<void>
}
`
  await writeFileAsync(
    path.join(interfacesPath, 'adapters.ts'),
    adaptersContent,
  )
}

async function generateDependenciesFiles(
  serviceName: string,
  applicationPath: string,
) {
  const dependenciesPath = path.join(applicationPath, 'dependencies')

  // Create dependencies directory
  await mkdirAsync(dependenciesPath, { recursive: true })

  const entityName = capitalizeFirstLetter(
    serviceName.endsWith('s') ? serviceName.slice(0, -1) : serviceName,
  )

  // index.ts
  const indexContent = `export * from './dependencies'
export * from './container'
`
  await writeFileAsync(path.join(dependenciesPath, 'index.ts'), indexContent)

  // dependencies.ts
  const dependenciesContent = `/**
 * Service dependencies symbols. Used for IoC container bindings.
 */
export const dependencies = {
  // Repositories
  ${entityName}Repository: Symbol.for('${entityName}Repository'),

  // Use cases
  ${entityName}UseCase: Symbol.for('${entityName}UseCase'),

  // Adapters
  EventBridgeAdapter: Symbol.for('EventBridgeAdapter'),
  DynamoDBAdapter: Symbol.for('DynamoDBAdapter'),
}
`
  await writeFileAsync(
    path.join(dependenciesPath, 'dependencies.ts'),
    dependenciesContent,
  )

  // container.ts
  const containerContent = `import { Container } from 'inversify'
import { dependencies } from './dependencies'
import { ${entityName}Repository, ${entityName}UseCase, EventBridgeAdapter, DynamoDBAdapter } from '@interfaces'
import { ${entityName}RepositoryImpl } from '@repositories'
import { ${entityName}UseCaseImpl } from '@use-cases'
import { EventBridgeAdapterImpl, DynamoDBAdapterImpl } from '@adapters/secondary'

// Create a new IoC container
const container = new Container()

// Register repositories
container.bind<${entityName}Repository>(dependencies.${entityName}Repository).to(${entityName}RepositoryImpl)

// Register use cases
container.bind<${entityName}UseCase>(dependencies.${entityName}UseCase).to(${entityName}UseCaseImpl)

// Register adapters
container.bind<EventBridgeAdapter>(dependencies.EventBridgeAdapter).to(EventBridgeAdapterImpl)
container.bind<DynamoDBAdapter<any>>(dependencies.DynamoDBAdapter).to(DynamoDBAdapterImpl)

export { container }
`
  await writeFileAsync(
    path.join(dependenciesPath, 'container.ts'),
    containerContent,
  )
}

async function generateRepositoriesFiles(
  serviceName: string,
  applicationPath: string,
) {
  const repositoriesPath = path.join(applicationPath, 'repositories')

  // Create repositories directory
  await mkdirAsync(repositoriesPath, { recursive: true })

  const entityName = capitalizeFirstLetter(
    serviceName.endsWith('s') ? serviceName.slice(0, -1) : serviceName,
  )

  // index.ts
  const indexContent = `export * from './${entityName.toLowerCase()}-repository'
`
  await writeFileAsync(path.join(repositoriesPath, 'index.ts'), indexContent)

  // entity-repository.ts
  const repositoryContent = `import { injectable, inject } from 'inversify'
import { ${entityName}Repository } from '@interfaces'
import { ${entityName}DTO, Create${entityName}DTO, Update${entityName}DTO } from '@domain/models'
import { DynamoDBAdapter, EventBridgeAdapter } from '@interfaces'
import { dependencies } from '@dependencies'
import { ${entityName}Aggregate } from '@domain/aggregate'
import { ${entityName.toUpperCase()}_CREATED_DOMAIN_EVENT, ${entityName.toUpperCase()}_UPDATED_DOMAIN_EVENT } from '@domain/events'
import { v4 as uuid } from 'uuid'

@injectable()
export class ${entityName}RepositoryImpl implements ${entityName}Repository {
  constructor(
    @inject(dependencies.DynamoDBAdapter)
    private readonly dynamoDBAdapter: DynamoDBAdapter<${entityName}DTO>,
    @inject(dependencies.EventBridgeAdapter)
    private readonly eventBridge: EventBridgeAdapter
  ) {}

  async create(data: Create${entityName}DTO): Promise<${entityName}DTO> {
    const now = new Date().toISOString()
    const id = uuid()
    
    const ${entityName.toLowerCase()} = await this.dynamoDBAdapter.create({
      id,
      ...data,
      createdAt: now,
      updatedAt: now,
    })
    
    // Publish event
    await this.eventBridge.publishEvent<${entityName.toUpperCase()}_CREATED_DOMAIN_EVENT>({
      type: '${entityName.toUpperCase()}_CREATED',
      payload: {
        id,
        ...data,
      },
    })
    
    return ${entityName.toLowerCase()}
  }

  async findById(id: string): Promise<${entityName}DTO | null> {
    return await this.dynamoDBAdapter.get(id)
  }

  async update(data: Update${entityName}DTO): Promise<${entityName}DTO> {
    const now = new Date().toISOString()
    
    const ${entityName.toLowerCase()} = await this.dynamoDBAdapter.update({
      ...data,
      updatedAt: now,
    })
    
    // Publish event
    await this.eventBridge.publishEvent<${entityName.toUpperCase()}_UPDATED_DOMAIN_EVENT>({
      type: '${entityName.toUpperCase()}_UPDATED',
      payload: data,
    })
    
    return ${entityName.toLowerCase()}
  }

  async delete(id: string): Promise<void> {
    await this.dynamoDBAdapter.delete(id)
  }
}
`
  await writeFileAsync(
    path.join(repositoriesPath, `${entityName.toLowerCase()}-repository.ts`),
    repositoryContent,
  )
}

async function generateUseCasesFiles(
  serviceName: string,
  applicationPath: string,
) {
  const useCasesPath = path.join(applicationPath, 'use-cases')

  // Create use-cases directory
  await mkdirAsync(useCasesPath, { recursive: true })

  const entityName = capitalizeFirstLetter(
    serviceName.endsWith('s') ? serviceName.slice(0, -1) : serviceName,
  )

  // index.ts
  const indexContent = `export * from './${entityName.toLowerCase()}-use-case'
`
  await writeFileAsync(path.join(useCasesPath, 'index.ts'), indexContent)

  // entity-use-case.ts
  const useCaseContent = `import { injectable, inject } from 'inversify'
import { ${entityName}UseCase, ${entityName}Repository } from '@interfaces'
import { ${entityName}DTO, Create${entityName}DTO, Update${entityName}DTO } from '@domain/models'
import { dependencies } from '@dependencies'
import { ${entityName}NotFoundError } from '@errors'

@injectable()
export class ${entityName}UseCaseImpl implements ${entityName}UseCase {
  constructor(
    @inject(dependencies.${entityName}Repository)
    private readonly ${entityName.toLowerCase()}Repository: ${entityName}Repository
  ) {}

  async create${entityName}(data: Create${entityName}DTO): Promise<${entityName}DTO> {
    return await this.${entityName.toLowerCase()}Repository.create(data)
  }

  async get${entityName}(id: string): Promise<${entityName}DTO> {
    const ${entityName.toLowerCase()} = await this.${entityName.toLowerCase()}Repository.findById(id)
    
    if (!${entityName.toLowerCase()}) {
      throw new ${entityName}NotFoundError(id)
    }
    
    return ${entityName.toLowerCase()}
  }

  async update${entityName}(data: Update${entityName}DTO): Promise<${entityName}DTO> {
    // Ensure entity exists before updating
    await this.get${entityName}(data.id)
    
    return await this.${entityName.toLowerCase()}Repository.update(data)
  }

  async delete${entityName}(id: string): Promise<void> {
    // Ensure entity exists before deleting
    await this.get${entityName}(id)
    
    await this.${entityName.toLowerCase()}Repository.delete(id)
  }
}
`
  await writeFileAsync(
    path.join(useCasesPath, `${entityName.toLowerCase()}-use-case.ts`),
    useCaseContent,
  )
}

async function generateErrorsFiles(
  serviceName: string,
  applicationPath: string,
) {
  const errorsPath = path.join(applicationPath, 'errors')

  // Create errors directory
  await mkdirAsync(errorsPath, { recursive: true })

  const entityName = capitalizeFirstLetter(
    serviceName.endsWith('s') ? serviceName.slice(0, -1) : serviceName,
  )

  // index.ts
  const indexContent = `export * from './domain-errors'
`
  await writeFileAsync(path.join(errorsPath, 'index.ts'), indexContent)

  // domain-errors.ts
  const errorsContent = `import { DomainError } from '@moult/sdk'

export class ${entityName}NotFoundError extends DomainError {
  constructor(id: string) {
    super(\`${entityName} with id \${id} not found\`, 'NOT_FOUND')
    this.name = '${entityName}NotFoundError'
  }
}

export class Invalid${entityName}DataError extends DomainError {
  constructor(message: string) {
    super(message, 'VALIDATION_ERROR')
    this.name = 'Invalid${entityName}DataError'
  }
}
`
  await writeFileAsync(path.join(errorsPath, 'domain-errors.ts'), errorsContent)
}

// Helper function to capitalize first letter of a string
function capitalizeFirstLetter(string: string): string {
  return string.charAt(0).toUpperCase() + string.slice(1)
}
