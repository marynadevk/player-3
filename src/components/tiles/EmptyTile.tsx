import React from 'react'

export const EmptyTile = ({ title }: { title?: string }) => (
  <div className="flex flex-col items-center justify-center h-full w-full bg-gray-100 ">
    {title || 'Empty tile'}
  </div>
);
