# Configure AWS Provider
provider "aws" {
  region = "us-west-2"
  # Access and secret keys should be configured via AWS CLI or environment variables
}

# VPC Configuration
resource "aws_vpc" "main" {
  cidr_block           = "10.0.0.0/16"
  enable_dns_hostnames = true
  enable_dns_support   = true

  tags = {
    Name = "home-services-vpc"
  }
}

# Public Subnet
resource "aws_subnet" "public" {
  vpc_id                  = aws_vpc.main.id
  cidr_block             = "10.0.1.0/24"
  availability_zone       = "us-west-2a"
  map_public_ip_on_launch = true

  tags = {
    Name = "home-services-public-subnet"
  }
}

# Security Group
resource "aws_security_group" "web_sg" {
  name        = "web-security-group"
  description = "Security group for web servers"
  vpc_id      = aws_vpc.main.id

  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

# EC2 Instance
resource "aws_instance" "web_server" {
  ami           = "ami-0c55b159cbfafe1f0" # Amazon Linux 2 AMI ID
  instance_type = "t2.micro"
  subnet_id     = aws_subnet.public.id
  
  vpc_security_group_ids = [aws_security_group.web_sg.id]

  tags = {
    Name = "home-services-web-server"
  }

  user_data = <<-EOF
              #!/bin/bash
              yum update -y
              yum install -y httpd
              systemctl start httpd
              systemctl enable httpd
              EOF
}

# Output Values
output "instance_public_ip" {
  value = aws_instance.web_server.public_ip
}

output "vpc_id" {
  value = aws_vpc.main.id
}