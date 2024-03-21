"use client"
import React, { ReactNode, useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import sidebarSlice from '@/lib/Toggle';
import { cn } from '@/lib/utils';
import { SkeletonDemo } from './wrapper';

export default function Action({ children }: { children: ReactNode }) {
  const isSmallDevice = useMediaQuery({ maxWidth: 480 });
  const { toogled, open, close } = sidebarSlice((state) => state);
  const [isClient, setIsClient] = useState(false);
  

  useEffect(() => {
    setIsClient(true);
    
    if (!isSmallDevice) {
      open();
    } else {
      close();
    }
  }, [isSmallDevice, open, close]);

  if (!isClient)  return (
    
        <SkeletonDemo />
     
    );
  

  return <div className={cn(isSmallDevice && 'hidden')}>{children}</div>;
}
