#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { PracticeCdkStack } from '../lib/practice-cdk-stack';

const app = new cdk.App();
new PracticeCdkStack(app, 'PracticeCdkStack');
