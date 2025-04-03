provider "aws" {
  region = "eu-north-1"  # Stockholm region based on the EC2 DNS
}

# Reference the existing EC2 instance
data "aws_instance" "dev_server" {
  instance_id = "i-08c3cae53b55b50ef"  # The dev-server instance ID
}

# Get information about the security groups attached to the instance
data "aws_security_groups" "instance_sgs" {
  filter {
    name   = "instance-id"
    values = [data.aws_instance.dev_server.id]
  }
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