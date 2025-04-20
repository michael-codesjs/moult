import { PhotoDTO } from '@domain/models'

type CreatePhotoParams = {
  user_id: string
}

type UpdatePhotoParams = {
  id: string
  file_name?: string
  metadata?: Record<string, string>
  tags?: string[]
}

export interface PhotoUseCase {
  createPhoto(params: CreatePhotoParams): Promise<{
    key: string
    expires_at: Date
    upload_url: string
  }>
}
