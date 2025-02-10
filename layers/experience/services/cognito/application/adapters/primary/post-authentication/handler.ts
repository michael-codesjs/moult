import { withLambdaStandard } from "@shared";
import { postAuthentication } from "@use-cases/post-authentication";
import { PostAuthenticationTriggerHandler } from "aws-lambda";

/** 'postAuthentication' lambda function handler. */
const handler: PostAuthenticationTriggerHandler = async event => {
    try {
        const isNewDevice = event.request.newDeviceUsed || false;
        const { sub } = event.request.userAttributes;

        if (!sub) {
            console.error('Missing user sub (id) in user attributes');
            return event;
        }

        await postAuthentication({ 
            id: sub, 
            isNewDevice 
        });

        return event;
    } catch (error) {
        console.error('Post authentication error:', error);
        return event;
    }
};

/** 'postAuthentication' handler wrapped in required middleware. */
export const main = withLambdaStandard(handler);