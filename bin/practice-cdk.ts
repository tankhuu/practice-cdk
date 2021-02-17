#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { PracticeCdkStack } from '../lib/practice-cdk-stack';
import { PracticeCdkStackDns } from '../lib/practice-cdk-stack-dns';

const dnsName = 'athena-nonprod.com'

const app = new cdk.App();

// DNS Stack
const { hostedZone, certificate } = new PracticeCdkStackDns(app, 'PracticeCdkStackDns', {
  dnsName
})

new PracticeCdkStack(app, 'PracticeCdkStack', {
  env: { region: 'us-east-1' },
  envName: 'dev',
  hostedZone,
  certificate,
  dnsName
});
// For deploying many stage of the environments
// new PracticeCdkStack(app, 'PracticeCdkStackProd', {
//   env: {region: 'us-east-2'}
// });
