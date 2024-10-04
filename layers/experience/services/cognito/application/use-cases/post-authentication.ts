import { DomainEventsRepository } from "@repositories";
import { USER_AUTHENTICATED_DOMAIN_EVENT } from "@typings";

export type PostAuthenticationUseCaseParams = { id: string, isNewDevice: boolean };
export type PostAuthenticationUseCase = (params: PostAuthenticationUseCaseParams) => Promise<void>;

/**
 * Post authentication use-case.
 * 
 * Publishes a "USER_AUTHENTICATED" domain event.
 * @param params
 */
export const postAuthentication: PostAuthenticationUseCase = async (params) => {
    
    const userAuthenticatedEvent: USER_AUTHENTICATED_DOMAIN_EVENT = {
        source: "postAuthentication",
        name: "USER_AUTHENTICATED",
        payload: params,
        date: new Date(),
        version: 1
    };

    const domainEventsRepository = new DomainEventsRepository();
    await domainEventsRepository.publish([userAuthenticatedEvent]);

};