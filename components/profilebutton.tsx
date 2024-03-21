"use client"
import sidebarSlice from '@/lib/Toggle';
import { cn } from '@/lib/utils';
import { User } from '@prisma/client';
import React from 'react'
import UserAvatar from './UserAvtar';
import Link from 'next/link';
import { Button } from './ui/button';
import { usePathname } from 'next/navigation';

export default function Profilebutton({user}:{user:User}) {
  

    const toogled = sidebarSlice((state) => state.toogled);

    return (
    <div className="flex flex-row space-y-2 mt-4 ">
 <Link  href={`/profile/${user.id}`} className="flex flex-row space-y-2 mt-4 ">
          <Button
            variant="ghost"
            className={cn("flex w-full h-12 justify-start rounded-sm")}
          >
            {toogled ? (
              <div className="  mx-auto "><UserAvatar userimage={user.image??""} username={user.name??""}/></div>
            ) : (
              <>
                <div className="mr-6 gap-y-12"><UserAvatar userimage={user.image??""} username={user.name??""}/></div>
                <div className="font-bold">Profile</div>
              </>
            )}
          </Button>
        </Link>

    </div>
  )
}
