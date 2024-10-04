import { DomainEvent } from "@shared";

export type USER_AUTHENTICATED_DOMAIN_EVENT = DomainEvent<
    "postAuthentication",
    "USER_AUTHENTICATED",
    { id: string, isNewDevice: boolean }
>;