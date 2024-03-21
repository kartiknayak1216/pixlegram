"use server"
import { profilebyId } from "@/lib/data";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import Usercard from "@/components/ui/usercard";
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import Followpop from "@/components/followpop";
  
async function Page({
  params: { id },
}: {
  params: {
    id: string;
  };
}) {
  const profile = await profilebyId(id);
  const followers = profile?.following;
  

  return(
    
    <Followpop id={profile?.id??""} type={"following"} followers={followers}
    retype={"Followedby"}/>

  )
}

export default Page;