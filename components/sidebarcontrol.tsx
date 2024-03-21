"use server"
import { user as users} from '@/auth'
import React from 'react'
import sidebarSlice from '@/lib/Toggle'
import { Button } from './ui/button'
import Link from 'next/link'
import UserAvatar from './UserAvtar'

export default async function sidebarcontrol() {
    const user = await users()
    const toogled = sidebarSlice((state) => state.toogled);

    function cn(arg0: string): string | undefined {
        throw new Error('Function not implemented.')
    }

  return (
    <div>
        {user &&
    <div className="flex flex-row space-y-2 mt-4 ">
 <Link  href={`/profile/${user.id}`} className="flex flex-row space-y-2 mt-4 ">
          <Button
            variant="ghost"
            className={cn("flex w-full h-12 justify-start rounded-sm")}
          >
            {toogled ? (
              <div className="  mx-auto "><UserAvatar userimage={user.image??""} username={user.name??""}/></div>
            ) : (
              <>
                <div className="mr-6 gap-y-12"><UserAvatar userimage={user.image??""} username={user.name??""}/></div>
                <div className="font-bold">Profile</div>
              </>
            )}
          </Button>
        </Link>

    </div>}
   </div>
  )
}

