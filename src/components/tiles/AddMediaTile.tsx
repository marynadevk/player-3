import React from 'react';
import { Plus } from 'lucide-react';

interface Props {
  type: 'add-image' | 'add-video' | 'add-audio' | 'add-doc';
  title?: string;
}

export const AddMediaTile: React.FC<Props> = ({ type, title }) => {
  const label = title || 'Add media';
  const colorMap: Record<string, string> = {
    'add-image': 'bg-pink-200',
    'add-video': 'bg-blue-200',
    'add-audio': 'bg-green-200',
    'add-doc': 'bg-yellow-200',
  };

  return (
    <div
      className={`flex flex-col items-center justify-center h-full w-full rounded-lg text-gray-700 p-4 cursor-pointer ${colorMap[type]} bg-gray-100 `}
    >
      <Plus className="w-6 h-6 mb-2" />
      <span className="text-sm font-medium">{label}</span>
    </div>
  );
};
