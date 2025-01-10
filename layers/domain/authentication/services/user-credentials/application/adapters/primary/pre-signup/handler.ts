import "reflect-metadata";
import { PreSignUpTriggerHandler } from "aws-lambda";

const preSignUp: PreSignUpTriggerHandler = async (event) => {

  console.log('pre sign up event:', event)

  event.response.autoConfirmUser = true
  event.response.autoVerifyEmail = true
  event.response.autoVerifyPhone = true

  return event.response

}

/** 'createUserCredentials' lambda function handler wrapped in required middleware. */
export const main = preSignUp