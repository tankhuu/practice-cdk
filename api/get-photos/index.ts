import { APIGatewayProxyEventV2, Context, APIGatewayProxyStructuredResultV2 } from 'aws-lambda'
import {S3} from 'aws-sdk'
import { Bucket } from '@aws-cdk/aws-s3';

const s3 = new S3()
const bucketName = process.env.PHOTOS_BUCKET_NAME!

const generateUrl = async (object: S3.Object): Promise<{fileName: string, url: string}> => {
  const url = await s3.getSignedUrlPromise('getObject', {
    Bucket: bucketName,
    Key: object.Key!,
    Expires: (24 * 60 * 60)
  })

  return {
    fileName: object.Key!,
    url: url
  }
}


async function getPhotos(event: APIGatewayProxyEventV2, context: Context): Promise<APIGatewayProxyStructuredResultV2> {
  try {
    const {Contents: results} = await s3.listObjects({Bucket: bucketName}).promise()
    console.log(results)
    const photos = await Promise.all(results?.map(r => generateUrl(r)))
    
    return {
      statusCode: 200,
      body: JSON.stringify(photos)
    }
  } catch(err) {
    return {
      statusCode: 500,
      body: err.message
    }
  }
}

export {getPhotos}