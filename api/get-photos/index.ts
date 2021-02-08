import { APIGatewayProxyEventV2, Context, APIGatewayProxyStructuredResultV2 } from 'aws-lambda'
async function getPhotos(event: APIGatewayProxyEventV2, context: Context): Promise<APIGatewayProxyStructuredResultV2> {
  return {
    statusCode: 200,
    body: 'First CDK Lambda!'
  }
}

export {getPhotos}