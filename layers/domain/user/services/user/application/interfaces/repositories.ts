import { User } from "@domain/entities";
import { DomainEvent } from "../../../../../../shared/typescript/sdk/src/types";

export interface UserRepository {
    get(id: string): Promise<User>,
    update(params: User): Promise<User>,
    put(params: User): Promise<User>,
    delete(id: string): Promise<void>,
    getByEmail(email: string): Promise<User>
    getByPhoneNumber(phoneNumber: string): Promise<User>
};

export interface EventsRepositrory {
    publish(events: Array<DomainEvent>): Promise<void>
};