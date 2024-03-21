"use client"
import * as React from "react";
import { Textarea } from "@/components/ui/textarea";
import { createcomment } from "@/lib/action";
import { revalidatePath } from "next/cache";
import { PostWithExtras } from "./posttoggle/like";
import { SuButton, SubmitButton } from "./submitbutton";
import { toast } from "sonner";


export function Commentfinal({ post, userid }: { post: PostWithExtras, userid: string }) {

    const [body, setbody] = React.useState("");

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setbody(event.target.value);
    }

    return (
        <form action={async () => {
    
            if (body) {
          const req=await createcomment(post.id, userid, body);
               if(req){
                toast.error(`${req}`)
               }
               else{
                toast.success("Post created")
               }
               setbody("")
            }
        }}>

<div className="relative">
                <Textarea
                    id="body"
                    name="body"
                    placeholder="Share your views"
                    value={body}
                    onChange={handleChange}
                    required
                    className="pr-12" // Add padding to the right for the button
                />
                {body && (
                    <div className="absolute bottom-2 right-2">
                    <SuButton  /> </div>
                )}
            </div>
        </form>
    );
}
