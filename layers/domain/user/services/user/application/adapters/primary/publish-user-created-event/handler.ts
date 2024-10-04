import { container, dependencies } from "@dependencies";
import { EventsUseCase } from "@interfaces";
import { CommonInputHandler, DbStreamInput, withCommonInput, withLambdaIOStandard } from "@shared";
import { UserDTO } from "@typings";

const inputMapper = async (input: DbStreamInput<UserDTO>): Promise<void> => {
  const events = container.get<EventsUseCase>(dependencies.EventsUseCases);
  await events.publishUserCreatedEvent(input.new);
};

/** 'publishUserCreatedEvent' lambda function handler. */
export const handler: CommonInputHandler<DbStreamInput<UserDTO>, void> = withCommonInput(inputMapper, {
  singular: true as true
});

/** 'publishUserCreatedEvent' lambda function handler wrapped in required middleware. */
export const main = withLambdaIOStandard(handler);