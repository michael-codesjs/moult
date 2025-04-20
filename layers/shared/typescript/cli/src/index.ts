#!/usr/bin/env node

import { Command } from 'commander'
import { deployService } from './commands/deploy'
import { initializeCommand } from './commands/initialize'
import { generateEnv } from './commands/generate-env'

const program = new Command()

program
  .name('moult')
  .description('CLI for managing Moult microservices')
  .version('1.0.0')

program
  .command('deploy')
  .description('Deploy a Moult service')
  .option('-s, --stage <stage>', 'Deployment stage (dev or prod)', 'dev')
  .option('-f, --force-init', 'Force terraform initialization')
  .option('-a, --app', 'Deploy only the serverless application')
  .option('-i, --infra', 'Deploy only the infrastructure')
  .action(deployService)

program
  .command('initialize')
  .alias('init')
  .description('Initialize a new Moult component (service, etc.)')
  .action(initializeCommand)

program
  .command('env')
  .description('Generate environment variables from config.mlt')
  .option('-s, --stage <stage>', 'Environment stage (dev or prod)', 'dev')
  .action(generateEnv)

program.parse(process.argv)
