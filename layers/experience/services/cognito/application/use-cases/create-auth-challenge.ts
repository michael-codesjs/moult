import { configureEnviromentVariables, WithPartial, DEFAULT_AUTH_CHALLENGE } from "@shared";
import * as digitGenerator from "crypto-secure-random-digit";

configureEnviromentVariables();

export type CreateAuthChallengeUseCaseParamsAllRequired = { email: string, phoneNumber: string };
export type CreateAuthChallengeUseCaseParamsEmailRequired = WithPartial<CreateAuthChallengeUseCaseParamsAllRequired, "phoneNumber">;
export type CreateAuthChallengeUseCaseParamsPhoneNumberRequired = WithPartial<CreateAuthChallengeUseCaseParamsAllRequired, "email">

// type aliases
type A = CreateAuthChallengeUseCaseParamsAllRequired;
type E = CreateAuthChallengeUseCaseParamsEmailRequired;
type P = CreateAuthChallengeUseCaseParamsPhoneNumberRequired;

export type CreateAuthChallengeUseCaseParams<T extends (A | E | P)> = (
    T extends CreateAuthChallengeUseCaseParamsEmailRequired ? CreateAuthChallengeUseCaseParamsEmailRequired :
    T extends CreateAuthChallengeUseCaseParamsPhoneNumberRequired ? CreateAuthChallengeUseCaseParamsPhoneNumberRequired :
    CreateAuthChallengeUseCaseParamsAllRequired
);

export type CreateAuthChallengeUseCase = <T extends (A | E | P)>(params: CreateAuthChallengeUseCaseParams<T>) => Promise<string>; 

export const createAuthChallenge: CreateAuthChallengeUseCase = async (params) => {

    if(!("email" in params) && !("phoneNumber" in params)) throw new Error("Either email or phoneNumber is required.");

    const STAGE = process.env.STAGE;
    const challenge = STAGE === "prod" ? digitGenerator.randomDigits(6).join("") : DEFAULT_AUTH_CHALLENGE; // genereate 6 digit OTP in prod, use DEFAULT_OTP in other stages.

    // TODO: send sms & email.

    return challenge;

};