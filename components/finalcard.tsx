"use client"
import React, { Suspense } from 'react';
import { user } from '@/auth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Profile from './postcard/profile';
import Cardnotch from './ui/cardnotch';
import Imagecard from './postcard/imagecard';
import Link from 'next/link';
import Posttoggle from './posttoggle';
import { PostWithExtras } from './posttoggle/like';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import Imagewrapper from './imagepopup';
import { ScrollArea, ScrollBar } from './ui/scroll-area';
import { Separator } from './ui/separator';
import UserAvatar from './UserAvtar';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Formkseleton } from './skelton/Homecardshelton';
import { Commentfinal } from './finalcomments';
import Deletecomment from './deletecomment';
import { User } from '@prisma/client';
import Fcomment from './fcomment';

export default function finalcard({ post,data }: { post: PostWithExtras ,data:User}) {
    
    const currentuser = data?.id === post.userId;

    return (
        <div className="flex flex-col md:flex-row gap-x-20">
            <div>
            <Card className="w-[350px] h-[500px] md:w-[400px]">
    <CardHeader className="flex flex-row justify-between border-b-2">
        <Profile user={post} />
        {currentuser && <Cardnotch usersid={post.id} islike={post.showlike} post={post} />}
    </CardHeader>
    <CardContent  >
        
        <Imagewrapper url={post.fileUrl}>
            <Imagecard user={post} />
        </Imagewrapper>
        
       
    </CardContent>
</Card>
<div>
    <div className="hidden md:block">
            <Commentfinal post={post} userid={data?.id??""}/></div>
        </div>
            </div>
            <div className="hidden md:block">
                <Card className="w-[400px] md:h-[500px]">
                    <CardHeader className="flex flex-row justify-between border-b-2">
                    <Posttoggle post={post} className='px-3 sm:px-0' userId={data?.id || ""}/>
                    </CardHeader>
                    <CardContent>
                    <Suspense fallback={<Formkseleton/>}>
                        <ScrollArea className="rounded-md border h-[380px]">
                         {
                          (post.comments.length>0)?(   <div className="p-4">
                          {post.comments?.map((value, index) => (
                           
                              <div key={index} suppressHydrationWarning={true} className='mt-2'>
                               <Fcomment comments={value} data={data} />
                              </div>
                          ))}
                      </div>):(<div className="mx-auto text-center">This post dont have comments</div>)
                         }
                            <ScrollBar orientation="vertical" />
                        </ScrollArea></Suspense>

                    </CardContent>
                </Card>
            </div>
            <div className=" mb-28 sm:block md:hidden ">
            <Posttoggle post={post} className='px-3 sm:px-0' userId={data?.id || ""}/>
            
            <Commentfinal post={post} userid={data?.id??""}/>
        
               {(post.comments.length>0)?(
                 <Dialog>
                 <DialogTrigger asChild>
                     <div className="font-semibold text-blue-500 mx-auto text-center">Show all comments</div>
                 </DialogTrigger>
                 <DialogContent>
                    <Suspense fallback={<Formkseleton/>}>
                    <ScrollArea className="rounded-md border h-[380px]">
                         {
                          (post.comments.length>0)?(   <div className="p-4">
                          {post.comments?.map((value, index) => (
                           
                              <div key={index} suppressHydrationWarning={true} className='mt-2'>
                               <Fcomment comments={value} data={data} />
                              </div>
                          ))}
                      </div>):(<div className="mx-auto text-center">This post dont have comments</div>)
                         }
                            <ScrollBar orientation="vertical" />
                        </ScrollArea></Suspense>
                 </DialogContent>
             </Dialog>
               ):(
                <div className="mx-auto text-center">This post dont have comments </div>
               )}
            </div>
        </div>
    );
}
