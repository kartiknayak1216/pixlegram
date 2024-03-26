"use client"
import React, { useState } from 'react'
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { BsGithub, BsGoogle  } from 'react-icons/bs';
import {signIn} from 'next-auth/react'
import router from "next/router";
import { Toaster, toast } from 'sonner'
import { LuLoader2 } from "react-icons/lu";
export default function Authbutton() {
  
    const [isLoading, setIsLoading] = useState(false);
    const socialAction = (action: string) => {
        setIsLoading(true);

        signIn(action, { redirect: false })
          .then((callback) => {
            if (callback?.error) {
              toast.error('Invalid credentials!');
            }
    
            if (callback?.ok) {
              toast.success("logedin")
            }
          })
          .finally(() => setIsLoading(false));
          ;
      } 
    
    
      return (
       <div className="flex min-h-screen flex-col justify-center items-center
       py-12 sm:px-6 lg:px-8">
        <div className="mx-auto ">
    <Image src="/logo.png" alt={"logo"} width="48" height="48" />
        </div>
    <div className=" mt-6 text-center text-3xl font-bold text-secondary-foreground">
      Proceed to your account
    </div>
    <Button variant={"ghost"}className="flex gap-4  text-center mt-12 md:mt-9  text-muted-foreground "
    onClick={() => socialAction('google')}
    >
      <BsGoogle  className="text-xl"/>
     {!isLoading && <div className="text-center text-xl font-semibold">
        Continue with Google
      </div>}
      {isLoading && <LuLoader2 />}
    </Button>
       </div>
      );
    }