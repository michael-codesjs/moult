import { AppSyncResolverEvent, Context, SNSEvent, SQSEvent, APIGatewayProxyEvent, EventBridgeEvent, DynamoDBStreamEvent } from "aws-lambda";
import middy from "@middy/core";

export enum InputSource {
  SNS = "SNS",
  SQS = "SQS",
  AppSync = "AppSync",
  ApiGateway = "ApiGateway"
}

export type CommonInputEvent<I extends Record<string, any>> = { inputs: Array<I> };
export type CommonInputHandler<I, R> = (event: CommonInputEvent<I>, context?: Context) => Promise<R>;
export type CommonInputSources<I, R> = (
  SNSEvent
  | SQSEvent
  | AppSyncResolverEvent<I, R>
  | StateMachineEvent<I>
  | APIGatewayProxyEvent
  | EventBridgeEvent<any, any>
  | DynamoDBStreamEvent
);
export type Consumer = (request: middy.Request<CommonInputSources<any, any>, any, Error, Context>) => void;

export type StateMachineEvent<P extends Record<string, any> = Record<string, any>> = {
  source: "StateMachine",
  attributes: {
    type: string,
    correlationId?: string,
  }
  payload: P
}