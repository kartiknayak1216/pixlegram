import { Avatar } from "@/components/ui/avatar";
import type { AvatarProps } from "@radix-ui/react-avatar";
import type { User } from "next-auth";
import Image from "next/image";

type Props = Partial<AvatarProps> & {
  userimage: string
  username: string

};

function UserAvatar({  userimage,username, ...avatarProps }: Props) {
  return (
    <Avatar className="relative h-8 w-8" {...avatarProps}>
      <Image
        src={
          userimage
      
        }
        fill
        alt={`${username}'s profile picture`}
        className="rounded-full object-cover"
      />
    </Avatar>
  );
}

export default UserAvatar;