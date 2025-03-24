import { GetParameterCommand, SSMClient } from '@aws-sdk/client-ssm'
import { existsSync } from 'node:fs'
import { exec } from 'child_process'
import minimist from 'minimist'
import ora from 'ora'
import chalk from 'chalk'

console.clear()

const execAsync = (command: string, options: any) =>
  new Promise((res) => {
    exec(command, options, (error) => {
      if (error) console.log(error)
      res(error === null)
    })
  })

const ssmClient = new SSMClient({
  region: process.env.AWS_REGION || 'eu-central-1',
})
const args = minimist(process.argv.slice(2))

const stage: 'dev' | 'prod' = args.stage || 'dev'
const forceInitialize = args['force-init']

const initializeTerraform = async () => {
  // get enviroment state bucket name

  const getParameterCommand = new GetParameterCommand({
    Name: `/moult/${stage}/cicd/state-bucket/name`,
    WithDecryption: true,
  })

  const stateBucketName = await ssmClient.send(getParameterCommand)
  const lockDynamoDbTableName = 'moult-terraform-locks'

  // terraform init

  const spinner = ora('Initializing terraform.')
  spinner.start()

  const stateFileKey =
    'domain/authentication/service/user/infrastructure/terraform.tfstate'
  const command = `cd infrastructure && terraform init -backend-config="bucket=${stateBucketName.Parameter?.Value}" -backend-config="key=${stateFileKey}" -backend-config="region=eu-central-1" -backend-config="dynamodb_table=${lockDynamoDbTableName}" -backend-config="encrypt=true"`

  const success = await execAsync(command, { pipe: true })

  if (success)
    return spinner.succeed('Successfully initialized terraform.') || true
  else
    spinner.fail(
      `Failed to initialize terraform. Run the command ${chalk.black(command)} manually to get the actual error message.`,
    ) || false
}

const deployInfrastructure = async () => {
  const spinner = ora(
    `Deploying username management service infrastructure to ${chalk.black(stage)}.`,
  )
  spinner.start()

  const command = `cd infrastructure && terraform apply -auto-approve --var "environment=${stage}"`
  const success = await execAsync(command, { stdio: 'pipe' })

  if (success)
    return (
      spinner.succeed(
        `Successfully deployed user service infrastructure to ${chalk.black(stage)}.`,
      ) || true
    )
  else
    spinner.fail(
      `Failed to deploy user service infrastructure to ${chalk.black(stage)}.`,
    )
}

const deployApplication = async () => {
  const spinner = ora(
    `Deploying user management service application to ${chalk.black(stage)}.`,
  )
  spinner.start()

  const command = `sls deploy --stage=${stage}`
  const success = await execAsync(command, { stdio: 'pipe' })

  if (success)
    return (
      spinner.succeed(
        `Successfully deployed user service application to ${chalk.black(stage)}.`,
      ) || true
    )
  else
    spinner.fail(
      `Failed to deploy user service application to ${chalk.black(stage)}.`,
    )
}

;(async () => {
  const shouldInitialize = forceInitialize || !existsSync('./.terraform')
  const initialized = shouldInitialize ? await initializeTerraform() : true

  initialized && (await deployInfrastructure()) && (await deployApplication())
})()
