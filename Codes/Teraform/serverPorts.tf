# Terraform configuration to display EC2 instance information

# Configure the AWS provider
provider "aws" {
  region = "eu-north-1"  # Stockholm region
}

# Data source to fetch information about the existing EC2 instance
data "aws_instance" "dev_server" {
  instance_id = "i-08c3cae53b55b50ef"
}

# Define outputs to display instance information
output "instance_id" {
  value = data.aws_instance.dev_server.id
}

output "instance_type" {
  value = data.aws_instance.dev_server.instance_type
}

output "instance_state" {
  value = data.aws_instance.dev_server.instance_state
}

output "public_dns" {
  value = data.aws_instance.dev_server.public_dns
}

output "public_ip" {
  value = data.aws_instance.dev_server.public_ip
}

output "private_ip" {
  value = data.aws_instance.dev_server.private_ip
}

output "availability_zone" {
  value = data.aws_instance.dev_server.availability_zone
}

output "tags" {
  value = data.aws_instance.dev_server.tags
}