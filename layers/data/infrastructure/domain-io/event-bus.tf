resource "aws_cloudwatch_event_bus" "central_event_bus" {

  name = "moult-${var.stage}-central"

  tags = {
    Application = "moult"
    Enviroment  = var.stage
    Description = "moult central event bus."
  }

}

resource "aws_ssm_parameter" "central_event_bus_arn" {
  name  = "/moult/${var.stage}/infrastructure/io/event-bus/central/arn"
  type  = "SecureString"
  value = aws_cloudwatch_event_bus.central_event_bus.arn
}

resource "aws_ssm_parameter" "central_event_bus_name" {
  name  = "/moult/${var.stage}/infrastructure/io/event-bus/central/name"
  type  = "SecureString"
  value = aws_cloudwatch_event_bus.central_event_bus.name
}
