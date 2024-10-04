import middy from "@middy/core";
import { AppSyncResolverEvent, Context } from "aws-lambda";
import { CommonInputEvent, Consumer } from "../types";

/** Consumes AppSyncResolverEvent and transforms it to a CommonInputEvent. */
export const appsyncConsumer: Consumer = (request: middy.Request<AppSyncResolverEvent<any, unknown>, any, Error, Context>) => {
  let event: CommonInputEvent<any> = { inputs: [request.event.arguments] }; // create new CommonInputEvent with inputs including the request.event.arguments
  request.event = event as unknown as AppSyncResolverEvent<unknown, unknown>; // replace AppSyncResolverEvent event with CommonIOEvent
};