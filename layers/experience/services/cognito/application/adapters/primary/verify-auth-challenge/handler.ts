import { withLambdaStandard } from '@shared'
import { verifyAuthChallenge } from '@use-cases/verify-auth-challenge'
import { VerifyAuthChallengeResponseTriggerHandler } from 'aws-lambda'

/** 'verifyAuthChallenge' lambda function handler. */
const handler: VerifyAuthChallengeResponseTriggerHandler = async (event) => {
  const challenge = event.request.privateChallengeParameters!.SECRET_CODE // challenge we created.
  const challengeAnswer = event.request.challengeAnswer // answer submitted by user.

  event.response.answerCorrect = verifyAuthChallenge({
    challenge,
    challengeAnswer,
  })

  return event
}

/** 'verifyAuthChallenge' handler wrapped in required middleware. */
export const main = withLambdaStandard(handler)
