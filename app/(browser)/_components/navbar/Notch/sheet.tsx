"use client"
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"
  
  import React, { useEffect, useState } from 'react'
  import { BiMenuAltRight } from "react-icons/bi";
import { data } from "./data";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import Menu from "../Menu";
import MoreDropdown from '@/components/sidetoggle';
import Navetoggle from "@/components/ui/navetoggle";
  
  export default function Noch() {
    const currentPath = usePathname();
  
   
    return (
        <div className="md:hidden">
        <Sheet   >
        <SheetTrigger><svg stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-7 w-7"><path d="M3 5H11" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M3 12H16" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M3 19H21" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg></SheetTrigger>
        <SheetContent side={"left"}>
          <SheetHeader>
            <SheetTitle>Are you absolutely sure?</SheetTitle>
            <SheetDescription>
            
            
             
             <SheetClose asChild>
              <div>
             {data.map((value,index)=>(
              <div key={index}>
             <Link href={value.link}   className="flex flex-row   space-y-2 ">
             <Button
               key={index} 
                      variant="ghost"
                      className={cn("flex w-full h-12 justify-start rounded-sm", value.link === currentPath && "bg-accent text-primary")}
                    >

                      <div className="mr-6">{value.icon}</div>
                      <div className="font-bold">{value.title}</div>
                    </Button>
</Link></div>

     ))}</div></SheetClose>
<div className='mt-1 justify-center'>
<div className='mt-5 justify-center'>
       < Navetoggle/></div></div>
    
           
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
      </div>
      
    )
  }
  