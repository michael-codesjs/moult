export type DomainEvent<
  S extends string = string,
  N extends string = string,
  P extends Record<string, any> = Record<string, any>,
> = {
  id: string
  source: S // source of the domain event.
  name: N // unique name of the event domain event, eg: ESTATE_CREATED
  payload: P // event payload
  date: Date // date the event was created.
}

export type DomainCommand<
  S extends string = string,
  N extends string = string,
  P extends Record<string, any> = Record<string, any>,
> = {
  source: S
  name: N
  payload: P
}
