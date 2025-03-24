import middy from '@middy/core'
import { Context, EventBridgeEvent } from 'aws-lambda'
import { CommonInputEvent, Consumer } from '../types'

/** Consumes EventBridgeEvent and transforms it to a CommonInputEvent. */
export const eventBridgeConsumer: Consumer = (
  request: middy.Request<EventBridgeEvent<any, any>, any, Error, Context>,
) => {
  let event: CommonInputEvent<any> = { inputs: [request.event.detail] } // create new CommonInputEvent with inputs including the request.event.detail.
  request.event = event as unknown as EventBridgeEvent<any, any> // replace EventBridge event with CommonIOEvent.
}
