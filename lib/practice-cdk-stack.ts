import * as cdk from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda-nodejs';
import { Bucket } from '@aws-cdk/aws-s3';
import { CfnOutput, Duration } from '@aws-cdk/core';
import * as path from 'path'
import {Runtime} from '@aws-cdk/aws-lambda'
import { BucketDeployment, Source } from '@aws-cdk/aws-s3-deployment';
import { PolicyStatement } from '@aws-cdk/aws-iam';
import { HttpApi, HttpMethod } from '@aws-cdk/aws-apigatewayv2';
import { LambdaProxyIntegration } from '@aws-cdk/aws-apigatewayv2-integrations';

export class PracticeCdkStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const bucket = new Bucket(this, 'practiceCdkBucket', {
      bucketName: 'practice-cdk',
      lifecycleRules: [{
        enabled: true,
        expiration: Duration.days(3)
      }]
    })

    new BucketDeployment(this, 'AppPhotos', {
      sources: [
        Source.asset(path.join(__dirname, '..', 'photos'))
      ],
      destinationBucket: bucket
    })

    const frontendBucket = new Bucket(this, 'ReactAppWeb', {
      websiteIndexDocument: 'index.html',
      publicReadAccess: true
    })

    new BucketDeployment(this, 'ReactAppWebDeploy', {
      sources: [
        Source.asset(path.join(__dirname, '..', 'frontend', 'build'))
      ],
      destinationBucket: frontendBucket
    })

    const bucketContainersPermissions = new PolicyStatement()
    bucketContainersPermissions.addResources(bucket.bucketArn)
    bucketContainersPermissions.addActions('s3:ListBucket')

    const bucketPermissions = new PolicyStatement()
    bucketPermissions.addResources(`${bucket.bucketArn}/*`)
    bucketPermissions.addActions('s3:GetObject', 's3:PutObject')

    const getPhotosFunc = new lambda.NodejsFunction(this, 'getPhotosLambda', {
      runtime: Runtime.NODEJS_12_X,
      entry: path.join(__dirname, '..', 'api', 'get-photos', 'index.ts'),
      handler: 'getPhotos',
      environment: {
        PHOTOS_BUCKET_NAME: bucket.bucketName
      }
    })

    getPhotosFunc.addToRolePolicy(bucketPermissions)
    getPhotosFunc.addToRolePolicy(bucketContainersPermissions)

    const httpApi = new HttpApi(this, 'getPhotosApi', {
      apiName: 'photos',
      corsPreflight: {
        allowOrigins: ['*'],
        allowMethods: [HttpMethod.GET],
      },
      createDefaultStage: true
    })

    const lambdaIntegration = new LambdaProxyIntegration({
      handler: getPhotosFunc
    })

    httpApi.addRoutes({
      path: '/photos',
      methods: [HttpMethod.GET],
      integration: lambdaIntegration
    })

    new CfnOutput(this, 'PracticeCDKBucketNameExport', {
      exportName: 'PracticeCDKBucketName',
      value: bucket.bucketName
    })
    new CfnOutput(this, 'FrontendBucketNameExport', {
      exportName: 'FrontendBucketName',
      value: frontendBucket.bucketName
    })

    new CfnOutput(this, 'photosApi', {
      exportName: 'PhotosApiEndpoint',
      value: httpApi.url!
    })
  }
}
