
import React from 'react';
import { cn } from '@/lib/utils';

interface PDFErrorMessageProps {
  error?: Error;
  className?: string;
}

const PDFErrorMessage: React.FC<PDFErrorMessageProps> = ({ error, className }) => {
  return (
    <div className={cn("flex flex-col items-center justify-center py-10", className)}>
      <div className="w-12 h-12 rounded-md bg-destructive/20 flex items-center justify-center">
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="24" 
          height="24" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          className="text-destructive"
        >
          <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
          <line x1="12" y1="9" x2="12" y2="13" />
          <line x1="12" y1="17" x2="12.01" y2="17" />
        </svg>
      </div>
      <h3 className="mt-4 text-destructive font-medium">Failed to load PDF</h3>
      <p className="mt-2 text-muted-foreground text-sm text-center max-w-xs">
        {error ? error.message : "There was an error loading the document. Please try again or check if the file is accessible."}
      </p>
    </div>
  );
};

export default PDFErrorMessage;
