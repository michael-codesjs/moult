import { SSMClient, GetParameterCommand } from '@aws-sdk/client-ssm'
import * as fs from 'fs'
import * as path from 'path'

const stage = process.env.STAGE || 'dev'
const region = process.env.AWS_REGION || 'eu-central-1'

const ssm = new SSMClient({ region })

async function getSSMParameter(name: string): Promise<string> {
  const command = new GetParameterCommand({
    Name: name,
    WithDecryption: true,
  })
  const response = await ssm.send(command)
  return response.Parameter?.Value || ''
}

async function main() {
  try {
    const dbUrl = await getSSMParameter(
      `/moult/${stage}/infrastructure/storage/postgres/url`,
    )

    const envContent = `DATABASE_URL="${dbUrl}"
NODE_ENV="${stage}"`

    fs.writeFileSync(path.join(__dirname, '../.env'), envContent)
    console.log('Successfully generated .env file')
  } catch (error) {
    console.error('Error generating .env file:', error)
    process.exit(1)
  }
}

main()
