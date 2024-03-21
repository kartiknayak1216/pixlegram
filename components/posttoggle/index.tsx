import React from 'react'
import Savebutton from './savebutton'
import { cn } from '@/lib/utils'
import { postes } from '@/lib/defination'
import Like, { PostWithExtras } from './like';
import SaveButton from './savepost';

type PosttoggleProps = {
    post: PostWithExtras;
    className: string;
userId: string
  };
export default function index({ post, className,userId }: PosttoggleProps) {
  return (
    <div className={cn("relative flex items-start w-full gap-x-2 mt-0", className)}>
        <Savebutton id={post.id} />
        <Like post={post} userId={userId}  />
        <SaveButton post={post} userId={userId}/>
    </div>
  )
}
