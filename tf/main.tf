locals {
  name   = "libotrio"
  region = "us-east-1"
  tags   = yamldecode(file("tags.yaml"))
}

terraform {
  backend "s3" {}
}

provider "aws" {
  region = "us-east-1"
}

provider "vault" {
  address = var.vault_address

  auth_login {
    path   = "auth/aws/login"
    method = "aws"

    parameters = {
      role = var.vault_role
    }
  }
}

data "aws_vpc" "vpc" {
  tags = {
    Name = var.vpc_name
  }
}

data "aws_caller_identity" "current" {}

data "aws_subnet_ids" "database_subnets" {
  vpc_id = data.aws_vpc.vpc.id

  filter {
    name   = "tag:subnet-kind"
    values = ["database"]
  }
}