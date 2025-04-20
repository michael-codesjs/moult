import { GetParameterCommand, SSMClient } from '@aws-sdk/client-ssm'
import { existsSync } from 'node:fs'
import { readFileSync } from 'node:fs'
import { exec } from 'child_process'
import chalk from 'chalk'
import ora from 'ora'
import path from 'path'

interface DeployOptions {
  stage: 'dev' | 'prod'
  forceInit: boolean
  app?: boolean
  infra?: boolean
}

interface ServiceConfig {
  type: 'service'
  layer: string
  domain?: string
  name: string
  environment?: Record<string, string>
}

const execAsync = (command: string, options: any = {}) =>
  new Promise<boolean>((resolve) => {
    exec(command, options, (error) => {
      if (error) console.log(error)
      resolve(error === null)
    })
  })

export const deployService = async (options: DeployOptions) => {
  const {
    stage = 'dev',
    forceInit = false,
    app = false,
    infra = false,
  } = options

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

  const { layer, domain, name: serviceName } = serviceConfig

  // Check if infrastructure exists
  const infrastructurePath = path.join(cwd, 'infrastructure')
  const hasInfrastructure = existsSync(infrastructurePath)

  // Determine what to deploy
  let deployOnlyApp = app && !infra
  let deployOnlyInfra = infra && !app
  let deployBoth = (!app && !infra) || (app && infra)

  // If no infrastructure exists, adjust deployment options
  if (!hasInfrastructure) {
    if (deployOnlyInfra) {
      console.warn(
        chalk.yellow(
          `Warning: Service ${serviceName} does not have infrastructure. Skipping infrastructure deployment.`,
        ),
      )
      process.exit(0)
    }
    deployOnlyApp = true
    deployOnlyInfra = false
    deployBoth = false
  }

  console.log(
    chalk.blue(
      `Deploying ${chalk.bold(serviceName)} service ${
        deployOnlyApp
          ? 'application'
          : deployOnlyInfra
            ? 'infrastructure'
            : 'infrastructure and application'
      } in ${
        layer === 'domain' && domain
          ? `${chalk.bold(domain)} domain`
          : `${chalk.bold(layer)} layer`
      } to ${chalk.bold(stage)}`,
    ),
  )

  const ssmClient = new SSMClient({
    region: process.env.AWS_REGION || 'eu-central-1',
  })

  // Create paths
  const terraformStatePath = `.terraform`
  const terraformStateFullPath = path.join(
    infrastructurePath,
    terraformStatePath,
  )

  const initializeTerraform = async () => {
    if (!hasInfrastructure) {
      return true
    }

    // Get environment state bucket name
    const getParameterCommand = new GetParameterCommand({
      Name: `/moult/${stage}/cicd/state-bucket/name`,
      WithDecryption: true,
    })

    const stateBucketResponse = await ssmClient.send(getParameterCommand)
    const stateBucketName = stateBucketResponse.Parameter?.Value
    const lockDynamoDbTableName = 'moult-terraform-locks' as const

    // Terraform init
    const spinner = ora('Initializing terraform.').start()

    const stateFileKey =
      layer === 'domain' && domain
        ? `domain/${domain}/${serviceName}/infrastructure/terraform.tfstate`
        : `${layer}/${serviceName}/infrastructure/terraform.tfstate`

    const command = `cd ${infrastructurePath} && terraform init -backend-config="bucket=${stateBucketName}" -backend-config="key=${stateFileKey}" -backend-config="region=eu-central-1" -backend-config="dynamodb_table=${lockDynamoDbTableName}" -backend-config="encrypt=true"`

    const success = await execAsync(command, { stdio: 'pipe' })

    if (success) {
      spinner.succeed('Successfully initialized terraform.')
      return true
    } else {
      spinner.fail(
        `Failed to initialize terraform. Run the command ${chalk.bold(command)} manually to get the actual error message.`,
      )
      return false
    }
  }

  const deployInfrastructure = async () => {
    if (!hasInfrastructure) {
      return true
    }

    const spinner = ora(
      `Deploying ${serviceName} service infrastructure to ${chalk.bold(stage)}.`,
    ).start()

    const command = `cd ${infrastructurePath} && terraform apply -auto-approve --var "stage=${stage}"`
    const success = await execAsync(command, { stdio: 'pipe' })

    if (success) {
      spinner.succeed(
        `Successfully deployed ${serviceName} service infrastructure to ${chalk.bold(stage)}.`,
      )
      return true
    } else {
      spinner.fail(
        `Failed to deploy ${serviceName} service infrastructure to ${chalk.bold(stage)}.`,
      )
      return false
    }
  }

  const deployApplication = async () => {
    const spinner = ora(
      `Deploying ${serviceName} service application to ${chalk.bold(stage)}.`,
    ).start()

    const command = `sls deploy --stage=${stage}`
    const success = await execAsync(command, { stdio: 'pipe' })

    if (success) {
      spinner.succeed(
        `Successfully deployed ${serviceName} service application to ${chalk.bold(stage)}.`,
      )
      return true
    } else {
      spinner.fail(
        `Failed to deploy ${serviceName} service application to ${chalk.bold(stage)}.`,
      )
      return false
    }
  }

  // Execute deployment process based on what was requested
  if (deployOnlyApp) {
    // Just deploy the application
    await deployApplication()
  } else {
    // Initialize Terraform if deploying infrastructure
    const shouldInitialize =
      hasInfrastructure && (forceInit || !existsSync(terraformStateFullPath))
    const initialized = shouldInitialize ? await initializeTerraform() : true

    if (initialized) {
      if (deployOnlyInfra) {
        // Just deploy infrastructure
        await deployInfrastructure()
      } else if (deployBoth) {
        // Deploy both infrastructure and application
        const infraDeployed = await deployInfrastructure()
        if (infraDeployed) {
          await deployApplication()
        }
      }
    }
  }
}
