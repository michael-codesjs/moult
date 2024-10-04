import { USER_CREDENTIALS_DOMAIN_EVENTS } from "@domain/events";
import { AggregateRoot, DomainEvent, NotPutable, NotUpdateable } from "@shared";
import { UserCredentialsDTO } from "@domain/models";
import { UserCredentialsAttributes } from "./attributes";
import { CreateUserCredentialsParams, UpdateUserCredentialsParams } from "./types";

export class UserCredentials extends AggregateRoot {

  protected readonly attributes: UserCredentialsAttributes = new UserCredentialsAttributes();
  protected domainEvents: Array<USER_CREDENTIALS_DOMAIN_EVENTS> = [];

  protected eventVersion: number = 0

  constructor(attributes: Partial<UserCredentialsDTO>) {
    super();
    this.attributes.parse(attributes);
  }

  getDomainEvents(): Array<DomainEvent> {
    const domainEvents = Array.from(this.domainEvents);
    this.clearDomainEvents();
    return domainEvents;
  }

  protected registerDomainEvent(domainEvent: Omit<DomainEvent, "version">): void {
    this.domainEvents.push({ ...domainEvent, version: ++this.eventVersion } as USER_CREDENTIALS_DOMAIN_EVENTS);
  }

  protected clearDomainEvents() {
    this.domainEvents = [];
  }

  static create(attributes: CreateUserCredentialsParams): UserCredentials {

    if (!attributes.email && !attributes.phoneNumber && !attributes.username) throw new Error("At least one username parameter is to be supplied on creation.");

    const userCredentials = new UserCredentials(attributes);

    if (!userCredentials.attributes.isPutable()) throw new NotPutable();

    userCredentials.registerDomainEvent({
      name: "USER_CREDENTIALS_CREATED",
      payload: userCredentials.attributes.collective(),
      source: "UserCredentials",
      date: new Date(),
    });

    return userCredentials;

  }

  update(attributes: UpdateUserCredentialsParams) {

    const { username, email, phoneNumber } = attributes;
    this.attributes.set({ username, email, phoneNumber });

    const isUpdateable = this.attributes.isUpdateable();

    if (!isUpdateable) throw new NotUpdateable();

    this.registerDomainEvent({
      name: "USER_CREDENTIALS_UPDATED",
      payload: attributes,
      source: "UserCredentials",
      date: new Date()
    });

  }

  public toDTO(): UserCredentialsDTO {
    return this.attributes.collective();
  }

  public static fromDTO(params: UserCredentialsDTO) {
    return new UserCredentials(params);
  }

}