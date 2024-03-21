import { ModeToggle } from '@/components/ui/MoonToggle';
import React from 'react';
import Noch from './Notch/sheet';
import { user } from "@/auth";
import { Button } from '@/components/ui/button';
import { Ghost } from 'lucide-react';
import Link from 'next/link';
import Searchbar from '@/components/searchbar';
import Logo from '@/components/ui/logo';
import ProfileAvatar from '@/components/profileavtar';

export default async function index() {
  const data = await user();

  return (
    <nav className="fixed top-0 w-full h-20 z-50 px-4 lg:px-7 flex justify-between items-center shadow-sm backdrop-blur-lg bg-background bg-opacity-30 border-b-2">
      <div className="flex items-center">
        < div className='pr-6 md:pr-20'>
        <Noch /></div>
        <div className="hidden md:block  pr-6 md:pr-52">
          <Logo />
        </div>
      </div>
      <div className="flex items-center flex-grow">
        
        <Searchbar />
        
      </div>
      <Link href={`/profile/${data?.id}`}>
        <div className="ml-5">
          <Button variant="ghost">
            <div className="mx-2 my-3">
              <ProfileAvatar username={data?.username || ""} image={data?.image || ""} isupdate={false} islive={true} size={1} />
            </div>
          </Button>
        </div>
      </Link>
    </nav>
  );
}
