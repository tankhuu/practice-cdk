import * as cdk from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda-nodejs';
import { Bucket } from '@aws-cdk/aws-s3';
import { CfnOutput, Duration } from '@aws-cdk/core';
import * as path from 'path'
import {Runtime} from '@aws-cdk/aws-lambda'

export class PracticeCdkStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const bucket = new Bucket(this, 'practiceCdkBucket', {
      bucketName: 'practice-cdk',
      lifecycleRules: [{
        enabled: true,
      }]
    })

    new CfnOutput(this, 'PracticeCDKBucketNameExport', {
      exportName: 'PracticeCDKBucketName',
      value: bucket.bucketName
    })

    const getPhotosFunc = new lambda.NodejsFunction(this, 'getPhotosLambda', {
      runtime: Runtime.NODEJS_12_X,
      entry: path.join(__dirname, '..', 'api', 'get-photos', 'index.ts'),
      handler: 'getPhotos',
    })
  }
}
