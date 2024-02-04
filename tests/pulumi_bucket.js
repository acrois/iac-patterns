#!/usr/bin/env bun

import { $ } from "bun"
console.log('Running Pulumi resource check...')

const awsCliVersion = (await $`aws --version`.text()).trim()
console.log(`AWS CLI: ${awsCliVersion}`)

if (!awsCliVersion) throw 'Invalid AWS CLI version.';

// await $`env`

$.cwd('./pulumi')

const pipResults = await $`pip install -r requirements.txt`
if (pipResults.exitCode !== 0) throw pipResults.stderr.toString()

const pulumiVersion = (await $`pulumilocal version`.text()).trim()
console.log(`Pulumi: ${pulumiVersion}`)

if (!pulumiVersion) throw 'Invalid Pulumi version.'

await $`ls`
await $`pulumi login --local`
const pulumiStackResult = await $`pulumi stack select -c dev`
if (pulumiStackResult.exitCode !== 0) throw pulumiStackResult.stderr.toString()

const pulumiResults = await $`pulumi up -s dev -v 3 --yes --non-interactive --logtostderr --logflow --tracing=file:../output/pulumi-up.trace`

if (pulumiResults.exitCode !== 0) throw pulumiResults.stderr.toString()

const bucketName = (await $`pulumi stack output bucket_name`.text()).trim()
console.log(`Checking if S3 bucket ${bucketName} exists...`)

const bucketResults = await $`awslocal s3 ls s3://${bucketName}`
if (bucketResults.exitCode !== 0) throw bucketResults.stderr.toString()
