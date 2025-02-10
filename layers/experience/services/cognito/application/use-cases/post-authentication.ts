import { DomainEventsRepository } from "@repositories";
import { USER_AUTHENTICATED_DOMAIN_EVENT } from "@typings";
import { randomUUID } from "crypto";

export type PostAuthenticationUseCaseParams = { id: string, isNewDevice: boolean };
export type PostAuthenticationUseCase = (params: PostAuthenticationUseCaseParams) => Promise<void>;

/**
 * Post authentication use-case.
 * 
 * Publishes a "USER_AUTHENTICATED" domain event.
 * @param params
 */
export const postAuthentication: PostAuthenticationUseCase = async (params) => {
    // if (!params || !params.id) {
    //     throw new Error('Invalid parameters: id is required');
    // }

    // const userAuthenticatedEvent: USER_AUTHENTICATED_DOMAIN_EVENT = {
    //     id: randomUUID(),
    //     source: "postAuthentication",
    //     name: "USER_AUTHENTICATED",
    //     payload: {
    //         id: params.id,
    //         isNewDevice: params.isNewDevice
    //     },
    //     date: new Date(),
    //     version: 1
    // };

    // const domainEventsRepository = new DomainEventsRepository();
    // await domainEventsRepository.publish([userAuthenticatedEvent]);
};