import React, { ReactNode } from 'react'
import Wrapper from './_components/sidebar/wrapper'
import Sidebar from './_components/sidebar';
import Navbar from './_components/navbar';
import Bottombar from './_components/bottombar';

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
      <>
      <Navbar/>
      <Bottombar/>
 <div  className='flex h-full pt-20'>
         
          
         <Sidebar/></div>
         <div
        className=' inset-0 flex justify-center items-center mt-20 '>
        
      
        {children}
      </div>
         
          </>
    );
  }
  