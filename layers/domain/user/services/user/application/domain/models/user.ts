import { USER_DOMAIN_EVENTS } from "@domain/events";

export type UserAggregateDTO = {
    id: string,
    type: "User",
    version: number,
    lastEvents: Record<number, USER_DOMAIN_EVENTS>;
};

export type UserEventDTO<P extends USER_DOMAIN_EVENTS> = {
    id: string,
    version: number,
    name: USER_DOMAIN_EVENTS["name"],
    payload: P,
};

export type UserSnapshotDTO = {
    id: string,
    version: number,
    payload: UserDTO
    created: Date,
};

export type UserDTO = {
    entity_type: "USER",
    id: string,
    creator_type: "USER",
    creator: string,
    created: Date,
    modified: Date,
    discontinued: boolean
    email?: string,
    phone_number?: string,
    username?: string,
    password: string,
    email_verified?: boolean,
    phoneNumber_verified?: boolean,
    name?: string,
    profile_picture?: string,
};