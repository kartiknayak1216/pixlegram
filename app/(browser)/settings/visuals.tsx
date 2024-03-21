"use client"
import React, { FormEvent, useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { SubmitButton } from '@/components/submitbutton';
import { revalidatePath } from 'next/cache';
import prisma from '@/lib/db';
import { Input } from '@/components/ui/input';
import { uploadfS } from '@/lib/action';
import { toast } from 'sonner';
import { redirect } from 'next/navigation';

interface VisualProps {
  uservalue: boolean;
  userid: string;
}

export default function Visuals({ uservalue, userid }: VisualProps) {
  const [visuals, setVisuals] = useState<boolean>(uservalue);



  return (
    <Card className="w-[350px]">
      <form action={async()=>{
        
        const req=await uploadfS(visuals,userid)
    if(req.message){
      toast.success("changes made sucessfully")
      redirect("/settings")
    
      
    }
    else{
toast.error("Failed to update")
redirect("/settings")

    }}
    }>
        <CardHeader>
          <CardTitle>Your visuals settings</CardTitle>
          <CardDescription>Make valid changes and press submit.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex w-full items-center gap-4">
            <div className="flex flex-col gap-1">
              <Label htmlFor="location">Privacy</Label>
              <div>This account can be seen by anyone close to make private</div>
            </div>
          
            <Switch
              checked={visuals}
             onCheckedChange={setVisuals}
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <SubmitButton />
        </CardFooter>
      </form>
    </Card>
  );
}
