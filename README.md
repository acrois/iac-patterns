# Consolidated IaC with LocalStack Demo

[![Dynamic Test Execution](https://github.com/KinetechSolutions/iac-patterns/actions/workflows/test.yaml/badge.svg)](https://github.com/KinetechSolutions/iac-patterns/actions/workflows/test.yaml)

This repository demonstrates how to use Pulumi, Terraform, and AWS CloudFormation with LocalStack for testing patterns for AWS infrastructure.

## Prerequisites

- [Bun](https://bun.sh/docs/installation)
- [Docker and Docker Compose](https://docs.docker.com/get-docker/)
- [Pulumi CLI](https://www.pulumi.com/docs/install/)
- [Terraform CLI](https://developer.hashicorp.com/terraform/tutorials/aws-get-started/install-cli)
- [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html)
- About 3:50

## Setup

1. Clone this repository.
2. Navigate to the repository directory.
3. Run the following instructions.

## Running LocalStack

1. Start LocalStack using Docker Compose:
   ```sh
   docker compose up -d
   ```

2. Verify that LocalStack is running:
   ```sh
   docker ps
   ```

## Deploying Infrastructure

Follow the instructions in each tool's directory (`pulumi`, `terraform`, `cloudformation`) to deploy infrastructure.

## Testing Infrastructure

After deploying infrastructure using any of the IaC tools, you can test the creation of resources using AWS CLI commands targeting LocalStack.

Example command to list S3 buckets:

```sh
aws --endpoint-url=http://localhost:4566 s3 ls
```

### Running Tests

Run the test script:

```sh
./tests/pulumi_bucket.js
```

## Cleaning Up

1. Follow the instructions in each tool's directory to clean up resources.
2. Stop and remove LocalStack container:
   ```sh
   docker-compose down
   ```

## Additional Notes

- This demo uses fixed AWS credentials (`test` for access and secret key) as specified in the `.env` file.
- Ensure that the AWS region and endpoint in your IaC scripts match those in LocalStack.
- Instead of explicitly passing credentials to several specific tool config formats, we will use env vars to set them across all tools.
- [Tests](./tests/) are _anything that is executable_ that returns a non-zero (e.g. 1) exit code on failure and zero (0) on success.
- Note that for Bun, it is important to run the script from the project root, and not go into the test directory, because Bun will get the `.env` file [from the project root](https://bun.sh/guides/runtime/set-env)
