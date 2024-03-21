// Content.tsx
import React from 'react';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';
import sidebarSlice from '@/lib/Toggle';
import Menu from '../navbar/Menu';
import { data } from '../navbar/Notch/data';
import MoreDropdown from '@/components/sidetoggle';


export default function Content() {
  const currentPath = usePathname();
  const toogled = sidebarSlice((state) => state.toogled);


  
  return (<>
    <div className='flex flex-col justify-start'>     
      {data.map((value,index)=>(
        <Link key={index} href={value.link} className="flex flex-row space-y-2 mt-4 ">
          <Button
            variant="ghost"
            className={cn("flex w-full h-12 justify-start rounded-sm", value.link === currentPath && "bg-secondary text-primary")}
          >
            {toogled ? (
              <div className="  mx-auto ">{value.icon}</div>
            ) : (
              <>
                <div className="mr-6 gap-y-12">{value.icon}</div>
                <div className="font-bold">{value.title}</div>
              </>
            )}
          </Button>
        </Link>
      ))}
      
      <div className='mt-5 justify-center'>
       <MoreDropdown/></div>
       
    </div>
    
   </>
  );
}
