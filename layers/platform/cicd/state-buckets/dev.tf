resource "aws_s3_bucket" "dev_env_bucket" {

  tags = {
    Name = "moult-dev-state-bucket"
    Application = "moult"
    Layer = "Platform"
  }

}

resource "aws_s3_bucket_versioning" "dev_env_bucket_versioning" {
  bucket = aws_s3_bucket.dev_env_bucket.id
  versioning_configuration {
    status = "Enabled"
  }
}

resource "aws_s3_bucket_server_side_encryption_configuration" "dev_env_bucket_server_side_encryption_configuration" {
  bucket = aws_s3_bucket.dev_env_bucket.id
  rule {
    apply_server_side_encryption_by_default {
      sse_algorithm     = "AES256"
    }
  }
}

resource "aws_ssm_parameter" "dev_env_bucket_name" {
  name  = "/moult/dev/cicd/state-bucket/name"
  type  = "SecureString"
  value = aws_s3_bucket.dev_env_bucket.bucket
}

resource "aws_ssm_parameter" "dev_env_bucket_arn" {
  name  = "/moult/dev/cicd/state-bucket/arn"
  type  = "SecureString"
  value = aws_s3_bucket.dev_env_bucket.bucket
}

output "dev_bucket_arn" {
    value = aws_s3_bucket.dev_env_bucket.arn
}