locals {
  aws_region = "us-east-1"
  tags = yamldecode(file("tags.yaml"))
}

remote_state {
  backend = "s3"
  config = {
    bucket         = "libotrio-${get_aws_account_id()}"
    key            = "terraform.tfstate"
    region         = local.aws_region
    encrypt        = true
    dynamodb_table = "terraform-lock"
    s3_bucket_tags = local.tags
    dynamodb_table_tags = local.tags
  }
}