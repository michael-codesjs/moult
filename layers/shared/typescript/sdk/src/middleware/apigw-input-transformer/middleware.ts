import middy from "@middy/core";
import { CommonInputEvent } from "../common-lambda-input/types";

export type ApiGwInputTransformerFunction<OI = any, NI = any> = (input: OI) => NI;

export const apiGwInputTransformer = <I, R>(transformer: ApiGwInputTransformerFunction<I>): middy.MiddlewareObj<CommonInputEvent<I>, R> => ({
  before: async request => {
    const { isApiGwEvent } = request.internal || {};
    if (isApiGwEvent) request.event.inputs = request.event.inputs.map((input) => transformer(input));
  }
});