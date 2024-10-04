import { AggregateRoot, ValueObject, NotPutable, NotUpdateable, DomainEvent } from "@shared";
import { UserDTO } from "@typings";
import { CreateUserParams, UpdateUserParams } from "./types";
import { UserAttributes } from "./attributes";

/** The `Estate` entity represents physical land and any permanent structures attached to the it. */
export class User extends AggregateRoot {

  protected readonly attributes: UserAttributes = new UserAttributes();
  protected domainEvents: Array<DomainEvent> = [];

  constructor(attributes: Partial<UserDTO>) {
    super();
    this.attributes.parse(attributes);
  }

  getDomainEvents(): Array<DomainEvent> {
    const domainEvents = Array.from(this.domainEvents)
    this.clearDomainEvents();
    return domainEvents;
  }

  protected registerDomainEvent(domainEvent: DomainEvent): void {
    this.domainEvents.push(domainEvent);
  }

  protected clearDomainEvents() {
    this.domainEvents = [];
  }

  static create(attributes: CreateUserParams): User {

    const user = new User(attributes);
    const isPutable = user.attributes.isPutable();
    if (!isPutable) throw new NotPutable();

    return user;

  }

  update(attributes: UpdateUserParams): void {
    
    const { name, email, phoneNumber, dateOfBirth } = attributes;
    this.attributes.set({ name, email, phoneNumber, dateOfBirth });

    const isUpdateable = this.attributes.isUpdateable();
    
    if(!isUpdateable) throw new NotUpdateable();
  
  }

  public toDTO(): UserDTO {
    return this.attributes.collective();
  }

  public static fromDTO(params: UserDTO) {
    return new User(params);
  }

}