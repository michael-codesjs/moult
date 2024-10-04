import { GetUserDomainCommandPayload, GET_USER_DOMAIN_COMMAND } from "@domain/events";
import { withCommonInput, withLambdaIOStandard, CommonInputHandler, apiGwInputTransformer } from "@shared";
import { UserDTO } from "@typings";
import { container, dependencies } from "@dependencies";
import { UserUseCase } from "@interfaces/use-cases";

const inputMapper = async (input: GET_USER_DOMAIN_COMMAND): Promise<UserDTO> => {
    const users = container.get<UserUseCase>(dependencies.UserUseCases);
    return await users.getUser(input.payload.id);
};

/** 'createEstate' lambda function handler. */
export const handler: CommonInputHandler<GET_USER_DOMAIN_COMMAND, UserDTO> = withCommonInput(inputMapper, {
    singular: true as true
});

/** 'createEstate' lambda function handler wrapped in required middleware. */
export const main = (
    withLambdaIOStandard(handler)
    .use(apiGwInputTransformer((input: GetUserDomainCommandPayload): GET_USER_DOMAIN_COMMAND => ({
        date: new Date(),
        name: "GET_USER",
        payload: input,
        version: "1.0.0",
        source: "apiGwInputTransformer"
      })))
);