import s3Client from '../awsConfig';
import { PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { randomBytes } from 'crypto';

function generateSaltedFilename(originalName: string): string {
  const salt = randomBytes(16).toString('hex');
  const extension = originalName.split('.').pop();
  return `${salt}.${extension}`;
}

// Task 3-5: Upload file with salted filename
export async function uploadFile(bucket: string, filePath: string, file: Express.Multer.File): Promise<string> {
  const saltedFilename = generateSaltedFilename(file.originalname);
  const saltedFilePath = `${filePath}/${saltedFilename}`;
  
  const params = {
    Bucket: bucket,
    Key: saltedFilePath,
    Body: file.buffer,
    ContentType: file.mimetype,
  };

  try {
    await s3Client.send(new PutObjectCommand(params));
    console.log('File uploaded successfully:', saltedFilePath);
    return saltedFilePath;
  } catch (error) {
    console.error('Error uploading file:', error);
    throw error;
  }
}

// Task 4: Generate presigned URL for accessing uploaded files
export async function getPresignedUrl(bucket: string, filePath: string, expiresIn: number = 3600): Promise<string> {
  const command = new GetObjectCommand({
    Bucket: bucket,
    Key: filePath,
  });

  try {
    const url = await getSignedUrl(s3Client, command, { expiresIn });
    return url;
  } catch (error) {
    console.error('Error generating presigned URL:', error);
    throw error;
  }
}
