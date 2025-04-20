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
        '@shared': ['../../../../../shared/typescript/sdk/src/index.ts'],
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
  const serverlessTs = `import { AWS } from '@shared'

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
