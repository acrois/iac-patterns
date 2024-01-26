import pulumi
import pulumi_aws as aws

# # Load environment variables
# config = pulumi.Config()
# aws_region = config.require('aws_region')
# aws_endpoint = config.require('aws_endpoint')

# # Configure AWS provider to use LocalStack
# aws_provider = aws.Provider('localstack', region=aws_region, 
#                             endpoint=aws_endpoint, access_key='test', 
#                             secret_key='test')

# Configure AWS provider to use LocalStack
aws_provider = aws.Provider('localstack')

# Create an S3 bucket
bucket = aws.s3.Bucket('my-pulumi-bucket', opts=pulumi.ResourceOptions(provider=aws_provider))

# Export the bucket name
pulumi.export('bucket_name', bucket.id)
