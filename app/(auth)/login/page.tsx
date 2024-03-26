
import SignInBtn from "@/components/ui/LoadingButton";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import React from "react";
import Authbutton from "./authform";

export default    async function LoginForm () {
  return (
    <Authbutton/>
  );
}

