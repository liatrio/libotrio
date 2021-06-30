provider "aws" {
  region = "us-east-1"
}


data "aws_vpc" "lead_vpc" {
  tags = {
    Name = var.vpc_name
  }
}


resource "aws_security_group" "gratibot" {
  name_prefix = "gratibot"
  vpc_id      = data.aws_vpc.lead_vpc.id

  ingress {
    from_port = 22
    to_port   = 22
    protocol  = "tcp"

    cidr_blocks = [
      data.aws_vpc.lead_vpc.cidr_block,
      #"10.1.32.0/20", # internal VPN
    ]
  }
  ingress {
    from_port = 443
    to_port   = 443
    protocol  = "tcp"
  }
}



resource "aws_docdb_cluster" "docdb" {
  cluster_identifier      = "my-docdb-cluster"
  engine                  = "docdb"
  master_username         = "foo"
  master_password         = "mustbeeightchars"
  skip_final_snapshot     = "true"

  vpc_security_group_ids  = [
      aws_security_group.gratibot.id
  ]
}

resource "aws_docdb_cluster_instance" "cluster_instances" {
  count              = 1
  identifier         = "docdb-cluster-demo-${count.index}"
  cluster_identifier = aws_docdb_cluster.docdb.id
  instance_class     = "db.t3.medium"
}