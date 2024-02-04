import pulumi
import pulumi_aws as aws
import os
# import debugpy

# for a in os.environ:
#     print('Var: ', a, 'Value: ', os.getenv(a))

# debugpy.listen(("0.0.0.0", 5678))
# print("debugpy is listening, attach by pressing F5 or ►")

# debugpy.wait_for_client()
# print("Attached to debugpy!")

# Load environment variables
config = pulumi.Config()
# aws_region = config.require('aws_region')
# aws_endpoint = config.require('aws_endpoint')

# Configure AWS provider to use LocalStack
# aws_provider = aws.Provider(
#     'localstack',
#     region=os.getenv('AWS_REGION'), 
#     # endpoint=os.getenv('AWS_ENDPOINT'),
#     access_key=os.getenv('AWS_ACCESS_KEY_ID'), 
#     secret_key=os.getenv('AWS_SECRET_ACCESS_KEY'),
# )

# aws_provider = aws.Provider('localstack')

# opts = pulumi.ResourceOptions(provider=aws_provider)

# def dump(obj):
#   for attr in dir(obj):
#     print("obj.%s = %r" % (attr, getattr(obj, attr)))
# dump(opts)

# Create an S3 bucket
bucket = aws.s3.Bucket('my-pulumi-bucket')

# Export the bucket name
pulumi.export('bucket_name', bucket.id)
