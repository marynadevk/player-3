import { ITile } from '@/types/types';
import { useState, useEffect } from 'react';

export const useLocalStorageTiles = (key: string, initialValue: ITile[]) => {
  const [tiles, setTiles] = useState<ITile[]>(() => {
    if (typeof window !== 'undefined') {
      const savedTiles = localStorage.getItem(key);
      return savedTiles ? JSON.parse(savedTiles) : initialValue;
    }
    return initialValue;
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(key, JSON.stringify(tiles));
    }
  }, [key, tiles]);

  return [tiles, setTiles] as const;
};
