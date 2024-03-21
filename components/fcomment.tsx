import { CommentWithExtras } from '@/lib/defination'
import Link from 'next/link'
import React from 'react'
import UserAvatar from './UserAvtar'
import { Button } from './ui/button'
import { ScrollArea, ScrollBar } from './ui/scroll-area'
import Deletecomment from './deletecomment'
import { User } from '@prisma/client'

export default function Fcomment({comments,data}:{comments:CommentWithExtras,data:User}) {
  return (
    <ScrollArea className="w-80 rounded-md border">
    <div className='w-full h-full justify-start '  >
    <div className="group p-3 px-3.5  flex items-start space-x-2.5">
         <Link href={`/profile/${comments.userId}`}>
         <UserAvatar userimage={comments.user.image??""} username={comments.user.name??""}  />

         </Link>
         <div className="space-y-1.5">
         <div className="flex items-center space-x-1.5 leading-none text-sm">
         <Link href={`/profile/${comments.userId}`} className="font-semibold">
            {comments.user.name}
          </Link>
          <p className="font-medium">{comments.body}</p>
          </div>
          {comments.userId == data.id &&
         < Deletecomment usersid={comments.id} />}
         </div>
       
    </div></div> <ScrollBar orientation="horizontal" />
                                  </ScrollArea>
  )
}
