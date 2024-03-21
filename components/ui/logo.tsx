import { SwitchCamera } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "./button";



function Logo() {
  return (
   
    <Link
      href={"/"}>
        <div className="mx-auto flex flex-row gap-x-2">
      <SwitchCamera className="h-6 w-6 " />
      <p
        className={`font-semibold text-xl`}
      >
        Pixelgram
      </p></div>
    </Link>
  );
}

export default Logo;