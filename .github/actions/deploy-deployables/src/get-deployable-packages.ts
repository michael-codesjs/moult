import { execSync } from 'child_process'
import { readFileSync } from 'fs'

type DeployablePackage = {
  name: string
  version: string
  private: boolean
  location: string
  packageDotJson: any
}

type GetDeployablePackages = () => Array<DeployablePackage>

export const getDeployablePackages: GetDeployablePackages = () => {
  let packages = execSync('yarn lerna list --all --toposort --ndjson')
    .toString()
    .split('\n')
  packages = packages
    .slice(0, packages.length - 2)
    .slice(2)
    .reverse()
  const parsedPackages = packages.map((jsonString) => JSON.parse(jsonString))
  parsedPackages.forEach(
    (pack) =>
      (pack.packageDotJson = JSON.parse(
        readFileSync(pack.location + '/package.json').toString(),
      )),
  )

  const filteredPackages = parsedPackages.filter(
    (pack) => pack.packageDotJson.scripts?.deploy,
  )

  return filteredPackages
}
