import { container, dependencies } from "@dependencies";
import { DELETE_USER_DOMAIN_COMMAND } from "@domain/events";
import { UserUseCase } from "@interfaces/use-cases";
import { CommonInputHandler, OpearationResponse, withCommonInput, withLambdaIOStandard } from "@shared";

const inputMapper = async (input: DELETE_USER_DOMAIN_COMMAND): Promise<OpearationResponse> => {

    const users = container.get<UserUseCase>(dependencies.UserUseCases);
    await users.deleteUser(input.payload.id);
    
    return { success: true, message: "User deleted successfully." };

};

/** 'deleteUser' lambda function handler. */
export const handler: CommonInputHandler<DELETE_USER_DOMAIN_COMMAND, OpearationResponse> = withCommonInput(inputMapper, {
    singular: true as true
});

/** 'createEstate' lambda function handler wrapped in required middleware. */
export const main = withLambdaIOStandard(handler);