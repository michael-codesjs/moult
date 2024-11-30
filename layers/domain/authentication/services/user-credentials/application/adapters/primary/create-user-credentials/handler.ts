import "reflect-metadata";
import { CREATE_USER_CREDENTIALS_DOMAIN_COMMAND } from "@domain/events";
import { withCommonInput, withLambdaIOStandard, CommonInputHandler } from "@shared";
import { UserCredentialsDTO } from "@domain/models";
import { container, dependencies } from "@dependencies";
import { UserCredentialsUseCase } from "@interfaces";

const inputMapper = async (input: CREATE_USER_CREDENTIALS_DOMAIN_COMMAND): Promise<UserCredentialsDTO> => {
  const userCredentials: UserCredentialsUseCase = container.get(dependencies.UserCredentialsUseCase);
  return await userCredentials.createUserCredentials(input.payload);
}

/** 'createUserCredentials' lambda function handler. */
export const handler: CommonInputHandler<CREATE_USER_CREDENTIALS_DOMAIN_COMMAND, UserCredentialsDTO> = withCommonInput(inputMapper, {
  singular: true as true
});

/** 'createUserCredentials' lambda function handler wrapped in required middleware. */
export const main = withLambdaIOStandard(handler);