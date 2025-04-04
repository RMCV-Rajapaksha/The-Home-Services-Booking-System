provider "aws" {
  region = "eu-north-1"  # Stockholm region based on the EC2 DNS
}

# Reference the existing EC2 instance
data "aws_instance" "dev_server" {
  instance_id = "i-08c3cae53b55b50ef"  # The dev-server instance ID
}

# Get the first security group ID from the instance
locals {
  security_group_id = tolist(data.aws_instance.dev_server.vpc_security_group_ids)[0]
}

# Create a new security group rule to open port 9000
resource "aws_security_group_rule" "allow_port_9000" {
  type              = "ingress"
  from_port         = 9000
  to_port           = 9000
  protocol          = "tcp"
  cidr_blocks       = ["0.0.0.0/0"]  # Allow traffic from anywhere (you may want to restrict this)
  security_group_id = local.security_group_id
  description       = "Allow inbound traffic on port 9000"
}

# Outputs for viewing instance details
output "instance_id" {
  value = data.aws_instance.dev_server.id
}

output "instance_type" {
  value = data.aws_instance.dev_server.instance_type
}

output "ami_id" {
  value = data.aws_instance.dev_server.ami
}

output "public_ip" {
  value = data.aws_instance.dev_server.public_ip
}

output "public_dns" {
  value = data.aws_instance.dev_server.public_dns
}

output "private_ip" {
  value = data.aws_instance.dev_server.private_ip
}

output "vpc_id" {
  value = data.aws_instance.dev_server.vpc_security_group_ids
}

output "subnet_id" {
  value = data.aws_instance.dev_server.subnet_id
}

output "security_groups" {
  value = data.aws_instance.dev_server.security_groups
}

output "security_group_ids" {
  value = data.aws_instance.dev_server.vpc_security_group_ids
}

output "tags" {
  value = data.aws_instance.dev_server.tags
}

output "availability_zone" {
  value = data.aws_instance.dev_server.availability_zone
}