import Minicard from '@/components/minicard';
import { fetchPost, profilebyId } from '@/lib/data';
import React, { Suspense } from 'react'
import { user } from "@/auth";
import SmallCard from '@/components/ui/smallcard';
import { SmallCardSkeleton } from '@/components/skelton/Homecardshelton';

type Props = {
  params: {
    id: string;
  };
};

export default async function page({params:{id}}:Props) {
  const data = await user();
  const post = await profilebyId(id);

  return (
    <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-8 mb-20">
     <Suspense fallback={<SmallCardSkeleton/>}>
      {post?.posts.length === 0 ? (
        <div className='text-center'>{post.name} dont have any post</div>
      ) : (
        post?.posts.map((value, index) => (
          <div className='mx-auto'>
          <SmallCard key={index} post={value} dataname={data?.name ?? ""} dataimage={data?.image ?? ""} /></div>
        ))
      )}</Suspense>
    </div>
  )
}
