export enum Deployables {
  ALL = "infrastructure & microservices",
  INFRASTRUCTURE = "infrastrucutre(only)",
  MICROSERVICES = "microservices(only)"
}

export enum AwsRegions {
  EU_CENTRAL_1 = "eu-central-1"
}

export enum Stages {
  DEV = "dev",
  TEST = "test",
  PROD = "prod"
}

export type Params  = {
  deployables: Deployables,
  region: AwsRegions,
  stage: Stages,
};