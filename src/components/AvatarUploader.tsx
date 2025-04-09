'use client';

import { useState } from 'react';
import ReactCrop, { Crop as ReactCropType, PixelCrop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

type Crop = ReactCropType & { aspect?: number };

export function AvatarUploader() {
  const [src, setSrc] = useState<string | null>(null);
  const [crop, setCrop] = useState<Crop>({
    unit: '%',
    width: 100,
    height: 100,
    x: 0,
    y: 0,
    aspect: 1
  });
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    setSuccess(false);
    
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      
      // Validate file type
      if (!file.type.startsWith('image/')) {
        setError('Please select an image file');
        return;
      }
      
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError('Image must be smaller than 5MB');
        return;
      }

      const reader = new FileReader();
      reader.addEventListener('load', () => setSrc(reader.result?.toString() || null));
      reader.readAsDataURL(file);
    }
  };

  const getCroppedImg = async (imageSrc: string, pixelCrop: PixelCrop): Promise<Blob> => {
    const image = new Image();
    image.src = imageSrc;
    
    await new Promise((resolve) => {
      image.onload = resolve;
    });

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    if (!ctx) {
      throw new Error('No 2d context');
    }

    canvas.width = pixelCrop.width;
    canvas.height = pixelCrop.height;

    ctx.drawImage(
      image,
      pixelCrop.x,
      pixelCrop.y,
      pixelCrop.width,
      pixelCrop.height,
      0,
      0,
      pixelCrop.width,
      pixelCrop.height
    );

    return new Promise((resolve) => {
      canvas.toBlob((blob) => {
        if (!blob) throw new Error('Canvas is empty');
        resolve(blob);
      }, 'image/jpeg', 0.95);
    });
  };

  const handleUpload = async () => {
    if (!src) return;

    try {
      setIsUploading(true);
      setError(null);
      
      const croppedImage = await getCroppedImg(src, crop as PixelCrop);
      const username = 'test-user'; // TODO: Replace with actual username
      
      const formData = new FormData();
      formData.append('file', croppedImage, `${username}.jpg`);
      formData.append('username', username);

      const response = await fetch('/api/avatar/upload', {
        method: 'POST',
        body: formData
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Upload failed');
      }

      setSuccess(true);
      setSrc(null);
    } catch (err) {
      setError('Failed to upload avatar. Please try again.');
      console.error('Upload error:', err);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Upload Avatar</h1>
      
      <div className="space-y-4">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}
        
        {success && (
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded">
            Avatar uploaded successfully!
          </div>
        )}

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Choose an image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={onSelectFile}
            className="block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-md file:border-0
              file:text-sm file:font-semibold
              file:bg-blue-50 file:text-blue-700
              hover:file:bg-blue-100"
          />
          <p className="text-xs text-gray-500">
            Maximum file size: 5MB. Supported formats: JPEG, PNG, WebP
          </p>
        </div>

        {src && (
          <div className="space-y-4">
            <div className="border rounded-lg overflow-hidden">
              <ReactCrop
                crop={crop}
                onChange={(c) => setCrop(c)}
                aspect={1}
                circularCrop
              >
                <img
                  src={src}
                  alt="Upload preview"
                  className="max-h-[500px] w-auto"
                />
              </ReactCrop>
            </div>

            <button
              onClick={handleUpload}
              disabled={isUploading}
              className={`w-full py-2 px-4 rounded-md text-white font-medium
                ${isUploading
                  ? 'bg-blue-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700'
                }`}
            >
              {isUploading ? 'Uploading...' : 'Upload Avatar'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
} 