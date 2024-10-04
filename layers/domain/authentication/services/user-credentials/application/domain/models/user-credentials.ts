import { USER_CREDENTIALS_DOMAIN_EVENTS } from "@domain/events";

export type UserCredentialsAggregateDTO = {
    id: string,
    type: "UserCredentials",
    version: number,
    lastEvents: Record<number, USER_CREDENTIALS_DOMAIN_EVENTS>;
};

export type UserCredentialsEventDTO<P extends USER_CREDENTIALS_DOMAIN_EVENTS> = {
    id: string,
    version: number,
    name: USER_CREDENTIALS_DOMAIN_EVENTS["name"],
    payload: P,
};

export type UserCredentialsSnapshotDTO = {
    id: string,
    version: number,
    payload: UserCredentialsDTO
    created: Date,
};

export type UserCredentialsDTO = {
    entityType: "USER_CREDENTIALS",
    id: string,
    creatorType: "USER_CREDENTIALS",
    creator: string,
    created: Date,
    modified: Date,
    discontinued: boolean
    email?: string,
    phoneNumber?: string,
    username?: string,
    password: string,
    emailVerified?: boolean,
    phoneNumberVerified?: boolean,
};