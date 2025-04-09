import { NextRequest, NextResponse } from 'next/server';
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { s3Client } from '@/utils/storage';

// Simple in-memory cache for presigned URLs
const urlCache = new Map<string, { url: string; expires: number }>();
const CACHE_BUFFER_TIME = 300; // 5 minutes buffer before expiration

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ username: string }> }
) {
  try {
    const { username } = await params;
    
    // Check cache first
    const cached = urlCache.get(username);
    if (cached && cached.expires > Date.now() + CACHE_BUFFER_TIME * 1000) {
      return NextResponse.json({ url: cached.url }, {
        headers: {
          'Cache-Control': 'public, max-age=3600',
        },
      });
    }

    // Create the command to get the object
    const command = new GetObjectCommand({
      Bucket: "cipnitavla",
      Key: `avatars/${username}.jpg`,
    });

    // Generate a presigned URL that expires in 1 hour
    const signedUrl = await getSignedUrl(s3Client, command, { expiresIn: 3600 });
    
    // Cache the URL
    urlCache.set(username, {
      url: signedUrl,
      expires: Date.now() + 3600 * 1000 // 1 hour
    });
    
    const response = NextResponse.json({ url: signedUrl }, {
      headers: {
        'Cache-Control': 'public, max-age=3600',
      },
    });
    
    return response;
  } catch (error) {
    console.error('Error generating presigned URL:', error);
    return NextResponse.json({ error: 'Avatar not found' }, { status: 404 });
  }
} 