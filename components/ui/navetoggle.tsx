import React from 'react'
import sidebarSlice from '@/lib/Toggle';
import { cn } from '@/lib/utils';
import { LogOut, MenuIcon, MoonIcon } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { signOut } from "next-auth/react";
import { useTheme } from "next-themes"
import { Button } from './button';
import { Separator } from './separator';

export default function Navetoggle() {
    const { setTheme } = useTheme()
  return (
    <div>
         <DropdownMenu>
         <DropdownMenuTrigger asChild><Button
variant="ghost"
className={cn("flex w-full h-12 justify-start rounded-sm")}
>

    <div className="mr-6 gap-y-12"><MenuIcon/></div>
    <div className="font-bold">Menu</div>
    
</Button>
         </DropdownMenuTrigger>


         <DropdownMenuContent className='w-[200px]'>
         <Button
variant="ghost"
className={cn("flex w-full h-12 justify-start rounded-sm")}
onClick={() => signOut()}
>


<div className="mr-6 gap-y-12"><LogOut/></div>
    <div className="font-bold">Sign Out</div>
</Button>

<Separator/>






<DropdownMenu >
      <DropdownMenuTrigger asChild>
      <Button
variant="ghost"
className={cn("flex w-full h-12 justify-start rounded-sm")}

>


<div className="mr-6 gap-y-12"><MoonIcon/></div>
    <div className="font-bold">Mode change</div>
</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="center" >
        <DropdownMenuItem onClick={() => setTheme("light")}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>


          </DropdownMenuContent>

         </DropdownMenu>
    </div>
  )
}
