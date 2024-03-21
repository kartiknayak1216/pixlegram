import { user } from '@/auth';
import React, { useOptimistic, useTransition } from 'react'
import { CommentWithExtras } from './posttoggle/like';
import { User } from '@prisma/client';



type Comment = {
    id: string;
    body: string;
    postId: string;
    userId: string;
}

export default function commentnew({postId,user, comments}:{
    postId: string;
    comments: CommentWithExtras[];
    user?: User | null;
}) {

    let [isPending, startTransition] = useTransition();
    const [optimisticComments, addOptimisticComment] = useOptimistic<
      CommentWithExtras[]
    >(
      comments,
      // @ts-ignore
      (state: Comment[], newComment: string) => [
        { body: newComment, userId: user?.id, postId, user },
        ...state,
      ]
    );
    
  return (
    <div>commentnew</div>
  )
}
