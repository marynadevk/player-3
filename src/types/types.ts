import { Layout } from 'react-grid-layout';

export interface ITile extends Layout {
  x: number;
  y: number;
  w: number;
  h: number;
  i: string;
  type:
    | 'socialMedia'
    | 'empty'
    | 'add-image'
    | 'add-video'
    | 'add-audio'
    | 'add-text';
  content?: React.ReactNode;
  description?: string;
  icon?: string;
  title?: string;
  link?: string;
  socialMediaType?: 'instagram' | 'facebook' | 'x' | 'youtube' | 'tiktok';
}

export interface IDndTile {
  id: string;
  colStart: number;
  rowStart: number;
  colSpan: number;
  rowSpan: number;
  type:
    | 'socialMedia'
    | 'empty'
    | 'add-image'
    | 'add-video'
    | 'add-audio'
    | 'add-text';
  title?: string;
  link?: string;
  socialMediaType?: 'instagram' | 'facebook' | 'x' | 'youtube' | 'tiktok';
  description?: string;
}
