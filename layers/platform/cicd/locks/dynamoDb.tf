resource "aws_dynamodb_table" "locks" {

    name     = "moult-terraform-locks"
    hash_key = "LockID"

    billing_mode   = "PROVISIONED"
    read_capacity  = "1"
    write_capacity = "1"

    attribute {
        name = "LockID"
        type = "S"
    }

}