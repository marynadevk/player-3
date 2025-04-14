'use client';

import React from 'react';
import { ProfileInformation } from './ProfileInformation';

import { GridLayoutVersion } from './GridLayoutVersion';
import { DndKitVersion } from './DndKitVersion';

export const RootViewMainPage = () => {
  return (
    <div className="grid grid-cols-12 gap-6">
      <div className="col-span-3">
        <ProfileInformation />
      </div>
      <div className="col-span-9 p-4">
        <GridLayoutVersion />
        <DndKitVersion />
      </div>
    </div>
  );
};
