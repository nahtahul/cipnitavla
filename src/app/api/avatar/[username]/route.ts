import { NextRequest, NextResponse } from 'next/server';
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

// Configure S3 client to use Tigris endpoint
const s3Client = new S3Client({
  endpoint: "https://fly.storage.tigris.dev",
  region: "auto",
  credentials: {
    accessKeyId: process.env.TIGRIS_ACCESS_KEY || 'dummy',
    secretAccessKey: process.env.TIGRIS_SECRET_KEY || 'dummy'
  },
  forcePathStyle: false // This is important for virtual-host style URLs
});

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ username: string }> }
) {
  try {
    const { username } = await params;

    // Create the command to get the object
    const command = new GetObjectCommand({
      Bucket: "cipnitavla",
      Key: `avatars/${username}.jpg`,
    });

    // Generate a presigned URL that expires in 1 hour
    const signedUrl = await getSignedUrl(s3Client, command, { expiresIn: 3600 });
    
    // Return the URL directly as JSON
    return NextResponse.json({ url: signedUrl }, {
      headers: {
        'Cache-Control': 'public, max-age=3600',
      },
    });
  } catch (error) {
    console.error('Error generating presigned URL:', error);
    return NextResponse.json({ error: 'Avatar not found' }, { status: 404 });
  }
} 