import { DomainEvent } from "../types/domain";
import { Attribute } from "./attribute";

export abstract class ValueObject<T, I extends boolean> extends Attribute<T, I> {
  abstract getDomainEvents(): Array<DomainEvent>;
  protected abstract registerDomainEvent(domainEvent: DomainEvent): void;
  protected abstract clearDomainEvents(): void
}