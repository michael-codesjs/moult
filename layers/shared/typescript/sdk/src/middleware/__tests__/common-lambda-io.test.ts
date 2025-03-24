import { marshall } from '@aws-sdk/util-dynamodb'
import middy from '@middy/core'
import {
  APIGatewayProxyEvent,
  AppSyncResolverEvent,
  Context,
  DynamoDBStreamEvent,
  EventBridgeEvent,
  SNSEvent,
  SNSEventRecord,
  SQSEvent,
} from 'aws-lambda'
import { Chance } from 'chance'
import { CommonInput, DbStreamInput } from '../../types/io'
import { commonLambdaInput } from '../common-lambda-input'
import {
  CommonInputHandler,
  StateMachineEvent,
} from '../common-lambda-input/types'

const chance = new Chance()

type INPUT = CommonInput<
  string,
  {
    string: string
    number: number
    boolean: boolean
    array: Array<any>
    object: Record<string, any>
  }
>

const generateInput = (meta: Record<string, any> = {}): INPUT => ({
  type: chance.word().toUpperCase(),
  correlationId: chance.guid(),
  meta,
  payload: {
    string: chance.string(),
    number: chance.integer(),
    boolean: chance.bool(),
    array: Array(chance.integer({ min: 1, max: 10 }))
      .fill(null)
      .map(() => chance.string()),
    object: {
      [chance.string()]: chance.string(),
    },
  },
})

const withMiddleware = (lambda: any) => middy(lambda).use(commonLambdaInput())

describe('DynamoDbStream', () => {
  const getDynamoDbStreamEvent = (): DynamoDBStreamEvent => ({
    Records: Array(chance.integer({ min: 1, max: 10 }))
      .fill(null)
      .map(() => {
        const message = marshall(generateInput())
        return {
          dynamodb: {
            NewImage: message as any,
            OldImage: message as any,
          },
        }
      }),
  })

  test('.consumer', async () => {
    const dynamodbStreamEvent = getDynamoDbStreamEvent()

    const lambda: CommonInputHandler<DbStreamInput<INPUT>, void> = async (
      event,
    ) => {
      event.inputs.forEach((input, index) => {
        const dynamoDbStreamEventEquivalentNewImage =
          dynamodbStreamEvent.Records[index].dynamodb.NewImage
        const dynamoDbStreamEventEquivalentOldImage =
          dynamodbStreamEvent.Records[index].dynamodb.OldImage
        expect(dynamoDbStreamEventEquivalentNewImage).toStrictEqual(
          marshall(input.new),
        )
        expect(dynamoDbStreamEventEquivalentOldImage).toStrictEqual(
          marshall(input.old),
        )
      })
    }

    await withMiddleware(lambda)(dynamodbStreamEvent, {} as Context)
  })
})

describe('CommonLambdaInput', () => {
  let type: string

  beforeEach(() => {
    type = chance.string({
      alpha: true,
      casing: 'upper',
      numeric: false,
      symbols: false,
    })
  })

  const getSNSEvent = (): SNSEvent => ({
    Records: Array(chance.integer({ min: 1, max: 10 }))
      .fill(null)
      .map(() => {
        const message = generateInput()
        return {
          EventVersion: '1',
          EventSubscriptionArn: chance.string(),
          EventSource: 'aws:sns',
          Sns: {
            Message: JSON.stringify(message),
            Messages: { type },
            MessageId: chance.fbid(),
            Signature: chance.string(),
          },
        } as unknown as SNSEventRecord
      }),
  })

  const getSQSEvent = (reply: boolean = false): SQSEvent => ({
    Records: Array(chance.integer({ min: 1, max: reply ? 1 : 10 }))
      .fill(null)
      .map(() => {
        const input = generateInput({})
        return {
          messageId: chance.fbid(),
          eventSource: 'aws:sqs',
          attributes: {},
          body: JSON.stringify(input),
        } as unknown as SQSEvent['Records'][number]
      }),
  })

  const getStateMachineEvent = (): StateMachineEvent<INPUT> => ({
    source: 'StateMachine',
    attributes: {
      type: 'CREATE',
      correlationId: chance.fbid(),
    },
    payload: generateInput(),
  })

  const getApiGatewayEvent = (): APIGatewayProxyEvent =>
    ({
      body: generateInput(),
      httpMethod: 'GET',
      headers: {},
      path: '/',
    }) as unknown as APIGatewayProxyEvent

  const getAppSyncEvent = (inInput = true): AppSyncResolverEvent<any, any> => {
    const input = generateInput()
    return {
      arguments: inInput ? { input } : input,
      info: {},
      prev: {},
      request: {},
      source: {},
      identity: {
        sub: chance.string(),
      },
      stash: {},
    } as AppSyncResolverEvent<any, any>
  }

  const getEventBridgeEvent = (): EventBridgeEvent<INPUT['type'], INPUT> => {
    const input = generateInput()
    return {
      'detail-type': input.type,
      detail: input,
      source: 'moult.@shared.tests.middleware.common-lambda-io',
    } as EventBridgeEvent<INPUT['type'], INPUT>
  }

  const withMiddleware = (lambda: any) => middy(lambda).use(commonLambdaInput())

  /*
  test("SNS input", () => {

    const sqsEvent = getSNSEvent();

    const lambda: CommonIOHandler<Input, void> = async event => {
      event.inputs.forEach((input, index) => {
        const snsEventEquivalentInput = JSON.parse(sqsEvent.Records[index].Sns.Message)
        expect(input).toMatchObject(snsEventEquivalentInput);
      });
    };

    withMiddleware(lambda)(sqsEvent, {} as Context);

  });
  */

  test('.appsync input', async () => {
    const appSyncEventInput = getAppSyncEvent(true)

    const lambda: CommonInputHandler<INPUT, void> = async (event) => {
      event.inputs.forEach((input) => {
        const appSyncEventEquivalentInput = appSyncEventInput.arguments
        expect(input).toStrictEqual(appSyncEventEquivalentInput)
      })
    }

    await withMiddleware(lambda)(appSyncEventInput, {} as Context)
  })

  test('.apiGateway request', async () => {
    const apiGatewayEvent = getApiGatewayEvent()
    const lambda: CommonInputHandler<INPUT, void> = async (event) =>
      expect(event.inputs[0]).toBe(apiGatewayEvent.body)
    await withMiddleware(lambda)(apiGatewayEvent, {} as Context)
  })

  test('.eventBridge request', async () => {
    const eventBridgeEvent = getEventBridgeEvent()
    const lambda: CommonInputHandler<INPUT, void> = async (event) =>
      expect(event.inputs[0]).toStrictEqual(eventBridgeEvent.detail)
    await withMiddleware(lambda)(eventBridgeEvent, {} as Context)
  })

  test('.sqs request', async () => {
    const sqsEvent = getSQSEvent()

    const lambda: CommonInputHandler<INPUT, void> = async (event) => {
      event.inputs.forEach((input, index) => {
        const sqsEventEquivalentInput = JSON.parse(sqsEvent.Records[index].body)
        expect(input).toStrictEqual(sqsEventEquivalentInput)
      })
    }

    await withMiddleware(lambda)(sqsEvent, {} as Context)
  })

  test('.stateMachine request', async () => {
    const stateMachineEvent = getStateMachineEvent()
    const lambda: CommonInputHandler<INPUT, void> = async (event) =>
      expect(event.inputs[0]).toStrictEqual(stateMachineEvent.payload)
    await withMiddleware(lambda)(stateMachineEvent, {} as Context)
  })
})
