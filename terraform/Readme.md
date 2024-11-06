# Getting the AWS resources
 - `aws ec2 describe-vpcs --region=eu-west-2 --filters "Name=tag:Name, Values=nestosoft-network-development" --query Vpcs[].VpcId --output text`
 - `aws ec2 describe-subnets --region=eu-west-2 --filters "Name=vpc-id,Values=<<output previous command>>" --query Subnets[].SubnetId`


- `aws ec2 describe-instance-types --filters Name=processor-info.supported-architecture,Values=arm64 --query "InstanceTypes[*].InstanceType" --output tex`