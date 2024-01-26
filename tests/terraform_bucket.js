#!/usr/bin/env bun

import { $ } from "bun"
console.log('Running Terraform resource check...')

const terraformVersion = (await $`terraform version`.text()).trim()
console.log(`Terraform: ${terraformVersion}`)

if (!terraformVersion) throw 'Invalid Terraform version.';

const awsCliVersion = (await $`aws --version`.text()).trim()
console.log(`AWS CLI: ${awsCliVersion}`)

if (!awsCliVersion) throw 'Invalid AWS CLI version.';

await $`pwd`.cwd("/terraform")

const bucketName = (await $`terraform output bucket_name`.text()).trim()
console.log(`Checking if S3 bucket ${bucketName} exists...`)

await $`aws s3 ls s3://${bucketName}`
