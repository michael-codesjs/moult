import { DomainEvent } from '../types/domain';
import { Entity } from './entity';

export abstract class AggregateRoot extends Entity {
  abstract getDomainEvents(): DomainEvent[];
  protected abstract registerDomainEvent(domainEvent: DomainEvent): void;
  protected abstract clearDomainEvents(): void
};