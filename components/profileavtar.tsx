import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from '@/lib/utils'

interface profile{
    username: string
    image:string,
    isupdate: boolean
    islive: boolean
    size :number
}

export default function ProfileAvatar({username,image,isupdate,islive,size}:profile) {
  return (
    <div className='relative'>
    <Avatar className={cn(islive && "ring-2 ring-rose-500 border border-background", isupdate && "ring-4 ring-gradient-pink-blue border border-background",  )}>
      <AvatarImage src={image || ""} className='object-cover'  width={size} height={size} />
      <AvatarFallback>{username[0]}{username[username.length - 1]}</AvatarFallback>
    </Avatar>
    </div>
  )
}
