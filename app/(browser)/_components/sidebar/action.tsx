"use client"
import React, { ReactNode, useEffect } from 'react'
import { useMediaQuery } from 'react-responsive'
import sidebarSlice from '@/lib/Toggle';
import { cn } from '@/lib/utils';
export default function action({children}:{children:ReactNode}) {

  const isSmallDevice = useMediaQuery({ maxWidth: 480 })
  
    const { toogled, open, close } =  sidebarSlice((state) => state);

useEffect(()=>{
if(!isSmallDevice){
open()
}
else{
    close()
}
},[isSmallDevice,open])
  



  return (
    <div className={cn(isSmallDevice  && "hidden")}>
{children}
    </div>
  )
}
