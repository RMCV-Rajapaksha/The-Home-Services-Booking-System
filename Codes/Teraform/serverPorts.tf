# Fetch existing EC2 instance by ID
data "aws_instance" "dev_server" {
  instance_id = "i-08c3cae53b55b50ef"
}

# Fetch subnet details to get the VPC ID
data "aws_subnet" "instance_subnet" {
  id = data.aws_instance.dev_server.subnet_id
}

# Fetch security group details for the instance
data "aws_security_group" "instance_sg" {
  count = length(data.aws_instance.dev_server.vpc_security_group_ids)
  id    = data.aws_instance.dev_server.vpc_security_group_ids[count.index]
}

# Output instance details
output "instance_id" {
  value = data.aws_instance.dev_server.id
}

output "instance_name" {
  value = data.aws_instance.dev_server.tags["Name"]
}

output "instance_type" {
  value = data.aws_instance.dev_server.instance_type
}

output "instance_public_dns" {
  value = data.aws_instance.dev_server.public_dns
}

output "instance_public_ip" {
  value = data.aws_instance.dev_server.public_ip
}

output "instance_private_ip" {
  value = data.aws_instance.dev_server.private_ip
}

output "instance_subnet_id" {
  value = data.aws_instance.dev_server.subnet_id
}

output "instance_vpc_id" {
  value = data.aws_subnet.instance_subnet.vpc_id
}

output "instance_availability_zone" {
  value = data.aws_instance.dev_server.availability_zone
}

output "instance_ami" {
  value = data.aws_instance.dev_server.ami
}

# Output security group details
output "security_group_details" {
  value = [
    for sg in data.aws_security_group.instance_sg : {
      id          = sg.id
      name        = sg.name
      description = sg.description
      ingress_rules = [
        for rule in sg.ingress : {
          from_port   = rule.from_port
          to_port     = rule.to_port
          protocol    = rule.protocol
          cidr_blocks = rule.cidr_blocks
          description = rule.description
        }
      ]
      egress_rules = [
        for rule in sg.egress : {
          from_port   = rule.from_port
          to_port     = rule.to_port
          protocol    = rule.protocol
          cidr_blocks = rule.cidr_blocks
          description = rule.description
        }
      ]
    }
  ]
}
