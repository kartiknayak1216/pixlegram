"use client"
import React, { useState } from 'react'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
import { MenuIcon } from 'lucide-react'
import { Button } from './button'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'
import { deletePost, updatelike } from '@/lib/data'
import { redirect } from 'next/dist/server/api-utils'
import Updatebutton from '@/app/(browser)/_components/updatebutton'
import { PostWithExtra } from '@/lib/defination'
  
export default function cardnotch({usersid, islike,post}:{usersid:string,islike:boolean,post:PostWithExtra}) {
    const[isloading,setLoading]=useState(false)
const[open,setOpen]=useState(false)
  return (
    <AlertDialog  open={open} onOpenChange={setOpen}>
  <AlertDialogTrigger><MenuIcon/></AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>What action you want?</AlertDialogTitle>
      <AlertDialogDescription>
      <Button variant={"secondary"} className={cn(" mb-2 flex w-full h-12 justify-center rounded-sm text-center items-center text-red-500",isloading && "cursor-not-allowed")}
             onClick={async()=>{
              setLoading(true)
const req = await deletePost(usersid)



if(req.message){

    toast.success(`${req.message}`)
    setOpen(false)

    setLoading(false)
    
}

else{
    setOpen(false)
  
      toast.error("Error occured")
      setLoading(false)
  }
setOpen(false)

            }
            
            
        
            } disabled={isloading} > Delete Post</Button>

<Button variant={"secondary"} className={cn(" mb-2 flex w-full h-12 justify-center rounded-sm text-center items-center text-blue-500",isloading && "cursor-not-allowed")}>

<Updatebutton  post={post}/>
 
</Button>




<Button variant={"secondary"} className={cn(" mb-2 flex w-full h-12 justify-center rounded-sm text-center items-center text-red-500",isloading && "cursor-not-allowed")}
             onClick={async()=>{
              setLoading(true)
const req = await updatelike(usersid)

if(req.message){

    toast.success(`${req.message}`)
    setOpen(false)

    setLoading(false)
}

else{
    setOpen(false)
  
      toast.error("Error occured")
      setLoading(false)
  }
setOpen(false)

            }} disabled={isloading} > {
islike ?(<div>Hide like</div>):(<div>Show like</div>)
          }
            </Button>





      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogCancel   className="postOption border-0 w-full p-3"  disabled={isloading}>
cancle                </AlertDialogCancel>
           
  </AlertDialogContent>
</AlertDialog>

  )
}
