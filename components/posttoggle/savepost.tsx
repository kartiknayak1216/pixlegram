"use client"
import React, { useOptimistic } from 'react'
import { PostWithExtras } from './like'
import {  SavedPost }from "@prisma/client";
import { Button } from '../ui/button';
import { Bookmark } from 'lucide-react';
import { cn } from '@/lib/utils';
import { save } from '@/lib/action';
export default function Savepost({post,userId}:
  {post:PostWithExtras ,userId:string}
) {

//here we find is user in save just condition
const predicate = (bookmark: SavedPost) =>
bookmark.userId === userId && bookmark.postid=== post.id;


  const [optimistic, addOptimistic]= useOptimistic <SavedPost[]>(
    post.savedby,
    //@ts-ignore
    (state:SavedPost[],newBookmark : SavedPost)=>
    state.find(predicate)?state.filter((bookmark)=>bookmark.userId != userId):
    [...state,newBookmark]
  ) 
  return (
    <form
    action ={
      async(formdata:FormData)=>{
const postid = formdata.get("postid")
addOptimistic({postid,userId})
await save(post.id,userId)
      }
    }>
       <input type="hidden" name="postid" value={post.id} />
       <Button
      type="submit"
      variant={"ghost"}
      size={"icon"}
      className="h-9 w-9"
     
    >

<Bookmark className={cn("h-6 w-6", optimistic.find(predicate)&& "dark:fill-white fill-black")}
/>
    </Button>
    </form>
  )
}
