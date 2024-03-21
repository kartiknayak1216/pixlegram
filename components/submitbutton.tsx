"use client"
import { useFormStatus } from "react-dom";
import { Button } from "./ui/button";
import { Loader2, Send } from "lucide-react";

export function SubmitButton() {
    const { pending } = useFormStatus();
    return (
      <>
        {pending ? (
          <Button disabled className="w-fit">
            <Loader2 className="mr-2 w-4 h-4 animate-spin" /> Please Wait
          </Button>
        ) : (
          <Button className="w-fit" type="submit">
            Save Now
          </Button>
        )}
      </>
    );
  }
  export  function SuButton() {
    const { pending } = useFormStatus();
    return (
      <>
        {pending ? (
          <Button disabled className="w-fit" size={"sm"}>
            <Loader2 className="mr-2 w-4 h-4 animate-spin" /> 
          </Button>
        ) : (
          <Button className="w-fit" type="submit" size={"sm"}>
            <Send/>
          </Button>
        )}
      </>
    );
  }