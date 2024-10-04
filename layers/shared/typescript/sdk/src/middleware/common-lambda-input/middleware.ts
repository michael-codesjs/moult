import middy from "@middy/core";
import { Consumers } from "./consumer-factory";
import { CommonInputSources } from "./types";

/** Provides a common interface for all events to your lambda function handlers. */
export const commonLambdaInput = <I, R>(): middy.MiddlewareObj<CommonInputSources<I, R>, R> => ({
  before: async request => {
    const consumer = Consumers.createConsumer(request);
    consumer(request);
  },
  after: async request => {
    if (request.internal.isApiGwEvent) {
      request.response = {
        statusCode: 200,
        body: JSON.stringify(request.response)
      } as R;
    }
  }
});

