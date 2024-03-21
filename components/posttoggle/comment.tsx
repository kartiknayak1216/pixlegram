"use client"
import React, { useState, useTransition } from 'react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useOptimistic } from 'react';
import Link from 'next/link';
import { PostWithExtras } from './like';
import { Comment, User } from '@prisma/client';
import { createcomment } from '@/lib/action';
import Deletecomment from '../deletecomment';
import { CommentWithExtras } from '@/lib/defination';

export default function CommentDisplay({
  post,
  userf,
  id,
}: {
  post: PostWithExtras;
  userf: { id: string; name: string | null };
  id: string;
}) {
  const [body, setBody] = useState('');
  let [isPending, startTransition] = useTransition();
  const [optimisticComments, addOptimisticComment] = useOptimistic<CommentWithExtras[]>(
    post.comments,
    //@ts-ignore
    // Function to update the comments array optimistically
    (state: CommentWithExtras[], newComment: CommentWithExtras) => [
      { ...newComment, userId: userf.id ?? '', postId: post.id ?? '', user:{
        username:String
      } },
      ...state,
    ]
  );

  const handleCommentSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!body.trim()) {
      return;
    }
    try {
      // Optimistically add the new comment to the comments array
      const newComment = {
        postId: post.id ?? '',
        userId: userf.id ?? '',
        body: body,
        user: {
          username: userf.name ? userf.name : '' // Set username to userf.name if it exists, otherwise use an empty string
        }
      };
      addOptimisticComment(newComment);

      // Call createcomment to actually create the comment
      await createcomment(post.id, userf.id ?? '', body);

      // Clear the input field after submitting
      setBody('');
    } catch (error) {
      console.error('Failed to create comment:', error);
    }
  };

  return (
    <div className='flex flex-col space-y-2'>
      {optimisticComments.length > 0 && (
        <Link href={`/post/${post.id}`}>
          <div className='font-semibold text-slate-500'>Show all {optimisticComments.length} comments</div>
        </Link>
      )}
      {optimisticComments.slice(0, 3).map((value, index) => (
        <div className='text-sm leading-none flex items-center space-x-2 font-medium px-3 sm:px-0 mt-1 pt-1' key={index}>
          <Link href={`/profile/${value.userId}`} className='font-semibold text-primary hover:underline'>
            {value.user.name}
          </Link>
          <p className='text-gray-600'>{value.body}</p>
        </div>
      ))}
      <form onSubmit={handleCommentSubmit}>
        <div className='flex w-full max-w-sm items-center space-x-2'>
          <Input
            id='body'
            name='body'
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder='Post a comment'
          />
          <Button type='submit' variant='link'>
            Post
          </Button>
        </div>
      </form>
    </div>
  );
}
