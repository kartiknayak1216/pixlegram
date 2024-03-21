"use client"
import React from 'react'
import { profilebyId } from "@/lib/data";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
  } from "@/components/ui/dialog"
import Usercard from "@/components/ui/usercard";
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { usePathname, useRouter } from "next/navigation";

type Follower = {
    id: string;
    followerId: string;
    followingId: string;
}

type Props = {
    id: string;
    type: string;
    retype:string
    followers: Follower[] | undefined;
}

export default function Followpop({ id, type, followers,retype }: Props) {
    const pathname = usePathname();
    const router = useRouter();
    const isFollowersPage = pathname === `/profile/${id}/${type}`;

    return (
        <div>
            <Dialog
                open={isFollowersPage}
                onOpenChange={(isOpen) => !isOpen && router.back()}
            >
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{retype}</DialogTitle>
                        <DialogDescription>
                            <ScrollArea className="rounded-md border">
                                <div className="p-4">
                                    {followers?.map((value, index) => (
                                        <div key={index}>
                                            <Usercard id={value.followingId} />
                                            <Separator className="my-2" />
                                        </div>
                                    ))}
                                </div>
                            </ScrollArea>
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    )
}
