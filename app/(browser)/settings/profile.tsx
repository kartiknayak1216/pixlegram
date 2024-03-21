import * as React from "react"
import prisma from "@/lib/db"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import country from "./country"
import { SubmitButton } from "@/components/submitbutton"
import { toast } from "sonner"
import { redirect } from 'next/navigation';
import { useRouter } from "next/router"
import { revalidatePath } from "next/cache"

interface profile{
    name: string,
    email: string,
    location:string
    userid : string
}
export function Profile({name,email,location,userid}:profile) {
 
   const uploadf = async(formdata:FormData)=>{
    "use server"
console.log(formdata)
const name = formdata.get("name") as string
const location = formdata.get("location") as string 
console.log(location)
if(!name ){
  return { message: `field required` };
}

  try{
  const req = await prisma?.user.update({
    where: {
      id: userid
    },
    data: {
      name,
      location: location||undefined
    }
  })
 
}catch(error){
  return { message: `Database Error: ${error}` };
}
redirect(`/profile/${userid}`);

  }
  return (
    <Card className="w-[350px]">
        <form action={uploadf}>
      <CardHeader>
        <CardTitle>Your profile settings</CardTitle>
        <CardDescription>Make valid changes and press submit.</CardDescription>
      </CardHeader>
      <CardContent>
      
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Name</Label>
              <Input id="name" name="name" placeholder={name} defaultValue={name} required />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="location">Country</Label>
              <Select  name="location">
                <SelectTrigger  >
                  <SelectValue placeholder={location|| "select"}   />
                </SelectTrigger>
                <SelectContent position="item-aligned" >
                    {country.map((value,index)=>(
                        <SelectItem value={value} key={index}   >{value}</SelectItem>
                    ))}
                  

                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input id="email" placeholder={email} disabled />
            </div>
          </div>
         
         
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        <SubmitButton/>
      </CardFooter>
      </form>
    </Card>
   
  )
}
