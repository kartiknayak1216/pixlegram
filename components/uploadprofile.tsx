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
  import { Button } from "@/components/ui/button"
import { ReactNode, useState } from "react"
  import prisma from "@/lib/db"
import { error, profile } from "console"
import { toast } from "sonner"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { profileupload, uploadf } from "@/lib/action"
import { UploadButton } from "./uploadingthing"
import { cn } from "@/lib/utils"
import { User } from "@prisma/client"
import { UserWithExtras } from "@/lib/defination"
import { useRouter } from 'next/navigation'


  export function Uploadprofile({children,usersid,userimage,currentid}:{children:ReactNode,usersid:string,userimage:string,currentid:string}) {
    const router = useRouter()

const[isloading,setLoading]=useState(false)
const[open,setOpen]=useState(false)


 const canchange = currentid === usersid
    




    return (
     <div>
      {canchange && (
        <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogTrigger asChild>
          {children}
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Change Profile Photo</AlertDialogTitle>
            <AlertDialogDescription>

              
        {  
        
        userimage &&
        <Button variant={"secondary"} className={cn(" mb-2 flex w-full h-12 justify-center rounded-sm text-center items-center text-red-500",isloading && "cursor-not-allowed")}
             onClick={async()=>{
              setLoading(true)
const req = await uploadf(usersid)

if(req){
  setOpen(false)

    toast.error("Error occured")
    setLoading(false)
}

else{

    toast.success("Profile deleted")
    setOpen(false)

    setLoading(false)
}
setOpen(false)

            }} disabled={isloading} > Delete</Button>} 




            
            <Button variant={"secondary"} className="flex w-full h-12 justify-center  rounded-sm text-left text-red-500 items-center" disabled={isloading}>

            <UploadButton  className=" w-full text-sm h-11 ut-button:bg-transparent border-y border-zinc-300 dark:border-neutral-700 ut-button:text-blue-500 ut-button:font-bold ut-allowed-content:hidden ut-button:ring-0 ut-button:focus-visible:ring-0 ut-button:ring-offset-0 ut-button:w-full" 

                        endpoint="imageUploader"
                        onClientUploadComplete={async(res) => {
                         const req = await profileupload(usersid,res[0].url)
                         if(req){
                          
                          toast.error("Upload failed");
                         }
                         setOpen(false)
                         toast.success("Upload complete");
                        
                        }}
                        onUploadError={(error: Error) => {
                          console.error(error);
                          toast.error("Upload failed");
                          setOpen(false)
                        }
                      }
                      />
            </Button>

            </AlertDialogDescription>
          </AlertDialogHeader>
        

            <AlertDialogCancel   className="postOption border-0 w-full p-3"  disabled={isloading}>
cancle                </AlertDialogCancel>
           
      
        </AlertDialogContent>
      </AlertDialog>
      )}
      {!canchange && children}
      </div>
    )
  }
  