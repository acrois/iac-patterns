#!/usr/bin/env bun

import { $ } from "bun"
console.log('Running Pulumi resource check...')

const pulumiVersion = (await $`pulumi version`.text()).trim()
console.log(`Pulumi: ${pulumiVersion}`)

if (!pulumiVersion) throw 'Invalid Pulumi version.';

const awsCliVersion = (await $`aws --version`.text()).trim()
console.log(`AWS CLI: ${awsCliVersion}`)

if (!awsCliVersion) throw 'Invalid AWS CLI version.';

const bucketName = (await $`pulumi stack output bucket_name`.text()).trim()
console.log(`Checking if S3 bucket ${bucketName} exists...`)

await $`aws s3 ls s3://${bucketName}`
