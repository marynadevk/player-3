import { useState, useEffect } from 'react';

export const useLocalStorageDndTiles = <T>(key: string, initialValue: T[]) => {
  const [tiles, setTiles] = useState<T[]>(initialValue);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const savedTiles = localStorage.getItem(key);
        if (savedTiles) {
          setTiles(JSON.parse(savedTiles));
        }
      } catch (error) {
        console.error('Error accessing localStorage:', error);
      }
      setIsHydrated(true);
    }
  }, [key]);

  useEffect(() => {
    if (isHydrated) {
      try {
        localStorage.setItem(key, JSON.stringify(tiles));
      } catch (error) {
        console.error('Error saving to localStorage:', error);
      }
    }
  }, [key, tiles, isHydrated]);

  if (!isHydrated) {
    return [initialValue, () => {}] as const;
  }

  return [tiles, setTiles] as const;
};
