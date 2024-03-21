"use client"
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Compass, HomeIcon, PlusCircle, Search } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import { useMediaQuery } from 'react-responsive'


export default function index() {
    const current = usePathname()
    const isSmallDevice = useMediaQuery({ maxWidth: 480 })

  return (
    <div className={cn(!isSmallDevice && "hidden" ,'fixed bottom-0 left-0 z-50 w-full h-16 shadow-sm backdrop-blur-lg  bg-background bg-opacity-30 border-t-2')}>
        <div className='grid h-full max-w-lg grid-cols-4 mx-auto my-auto text-center justify-center items-center'>
         <Link href="/" >
            <Button variant="ghost" className={cn(current=="/" && "bg-secondary border text-muted-foreground")}>
            <HomeIcon/>
            </Button>
            </Link>

            <Link href="/search">
            <Button variant="ghost"  className={cn(current=="/search" && "bg-secondary border text-muted-foreground")}>
            <Search/>
            </Button>
            </Link>


            <Link href="/create" >
            <Button variant="ghost" className={cn(current=="/create" && "bg-secondary border text-muted-foreground")}>
            <PlusCircle/>
            </Button>
            </Link>

            <Link href="/explore" >
            <Button variant="ghost" className={cn(current=="/explore" && "bg-secondary border text-muted-foreground")}>
            <Compass/>
            </Button>
            </Link>

        </div>
    </div>
  )
}
