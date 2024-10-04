import { UserDTO } from "@typings/user";
import { DomainEvent } from "@shared";

export interface UserDatabaseAdapter {
    put(id: UserDTO): Promise<UserDTO>,
    get(id: string): Promise<UserDTO>,
    update(id: UserDTO): Promise<UserDTO>,
    delete(id: string): Promise<void>,
    getByEmail(email: string): Promise<UserDTO>,
    getByPhoneNumber(phoneNumber: string): Promise<UserDTO>
};

export interface EventsAdapter {
    publish(events: Array<DomainEvent>): Promise<void>
};