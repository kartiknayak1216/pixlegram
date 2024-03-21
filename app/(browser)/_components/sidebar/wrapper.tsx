"use client"
import sidebarSlice from '@/lib/Toggle'
import { cn } from '@/lib/utils'
import React, { useEffect, useState } from 'react'
import Content from './content'
import Tooltip from './tooltip'
import Togglebutton from './togglebutton'

export default function wrapper() {
  const toogled  =  sidebarSlice((state)=> state.toogled)
  const[isClient ,setIsclient] = useState(false)

  useEffect(()=>{
    setIsclient(true);

  },[])

  if (!isClient) return (
   
    <SkeletonDemo/>
  
  )
  return (
    <div className={cn(' fixed left-0 z-50 gap-4 bg-background p-6 shadow-lg flex flex-col   h-full border-r-2 w-60', toogled && 'w-[70px] items-center')}>
      <Togglebutton/>
    <Content/>
  </div>  )
}

import { Skeleton } from "@/components/ui/skeleton";

export function SkeletonDemo() {
  return (
    <div className='hidden md:block'>

    <div className="fixed left-0 z-50 gap-4 bg-background p-6 shadow-lg flex flex-col h-full border-r-2 w-60 ">
      

      <Skeleton className="h-full w-full" />
    </div></div>
  );
}
