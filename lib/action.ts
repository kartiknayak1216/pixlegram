"use server"
import z from "zod";
import { CreatePost } from "./zodschema";
import { user } from "@/auth";
import { revalidatePath } from "next/cache";
import { redirect } from 'next/navigation';
import { PostWithExtra, postes } from "./defination";
type Posts = z.infer<typeof CreatePost>;
import prisma from "./db";
export async function createpost(values: Posts) {
  const data = await user();
  const isvalid = CreatePost.parse(values);

  if (!isvalid.caption || !isvalid.fileUrl) {
    return { message: "Enter missing credentials" };
  }

  try {
    await prisma?.post.create({
      data: {
        caption: isvalid.caption,
        fileUrl: isvalid.fileUrl,
        user: {
          connect: {
            id: data?.id,
          },
        },
      },
    });
    
   
  } catch (error) {
    return { message: `Database Error: ${error}` };
  }
  revalidatePath('/');
  redirect('/');
}



type PosttoggleProps = {
 post: postes;
  useId: string;
};

export async function like (postid:string , useId:string){


const findpost = await prisma.post.findUnique({
  where: {
    id: postid
  },
});

if (!findpost) {
  throw new Error("Post not found");
}




const islike =  await prisma.like.findUnique({
  where: {
   postId_userId:{
    postId:postid,
    userId:useId
   }
  }})

  if(islike){
try{
await prisma.like.delete({
  where:{
    postId_userId:{
      postId:postid,
      userId:useId
     }
  }
})
revalidatePath("/");
return { message: "Unliked Post." };
}catch(error){
  return { message: "Database Error: Failed to Unlike Post." };
}
  }
  else{
    try{
await prisma.like.create({
  data:{
    postId:postid,
    userId:useId
  }
})
      revalidatePath("/dashboard");
      return { message: "Liked Post." };  }catch(error){
      return { message: "Database Error: Failed to Unlike Post." };

    }
  }


}

export async function save(postid: string, userId: string) {
  const findpost = await prisma.post.findUnique({
    where: {
      id: postid,
    },
  });

  if (!findpost) {
    throw new Error("Post not found");
  }

  const islike = await prisma.savedPost.findUnique({
    where: {
      postid_userId: {
        postid: postid,
        userId: userId,
      },
    },
  });

  if (islike) {
    try {
      await prisma.savedPost.delete({
        where: {
          id: islike.id,
        },
      });
      revalidatePath("/");
      return { message: "Unsaved Post." };
    } catch (error) {
      return { message: "Database Error: Failed to Unsave Post." };
    }
  } else {
    try {
      await prisma.savedPost.create({
        data: {
          post: {
            connect: { id: postid },
          },
          user: {
            connect: { id: userId },
          },
        },
      });
      revalidatePath("/dashboard");
      return { message: "Saved Post." };
    } catch (error) {
      return { message: "Database Error: Failed to Save Post." };
    }
  }
}

 export async  function createcomment(postid: string, userid :string,body:string){
const post = await prisma.post.findUnique({
where:{
  id:postid

}
})
if(!post){
  return { message:"Post not found" };
}


try{
await prisma.comment.create({
  data:{
    
    postId:postid ,
    userId:userid,
    body: body 
  }
  
})
revalidatePath(`/profile/${post.id}`);

}catch(error){
console.log(error)
  return { message: `Database Error: Failed to comment Post.${error}` };
}

 }



   //
   export async  function uploadf(userid:string){

    const isuser = await prisma?.user.findUnique({
        where:{
            id:userid
        }
    })
if(!isuser){
return { message: `No user` };
}
try{
await prisma.user.update({
    where:{
        id:userid
    },
    data:{
image:""
    }
})
}catch(error){
return { message: `Database Error: ${error}` };
}
revalidatePath(`/profile/${userid}`)
}

 export async function profileupload(userid:string,ulr:string){
  const isuser = await prisma?.user.findUnique({
    where:{
        id:userid
    }
})
if(!isuser){
return { message: `No user` };
}
try{
  await prisma.user.update({
      where:{
          id:userid
      },
      data:{
  image:ulr
      }
  })
  }catch(error){
  return { message: `Database Error: ${error}` };
  }
  revalidatePath(`/profile/${userid}`)
  }

   export const uploadfS = async (visuals:boolean,userid:string) => {
  
    
        try {
          // Assume 'prisma' and 'user.update' are correctly defined elsewhere
          await prisma?.user.update({
            where: {
              id: userid,
            },
            data: {
              visibility: visuals,
            },
          });
          // Trigger revalidation of data for the current page
          revalidatePath("/settings")
          return { message: "changes made sucessfully" };
        } catch (error) {
throw new Error(`${error}`)        }
      };

    export  const uplosdf = async (formdata: FormData,post:PostWithExtra) => {
        const caption = formdata.get("caption") as string
        const data = await user();
        const isCurrentUser = data?.id === post.userId;
        if (!isCurrentUser) {
          console.log("invalid")
          return {message:"You dont have access"}
        }
        try {
          await prisma?.post.update({
            where: {
              id: post.id
            },
            data: {
              caption: caption
            }
          })
          revalidatePath("/")
        } catch (error) {
          console.log(error)
          return {message:"something went wrong"}
          
        }
      }
      
      