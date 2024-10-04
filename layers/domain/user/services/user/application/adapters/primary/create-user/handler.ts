import { CREATE_USER_DOMAIN_COMMAND } from "@domain/events";
import { withCommonInput, withLambdaIOStandard, CommonInputHandler } from "@shared";
import { UserDTO } from "@typings";
import { container, dependencies } from "@dependencies";
import { UserUseCase } from "@interfaces/use-cases";

const inputMapper = async (input: CREATE_USER_DOMAIN_COMMAND): Promise<UserDTO> => {
    const users = container.get<UserUseCase>(dependencies.UserUseCases);
    return await users.createUser(input.payload);
}

/** 'createUser' lambda function handler. */
export const handler: CommonInputHandler<CREATE_USER_DOMAIN_COMMAND, UserDTO> = withCommonInput(inputMapper, {
    singular: true as true
});

/** 'createUser' lambda function handler wrapped in required middleware. */
export const main = withLambdaIOStandard(handler);