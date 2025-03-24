import chalk from 'chalk'
import { execSync } from 'child_process'
import { readFileSync } from 'fs'
import ora from 'ora'
import { execAsync } from './utilities'

console.clear()

const getDestroyablePackages = () => {
  let packages = execSync('yarn lerna list --all --toposort --ndjson')
    .toString()
    .split('\n')
  packages = packages
    .slice(0, packages.length - 2)
    .slice(2)
    .reverse()
  const parsedPackages = packages.map((jsonString) => JSON.parse(jsonString))
  const packageDotJsons = parsedPackages.map((pack) =>
    JSON.parse(readFileSync(pack.location + '/package.json').toString()),
  )

  const filteredPackages = parsedPackages.filter(
    (...args) => packageDotJsons[args[1]].scripts?.destroy,
  )

  return filteredPackages
}

;(async () => {
  const packages = getDestroyablePackages()

  console.clear()

  for (const index in packages) {
    const pack = packages[Number(index)]

    const spinner = ora(
      `(${Number(index) + 1} of ${packages.length}) Destroying ${chalk.bold.yellow(pack.name)}.`,
    )
    spinner.start()

    const command = `cd ${pack.location} && yarn destroy`

    const success = await execAsync(command, { stdio: 'pipe' })

    if (success)
      spinner.succeed(
        `(${Number(index) + 1} of ${packages.length}) Destroyed ${chalk.bold.yellow(pack.name)}`,
      )
    else
      spinner.fail(
        `(${Number(index) + 1} of ${packages.length}) Destroy failed ${chalk.bold.yellow(pack.name)}`,
      )
  }
})()
