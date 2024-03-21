import React, { ReactNode } from 'react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface TooltipProps {
  button: ReactNode;
  message: string;
}

const CustomTooltip: React.FC<TooltipProps> = ({ button, message }) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>{button}</TooltipTrigger>
        <TooltipContent side='bottom' >
          <p>{message}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export default CustomTooltip;

