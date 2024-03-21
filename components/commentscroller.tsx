import { User } from '.prisma/client'
import { CommentWithExtras } from '@/lib/defination'
import { ScrollArea } from '@radix-ui/react-scroll-area'
import { Link } from 'lucide-react'
import React from 'react'
import UserAvatar from './UserAvtar'
import Deletecomment from './deletecomment'
import index from './posttoggle'
import { Button } from './ui/button'
import { ScrollBar } from './ui/scroll-area'
import { Skeleton } from './ui/skeleton'

export default function commentscroller({
    comments,data
}:{
    comments:CommentWithExtras,
    data:User,
    
}) {
  return (
    <div>
          <ScrollArea className="w-80 rounded-md border">
                                  <div className="flex  flex-row gap-y-2">
                                  <Link href={`/profile/${comments.user.id}`}>
                                  <Button  variant="secondary" className="w-full flex flex-row justify-start gap-10 h-full ">
                                  <UserAvatar userimage={comments.user.image??""} username={comments.user.name??""} />
                {comments.body}

                </Button></Link>


                {(comments.userId === data?.id) && <Deletecomment usersid={comments.id} />}
           </div>
                                      <ScrollBar orientation="horizontal" />
                                  </ScrollArea>
    </div>
  )
}
