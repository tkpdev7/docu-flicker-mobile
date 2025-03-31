
import React from 'react';
import { cn } from '@/lib/utils';

interface PDFLoadingIndicatorProps {
  className?: string;
}

const PDFLoadingIndicator: React.FC<PDFLoadingIndicatorProps> = ({ className }) => {
  return (
    <div className={cn("flex flex-col items-center justify-center py-10", className)}>
      <div className="w-12 h-12 rounded-md bg-pdf-primary/20 animate-pulse-opacity flex items-center justify-center">
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
          className="text-pdf-primary"
        >
          <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
          <polyline points="14 2 14 8 20 8" />
        </svg>
      </div>
      <p className="mt-4 text-pdf-text/70 text-sm">Loading document...</p>
    </div>
  );
};

export default PDFLoadingIndicator;
