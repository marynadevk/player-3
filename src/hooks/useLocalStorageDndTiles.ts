import { IDndTile } from '@/types/types';
import { useEffect, useState } from 'react';

export const useLocalStorageDndTiles = (
  key: string,
  initialValue: IDndTile[]
) => {
  const [tiles, setTiles] = useState<IDndTile[]>(() => {
    const savedTiles = localStorage.getItem(key);
    return savedTiles ? JSON.parse(savedTiles) : initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(tiles));
  }, [key, tiles]);

  return [tiles, setTiles] as const;
};
