
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "./lib/db";
import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import NextAuth from "next-auth";
import type { GetServerSidePropsContext, NextApiRequest, NextApiResponse } from "next"
import { getServerSession } from "next-auth"
 export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.image = token.picture;
        session.user.username = token.username;
      }
    

      return session;
    },
   
  },
};

export default NextAuth(authOptions);

export async function user(){
  const session = await getServerSession(authOptions) 
  if(session?.user && session.user.email){
    const currentUser = prisma.user.findUnique({
      where:{
    email : session.user.email
      }
    })
    if(currentUser){
      return currentUser
    }
    else return undefined
  }
}


