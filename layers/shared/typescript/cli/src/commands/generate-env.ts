import { GetParameterCommand, SSMClient } from '@aws-sdk/client-ssm'
import { existsSync, writeFileSync } from 'fs'
import { readFileSync } from 'fs'
import chalk from 'chalk'
import ora from 'ora'
import path from 'path'

interface GenerateEnvOptions {
  stage: 'dev' | 'prod'
}

interface ServiceConfig {
  type: 'service'
  layer: string
  domain?: string
  name: string
  environment?: Record<string, string>
}

export const generateEnv = async (options: GenerateEnvOptions) => {
  const { stage = 'dev' } = options

  // Get the current working directory
  const cwd = process.cwd()

  // Check if config.mlt exists
  const configPath = path.join(cwd, 'config.mlt')
  if (!existsSync(configPath)) {
    console.error(chalk.red('Error: No Moult service configuration found'))
    console.error(
      chalk.yellow(
        'Please run "moult initialize" first to set up your service configuration',
      ),
    )
    process.exit(1)
  }

  // Read the config.mlt file
  let serviceConfig: ServiceConfig
  try {
    const configFile = readFileSync(configPath, 'utf8')
    serviceConfig = JSON.parse(configFile)

    if (serviceConfig.type !== 'service') {
      console.error(
        chalk.red(`Error: Found configuration but it's not a service type`),
      )
      process.exit(1)
    }
  } catch (error) {
    console.error(
      chalk.red(`Error: Failed to parse config.mlt file: ${error.message}`),
    )
    process.exit(1)
  }

  const { layer, domain, name: serviceName, environment } = serviceConfig

  // Check if environment exists
  if (!environment || Object.keys(environment).length === 0) {
    console.warn(
      chalk.yellow(
        `Warning: No environment variables configured in config.mlt for ${serviceName}.`,
      ),
    )
    console.info(
      chalk.blue(
        'To add environment variables, update your config.mlt file to include an "environment" section:',
      ),
    )
    console.info(
      chalk.white(`{
  "type": "service",
  "layer": "${layer}",
  ${domain ? `"domain": "${domain}",` : ''}
  "name": "${serviceName}",
  "environment": {
    "DATABASE_URL": "/moult/${stage}/infrastructure/storage/postgres/url",
    "EVENT_BUS_NAME": "/moult/${stage}/infrastructure/io/event-bus/central/name"
  }
}`),
    )
    process.exit(0)
  }

  const spinner = ora('Generating environment variables...').start()

  const ssmClient = new SSMClient({
    region: process.env.AWS_REGION || 'eu-central-1',
  })

  try {
    const envVars: Record<string, string> = {}

    // Add stage to environment variables
    envVars['STAGE'] = stage

    // Process each environment variable
    for (const [key, ssmPath] of Object.entries(environment)) {
      try {
        // Replace ${stage} with the actual stage value in SSM paths
        const processedPath = ssmPath.replace(/\${stage}/g, stage)

        const getParameterCommand = new GetParameterCommand({
          Name: processedPath,
          WithDecryption: true,
        })

        const response = await ssmClient.send(getParameterCommand)
        if (response.Parameter?.Value) {
          envVars[key] = response.Parameter.Value
        } else {
          console.warn(
            chalk.yellow(
              `Warning: Could not retrieve value for ${key} from SSM path ${processedPath}`,
            ),
          )
        }
      } catch (error) {
        console.warn(
          chalk.yellow(
            `Warning: Error retrieving ${key} from SSM: ${error.message}`,
          ),
        )
      }
    }

    // Format environment variables for .env file
    const envContent = Object.entries(envVars)
      .map(([key, value]) => {
        // Check if the value contains special characters and needs quotes
        const needsQuotes = /[ "'`!#$&*()\[\]\\|;:<>?]/.test(value)
        return `${key}=${needsQuotes ? `"${value}"` : value}`
      })
      .join('\n')

    // Write to .env file
    writeFileSync(path.join(cwd, '.env'), envContent)

    spinner.succeed(
      chalk.green(
        `Successfully generated .env file with ${
          Object.keys(envVars).length
        } variables for ${serviceName}`,
      ),
    )
  } catch (error) {
    spinner.fail(
      chalk.red(`Failed to generate environment variables: ${error.message}`),
    )
    process.exit(1)
  }
}
