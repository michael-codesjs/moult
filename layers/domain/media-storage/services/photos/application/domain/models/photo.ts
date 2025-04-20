import { PHOTO_DOMAIN_EVENTS } from '@domain/events'

export type PhotoAggregateDTO = {
  id: string
  type: 'Photo'
  version: number
  lastEvents: Record<number, PHOTO_DOMAIN_EVENTS>
}

export type PhotoEventDTO<P extends PHOTO_DOMAIN_EVENTS> = {
  id: string
  version: number
  name: PHOTO_DOMAIN_EVENTS['name']
  payload: P
}

export type PhotoSnapshotDTO = {
  id: string
  version: number
  payload: PhotoDTO
  created: Date
}

export type PhotoDTO = {
  entity_type: 'PHOTO'
  id: string
  creator_type: 'USER'
  creator: string
  created: Date
  modified: Date
  discontinued: boolean
  object_key?: string
  file_name?: string
  content_type?: string
  size?: number
  metadata?: Record<string, string>
  tags?: string[]
}
