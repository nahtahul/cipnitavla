"use server";

import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { lookup } from 'mime-types';

// Configure S3 client to use Tigris endpoint
export const s3Client = new S3Client({
  endpoint: "https://fly.storage.tigris.dev",
  region: "auto",
  credentials: {
    accessKeyId: process.env.TIGRIS_ACCESS_KEY || 'dummy',
    secretAccessKey: process.env.TIGRIS_SECRET_KEY || 'dummy'
  },
  forcePathStyle: false
});

export const bucket = process.env.TIGRIS_BUCKET || 'cipnitavla';

export type UploadFileParams = {
  file: File | Buffer;
  key: string;
  bucket?: string;
  contentType?: string;
  /**
   * Force a specific MIME type even if it doesn't match the file extension
   */
  forceMimeType?: boolean;
};

/**
 * Uploads a file to Tigris storage
 * @param params Upload parameters including file, key, and optional bucket name and content type
 * @returns Promise with the upload result
 */
export async function uploadFile({
  file,
  key,
  bucket = "cipnitavla",
  contentType,
  forceMimeType = false,
}: UploadFileParams) {
  try {
    let body: Buffer;
    
    // Convert File to Buffer if necessary
    if (file instanceof File) {
      const arrayBuffer = await file.arrayBuffer();
      body = Buffer.from(arrayBuffer);
    } else {
      body = file;
    }

    // Determine content type with following priority:
    // 1. Explicitly provided contentType when forceMimeType is true
    // 2. For File objects, use the file.type
    // 3. Lookup based on file extension
    // 4. Fallback to application/octet-stream
    let finalContentType = 'application/octet-stream';

    if (forceMimeType && contentType) {
      finalContentType = contentType;
    } else if (file instanceof File && file.type) {
      finalContentType = file.type;
    } else {
      const mimeType = lookup(key);
      if (mimeType) {
        finalContentType = mimeType;
      }
    }

    const command = new PutObjectCommand({
      Bucket: bucket,
      Key: key,
      Body: body,
      ContentType: finalContentType,
    });

    const result = await s3Client.send(command);
    return result;
  } catch (error) {
    console.error('Error uploading file:', error);
    throw error;
  }
}