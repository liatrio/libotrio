data "vault_generic_secret" "libotrio" {
  path = "lead/aws/${data.aws_caller_identity.current.account_id}/libotrio"
}

module "security_group" {
  source  = "terraform-aws-modules/security-group/aws"
  version = "~> 4"

  name        = local.name
  description = "Complete MySQL example security group"
  vpc_id      = data.aws_vpc.vpc.id

  # ingress
  ingress_with_cidr_blocks = [
    {
      from_port   = 3306
      to_port     = 3306
      protocol    = "tcp"
      description = "MySQL access from within VPC"
      cidr_blocks = data.aws_vpc.vpc.cidr_block
    },
  ]

  tags = local.tags
}

module "db" {
  source  = "terraform-aws-modules/rds/aws"
  version = "~> 3.0"

  name                   = local.name
  identifier             = local.name
  engine                 = "mariadb"
  engine_version         = "10.4.13"
  family                 = "mariadb10.4"
  major_engine_version   = "10.4"
  instance_class         = "db.t3.small"
  allocated_storage      = 5
  username               = "libotrio"
  password               = data.vault_generic_secret.libotrio.data["db_password"]
  port                   = "3306"
  vpc_security_group_ids = [module.security_group.security_group_id]
  maintenance_window     = "Mon:00:00-Mon:03:00"
  backup_window          = "03:00-06:00"
  subnet_ids             = data.aws_subnet_ids.database_subnets.ids
  apply_immediately      = var.database_apply_immediately
  multi_az               = var.database_multi_az
  deletion_protection    = var.database_protection
  tags                   = local.tags
  parameters = [
    {
      name  = "character_set_client"
      value = "utf8mb4"
    },
    {
      name  = "character_set_server"
      value = "utf8mb4"
    }
  ]
  options = [
    {
      option_name = "MARIADB_AUDIT_PLUGIN"

      option_settings = [
        {
          name  = "SERVER_AUDIT_EVENTS"
          value = "CONNECT"
        },
        {
          name  = "SERVER_AUDIT_FILE_ROTATIONS"
          value = "37"
        },
      ]
    },
  ]
}
