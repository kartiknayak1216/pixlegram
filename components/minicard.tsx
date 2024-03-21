"use client"
import React, { useState } from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { PostWithExtras, postwithuser } from '@/lib/defination'
import Image from 'next/image'
import { useMediaQuery } from 'react-responsive'

import ProfileAvatar from './profileavtar'
import { Post, User } from '@prisma/client'
import Link from 'next/link'

export default function MiniCard({ post , dataname ,dataimage}: { post: postwithuser ,dataname:string , dataimage:string}) {
    const [hover, setHover] = useState(false);

    const changeHover = () => {
        setHover((prevHover) => !prevHover);
    };
    const isSmallDevice = useMediaQuery({ maxWidth: 480 })
    return (
        <div className="relative flex flex-col justify-center overflow-hidden">
            <div className="absolute inset-0 bg-center dark:bg-black"></div>
            <div
                className="group relative m-0 flex h-80 w-80 rounded-xl shadow-xl ring-gray-900/5 sm:mx-auto sm:max-w-lg"
                onMouseEnter={changeHover}
                onMouseLeave={changeHover}
            >
                  <Link href={`/post/${post?.id}`} className='cursor-pointer'>

                <div className="z-10 h-full w-full overflow-hidden rounded-xl border border-gray-200 opacity-80 transition duration-300 ease-in-out group-hover:opacity-100 dark:border-gray-700 dark:opacity-70">
                    <Image
                        src={post.fileUrl}
                        className="animate-fade-in block h-full w-full scale-100 transform object-cover object-center opacity-100 transition duration-300 group-hover:scale-110"
                        alt="post"
                        fill
                    />
                </div></Link>
                {(hover || isSmallDevice) && (
                  
                    <div className="absolute bottom-0 z-20 m-0 pb-4 ps-4 transition duration-300 ease-in-out group-hover:-translate-y-1 group-hover:translate-x-3 group-hover:scale-110">
                         <div className='flex space-x-2'>

                        <ProfileAvatar username={post.user.name??""} image={post.user.image?? ""} isupdate={true} islive={false} size={0} />
                        <div>
                        <h1 className="font-serif text-slate-400 font-bold text-primary ">{post.user.name}</h1>
                        <h1 className="text-sm font-light text-slate-500 ">{post.caption}</h1>
                    </div>
                    </div>
                    </div>
                    
                )}
            </div>
        </div>
    );
}


