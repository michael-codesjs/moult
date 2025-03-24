import middy from '@middy/core'
import { APIGatewayProxyEvent, Context } from 'aws-lambda'
import { unstringify } from '../../../utilities/functions/miscellanous'
import { CommonInputEvent, Consumer } from '../types'

/** Consumes APIGatewayProxyEvent and transforms it to a CommonInputEvent. */
export const apiGatewayConsumer: Consumer = (
  request: middy.Request<APIGatewayProxyEvent, any, Error, Context>,
) => {
  const parsedBody = unstringify(request.event.body)
  const input = parsedBody !== null ? parsedBody : request.event.body || {}
  Object.assign(input, request.event.pathParameters)

  let event: CommonInputEvent<any> = { inputs: [input] } // create new CommonInputEvent with inputs including the request.event.body

  request.event = event as unknown as APIGatewayProxyEvent // replace APIGatewayProxyEvent event with CommonIOEvent
}
