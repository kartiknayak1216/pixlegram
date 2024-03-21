import React from 'react';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { format } from 'date-fns'; // Import date-fns for date formatting
import { postes } from '@/lib/defination';
import Link from 'next/link';

export default function Profile({ user }: { user: postes }) {
  const { name, email, image,  } = user?.user;
  const{createdAT}= user

  // Format the createdAt date using date-fns
  const formattedDate = format(new Date(createdAT), "MMMM yyyy");

  return (
    <Link href={`/profile/${user?.userId}`} className='cursor-pointer'>

    <div className='flex flex-row items-center gap-3'>
      <Avatar>
        {image ? (
          <AvatarImage src={image} alt={name ||""} />
        ) : (
          <AvatarFallback>{"profile"}</AvatarFallback>
        )}
      </Avatar>
      <div className='flex flex-col'>
        
        <div className='text-md text-slate-600'>{email}</div>
        <div className='text-sm text-slate-600'>Posted {formattedDate}</div>
      </div>
    </div></Link>
  );
}
