"use client"
import React, { useState } from 'react'
import { Button } from './ui/button'
import { SubmitButton } from './submitbutton'
import { deleteComment } from '@/lib/data'
import { toast } from 'sonner'


export default function deletecomment({usersid}:{usersid:string}) {

    const[loading,setLoading]= useState(false)
  return (

    <form>
<Button variant={'ghost'} size={'sm'}

onClick={async(e)=>{
  e.preventDefault()
    setLoading(true)
const req = await deleteComment(usersid)



if(req){

toast.error(`${req.message}`)


setLoading(false)

}

else{


toast.success("comment deleted")
setLoading(false)
}


  }}

>
    {loading ?(<div className='text-red-500 text-sm'>Deleting...</div>):(<div className='text-red-500 text-sm'>Delete</div>)}
</Button>
    </form>
    
  )
}
