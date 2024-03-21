import Image from "next/image";
import { ReactNode } from "react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function Imagewrapper({ children, url }: { children: ReactNode; url: string }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="flex justify-center items-center h-screen">
        <div className="relative h-full w-full">
          <Image src={url} alt="post" layout="fill" objectFit="contain" />
        </div>
      </DialogContent>
    </Dialog>
  );
}
