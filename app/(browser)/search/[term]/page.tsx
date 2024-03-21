import ProfileAvatar from '@/components/profileavtar'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import Usercard from '@/components/ui/usercard'
import { postbyname, userbyname } from '@/lib/data'
import Link from 'next/link'
import React, { Suspense } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import MiniCard from '@/components/minicard'
import { Formkseleton, MiniCardSkeleton, SinglePostSkeleton, SmallCardSkeleton, ViewPostSkeleton } from '@/components/skelton/Homecardshelton'


type terms ={
    params:{
        term:string
    }
}

export default async function page({ params: { term } }: terms) {
  const post = await postbyname(term)
  const user = await userbyname(term)
  console.log(user)
  return (
    <div className='flex flex-col justify-center items-center'>
      <div>
        {
          (user.length > 0) ? (
            <div>
              <div className="text-xl font-bold mb-4 mx-auto">Related users</div>
              <ScrollArea className="rounded-md border w-max">
                <div className="p-4">
                <Suspense fallback={<Formkseleton/>}>
                  {user?.map((value, index) => (
                    <div key={index}>
                      <Link href={`/profile/${value?.id}`}>
                        <Button variant="secondary" className="w-full flex flex-row justify-start gap-10 h-12">
                        
                        
                          <ProfileAvatar username={value?.name ?? ''} image={value?.image ?? ''} isupdate={false} islive={true} size={0} />
                       
                          <div className="text-center font-extrabold mx-20">{value?.name}</div>
                          
                        </Button>
                      </Link>
                      <Separator className="my-2" />
                    </div>
                  ))}</Suspense>
                </div>
              </ScrollArea>
            </div>
          ) : (
            <div className='text-xl font-bold mb-4 mx-auto'>No user found</div>
          )
        }
      </div>
      <div className='mt-40 mb-9'>
      <Suspense fallback={<MiniCardSkeleton/>}>

        {
          (post.length > 0) ? (
            <div>
              <div className="text-xl font-bold mb-4 mx-auto">Related posts</div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-8 max-w-full">
                {post?.map((value, index) => (
                  <MiniCard key={index} post={value} dataname={value.user.name ?? ""} dataimage={value.user.image ?? ""} />
                ))}
              </div>
            </div>
          ) : (
            <div className='text-xl font-bold mb-4 mx-auto'>No posts found</div>
          )
        }</Suspense>
    
      </div>
    </div>
  )
}
