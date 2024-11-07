locals {
    host_list_ssm_name = "/${local.name_prefix}/host-list"
    site_name_ssm_name = "/${local.name_prefix}/site-name"
}

resource "aws_ssm_parameter" "host-list" {
  name = local.host_list_ssm_name
  type = "StringList"
  value = join(",", aws_instance.main.*.private_dns)
}

resource "aws_ssm_parameter" "site-name" {
    name = local.site_name_ssm_name
    type = "String"
    value = "${local.name_prefix}-nestosoft"
}

data "aws_iam_policy_document" "ssm_access" {
    statement {
      effect = "Allow"
      actions = ["ssm:GetParameter"]
      resources = [aws_ssm_parameter.host-list.arn, aws_ssm_parameter.site-name.arn]
    }
}

resource "aws_iam_policy" "ssm_access" {
  name = "${local.name_prefix}-ssm-access"
  policy = data.aws_iam_policy_document.ssm_access.json
}

resource "aws_iam_role_policy_attachment" "ssm_access" {
  role = var.ec2_role_name
  policy_arn = aws_iam_policy.ssm_access.arn
}