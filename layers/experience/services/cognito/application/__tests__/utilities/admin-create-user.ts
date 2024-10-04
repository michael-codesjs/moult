import * as clientCognitoIdentityProvider from "@aws-sdk/client-cognito-identity-provider";
import { configureEnviromentVariables } from "@shared";
import { Chance } from "chance";
import { getRandomUserCognitoAttributes } from ".";

const chance = new Chance();
const { COGNITO_USER_POOL_ID, REGION } = configureEnviromentVariables();
const cognitoProvider = new clientCognitoIdentityProvider.CognitoIdentityProvider({ region: REGION || "eu-central-1" });

/** Creates user using admin methods */
export const adminCreateUser = async () => {

    const { name, phoneNumber, email, password } = getRandomUserCognitoAttributes();
    const username = chance.first() + chance.integer({ min: 1 });

    // CREATE USER

    const adminCreateUserCommand = new clientCognitoIdentityProvider.AdminCreateUserCommand({
        Username: username,
        UserAttributes: [
            { Name: "name", Value: name },
            { Name: "phone_number", Value: phoneNumber },
            { Name: "email", Value: email },
        ],
        MessageAction: "SUPPRESS",
        UserPoolId: COGNITO_USER_POOL_ID
    });

    const { User } = await cognitoProvider.send(adminCreateUserCommand);

    // VERIFY USER

    const adminConfirmSignUpCommand = new clientCognitoIdentityProvider.AdminUpdateUserAttributesCommand({
        Username: username,
        UserPoolId: COGNITO_USER_POOL_ID,
        UserAttributes: [
            { Name: "email_verified", Value: "true" },
            { Name: "phone_number_verified", Value: "true" }
        ]
    });

    await cognitoProvider.send(adminConfirmSignUpCommand);

    return {
        id: User.Username,
        name, phoneNumber, email, password
    };

}