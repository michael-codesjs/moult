import { UserCredentials } from "@domain/aggregate";
import { UserCredentialsAggregateDTO } from "@domain/models";
import { DomainEvent } from "@shared";

export interface UserCredentialsMaterializedViewRepository {
    get(id: string): Promise<UserCredentials>,
    update(params: UserCredentials): Promise<UserCredentials>,
    put(params: UserCredentials): Promise<UserCredentials>,
    delete(id: string): Promise<void>,
    getByEmail(email: string): Promise<UserCredentials>
    getByPhoneNumber(phoneNumber: string): Promise<UserCredentials>,
    getByUsername(username: string): Promise<UserCredentials>
};

export interface UserCredentialsAggregateRepository {
    get(id: string): Promise<UserCredentialsAggregateDTO>
    update(params: UserCredentials): Promise<UserCredentialsAggregateDTO>,
    put(params: UserCredentials): Promise<UserCredentialsAggregateDTO>
};

export interface UserCredentialsEventStoreRepository {

}

export interface UserCredentialsMaterializedViewRepository {

}

export interface EventsRepositrory {
    publish(events: Array<DomainEvent>): Promise<void>
};