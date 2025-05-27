import { PHOTO_DOMAIN_EVENTS } from '@domain/events'
import { PhotoDTO } from '@domain/models'
import { DomainEvent } from '@moult/sdk'

export interface EventBusAdapter {
  publish(events: Array<DomainEvent>): Promise<void>
}

export interface EventStoreAdapter {
  write(events: Array<PHOTO_DOMAIN_EVENTS>): Promise<Array<number>>
  read(id: string): Promise<Array<PHOTO_DOMAIN_EVENTS>>
  writeSnapshotEvents(
    events: Array<PHOTO_DOMAIN_EVENTS & { version: number }>,
  ): Promise<void>
}

export type GetPresignedUrlParams = {
  key: string
  expiresIn?: number
}

export type PresignedUrlResult = {
  url: string
  key: string
  expires_at: Date
}

export interface FileStorageAdapter {
  getPresignedUploadUrl(
    params: GetPresignedUrlParams,
  ): Promise<PresignedUrlResult>
}
