import { CommonInputHandler } from '../middleware/common-lambda-input/types'

type Handler<I, R> = (input: I) => Promise<R>
type Config<S extends boolean> = { singular: S }
type WithCommonInput = <I, R, S extends boolean>(
  handler: Handler<I, R>,
  config: Config<S>,
) => CommonInputHandler<I, Awaited<S extends true ? R : Array<R>>>

/** Generates a CommonInputHandler that maps, applies and returns the result of a supplied function on each input. */
export const withCommonInput: WithCommonInput =
  (handler, config) => async (event) => {
    const responses = []
    for (const input of event.inputs) {
      responses.push(await handler(input))
    }
    return config.singular === true ? responses[0] : responses
  }
