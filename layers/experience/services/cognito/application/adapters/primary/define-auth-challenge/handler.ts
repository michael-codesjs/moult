import { DefineAuthChallengeTriggerHandler } from 'aws-lambda'
import { withLambdaStandard } from "@shared";


/** 'defineAuthChallenge' lambda function handler. */
const handler: DefineAuthChallengeTriggerHandler = async event => {

    const hasSession = event.request.session;
    const isNotCustomChallenge = hasSession && event.request.session.find(attempt => attempt.challengeName !== 'CUSTOM_CHALLENGE');
    const isRightAnswer = Boolean(hasSession && event.request.session[event.request.session.length-1]?.challengeResult);
    const isContinousWrongAnswer = hasSession &&  event.request.session.length >= 3 && event.request.session[event.request.session.length].challengeResult === false; // user provided wrong answer 3 times

    if (isNotCustomChallenge || isContinousWrongAnswer) { // fail auth

        event.response.issueTokens = false;
        event.response.failAuthentication = true;

    } else if (isRightAnswer) { // succeed auth

        event.response.issueTokens = true;
        event.response.failAuthentication = false;
    
    } else {

        event.response.issueTokens = false;
        event.response.failAuthentication = false;
        event.response.challengeName = "CUSTOM_CHALLENGE";
    }

    return event;

};

/** 'defineAuthChallenge' handler wrapped in required middleware. */
export const main = withLambdaStandard(handler);
