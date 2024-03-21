import React from 'react'
import { Profile } from './profile'
import { user } from "@/auth";
import Visuals from './visuals';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

export default async function page() {
  const data =  await user();
  return (
    <Tabs defaultValue="profile" className="w-[400px]">
   <TabsList className="grid w-full grid-cols-2">
  
   <TabsTrigger value="profile">Account</TabsTrigger>
        <TabsTrigger value="visuals">Password</TabsTrigger>
   
        </TabsList>
          <TabsContent value="profile">
    <Profile name={data?.name || ""} location={data?.location||""} email={data?.email||""} userid={data?.id||""}/></TabsContent>
   
   {data &&
   <TabsContent value="visuals"> <Visuals uservalue={data?.visibility} userid={data?.id}/></TabsContent> }
   
   </Tabs>
  )
}
