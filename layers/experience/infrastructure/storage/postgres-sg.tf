resource "aws_security_group" "postgres" {
  name        = "moult-postgres-${var.stage}"
  description = "Allow PostgreSQL inbound traffic"
  vpc_id      = data.aws_vpc.default.id

  ingress {
    description = "PostgreSQL from anywhere (for development)"
    from_port   = 5432
    to_port     = 5432
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name        = "moult-postgres-${var.stage}"
    Environment = var.stage
    Project     = "moult"
  }

  lifecycle {
    create_before_destroy = true
  }
}
