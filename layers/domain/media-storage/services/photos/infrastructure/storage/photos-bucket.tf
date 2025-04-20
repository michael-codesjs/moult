resource "aws_s3_bucket" "photos" {
  bucket = "moult-photos-${var.environment}"

  tags = {
    Name        = "Photos Storage"
    Environment = var.environment
  }
}

resource "aws_s3_bucket_cors_configuration" "photos_cors" {
  bucket = aws_s3_bucket.photos.id

  cors_rule {
    allowed_headers = ["*"]
    allowed_methods = ["PUT", "POST", "GET"]
    allowed_origins = ["*"] # Consider restricting this in production
    expose_headers  = ["ETag"]
    max_age_seconds = 3000
  }
}

resource "aws_s3_bucket_lifecycle_configuration" "photos_lifecycle" {
  bucket = aws_s3_bucket.photos.id

  rule {
    id     = "cleanup-noncurrent-versions"
    status = "Enabled"

    noncurrent_version_expiration {
      noncurrent_days = 90
    }
  }
}

# Output the bucket name and ARN
output "photos_bucket_name" {
  value = aws_s3_bucket.photos.id
}

output "photos_bucket_arn" {
  value = aws_s3_bucket.photos.arn
}

# Register the outputs as SSM parameters
resource "aws_ssm_parameter" "photos_bucket_name" {
  name  = "/moult/${var.environment}/domain/media-storage/service/photos/infrastructure/storage/photos-bucket/name"
  type  = "String"
  value = aws_s3_bucket.photos.id
}

resource "aws_ssm_parameter" "photos_bucket_arn" {
  name  = "/moult/${var.environment}/domain/media-storage/service/photos/infrastructure/storage/photos-bucket/arn"
  type  = "String"
  value = aws_s3_bucket.photos.arn
} 
