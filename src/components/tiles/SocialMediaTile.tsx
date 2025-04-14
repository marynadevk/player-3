import React from 'react';
import { Button } from '../ui/button';
import { IoLogoInstagram } from 'react-icons/io';
import { extractInstagramUsername } from '@/lib/utils';
import { Avatar } from '../ui/avatar';

interface Props {
  link: string;
  socialMediaType: 'instagram' | 'facebook' | 'x' | 'youtube' | 'tiktok';
  icon?: string;
  title?: string;
  description?: string;
  onClick?: () => void;
}

export const SocialMediaTile = ({ link, socialMediaType }: Props) => {

  const url = 'https://www.instagram.com/purr.in.ink?igsh=OWJieWNvbnkzeWlp';
  const username = extractInstagramUsername(url);

  return (
    <div className="flex flex-col p-4 w-full h-full items-center justify-between gap-3 bg-gray-100 rounded-lg">
      <div className="flex flex-col items-center w-full text-gray-700 font-semibold gap-2">
        <Avatar className="bg-slate-300 size-16">
          {/* <AvatarImage src='' alt="@shadcn" /> */}
          {/* <AvatarFallback>CN</AvatarFallback> */}
        </Avatar>
        {username}
      </div>
      {socialMediaType === 'instagram' && (
        <Button
          variant="outline"
          className="bg-blue-500 text-white flex justify-center text-sm font-medium mt-2 p-1 w-full"
          onMouseDown={(e) => {
            e.stopPropagation();
            e.preventDefault();
          }}
          onClick={() => window.open(link)}
        >
          <IoLogoInstagram className="h-14 bg-gradient-to-tr from-yellow-300 via-pink-500 to-purple-600 text-white rounded-sm" />
          Follow
        </Button>
      )}
    </div>
  );
};
