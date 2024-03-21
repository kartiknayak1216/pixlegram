"use client"
import React from 'react'
import type {
  Comment,
  Follows,
  Like,
  Post,
  SavedPost,
  User,
} from "@prisma/client";
import { useState, useOptimistic } from 'react';
import { like } from '@/lib/action';
import { Checkbox } from '../ui/checkbox';
import { Button } from '../ui/button';
import { Heart } from 'lucide-react';
import { cn } from '@/lib/utils';

export type CommentWithExtras = Comment & { user: User };
export type LikeWithExtras = Like & { user: User };

export type PostWithExtras = Post & {
  comments: CommentWithExtras[];
  likes: LikeWithExtras[];
  savedby: SavedPost[];
  user: User;
};
export default function  LikeButton({
  post,
  userId,
}: {
  post: PostWithExtras;
  userId?: string;
}){
  const islike = (like: Like) =>
    like.userId === userId && like.postId === post.id;
  const [optimisticLikes, addOptimisticLike] = useOptimistic<Like[]>(
    post.likes,
    // @ts-ignore
    (state: Like[], newLike: Like) =>
      // here we check if the like already exists, if it does, we remove it, if it doesn't, we add it
      state.some(islike)
        ? state.filter((like) => like.userId !== userId)
        : [...state, newLike]
  )

  return(
    <div className="flex flex-col">
     <form
        action={
        
          async()=>{
            const postId = post.id
            addOptimisticLike({ postId, userId });
            await like(post.id,userId??"")
          }
        
        }
      >
        <input type="hidden" name="postId" value={post.id} />

        <Button type={'submit'} variant={'ghost'} size={'icon'} >
          <Heart
            className={cn("h-6 w-6", {
              "text-red-500 fill-red-500": optimisticLikes.some(islike),
            })}
          />
        </Button>
        </form>
      {optimisticLikes.length > 0 && post.showlike && (
        <p className="text-sm font-bold dark:text-white">
          {optimisticLikes.length}{" "}
          {optimisticLikes.length === 1 ? "like" : "likes"}
        </p>
      )}
    </div>
  )
}
