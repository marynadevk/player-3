'use client';

import React, { useEffect, useState } from 'react';
import { Textarea } from '../ui/textarea';

export const AddTextTile = ({ tileType }: { tileType: string }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedText = localStorage.getItem(`inputText-${tileType}`);
      if (storedText) setText(storedText);
    }
  }, [tileType]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(`inputText-${tileType}`, text);
    }
  }, [text, tileType]);

  return (
    <div
      className="flex flex-col items-center justify-center h-full w-full rounded-lg text-gray-700 p-4 cursor-pointer bg-gray-100"
      onMouseDown={(e) => {
        e.stopPropagation();
      }}
      onClick={() => setIsEditing(true)}
      onBlur={() => setIsEditing(false)}
    >
      {isEditing ? (
        <Textarea
          placeholder="Share your thoughts..."
          className="w-full h-full bg-gray-100 border border-gray-300 rounded-lg p-2"
          rows={4}
          maxLength={200}
          onChange={(e) => setText(e.target.value)}
          value={text}
          onBlur={() => setIsEditing(false)}
          autoFocus
        />
      ) : (
        <p className="w-full h-full rounded-lg p-2">
          {text || 'Share your thoughts...'}
        </p>
      )}
    </div>
  );
};
