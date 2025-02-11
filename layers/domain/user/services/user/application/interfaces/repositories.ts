import { User } from "@domain/aggregate";
import { USER_CREATED_DOMAIN_EVENT, USER_DOMAIN_EVENTS } from "@domain/events";
import { UserAggregateDTO } from "@domain/models";
import { DomainEvent } from "@shared";

export interface UserMaterializedViewRepository {
    get(id: string): Promise<User>,
    update(params: User): Promise<User>,
    put(params: User): Promise<User>,
    delete(id: string): Promise<void>,
    getByEmail(email: string): Promise<User>
    getByPhoneNumber(phoneNumber: string): Promise<User>,
    getByUsername(username: string): Promise<User>
};

export interface UserAggregateRepository {
    get(id: string): Promise<User>
    // update(params: User): Promise<UserAggregateDTO>,
    // put(params: User): Promise<UserAggregateDTO>
};

export interface UserEventStoreRepository {

}

export interface UserMaterializedViewRepository {

}

export interface EventsRepositrory {
    publish(events: Array<DomainEvent>): Promise<void>
    write(events: Array<DomainEvent>): Promise<void>
    read(id: string): Promise<Array<USER_DOMAIN_EVENTS>>
};