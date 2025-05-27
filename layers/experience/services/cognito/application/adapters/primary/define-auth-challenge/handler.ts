import { DefineAuthChallengeTriggerHandler } from 'aws-lambda'
import { withLambdaStandard } from '@moult/sdk'

/** 'defineAuthChallenge' lambda function handler. */
const handler: DefineAuthChallengeTriggerHandler = async (event) => {
  console.log('Define auth challenge event:', JSON.stringify(event, null, 2))

  const user_is_confirmed =
    event.request.userAttributes['cognito:user_status'] === 'CONFIRMED'

  if (!event.request.session || event.request.session.length === 0) {
    // The first challenge should be SRP_A
    event.response.challengeName = 'SRP_A'
    event.response.issueTokens = false
    event.response.failAuthentication = false
    return event
  }

  // Get the last challenge from the session
  const lastChallenge = event.request.session[event.request.session.length - 1]

  if (
    lastChallenge.challengeName === 'SRP_A' &&
    lastChallenge.challengeResult === true
  ) {
    // After successful SRP_A, initiate PASSWORD_VERIFIER
    event.response.challengeName = 'PASSWORD_VERIFIER'
    event.response.issueTokens = false
    event.response.failAuthentication = false
    return event
  }

  if (
    lastChallenge.challengeName === 'PASSWORD_VERIFIER' &&
    lastChallenge.challengeResult === true
  ) {
    // After successful password verification, start custom challenge
    event.response.challengeName = 'CUSTOM_CHALLENGE'
    event.response.issueTokens = false
    event.response.failAuthentication = false
    return event
  }

  if (lastChallenge.challengeName === 'CUSTOM_CHALLENGE') {
    if (lastChallenge.challengeResult === true) {
      // User provided the right answer, authentication successful
      event.response.issueTokens = true
      event.response.failAuthentication = false
      return event
    }

    // Count the number of failed custom challenges
    const failedChallenges = event.request.session.filter(
      (challenge) =>
        challenge.challengeName === 'CUSTOM_CHALLENGE' &&
        challenge.challengeResult === false,
    ).length

    if (failedChallenges >= 3) {
      // Too many failed attempts
      event.response.issueTokens = false
      event.response.failAuthentication = true
      return event
    }

    // Present another custom challenge
    event.response.challengeName = 'CUSTOM_CHALLENGE'
    event.response.issueTokens = false
    event.response.failAuthentication = false
    return event
  }

  // If we don't recognize the challenge, fail authentication
  event.response.issueTokens = false
  event.response.failAuthentication = true
  return event
}

/** 'defineAuthChallenge' handler wrapped in required middleware. */
export const main = withLambdaStandard(handler)
