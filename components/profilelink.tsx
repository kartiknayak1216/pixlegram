"use client";

import { cn } from "@/lib/utils";
import type { User } from "next-auth";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { buttonVariants } from "./ui/button";
import UserAvtar from "./UserAvtar";


function ProfileLink({ user }: { user: User }) {
  const pathname = usePathname();

  const href = `/dashboard/${user.username}`;
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={buttonVariants({
        variant: isActive ? "secondary" : "ghost",
        className: "navLink",
        size: "lg",
      })}
    >


      <UserAvtar
        userimage={user.image??""} username={user.name??""}
        className={`h-6 w-6 ${isActive && "border-2 border-white"}`}
      />

      <p
        className={`${cn("hidden lg:block", {
          "font-extrabold": isActive,
        })}`}
      >
        Profile
      </p>
    </Link>
  );
}

export default ProfileLink;