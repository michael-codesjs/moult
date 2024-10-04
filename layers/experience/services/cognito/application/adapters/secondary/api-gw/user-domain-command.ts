import { UserDomainCommandAdapter } from "@interfaces";
import { CreateUserDomainCommand, CheckIfUserWithUsernameAttributeExistsCommand } from "@typings";
import { apiGatewaySignedFetch, configureEnviromentVariables } from "@shared";

const { CENTRAL_API_URL } = configureEnviromentVariables();

export class ApiGwDomainCommandAdapter implements UserDomainCommandAdapter {

    async sendCreateUserCommand(params: { [k: string]: string; id: string; }): Promise<void> {

        const createUserDomainCommand: CreateUserDomainCommand = {
            source: "moult.services.cognito.confirmSignUp",
            name: "CREATE_USER",
            payload: params,
            date: new Date(),
            version: "1.0.0"
        };

        await apiGatewaySignedFetch(CENTRAL_API_URL + "/user", {
            method: "POST",
            body: JSON.stringify(createUserDomainCommand),
        });

    }

    async sendCheckIfUserWithUsernameAttributeExistsCommand(params): Promise<boolean> {

        const checkIfUserWithUsernameAttributeExistsCommand: CheckIfUserWithUsernameAttributeExistsCommand = {
            source: "moult.services.cognito.preSignUp",
            name: "CHECK_IF_USER_WITH_USERNAME_ATTRIBUTES_EXISTS",
            payload: params,
            date: new Date(),
            version: "1.0.0"
        };

        const result = await apiGatewaySignedFetch(CENTRAL_API_URL + "/user/exists-with-username-attributes", {
            method: "POST",
            body: JSON.stringify(checkIfUserWithUsernameAttributeExistsCommand),
        });

        const { exists } = await result.json();

        return exists;

    }

}