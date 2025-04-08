"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

interface PostProps {
  username: string;
  handle: string;
  content: string;
  timestamp: string;
  likes: number;
  comments: number;
  retweets: number;
}

export default function Post({
  username,
  handle,
  content,
  timestamp,
  likes,
  comments,
  retweets,
}: PostProps) {
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

  useEffect(() => {
    fetch(`/api/avatar/${handle}`)
      .then(res => res.json())
      .then(data => {
        if (data.url) {
          setAvatarUrl(data.url);
        }
      })
      .catch(err => console.error('Error fetching avatar:', err));
  }, [handle]);

  return (
    <div className="bg-white p-4 border-b border-gray-200 hover:bg-gray-50 transition">
      <div className="flex space-x-3">
        <div className="flex-shrink-0">
          {avatarUrl ? (
            <Image
              src={avatarUrl}
              alt={`${username}'s avatar`}
              width={48}
              height={48}
              className="rounded-full"
              unoptimized
            />
          ) : (
            <div className="w-12 h-12 rounded-full bg-gray-200" />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-1">
            <p className="font-bold text-gray-900">{username}</p>
            <p className="text-gray-500">@{handle}</p>
            <span className="text-gray-500">·</span>
            <p className="text-gray-500">{timestamp}</p>
          </div>
          <p className="text-gray-900 mt-1">{content}</p>
          <div className="flex items-center justify-between mt-3 max-w-md">
            <button className="flex items-center space-x-2 text-gray-500 hover:text-blue-500">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              <span>{comments}</span>
            </button>
            <button className="flex items-center space-x-2 text-gray-500 hover:text-green-500">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              <span>{retweets}</span>
            </button>
            <button className="flex items-center space-x-2 text-gray-500 hover:text-red-500">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              <span>{likes}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 