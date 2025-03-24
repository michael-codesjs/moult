import { withLambdaStandard } from '@shared'
import { preSignUp } from '@use-cases/pre-sign-up'
import { PreSignUpTriggerHandler } from 'aws-lambda'

/** 'preSignUp' lambda function handler. */
const handler: PreSignUpTriggerHandler = async (event) => {
  const { email, phone_number } = event.request.userAttributes

  const preSignUpParams: { email?: string; phoneNumber?: string } = {}

  if (email) preSignUpParams.email = email
  if (phone_number) preSignUpParams.phoneNumber = phone_number

  const { confirmed, emailVerified, phoneNumberVerified } =
    await preSignUp(preSignUpParams)

  event.response.autoConfirmUser = true
  event.response.autoVerifyEmail = emailVerified
  event.response.autoVerifyPhone = phoneNumberVerified

  return event
}

/** 'preSignUp' handler wrapped in required middleware. */
export const main = withLambdaStandard(handler)
