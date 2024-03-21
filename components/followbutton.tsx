"use client"

import { buttonVariants } from "./ui/button";
import { cn } from "@/lib/utils";
import SubmitButton from "./submit";
import { followUser } from "@/lib/follow";
import { toast } from "sonner";
import { revalidatePath, revalidateTag } from "next/cache";

   function FollowButton(
  {
  profileId,
  isFollowing,
  className,
  buttonClassName,
  currentuser
}: {
  profileId: string;
  isFollowing?: boolean;
  className?: string;
  buttonClassName?: string;
  currentuser:string
}) {
 
  return (
    <form action={
      async()=>{
      
        const req=await followUser(profileId,currentuser)
        if(req.message){
toast.success("Action sucess")}
else{
  toast.error("Action failed")
}
    }} className={className}>
      <input type="hidden" value={profileId} name="id" />
      <SubmitButton
        className={buttonVariants({
          variant: isFollowing ? "secondary" : "default",
          className: cn("!font-bold w-full", buttonClassName),
          size: "sm",
        })}
      >
        {isFollowing ? "Unfollow" : "Follow"}
      </SubmitButton>
    </form>
  );
}

export default FollowButton;