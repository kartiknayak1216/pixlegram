
import React from 'react'
import { PostWithExtras } from './like'
import Link from 'next/link'
import Deletecomment from '../deletecomment'

export default function Commentdisplay( {post, id}:{ post: PostWithExtras,id:string}) {
  return (
    <div className='flex flex-col space-y-2'>
   { post.comments.length > 0 && (
    <Link href={`/post/${post.id}`}>
    <div className='font-semibold text-slate-500'>
    Show all {post.comments.length} comments</div></Link>
   )}
   {
    post.comments.slice(0,3).map((value,index)=>(
        <div className="text-sm leading-none flex items-center space-x-2 font-medium px-3 sm:px-0 mt-1 pt-1" key={index}>
        <Link href={`/profile/${value.user.id}`} className="font-semibold text-primary hover:underline">
          {value.user.name}
        </Link>
        <p className="text-gray-600">{value.body}</p>
       {(id == value.user.id) &&
        <Deletecomment usersid={value.id}/>}
        
      </div>
    )

    )
   }
       </div> 
    
  )
}
