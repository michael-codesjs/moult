import { fromNodeProviderChain } from "@aws-sdk/credential-providers";
import { createSignedFetcher } from 'aws-sigv4-fetch';
import { configureEnviromentVariables } from '../utilities/functions/miscellanous';

const { REGION } = configureEnviromentVariables();

export const apiGatewaySignedFetch = createSignedFetcher({
  service: "execute-api",
  region: REGION || "eu-central-1",
  credentials: fromNodeProviderChain() // get AWS credentials.
});