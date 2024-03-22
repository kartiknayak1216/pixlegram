import React from 'react';
import { profilebyId } from '@/lib/data';
import { user } from '@/auth';
import UserAvatar from '@/components/UserAvtar';
import Headera from '@/components/headera';
import Headerb from '@/components/headerb';
import { SeparatorDemo } from '@/components/hseperator';
import { Uploadprofile } from '@/components/uploadprofile';
import FollowButton from '@/components/followbutton';
import Link from 'next/link';
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
type Props = {
  params: {
    id: string;
  };
  children: React.ReactNode;
};

async function getUserData(id: string) {
  const userData = await profilebyId(id);
  return userData;
}

function isCurrentUser(userId: string, currentUserId: string) {
  return userId === currentUserId;
}

async function Layout({ children, params: { id } }: Props) {
  const currentUser = await user();
  const userData = await getUserData(id);
  const isUserCurrent = isCurrentUser(userData?.id ?? '', currentUser?.id ?? '');
  const isfollow = userData?.following.some((user) => user.followingId === currentUser?.id);

  return (
    <div>
      {(userData?.visibility == false && (currentUser?.id !== id)) ? (
       <div>This account is private</div>
      ) : (
       
        <>
        <div className="mx-auto mt-4 overflow-x-hidden">
          <div className='inline-flex flex-col gap-y-4'>
          <div className='flex flex-row gap-x-5 md:gap-x-10 px-4 items-start'>
            <Uploadprofile usersid={userData?.id ?? ""} userimage={userData?.image ?? ""}
                           currentid={currentUser?.id ?? ""}>
              <UserAvatar
                userimage={userData?.image ?? ''}
                username={userData?.name ?? ''}
                className="w-20 h-20 md:w-36 md:h-36 cursor-pointer"
              />
            </Uploadprofile>
            <div className="flex flex-col  items-center ">
              <div className="flex-col gap-y-5 md:gap-y-10">

              {!isUserCurrent ? (
              <FollowButton
                isFollowing={isfollow}
                profileId={currentUser?.id ?? ""}
                currentuser={id}
              />
            ):(                <Headera username={userData?.name ?? ''} isCurrentUser={isUserCurrent} id={userData?.id ?? ""}/>
            )
          }
                <Headerb userbio={userData?.bio ?? ""} userlink={userData?.website ?? ""}/>
               

              </div>
            </div>


          
            </div>
            <div className="flex items-center gap-x-7 mx-auto">
              <p className="font-medium">
                <strong>{userData?.posts.length} posts</strong>
              </p>

              <Link
                href={`/profile/${userData?.id}/followers`}
                className="font-medium"
              >
 <strong>{userData?.followedby.length}</strong> following             
              </Link>

              <Link
                href={`/profile/${userData?.id}/following`}
                className="font-medium"
              >

<strong>{userData?.following.length}</strong> followers
  </Link>
            </div>
          </div>
          <div className='mx-auto'>
          <SeparatorDemo iscurrent={isUserCurrent} id={userData?.id ?? ""}/></div>

          <div className=" justify-center items-center mt-20 overflow-x-hidden">
            {children}
          </div>
        </div>
      </>
      )}
    </div>
  );
}

export default Layout;
