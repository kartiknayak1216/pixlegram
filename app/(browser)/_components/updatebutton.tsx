"use client"
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

  import React, { ReactNode, useState } from 'react'
  import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { AspectRatio } from "@radix-ui/react-aspect-ratio"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { PostWithExtra } from "@/lib/defination"
import { user } from "@/auth"
import { error } from "console"
import { SubmitButton } from "@/components/submitbutton"
import { toast } from "sonner"
import { uploadfS, uplosdf } from "@/lib/action"
import { cn } from "@/lib/utils"
import { redirect } from "next/dist/server/api-utils"
  
import { useRouter } from 'next/navigation'

  export default function updatebutton({post}:{post:PostWithExtra}) {
   
   
    const router = useRouter()
   
   const[open,setOpen]= useState(false)
    return (
        <Dialog  open={open} onOpenChange={setOpen}>
  <DialogTrigger>
    Update

  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Update post</DialogTitle>
     <form
     action={ async (e)=>{
 const req = await uplosdf(e,post)
 if(req){
  toast.error("update fail")
  

  setOpen(false)
 }
 else{
  toast.success("Updated post")
  
  setOpen(false)
  
 }

     }
     }>
        <div>
        <div className="h-96 md:h-[450px] overflow-hidden rounded-md">
        <AspectRatio ratio={1 / 1} className="relative h-full ">
<Image
src={post.fileUrl}
alt="Post preview"
fill
className=" object-cover transition-all duration-300 rounded-lg cursor-pointer filter grayscale hover:grayscale-0"/>
</AspectRatio>
</div>








<div className="flex flex-col space-y-1.5">
              <Label htmlFor="caption">Caption</Label>
              <Input id="caption" name="caption" placeholder={post.caption} defaultValue={post.caption} required />
            </div>





        </div>
        <div className="mt-2">
        <SubmitButton/></div>
        
     </form>
    </DialogHeader>
  </DialogContent>
</Dialog>

      
    )
  }
  