import React from 'react';
import { AspectRatio } from '../ui/aspect-ratio';
import { postes } from '@/lib/defination';
import Image from 'next/image';
import Link from 'next/link';

export default function ImageCard({ user }: { user: postes }) {
  const { fileUrl } = user;

  return (
    <div className="h-[350px] md:h-[450px] overflow-hidden rounded-md mt-7 mb-0">
      <AspectRatio ratio={1 / 1} className="relative h-full">
        <div className="absolute inset-0">
        
          <Image
            src={fileUrl}
            alt="Post preview"
            layout="fill"
            objectFit="cover"
            className="rounded-lg "
          />
        </div>
      </AspectRatio>
    </div>
  );
}
