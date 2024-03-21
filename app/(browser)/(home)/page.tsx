import { user } from "@/auth";
import Maincard from "@/components/postcard/maincard";
import Profile from "@/components/postcard/profile";
import { PostSkeleton, PostsSkeleton } from "@/components/skelton/Homecardshelton";
import { ModeToggle } from "@/components/ui/MoonToggle";
import { like } from "@/lib/action";
import { fetchPost, profilebyId, purefetchPost } from "@/lib/data";
import React, { Suspense } from "react";
import { number, string } from "zod";

export default async function Home() {
  const data = await user();

  const pre = await fetchPost();
  const users = pre[0];
  const pre2 = await purefetchPost()
  
  return (
    <div> 
      {pre &&
        pre.map((value, index) => (
          <div className="mb-20" key={index}>
             <Suspense fallback={<PostsSkeleton />}>
            <Maincard user={value} /></Suspense>
          </div>
        ))}
    </div>
  );
}