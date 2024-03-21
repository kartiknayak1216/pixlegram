import React, { Suspense } from 'react'
import { user } from "@/auth";
import { Profileupdate } from '../form';
import { Formkseleton, PostsSkeleton, SinglePostSkeleton } from '@/components/skelton/Homecardshelton';
type Props = {
    params:{
        id:string;
    }
}
export default async function page({params:{id}}:Props){
    const data = await user();
    const currentid = data?.id
 const valid = id === currentid
  return (
    <div>
                     <Suspense fallback={<Formkseleton />}>

   <Profileupdate name={data?.name??""} email={data?.email??""} location={data?.location??""} userid={data?.id??""} bio={data?.bio??""} website={data?.website??""}/>
   </Suspense></div> )
}
