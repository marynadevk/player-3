'use client';

import React, { useState } from 'react';
import { BsCardImage } from 'react-icons/bs';
import { Input } from '../ui/input';

export const AddImageTile = ({ tileType }: { tileType: string }) => {
  const [imageBase64, setImageBase64] = useState<string | null>(() => {
    return localStorage.getItem(`imageBase64-${tileType}`);
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = reader.result as string;
        setImageBase64(base64String);
        localStorage.setItem(`imageBase64-${tileType}`, base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div
      className="flex flex-col items-center justify-center w-full h-full bg-gray-100 rounded-lg cursor-pointer"
      onMouseDown={(e) => {
        e.stopPropagation();
      }}
    >
      {imageBase64 ? (
        <div className="flex items-center justify-center w-full h-full max-w-full max-h-full">
          <img
            src={imageBase64}
            alt="Uploaded"
            className="max-w-full max-h-full object-contain rounded-lg"
          />
        </div>
      ) : (
        <label
          htmlFor="file-upload"
          className="flex flex-col items-center justify-center w-full h-full bg-gray-100 border border-gray-300 rounded-lg p-4 cursor-pointer hover:bg-gray-200 transition"
        >
          <BsCardImage className="text-gray-500 text-2xl mb-2" />
          <span className="text-gray-600">Add image</span>
          <Input
            id="file-upload"
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
        </label>
      )}
    </div>
  );
};
