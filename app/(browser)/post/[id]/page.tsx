import Finalcard from '@/components/finalcard'
import Maincard from '@/components/postcard/maincard'
import { SinglePostSkeleton } from '@/components/skelton/Homecardshelton'
import { fetchPost, fetchPostbyId } from '@/lib/data'
import React, { Suspense } from 'react'

type props ={
    params:{
        id:string
    }
}
export default  async function page({params:{id}}:props) {
    const post = await fetchPostbyId(id)
  return (
    <div>
      <Suspense fallback={<SinglePostSkeleton/>}>
    {post && 
    <Finalcard post={post}/>}</Suspense>
  
    </div>
  )
}
