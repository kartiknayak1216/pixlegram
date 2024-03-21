
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
  const followers = profile?.followedby;
  

  return(
    
    <Followpop id={profile?.id??""} type={"followers"} followers={followers}
    retype="following"/>

  )
}

export default Page;