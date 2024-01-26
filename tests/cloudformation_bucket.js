#!/usr/bin/env bun

import { $ } from "bun"
console.log('Running CloudFormation resource check...')

const awsCliVersion = (await $`aws --version`.text()).trim()
console.log(`AWS CLI: ${awsCliVersion}`)

if (!awsCliVersion) throw 'Invalid AWS CLI version.';

$.cwd('./cloudformation')

const bucketName = 'my-cloudformation-bucket'
await $`aws cloudformation create-stack --stack-name my-stack --template-body file://template.yaml --parameters ParameterKey=BucketName,ParameterValue=${bucketName}`
await $`aws cloudformation describe-stacks --stack-name my-stack`

console.log(`Checking if S3 bucket ${bucketName} exists...`)

await $`aws s3 ls s3://${bucketName}`
