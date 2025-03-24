import { withLambdaStandard } from '@shared'
import {
  createAuthChallenge,
  CreateAuthChallengeUseCaseParamsAllRequired,
} from '@use-cases/create-auth-challenge'
import { CreateAuthChallengeTriggerHandler } from 'aws-lambda'

/** 'createAuthChallenge' lambda function handler. */
const handler: CreateAuthChallengeTriggerHandler = async (event) => {
  const { email, phoneNumber } = event.request.userAttributes
  const params: CreateAuthChallengeUseCaseParamsAllRequired = {
    email,
    phoneNumber,
  }

  const SECRET_CODE = await createAuthChallenge(params)

  event.response.privateChallengeParameters = { SECRET_CODE }
  event.response.challengeMetadata = `CODE-${SECRET_CODE}`

  return event
}

export const main = withLambdaStandard(handler)
