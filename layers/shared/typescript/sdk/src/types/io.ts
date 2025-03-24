export type CommonInput<T, P> = {
  /** typeof of input. */
  type: T
  /** correlation id. */
  correlationId: string
  /** consumer specific meta data. */
  meta?: Record<string, any>
  /** input payload. */
  payload: P
}

type RecordAny = Record<string, any>
export type DbStreamInput<
  N extends RecordAny = RecordAny,
  O extends RecordAny = N,
> = {
  new: N
  old: O
}

export type OpearationResponse = {
  success: boolean
  message?: string
}
