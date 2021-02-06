import { expect as expectCDK, matchTemplate, MatchStyle } from '@aws-cdk/assert';
import * as cdk from '@aws-cdk/core';
import * as PracticeCdk from '../lib/practice-cdk-stack';

test('Practice CDK Stack', () => {
  const app = new cdk.App();
  // WHEN
  const stack = new PracticeCdk.PracticeCdkStack(app, 'MyTestStack');
  // THEN
  expectCDK(stack).to(matchTemplate({
    "Resources": {
      "DomainSlowSearchLogs5B35A97A": {
        "Type": "AWS::Logs::LogGroup",
        "Properties": {
          "RetentionInDays": 30
        },
        "UpdateReplacePolicy": "Retain",
        "DeletionPolicy": "Retain",
      },
      "DomainSlowIndexLogsFE2F1061": {
        "Type": "AWS::Logs::LogGroup",
        "Properties": {
          "RetentionInDays": 30
        },
        "UpdateReplacePolicy": "Retain",
        "DeletionPolicy": "Retain",
      },
      "DomainAppLogs21698C1B": {
        "Type": "AWS::Logs::LogGroup",
        "Properties": {
          "RetentionInDays": 30
        },
        "UpdateReplacePolicy": "Retain",
        "DeletionPolicy": "Retain",
      },
      "DomainESLogGroupPolicyc879b5abdc1d2400c5299ce24675d0cca29e4789fcCustomResourcePolicyD1542090": {
        "Type": "AWS::IAM::Policy",
        "Properties": {
          "PolicyDocument": {
            "Statement": [
              {
                "Action": "logs:PutResourcePolicy",
                "Effect": "Allow",
                "Resource": "*"
              },
              {
                "Action": "logs:DeleteResourcePolicy",
                "Effect": "Allow",
                "Resource": "*"
              }
            ],
            "Version": "2012-10-17"
          },
          "PolicyName": "DomainESLogGroupPolicyc879b5abdc1d2400c5299ce24675d0cca29e4789fcCustomResourcePolicyD1542090",
          "Roles": [
            {
              "Ref": "AWS679f53fac002430cb0da5b7982bd2287ServiceRoleC1EA0FF2"
            }
          ]
        },
      },
      "DomainESLogGroupPolicyc879b5abdc1d2400c5299ce24675d0cca29e4789fc0871DA40": {
        "Type": "Custom::CloudwatchLogResourcePolicy",
        "Properties": {
          "ServiceToken": {
            "Fn::GetAtt": [
              "AWS679f53fac002430cb0da5b7982bd22872D164C4C",
              "Arn"
            ]
          },
          "Create": {
            "service": "CloudWatchLogs",
            "action": "putResourcePolicy",
            "parameters": {
              "policyName": "ESLogPolicyc879b5abdc1d2400c5299ce24675d0cca29e4789fc",
              "policyDocument": {
                "Fn::Join": [
                  "",
                  [
                    "{\"Statement\":[{\"Action\":[\"logs:PutLogEvents\",\"logs:CreateLogStream\"],\"Effect\":\"Allow\",\"Principal\":{\"Service\":\"es.amazonaws.com\"},\"Resource\":[\"",
                    {
                      "Fn::GetAtt": [
                        "DomainSlowSearchLogs5B35A97A",
                        "Arn"
                      ]
                    },
                    "\",\"",
                    {
                      "Fn::GetAtt": [
                        "DomainSlowIndexLogsFE2F1061",
                        "Arn"
                      ]
                    },
                    "\",\"",
                    {
                      "Fn::GetAtt": [
                        "DomainAppLogs21698C1B",
                        "Arn"
                      ]
                    },
                    "\"]}],\"Version\":\"2012-10-17\"}"
                  ]
                ]
              }
            },
            "physicalResourceId": {
              "id": "ESLogGroupPolicyc879b5abdc1d2400c5299ce24675d0cca29e4789fc"
            }
          },
          "Update": {
            "service": "CloudWatchLogs",
            "action": "putResourcePolicy",
            "parameters": {
              "policyName": "ESLogPolicyc879b5abdc1d2400c5299ce24675d0cca29e4789fc",
              "policyDocument": {
                "Fn::Join": [
                  "",
                  [
                    "{\"Statement\":[{\"Action\":[\"logs:PutLogEvents\",\"logs:CreateLogStream\"],\"Effect\":\"Allow\",\"Principal\":{\"Service\":\"es.amazonaws.com\"},\"Resource\":[\"",
                    {
                      "Fn::GetAtt": [
                        "DomainSlowSearchLogs5B35A97A",
                        "Arn"
                      ]
                    },
                    "\",\"",
                    {
                      "Fn::GetAtt": [
                        "DomainSlowIndexLogsFE2F1061",
                        "Arn"
                      ]
                    },
                    "\",\"",
                    {
                      "Fn::GetAtt": [
                        "DomainAppLogs21698C1B",
                        "Arn"
                      ]
                    },
                    "\"]}],\"Version\":\"2012-10-17\"}"
                  ]
                ]
              }
            },
            "physicalResourceId": {
              "id": "ESLogGroupPolicyc879b5abdc1d2400c5299ce24675d0cca29e4789fc"
            }
          },
          "Delete": {
            "service": "CloudWatchLogs",
            "action": "deleteResourcePolicy",
            "parameters": {
              "policyName": "ESLogPolicyc879b5abdc1d2400c5299ce24675d0cca29e4789fc"
            },
            "ignoreErrorCodesMatching": "400"
          },
          "InstallLatestAwsSdk": true
        },
        "DependsOn": [
          "DomainESLogGroupPolicyc879b5abdc1d2400c5299ce24675d0cca29e4789fcCustomResourcePolicyD1542090"
        ],
        "UpdateReplacePolicy": "Delete",
        "DeletionPolicy": "Delete",
      },
      "Domain66AC69E0": {
        "Type": "AWS::Elasticsearch::Domain",
        "Properties": {
          "CognitoOptions": {
            "Enabled": false
          },
          "DomainEndpointOptions": {
            "EnforceHTTPS": false,
            "TLSSecurityPolicy": "Policy-Min-TLS-1-0-2019-07"
          },
          "EBSOptions": {
            "EBSEnabled": true,
            "VolumeSize": 20,
            "VolumeType": "gp2"
          },
          "ElasticsearchClusterConfig": {
            "DedicatedMasterEnabled": false,
            "InstanceCount": 1,
            "InstanceType": "t3.small.elasticsearch",
            "ZoneAwarenessEnabled": false
          },
          "ElasticsearchVersion": "7.9",
          "EncryptionAtRestOptions": {
            "Enabled": false
          },
          "LogPublishingOptions": {
            "ES_APPLICATION_LOGS": {
              "CloudWatchLogsLogGroupArn": {
                "Fn::GetAtt": [
                  "DomainAppLogs21698C1B",
                  "Arn"
                ]
              },
              "Enabled": true
            },
            "SEARCH_SLOW_LOGS": {
              "CloudWatchLogsLogGroupArn": {
                "Fn::GetAtt": [
                  "DomainSlowSearchLogs5B35A97A",
                  "Arn"
                ]
              },
              "Enabled": true
            },
            "INDEX_SLOW_LOGS": {
              "CloudWatchLogsLogGroupArn": {
                "Fn::GetAtt": [
                  "DomainSlowIndexLogsFE2F1061",
                  "Arn"
                ]
              },
              "Enabled": true
            }
          },
          "NodeToNodeEncryptionOptions": {
            "Enabled": false
          }
        },
        "DependsOn": [
          "DomainESLogGroupPolicyc879b5abdc1d2400c5299ce24675d0cca29e4789fcCustomResourcePolicyD1542090",
          "DomainESLogGroupPolicyc879b5abdc1d2400c5299ce24675d0cca29e4789fc0871DA40"
        ],
      },
      "AWS679f53fac002430cb0da5b7982bd2287ServiceRoleC1EA0FF2": {
        "Type": "AWS::IAM::Role",
        "Properties": {
          "AssumeRolePolicyDocument": {
            "Statement": [
              {
                "Action": "sts:AssumeRole",
                "Effect": "Allow",
                "Principal": {
                  "Service": "lambda.amazonaws.com"
                }
              }
            ],
            "Version": "2012-10-17"
          },
          "ManagedPolicyArns": [
            {
              "Fn::Join": [
                "",
                [
                  "arn:",
                  {
                    "Ref": "AWS::Partition"
                  },
                  ":iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
                ]
              ]
            }
          ]
        },
      },
      "AWS679f53fac002430cb0da5b7982bd22872D164C4C": {
        "Type": "AWS::Lambda::Function",
        "Properties": {
          "Code": {
            "S3Bucket": {
              "Ref": "AssetParameters4a3609ad912843e581892f37ae9d6fb0fa1648b547693aaa562b0119452b8956S3Bucket72B03BC9"
            },
            "S3Key": {
              "Fn::Join": [
                "",
                [
                  {
                    "Fn::Select": [
                      0,
                      {
                        "Fn::Split": [
                          "||",
                          {
                            "Ref": "AssetParameters4a3609ad912843e581892f37ae9d6fb0fa1648b547693aaa562b0119452b8956S3VersionKey520B7554"
                          }
                        ]
                      }
                    ]
                  },
                  {
                    "Fn::Select": [
                      1,
                      {
                        "Fn::Split": [
                          "||",
                          {
                            "Ref": "AssetParameters4a3609ad912843e581892f37ae9d6fb0fa1648b547693aaa562b0119452b8956S3VersionKey520B7554"
                          }
                        ]
                      }
                    ]
                  }
                ]
              ]
            }
          },
          "Role": {
            "Fn::GetAtt": [
              "AWS679f53fac002430cb0da5b7982bd2287ServiceRoleC1EA0FF2",
              "Arn"
            ]
          },
          "Handler": "index.handler",
          "Runtime": "nodejs12.x",
          "Timeout": 120
        },
        "DependsOn": [
          "AWS679f53fac002430cb0da5b7982bd2287ServiceRoleC1EA0FF2"
        ],
      },
    },
    "Parameters": {
      "AssetParameters4a3609ad912843e581892f37ae9d6fb0fa1648b547693aaa562b0119452b8956S3Bucket72B03BC9": {
        "Type": "String",
        "Description": "S3 bucket for asset \"4a3609ad912843e581892f37ae9d6fb0fa1648b547693aaa562b0119452b8956\""
      },
      "AssetParameters4a3609ad912843e581892f37ae9d6fb0fa1648b547693aaa562b0119452b8956S3VersionKey520B7554": {
        "Type": "String",
        "Description": "S3 key for asset version \"4a3609ad912843e581892f37ae9d6fb0fa1648b547693aaa562b0119452b8956\""
      },
      "AssetParameters4a3609ad912843e581892f37ae9d6fb0fa1648b547693aaa562b0119452b8956ArtifactHashD15A2D11": {
        "Type": "String",
        "Description": "Artifact hash for asset \"4a3609ad912843e581892f37ae9d6fb0fa1648b547693aaa562b0119452b8956\""
      }
    },
    "Outputs": {
      "ESDomainOutput": {
        "Value": {
          "Ref": "Domain66AC69E0"
        },
        "Export": {
          "Name": "ESDomainName"
        }
      }
    },
  }, MatchStyle.EXACT))
});
