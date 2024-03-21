import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Profile from './profile'
import { postes } from '@/lib/defination'
import { MenuIcon } from 'lucide-react'
import Imagecard from './imagecard'
import Link from 'next/link'
import Posttoggle from '../posttoggle'
import { user as userdata} from "@/auth";
import { PostWithExtras } from '../posttoggle/like'

import Cardnotch from '../ui/cardnotch'
import CommentDisplay from "../posttoggle/comment"

export default async function maincard({ user }: { user: PostWithExtras }) {
  const data = await userdata();
  const currentuser = data?.id === user.userId;

  return (
    <Card className="w-[340px] md:w-[600px] ">
      <CardHeader className='flex flex-row justify-between border-b-2'>
        <Profile user={user}/>
        {currentuser &&
        <Cardnotch  usersid={user.id} islike={user.showlike} post={user}/>}
      </CardHeader>
      <CardContent >
        <div className='mb-0 pb-0'>
        <Link href={`/post/${user?.id}`} className='cursor-pointer '>
          <Imagecard user={user}/>
        </Link></div>

        <div className="items-start justify-center "> {/* Add spacing here */}
          <Posttoggle post={user} className='px-3 sm:px-0' userId={data?.id || ""}/>
          {user.caption && (
            <div className="text-sm leading-none flex items-center space-x-2 font-medium px-3 sm:px-0 mt-1 pt-2">
              <Link href={`/dashboard/${user.user.name}`} className="font-bold text-primary hover:underline">
                {user.user.name}
              </Link>
              <p className="text-gray-600">{user.caption}</p>
            </div>
          )}
          <CommentDisplay post={user} userf={{
            id: data?.id ?? "",
            name: data?.name ?? ""
          }} id={data?.id ?? ""} />
        </div>
      </CardContent>
    </Card>
  );
}
