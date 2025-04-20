// import { inject } from 'inversify'
import {
  PhotoAggregateRepository,
  PhotoUseCase as IPhotoUseCase,
  FileStorageAdapter,
  EventsRepositrory,
} from '@interfaces'
import { dependencies, container } from '@dependencies'
import { Photo } from '@domain/aggregate'

type CreatePhotoParams = {
  user_id: string
}

export class PhotoUseCase implements IPhotoUseCase {
  // @inject(dependencies.PhotoAggregateRepository)
  // private repository: PhotoAggregateRepository
  // @inject(dependencies.EventsRepositrory) private events: EventsRepositrory
  // @inject(dependencies.FileStorageAdapter)
  // private file_storage: FileStorageAdapter

  async createPhoto(params: CreatePhotoParams) {
    try {
      const photo = Photo.create(params)
      const domain_events = photo.getDomainEvents()

      const event_store = container.get<EventsRepositrory>(
        dependencies.EventsRepositrory,
      )

      await event_store.write(domain_events)
      // await this.events.publish(events)

      // const { id, creator } = photo.toDTO()

      // const key = `${creator}/id`
      // const expires = 60 * 10 // 10 minutes

      // const presigned_upload_url =
      //   await this.file_storage.getPresignedUploadUrl({
      //     key,
      //     expiresIn: expires,
      //   })

      // return {
      //   key,
      //   expires_at: presigned_upload_url.expires_at,
      //   upload_url: presigned_upload_url.url,
      // }
      return {} as any
    } catch (error) {
      console.error('error', error)
      throw error
    }
  }
}
