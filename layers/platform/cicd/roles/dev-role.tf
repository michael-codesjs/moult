resource "aws_iam_role" "dev_role" {
  name = "moult-oidc-dev-role"
  assume_role_policy = jsonencode({
    "Version" : "2012-10-17",
    "Statement" : [
      {
        "Effect" : "Allow",
        "Action" : "sts:AssumeRoleWithWebIdentity"
        "Principal" : {
          "Federated" : data.aws_iam_openid_connect_provider.github.arn
        },
        "Condition" : {
          "StringEquals" : {
            "token.actions.githubusercontent.com:aud" : "sts.amazonaws.com"
          },
          "StringLike": {
            "token.actions.githubusercontent.com:sub": "repo:${var.organisation}/${var.repository}:dev"
          },
        }
      }
    ]
  })
}

resource "aws_iam_role_policy_attachment" "dev_role_policy_attachment" { # is temporal
  policy_arn = "arn:aws:iam::aws:policy/AdministratorAccess"
  role       = aws_iam_role.prod_role.name
}

/*

resource "aws_iam_policy" "dev_policy" {
  name   = "moult-oidc-dev-role-policy"
  policy = jsonencode({
    "Version" : "2012-10-17",
    "Statement" : [
      {
        "Effect" : "Allow",
        "Action" : [
          "s3:ListBucket"
        ],
        "Resource" : [
          var.dev_bucket_arn,
        ]
      },
      {
        "Effect" : "Allow",
        "Action" : [
          "s3:GetObject",
          "s3:PutObject",
        ],
        "Resource" : [
          "${var.dev_bucket_arn}/*"
        ]
      }
    ]
  })
}

resource "aws_iam_role_policy_attachment" "dev_role_policy_attachment" {
  role       = aws_iam_role.dev_role.name
  policy_arn = aws_iam_policy.dev_policy.arn
}
*/

output "dev_role_arn" {
    value = aws_iam_role.dev_role.arn
}