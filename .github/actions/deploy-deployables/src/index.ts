import { exec } from 'child_process'
import path from 'path'
import { simpleGit, SimpleGit } from 'simple-git'
import { getDeployablePackages } from './get-deployable-packages'
import { getLastDeployedCommit } from './get-last-deployed-commit'

const baseDir = path.join(__dirname, '../../../../')
const binary = 'git'
const maxConcurrentProcesses = 6
const trimmed = false

const git: SimpleGit = simpleGit({
  baseDir,
  binary,
  maxConcurrentProcesses,
  trimmed,
})

export const execAsync = (command: string, options: any) =>
  new Promise((res) => exec(command, options, (error) => res(error === null)))

;(async () => {
  const lastDeployedCommit = await getLastDeployedCommit()
  const deployablePackages = getDeployablePackages()

  // get diff between current commit and last deployed commit.
  const diff = await git.diff([lastDeployedCommit, 'HEAD', '--name-only'])

  const modifiedDeployablePackages = deployablePackages.filter(
    (deployablePackage) => {
      deployablePackage.location = deployablePackage.location.replace(
        baseDir,
        '',
      )
      return new RegExp(`$${deployablePackage.location}`).test(diff)
    },
  )

  const scope = modifiedDeployablePackages.map((pack) => '--scope ' + pack.name)

  // TODO: include in the scope, all packages that reference a shared package when that shared package is also modified

  const deployProcess = exec(`yarn lerna run deploy ${scope.join(' ')}`) // deploy, lerna will handle the order in which we deploy the packages starting with the packages with the least dependant on other packages.
  deployProcess.stdout.pipe(process.stdout)
})()
