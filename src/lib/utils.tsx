import { IDndTile, ITile } from '@/types/types';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { EmptyTile } from '@/components/tiles/EmptyTile';
import { AddMediaTile } from '@/components/tiles/AddMediaTile';
import { SocialMediaTile } from '../components/tiles/SocialMediaTile';
import { AddTextTile } from '@/components/tiles/AddTextTile';
import { AddImageTile } from '@/components/tiles/AddImageTile';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function extractInstagramUsername(url: string): string | null {
  try {
    const parsed = new URL(url);
    const pathname = parsed.pathname;
    const username = '@' + pathname.split('/').filter(Boolean)[0];
    return username || null;
  } catch {
    return null;
  }
}

export const renderTileContent = (tile: ITile | IDndTile, tileType: string): React.ReactNode => {
  switch (tile.type) {
    case 'socialMedia':
      return (
        <SocialMediaTile
          link={tile.link ?? ''}
          socialMediaType={tile.socialMediaType ?? 'instagram'}
          title={tile.title}
          description={tile.description}
        />
      );

    case 'empty':
      return <EmptyTile title={tile.title} />;
    case 'add-text':
      return <AddTextTile tileType={tileType} />;
    case 'add-image':
      return <AddImageTile tileType={tileType} />;
    case 'add-video':
    case 'add-audio':
      return <AddMediaTile type={tile.type} title={tile.title} />;

    default:
      return <div>Unknown tile type</div>;
  }
};
