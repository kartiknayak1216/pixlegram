"use client"
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function SeparatorDemo({ iscurrent, id }: { iscurrent: boolean; id: string }) {
  const pathname = usePathname();

  return (
    <div>
     
      <Separator className="my-4 mx-auto" />
      <div className="flex h-5 items-center space-x-4 text-sm flex-auto">
        <Link href={`/profile/${id}`}>
          <div className={pathname === `/profile/${id}` ? 'font-bold' : ''}>Post</div>
        </Link>
        <Separator orientation="vertical" />
        {iscurrent && (
          <>
            <Link href={`/profile/${id}/saved`}>
              <div className={pathname === `/profile/${id}/saved` ? 'font-bold' : ''}>Saved</div>
            </Link>
            <Separator orientation="vertical" />
          </>
        )}

{iscurrent && (
        <Link href={`/profile/${id}/like`}>
          <div className={pathname === `/profile/${id}/like` ? 'font-bold' : ''}>Liked</div>
        </Link>)}
      </div>
    </div>
  );
}
