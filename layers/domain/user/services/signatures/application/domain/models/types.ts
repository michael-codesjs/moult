import { SIGNATURE_DOMAIN_EVENTS } from '@domain/events'

export type SignatureEventDTO<P extends SIGNATURE_DOMAIN_EVENTS> = {
  id: string
  version: number
  name: SIGNATURE_DOMAIN_EVENTS['name']
  payload: P
}

export type SignatureAssignmentDTO = {
  entity_type: 'SIGNATURE_ASSIGNMENT'
  id: string
  creator_type: 'SIGNATURE_ASSIGNMENT'
  creator: string
  created: Date
  modified: Date
  discontinued: boolean
  signature?: string
  base_signature?: string
  counter?: number
  user_id?: string
  generated_at?: string
  status?: string
}

export type SignatureCountDTO = {
  entity_type: 'SIGNATURE_COUNT'
  id: string
  creator_type: 'SIGNATURE_COUNT'
  creator: string
  created: Date
  modified: Date
  discontinued: boolean
  base_signature: string
  count: number
}
