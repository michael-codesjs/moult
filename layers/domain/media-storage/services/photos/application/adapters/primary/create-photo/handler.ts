import 'reflect-metadata'
import {
  CommonInputHandler,
  withCommonInput,
  withLambdaIOStandard,
} from '@moult/sdk'
import { PhotoDTO } from '@domain/models'
import { CREATE_PHOTO_DOMAIN_COMMAND } from '@domain/events'
import { PhotoUseCase } from '@use-cases/photo'

// Input mapper function
const inputMapper = async (
  event: CREATE_PHOTO_DOMAIN_COMMAND,
): Promise<any> => {
  try {
    // const { user_id } = event.payload

    const photo_use_case = new PhotoUseCase()

    // Get the photo service and create the photo
    // const photo_use_case: PhotoUseCase = container.get(
    //   dependencies.PhotoUseCase,
    // )

    // const result = photo_use_case.createPhoto({
    //   user_id,
    // })

    return {} as any
  } catch (error) {
    throw new Error(`Failed to get S3 object metadata: ${error.message}`)
  }
}

/** 'createPhoto' lambda function handler. */
export const handler: CommonInputHandler<
  CREATE_PHOTO_DOMAIN_COMMAND,
  PhotoDTO
> = withCommonInput(inputMapper, {
  singular: true as true,
})

/** Lambda function handler wrapped in required middleware. */
export const main = withLambdaIOStandard(handler)
