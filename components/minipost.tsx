"use client";

import { CommentWithExtras } from "@/lib/defination";
import { User } from "@prisma/client";
import Link from "next/link";
import UserAvatar from "./UserAvtar";




function MiniPost({ comments,data }: {comments:CommentWithExtras,data:User}) {
  const username = comments.user.name;
  const href = `/profile/${comments.user.id}`;
  


  

  return (
    <div className="group p-3 px-3.5  flex items-start space-x-2.5">
      <Link href={href}>
        <UserAvatar userimage={comments.user.image??""} username={comments.user.name??""}  />
      </Link>
      <div className="space-y-1.5">
        <div className="flex items-center space-x-1.5 leading-none text-sm">
          <Link href={href} className="font-semibold">
            {username}
          </Link>
          <p className="font-medium">{comments.body}</p>
        </div>
        <div className="flex h-5 items-center space-x-2.5">
         
        
        </div>
      </div>
    </div>
  );
}

export default MiniPost;