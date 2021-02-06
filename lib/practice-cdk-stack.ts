import * as es from '@aws-cdk/aws-elasticsearch';
import * as cdk from '@aws-cdk/core';

export class PracticeCdkStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const esDomain = new es.Domain(this, 'Domain', {
      version: es.ElasticsearchVersion.V7_9,
      capacity: {
        masterNodes: 1,
        dataNodes: 1,
        dataNodeInstanceType: 't3.small.elasticsearch'
      },
      ebs: {
        volumeSize: 20
      },
      logging: {
        slowSearchLogEnabled: true,
        appLogEnabled: true,
        slowIndexLogEnabled: true,
      }
    });
    // The code that defines your stack goes here
  }
}