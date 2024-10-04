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

export interface EventsAdapter {
    publish(events: Array<DomainEvent>): Promise<void>
};