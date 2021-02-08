import '@aws-cdk/assert/jest';
import * as cdk from '@aws-cdk/core';
import * as PracticeCdk from '../lib/practice-cdk-stack';

test('Stack create a S3 Bucket', () => {
  // ARRANGE
  const app = new cdk.App();
  // ACT
  const stack = new PracticeCdk.PracticeCdkStack(app, 'MyTestStack');
  // ASSERT
  expect(stack).toHaveResource('AWS::S3::Bucket')
});
