import middy from "@middy/core";
import { Context, SQSEvent } from "aws-lambda";
import { CommonInputEvent, Consumer } from "../types";

/** Consumes SQSEvent and transforms it to a CommonInputEvent. */
export const sqsConsumer: Consumer = (request: middy.Request<SQSEvent, any, Error, Context>) => {

  let event: CommonInputEvent<any> = {
    inputs: []
  }; // create new CommonInputEvent.

  for (const record of request.event.Records) {
    // parse record and push it into the inputs of the CommonInputEvent.
    const body = JSON.parse(record.body);
    event.inputs.push(body);
  }

  request.event = event as unknown as SQSEvent; // replace SQS event with CommonInputEvent.

};