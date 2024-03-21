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
        {post?.likes.length === 0 ? (
          <div className='text-center'>You don&apos;t have any Saved posts. Like a post.</div>
        ) : (
          post?.likes.map((value, index) => (
            <div className='mx-auto' key={index}>
              <SmallCard post={value.post??""} dataname={value.post.user.name ?? ""} dataimage={value.post.user.image ?? ""} />
            </div>
          ))
        )}
      </Suspense>
    </div>
  )
}
