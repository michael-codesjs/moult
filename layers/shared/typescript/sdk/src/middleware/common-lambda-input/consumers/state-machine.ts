import middy from "@middy/core";
import { Context } from "aws-lambda";
import { CommonInputEvent, Consumer, StateMachineEvent } from "../types";

/** Consumes StateMachineEvent and transforms it to a CommonInputEvent. */
export const stateMachineConsumer: Consumer = (request: middy.Request<StateMachineEvent, any, Error, Context>) => {
  let event: CommonInputEvent<any> = { inputs: [request.event.payload] }; // create new CommonInputEvent with inputs including the request.event.payload
  request.event = event as unknown as StateMachineEvent; // replace StateMachine event with CommonInputEvent.
};