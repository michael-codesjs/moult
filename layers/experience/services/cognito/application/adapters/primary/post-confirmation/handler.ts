import { withLambdaStandard } from '@shared'
import { createUser } from '@use-cases'
import { PostConfirmationTriggerHandler } from 'aws-lambda'

/** 'postConfirmation' lambda function handler. */
const handler: PostConfirmationTriggerHandler = async (event) => {
  const { sub, ...attriibutes } = event.request.userAttributes
  const params = { ...attriibutes, id: sub }

  await createUser(params)

  return event
}

/** 'postConfirmation' handler wrapped in required middleware. */
export const main = withLambdaStandard(handler)
