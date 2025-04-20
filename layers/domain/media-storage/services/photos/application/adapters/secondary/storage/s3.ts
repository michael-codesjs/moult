import { injectable } from 'inversify'
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { FileStorageAdapter, GetPresignedUrlParams } from '@interfaces/adapters'

/**
 * S3 Storage Adapter implementation for handling AWS S3 operations
 */
@injectable()
export class S3StorageAdapterImpl implements FileStorageAdapter {
  private s3_client: S3Client
  private bucket_name: string

  constructor() {
    // Initialize S3 client with region from environment
    this.s3_client = new S3Client({
      region: process.env.AWS_REGION || 'eu-central-1',
    })

    // Get bucket name from environment variable
    this.bucket_name = process.env.MEDIA_BUCKET_NAME || ''
    if (!this.bucket_name) {
      console.warn('MEDIA_BUCKET_NAME environment variable is not set')
    }
  }

  /**
   * Generate a presigned URL for uploading a file to S3
   */
  async getPresignedUploadUrl(params: GetPresignedUrlParams) {
    if (!this.bucket_name) {
      throw new Error('Bucket name is not configured')
    }

    const expiration_seconds = params.expiresIn || 60 * 10 // Default 10 minute

    const command = new PutObjectCommand({
      Bucket: this.bucket_name,
      Key: params.key,
    })

    try {
      const url = await getSignedUrl(this.s3_client, command, {
        expiresIn: expiration_seconds,
      })

      const expires_at = new Date()
      expires_at.setSeconds(expires_at.getSeconds() + expiration_seconds)

      return {
        url,
        key: params.key,
        expires_at,
      }
    } catch (error) {
      console.error('Error generating presigned upload URL:', error)
      throw new Error(
        `Failed to generate presigned upload URL: ${error.message}`,
      )
    }
  }
}
