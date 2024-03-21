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

export default async function finalcard({ post }: { post: PostWithExtras }) {
    const data = await user();
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
                        <ScrollArea className="rounded-md border h-[380px]">
                         {
                          (post.comments.length>0)?(   <div className="p-4">
                          {post.comments?.map((value, index) => (
                           
                              <div key={index}>
                                  <ScrollArea className="w-80 rounded-md border">
                                  <div className="flex flex-col">
                                  <Link href={`/profile/${value.userId}`}>
                                  <Button key={index} variant="secondary" className="w-full flex flex-row justify-start gap-10 h-full mt-5">
                                  <UserAvatar userimage={value.user.image ?? ''} username={value.user.name ?? ''} />
                {value.body}
                {(value.userId === data?.id) && <Deletecomment usersid={value.id} />}
            </Button></Link></div>
                                      <ScrollBar orientation="horizontal" />
                                  </ScrollArea>
                                  <Separator className="my-2" />
                              </div>
                          ))}
                      </div>):(<div className="mx-auto text-center">This post dont have comments</div>)
                         }
                            <ScrollBar orientation="vertical" />
                        </ScrollArea>

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
                     <ScrollArea className="rounded-md border h-[400px]">
                         <div className="p-4">
                             {post.comments?.map((value, index) => (
                                 <div key={index}>
                                     <ScrollArea className="w-80 rounded-md border">
                                     <div className="flex flex-col">
                                     <Link href={`/profile/${value.userId}`}>
      <Button key={index} variant="secondary" className="w-full flex flex-row justify-start gap-10 h-full mt-5">
                <UserAvatar userimage={value.user.image ?? ''} username={value.user.name ?? ''} />
                {value.body}
                {(value.userId === data?.id) && <Deletecomment usersid={value.id} />}
            </Button></Link></div>
                                         <ScrollBar orientation="horizontal" />
                                     </ScrollArea>
                                     <Separator className="my-2" />
                                 </div>
                             ))}
                         </div>
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
