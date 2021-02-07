import * as cdk from '@aws-cdk/core';
import { Bucket } from '@aws-cdk/aws-s3';
import { Duration } from '@aws-cdk/core';

export class PracticeCdkStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    new Bucket(this, 'practiceCdkBucket', {
      bucketName: 'practice-cdk',
      lifecycleRules: [{
        enabled: true,
        expiration: Duration.days(3)
      }]
    })
  }
}
