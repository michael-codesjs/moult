import middy from "@middy/core";
import { DynamoDBStreamEvent, Context } from "aws-lambda";
import { unmarshall } from "@aws-sdk/util-dynamodb";
import { AttributeValue } from "@aws-sdk/client-dynamodb";
import { CommonInputEvent, Consumer } from "../types";
import { DbStreamInput } from "../../../types/io";

/** Consumes DynamoDBStreamEvent and transforms it to a CommonInputEvent. */
export const dynamoDbStreamConsumer: Consumer = (request: middy.Request<DynamoDBStreamEvent, any, Error, Context>) => {

  let event: CommonInputEvent<DbStreamInput> = {
    inputs: []
  }; // create new CommonInputEvent.

  for (const record of request.event.Records) {
    
    const { NewImage, OldImage } = record.dynamodb;
    
    let input: DbStreamInput = {
      new: NewImage && unmarshall(NewImage as Record<string, AttributeValue>),
      old: OldImage && unmarshall(OldImage as Record<string, AttributeValue>)
    };

    event.inputs.push(input);
  
  }

  request.event = event as unknown as DynamoDBStreamEvent; // replace DynamoDBStreamEvent event with CommonInputEvent.

};