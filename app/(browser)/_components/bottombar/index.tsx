"use client"
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Compass, HomeIcon, PlusCircle, Search, Settings } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';

import dynamic from "next/dynamic";


 export default function  bar() {
    const current = usePathname();
    const isSmallDevice = useMediaQuery({ maxWidth: 480 });

    
    const[isClient ,setIsclient] = useState(false)

    useEffect(()=>{
      setIsclient(true);

    },[])

    if (!isClient) return (
     
      <BottomBarSkeleton/>
    
    )

    return (
        <div className={cn(!isSmallDevice && "hidden", 'fixed bottom-0 left-0 z-50 w-full h-16 shadow-sm backdrop-blur-lg bg-background bg-opacity-30 border-t-2')} >
            <div className='grid h-full max-w-lg grid-cols-4 mx-auto my-auto text-center justify-center items-center'>
                <Link href="/" >
                    <Button variant="ghost" className={cn(current == "/" && "bg-secondary border text-muted-foreground")}>
                        <HomeIcon />
                    </Button>
                </Link>

              

                <Link href="/create" >
                    <Button variant="ghost" className={cn(current == "/create" && "bg-secondary border text-muted-foreground")}>
                        <PlusCircle />
                    </Button>
                </Link>

                <Link href="/settings">
                    <Button variant="ghost" className={cn(current == "/settings" && "bg-secondary border text-muted-foreground")}>
                        <Settings />
                    </Button>
                </Link>

                <Link href="/profile/clto1zmwd000314dksh93pm13">
                    <Button variant="ghost" className={cn(current == "/profile/clto1zmwd000314dksh93pm13" && "bg-secondary border text-muted-foreground")}>
                        <Compass />
                    </Button>
                </Link>

            </div>
            
        </div>
    )
}

import { Skeleton } from '@/components/ui/skeleton'
import { SkeletonDemo } from '../sidebar/wrapper'

export  function BottomBarSkeleton() {
    return (
        <div className="fixed bottom-0 left-0 z-50 w-full h-16 shadow-sm backdrop-blur-lg bg-background bg-opacity-30 border-t-2">
            <div className="grid h-full max-w-lg grid-cols-4 mx-auto my-auto text-center justify-center items-center">
                <Skeleton className="h-6 w-6" />
                <Skeleton className="h-6 w-6" />
                <Skeleton className="h-6 w-6" />
                <Skeleton className="h-6 w-6" />
            </div>
        </div>
    )
}