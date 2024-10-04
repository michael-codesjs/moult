import { container, dependencies } from "@dependencies";
import { UPDATE_USER_DOMAIN_COMMAND } from "@domain/events";
import { UserUseCase } from "@interfaces/use-cases";
import { CommonInputHandler, withCommonInput, withLambdaIOStandard } from "@shared";
import { UserDTO } from "@typings";

const inputMapper = async (input: UPDATE_USER_DOMAIN_COMMAND): Promise<UserDTO> => {
    const users = container.get<UserUseCase>(dependencies.UserUseCases);
    return await users.updateUser(input.payload);
};

/** 'createEstate' lambda function handler. */
export const handler: CommonInputHandler<UPDATE_USER_DOMAIN_COMMAND, UserDTO> = withCommonInput(inputMapper, {
    singular: true as true
});

/** 'createEstate' lambda function handler wrapped in required middleware. */
export const main = withLambdaIOStandard(handler);