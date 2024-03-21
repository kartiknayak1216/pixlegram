"use client"
import React from 'react';
import { Button } from '@/components/ui/button';
import { FaArrowRight , FaArrowLeft} from "react-icons/fa6";
import CustomTooltip from './tooltip';
import sidebarSlice from '@/lib/Toggle';
export default function Toggle() {
  const { toogled, open, close } =  sidebarSlice((state) => state);

  return (
    <>
      {toogled && (
        <div className="hidden md:flex w-full items-center justify-center pt-4 mb-4">
          <CustomTooltip
  button={ <Button
    onClick={open}
    variant="ghost"
    className="h-auto p-2"
  >
    <FaArrowRight className="  h-4 w-4 text-primary" />
  </Button>}
  message="Expand"
/>
         
        </div>
      )}
      {!toogled && (
        <div className="p-3 pl-6 mb-2 flex items-center w-full">
          <p className="font-semibold text-primary  mx-auto">
            For you
          </p>

          <CustomTooltip
  button={   <Button
    onClick={close}
    className="h-auto p-2 ml-auto"
    variant="ghost"
  >
    < FaArrowLeft className="h-4 w-4 text-primary" />
  </Button>}
  message="Collapse"
/>


       
        </div>
      )}
    </>
  );
}