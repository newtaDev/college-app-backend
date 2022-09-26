import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
  GetObjectCommand,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import internal from 'stream';
import { AppKeys } from '../../../config/keys/app_keys';

const s3Client = new S3Client({
  region: AppKeys.aws_bucket_region,
  credentials: {
    accessKeyId: AppKeys.aws_user_access_key,
    secretAccessKey: AppKeys.aws_user_secret_access_key,
  },
});

interface I_UploadToS3Params {
  file:
    | string
    | internal.Readable
    | ReadableStream<unknown>
    | Blob
    | Uint8Array
    | Buffer
    | undefined;
  fileName: string;
  contentType: string;
}
export const uploadFileToS3 = (params: I_UploadToS3Params) =>
  s3Client.send(
    new PutObjectCommand({
      Bucket: AppKeys.aws_bucket_name,
      Body: params.file,
      Key: params.fileName,
      ContentType: params.contentType,
    })
  );
export const deleteFileFromS3 = (fileName: string) =>
  s3Client.send(
    new DeleteObjectCommand({
      Bucket: AppKeys.aws_bucket_name,
      Key: fileName,
    })
  );

export const getSignedUrlOfFile = async (fileName: string) => {
  // https://aws.amazon.com/blogs/developer/generate-presigned-url-modular-aws-sdk-javascript/
  const command = new GetObjectCommand({
    Bucket: AppKeys.aws_bucket_name,
    Key: fileName,
  });
  const seconds = 24 * 60 * 60; // 24 hrs
  const url = await getSignedUrl(s3Client, command, { expiresIn: seconds });

  return url;
};

export * as s3Services from './s3_services';
