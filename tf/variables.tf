variable "vault_address" {
  default = "https://vault.internal.services.liatr.io/"
}

variable "vault_role" {
  default = "aws-developer"
}

variable "vpc_name" {
  description = "VPC to configure security group ip range"
  default     = "prod-lead-vpc"
}

variable "database_protection" {
  description = "Protectes database from deletions"
  default     = true
}

variable "database_apply_immediately" {
  description = "Apply datebase changes immediately instead of durring maintenance window"
  default     = false
}

variable "database_multi_az" {
  default = true
}