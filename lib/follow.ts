"use server"
import { revalidatePath } from "next/cache";
import prisma from "./db";
import { user } from "@/auth";
import { profile } from "console";



export async function followUser(profileId: string, dataid: string) {
  const currentUser = await user();

  const userToFollow = await prisma.user.findUnique({
    where: {
      id: profileId
    }
  });

  if (!userToFollow) {
  
    throw new Error("User not found");
  }

  const isFollowing = await prisma.follows.findUnique({
    where: {
      followerId_followingId: {
        followerId: dataid,
        followingId: profileId,
      },
    },
  });

  if (isFollowing) {
    await prisma.follows.delete({
      where: {
        followerId_followingId: {
          followerId: dataid,
          followingId: profileId,
        },
      },
    });
    revalidatePath(`/profile/${dataid}`)
    return { message: "Unfollowed User." };
   
  } else {
    await prisma.follows.create({
      data: {
        followerId: dataid,
        followingId: profileId,
      }
    });
    revalidatePath(`/profile/${dataid}`)
    return { message: "Followed User." };
  }
}

  