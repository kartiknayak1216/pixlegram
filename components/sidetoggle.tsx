import sidebarSlice from '@/lib/Toggle';
import React from 'react'
import { Button } from './ui/button';
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
import { Separator } from './ui/separator';
import { ModeToggle } from './ui/MoonToggle';
import { useTheme } from "next-themes"

export default function Sidetoggle() {
    const toogled = sidebarSlice((state) => state.toogled);
    const { setTheme } = useTheme()

  return (
    <div>
         <DropdownMenu>
         <DropdownMenuTrigger asChild><Button
variant="ghost"
className={cn("flex w-full h-12 justify-start rounded-sm")}
>
{toogled ? (
  <div className="  mx-auto "><MenuIcon/></div>
) : (
  <>
    <div className="mr-6 gap-y-12"><MenuIcon/></div>
    <div className="font-bold">Menu</div>
  </>
)}
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


