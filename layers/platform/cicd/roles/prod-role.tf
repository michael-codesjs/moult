resource "aws_iam_role" "prod_role" {
  name = "moult-oidc-prod-role"
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
            "token.actions.githubusercontent.com:aud" : "sts.amazonaws.com",
            // "token.actions.githubusercontent.com:sub": "repo:${var.organisation}/${var.repository}:main"
          },
          "StringLike": {
            "token.actions.githubusercontent.com:sub": "repo:${var.organisation}/${var.repository}:main"
          },
        }
      }
    ]
  })
}

resource "aws_iam_role_policy_attachment" "prod_role_policy_attachment" { # is temporal
  policy_arn = "arn:aws:iam::aws:policy/AdministratorAccess"
  role       = aws_iam_role.prod_role.name
}

/*
resource "aws_iam_policy" "prod_policy" {
  name   = "moult-oidc-prod-role-policy"
  policy = jsonencode({
    "Version" : "2012-10-17",
    "Statement" : [
      {
        "Effect" : "Allow",
        "Action" : [
          "s3:ListBucket"
        ],
        "Resource" : [
          var.prod_bucket_arn,
        ]
      },
      {
        "Effect" : "Allow",
        "Action" : [
          "s3:GetObject",
          "s3:PutObject",
        ],
        "Resource" : [
          "${var.prod_bucket_arn}/*"
        ]
      }
    ]
  })
}

resource "aws_iam_role_policy_attachment" "prod_role_policy_attachment" {
  role       = aws_iam_role.prod_role.name
  policy_arn = aws_iam_policy.prod_policy.arn
}

*/

output "prod_role_arn" {
    value = aws_iam_role.prod_role.arn
}