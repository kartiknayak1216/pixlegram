"use client"
import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { FaSearch, } from "react-icons/fa";
import { useRouter } from 'next/navigation'
import { stringify } from 'querystring';
import  queryString from "query-string";
import { RxCross2 } from "react-icons/rx";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
  
export default function searchbar() {

  const[value,setValue] =useState("");
  const router = useRouter()
  const Submit =(e:React.FormEvent)=>{
e.preventDefault();



if(!value)
return;

const url = `/search/${encodeURIComponent(value)}`;


router.push(url);


  }
  const onClear =()=>{
    setValue("")
  }
  return (
    

    <form className="relative flex w-full max-w-sm items-center space-x-2 sm:ml-4 md:ml-0" onSubmit={Submit}>
    <Input type="text" className='focus-visible:ring-transparent' placeholder="Search" value={value} onChange={(e)=>{setValue(e.target.value)}}/>
    {value && (
      <RxCross2
        className="absolute top-2.5 right-14 h-5 w-5 text-muted-foreground cursor-pointer hover:opacity-75 transition"
        onClick={onClear}
      />
    )}
    <Button type="submit" className='rounded' disabled={!value}><FaSearch className="text-muted-foreground" /></Button>
  </form>
  
  )
}

  
