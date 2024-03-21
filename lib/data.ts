"use server"
import { unstable_noStore as noStore, revalidatePath } from 'next/cache';
import prisma from './db';
import { user } from "@/auth";

export async function fetchPost(){
    noStore()

   try{
    const post = await prisma.post.findMany({
        where:{
            user:{
                visibility:true
            }
        },
        include:{
            comments:{
include:{
    user:true,
    
},
            orderBy:{
                createdAt:'desc'
            }},

        likes:{
            include:{
                user:true
            }

        },
        savedby:true,
        user : true
         
        },
        orderBy:{
            createdAT:'desc'
        }
    })
    return post

   }catch(error){
    console.log(error)
    throw new Error("failed to fetch")
   }
  
}  

export async function fetchPostbyId(id:string){
  noStore()
 try{
  const post = await prisma.post.findUnique({
      where:{
         
          id:id
      },
      include:{
          comments:{
include:{
  user:true,
  
},
          orderBy:{
              createdAt:'desc'
          }},

      likes:{
          include:{
              user:true
          }

      },
      savedby:true,
      user : true
       
      },
     
  })
  return post

 }catch(error){
  console.log(error)
  throw new Error("failed to fetch")
 }

}  

export async  function savedpostbyId(userid:string){
    try{
const post = await prisma.savedPost.findMany({
where:{
    user:{
        id:userid
    }
    
},
include: {
    post: {
      include: {
        comments: {
          include: {
            user: true,
          },
          orderBy: {
            createdAt: "desc",
          },
        },
        likes: {
          include: {
            user: true,
          },
        },
        savedby: true,
        user: true,
      },
    },
  },
  orderBy: {
    createdAt: "desc",
  },
});

return post;
} catch (error) {
console.error("Database Error:", error);
throw new Error("Failed to fetch saved posts");
}
}
export async function profilebyId(userid: string) {
  noStore()
  const u = prisma.user.findUnique({
    where:{
      id:userid
    }

  })
  if(!u){
    throw new Error("user not found")
  }
    try {
      const data = await prisma.user.findUnique({
        where: {
          id: userid,
          
        },
        include: {
          posts:{
            where:{
              userId:userid
            },
            orderBy:{
              createdAT:"desc"
            }
          },
          Savedpost:{
            where:{
              userId:userid
            },
            include:{
              post:{
                include:{
                  user:true
                }
              }
            },
            
          },
          likes:{
            include:{
post:{
  include:{
    user:true
  }
}
            }
          },
          followedby: true,
           
            
          
          following: true
        }
      });
      return data;
    } catch (error) {
      console.error("Database Error:", error);
      throw new Error("Failed to fetch user profile");
    }
  }
  
  export async function purefetchPost(){
    noStore()
   try{
    const post = await prisma.post.findMany({
        where:{
            user:{
                visibility:true
            }
        }
      
    })
    return post

   }catch(error){
    console.log(error)
    throw new Error("failed to fetch")
   }
  
}
export async function onlyuser(id:string){
  try{
return prisma.user.findUnique({
  where:{
    id:id
  }
})
  }catch(error){
    throw new Error(`${error}`)
  }
}


export async function deletePost(id: string) {
  const currentUser = await user()

  const post = await prisma.post.findUnique({
    where: {
      id: id
    },
    include: {
      user: true
    }
  })

  if (!post || post.user.id !== currentUser?.id) {
    return ({message: "You cannot delete this post"})
  }

  try {
    await prisma.post.delete({
      where: {
        id: id
      }
    })
    revalidatePath('/')
    return { message: "post deleted" };
  } catch (error) {
    return ({message: "Failed to delete this post"})
  }
}



export async function updatelike(id: string) {
  const currentUser = await user()

  const post = await prisma.post.findUnique({
    where: {
      id: id
    },
    include: {
      user: true
    }
  })

  if (!post || post.user.id !== currentUser?.id) {
    throw new Error("You cannot update like of this post")
  }

 if(post.showlike){
  try{
await prisma.post.update({
  where:{
    id:id
  },
  data:{
    showlike:false
  }
})

return { message: "Likes hidden" };
  }
  catch(error){
    throw new Error(`Failed to hide  like: ${error}`)
  }
 }



 else{
  try{
await prisma.post.update({
  where:{
    id:id
  },
  data:{
    showlike:true
  }
})
revalidatePath('/')
return { message: "Likes visible" };
  }
  catch(error){
    throw new Error(`Failed to hide  like: ${error}`)
  }
 }
}


export async function deleteComment(id: string) {
  const currentUser = await user()

  const post = await prisma.comment.findUnique({
    where: {
      id: id
    },
    include: {
      user: true
    }
  })

  if (!post || post.user.id !== currentUser?.id) {
    return { message: "Failed to delete" };
  }

  try {
    await prisma.comment.delete({
      where: {
        id: id
      }
    })
    revalidatePath('/')
  
  } catch (error) {
    return { message: "Failed to delete" };
  }
}
export async function userbyname(term: string) {
  const words = term.split(" ");
  return prisma.user.findMany({
    where: {
      OR: [
        {
          name: {
            contains: term,
            mode: "insensitive"
          }
        },
        {
          name: {
            startsWith: term,
            mode: "insensitive"
          }
        },
        {
          name: {
            endsWith: term,
            mode: "insensitive"
          }
        },
        {
          AND: words.map((word) => ({
            name: {
              contains: word,
              mode: "insensitive"
            }
          }))
        }
      ]
    }
  });
}
export async function postbyname(term: string) {
  const words = term.split(" ");
  return prisma.post.findMany({
    where: {
      OR: words.map((word) => ({
        caption: {
          contains: word,
          mode: "insensitive"
        }
      })),
      user: {
        visibility: true
      }
    },
    include: {
      user: true,
      likes: {
        include: {
          user: true
        }
      },
      savedby: true
    },
    orderBy: {
      createdAT: 'desc'
    }
  });
}

