import {
  AppSyncResolverEvent,
  SNSEvent,
  SQSEvent,
  APIGatewayProxyEvent,
  EventBridgeEvent,
  Context,
  DynamoDBStreamEvent,
} from 'aws-lambda'
import middy from '@middy/core'
import { CommonInputSources, Consumer, StateMachineEvent } from './types'
import {
  apiGatewayConsumer,
  eventBridgeConsumer,
  stateMachineConsumer,
  sqsConsumer,
  appsyncConsumer,
  dynamoDbStreamConsumer,
} from './consumers'

class ConsumerFactory {
  private constructor() {}
  static readonly instance = new ConsumerFactory()

  private hasRecords(
    event: CommonInputSources<any, any>,
  ): event is SNSEvent | SQSEvent {
    return 'Records' in event && Boolean(event.Records)
  }

  private isApiGatewayEvent<I, R>(
    request: middy.Request<CommonInputSources<I, R>, R, Error, Context>,
  ): request is middy.Request<APIGatewayProxyEvent> {
    const isApiGwEvent = ['body', 'headers', 'httpMethod', 'path'].every(
      (key) => key in request.event,
    )
    request.internal.isApiGwEvent = isApiGwEvent
    return isApiGwEvent
  }

  private isDynamoDbStreamEvent(
    event: CommonInputSources<any, any>,
  ): event is DynamoDBStreamEvent {
    return this.hasRecords(event) && 'dynamodb' in event.Records[0]
  }

  private isSQSEvent(event: CommonInputSources<any, any>): event is SQSEvent {
    return (
      this.hasRecords(event) &&
      'eventSource' in event.Records[0] &&
      event.Records[0].eventSource === 'aws:sqs'
    )
  }

  private isSNSEvent(event: CommonInputSources<any, any>): event is SNSEvent {
    return this.hasRecords(event) && 'Sns' in event
  }

  private isAppSyncEvent(
    event: CommonInputSources<any, any>,
  ): event is AppSyncResolverEvent<any, any> {
    return ['arguments', 'prev', 'stash', 'identity', 'source'].every(
      (key) => key in event,
    )
  }

  private isStateMachineEvent(
    event: CommonInputSources<any, any>,
  ): event is StateMachineEvent {
    return 'source' in event && event.source === 'StateMachine'
  }

  private isEventBridgeEvent(
    event: CommonInputSources<any, any>,
  ): event is EventBridgeEvent<any, any> {
    return ['detail-type', 'detail'].every((key) => key in event)
  }

  createConsumer<I, R>(
    request: middy.Request<CommonInputSources<I, R>, R, Error, Context>,
  ): Consumer {
    let consumer: Consumer

    if (this.isEventBridgeEvent(request.event)) consumer = eventBridgeConsumer
    else if (this.isAppSyncEvent(request.event)) consumer = appsyncConsumer
    else if (this.isApiGatewayEvent(request)) consumer = apiGatewayConsumer
    else if (this.isDynamoDbStreamEvent(request.event))
      consumer = dynamoDbStreamConsumer
    else if (this.isStateMachineEvent(request.event))
      consumer = stateMachineConsumer
    else if (this.isSQSEvent(request.event)) consumer = sqsConsumer
    // else if(this.isSNSEvent(event)) return;
    else throw new Error('Unrecognized event. Can not generate consumer.')

    return consumer
  }
}

export const Consumers = ConsumerFactory.instance
