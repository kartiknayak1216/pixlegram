"use server"
import SignInBtn from "@/components/ui/LoadingButton";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import React from "react";

export default    async function LoginForm () {
  return (
    <SignInBtn/>
  );
}

