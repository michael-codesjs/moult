import { USERNAME_DOMAIN_EVENTS } from '@domain/events'

export type UsernameEventDTO<P extends USERNAME_DOMAIN_EVENTS> = {
  id: string
  version: number
  name: USERNAME_DOMAIN_EVENTS['name']
  payload: P
}

export type UsernameAssignmentDTO = {
  entity_type: 'USERNAME_ASSIGNMENT'
  id: string
  creator_type: 'USERNAME_ASSIGNMENT'
  creator: string
  created: Date
  modified: Date
  discontinued: boolean
  username?: string
  basename?: string
  counter?: number
  user_id?: string
  generated_at?: string
  status?: string
}

export type UsernameCountDTO = {
  entity_type: 'USERNAME_COUNT'
  id: string
  creator_type: 'USERNAME_COUNT'
  creator: string
  created: Date
  modified: Date
  discontinued: boolean
  base_username: string
  count: number
}
