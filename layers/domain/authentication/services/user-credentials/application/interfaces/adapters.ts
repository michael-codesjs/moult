import { USER_CREDENTIALS_DOMAIN_EVENTS } from "@domain/events";
import { UserCredentialsDTO } from "@domain/models/user-credentials";
import { DomainEvent } from "@shared";

export interface UserDatabaseAdapter {
    put(dto: UserCredentialsDTO): Promise<UserCredentialsDTO>,
    get(id: string): Promise<UserCredentialsDTO>,
    update(dto: UserCredentialsDTO): Promise<UserCredentialsDTO>,
    delete(id: string): Promise<void>,
    getByEmail(email: string): Promise<UserCredentialsDTO>,
    getByPhoneNumber(phoneNumber: string): Promise<UserCredentialsDTO>,
    getByUsername(username: string): Promise<UserCredentialsDTO>
};

export interface EventBusAdapter {
    publish(events: Array<DomainEvent>): Promise<void>
};

export interface EventStoreAdapter {
    write(events: Array<USER_CREDENTIALS_DOMAIN_EVENTS>): Promise<void>
    read(id: string): Promise<Array<USER_CREDENTIALS_DOMAIN_EVENTS>>
};