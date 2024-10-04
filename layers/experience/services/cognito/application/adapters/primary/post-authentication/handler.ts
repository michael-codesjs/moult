import { withLambdaStandard } from "@shared";
import { postAuthentication } from "@use-cases/post-authentication";
import { PostAuthenticationTriggerHandler } from "aws-lambda";

/** 'postAuthentication' lambda function handler. */
const handler: PostAuthenticationTriggerHandler = async event => {

    const isNewDevice = event.request.newDeviceUsed;
    const { sub } = event.request.userAttributes;
    
    await postAuthentication({ id: sub, isNewDevice });

    return event;

};

/** 'postAuthentication' handler wrapped in required middleware. */
export const main = withLambdaStandard(handler);