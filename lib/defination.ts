import { Comment, Follows, Like, Post, SavedPost, User } from "@prisma/client";

export type LikeWithExtras = Like & { user: User };

export type PostWithExtras = Post & {
  comments: Comment[];
  likes: LikeWithExtras[];
  savedby: SavedPost[];
  user: User;
};

export type UserWithFollows = User & {
  following: Follows[];
  followedBy: Follows[];
};

export type FollowerWithExtras = Follows & { follower: UserWithFollows };
export type FollowingWithExtras = Follows & { following: UserWithFollows };

export type UserWithExtras = User & {
  posts: Post[];
  Savedpost: SavedPost[];
  followedby: Follows[];
  following: Follows[];
};
export type savedpostwithextr = SavedPost &{
  savedby: User[]
}
export type PostWithExtra = Post & {
  comments: Comment[];
  likes: LikeWithExtras[];
  savedby: SavedPost[];
  user: User;
};

export type Postes = Post & {
  user: {
    id: string;
    name: string | null;
    username: string | null;
    email: string | null;
    emailVerified: Date | null;
    image: string | null;
    visibility: boolean;
    location: string | null;
  };
  likes: LikeWithExtras[];
};

export type Postes1 = Postes & Like & Comment & SavedPost;
export type Profile = User & Comment & Like & SavedPost;
export type CommentWithExtras = Comment & { user: User };
export type  postes = Post & {
  user:User
}

export  type profile = User &{

}
export type postwithuser = Post &{
  user: {
    id: string;
    name: string | null;
    username: string | null;
    email: string | null;
    emailVerified: Date | null;
    image: string | null;
    visibility: boolean;
    location: string | null;
  };
}