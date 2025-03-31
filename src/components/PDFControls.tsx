
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ZoomIn, ZoomOut, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PDFControlsProps {
  pageNumber: number;
  numPages: number | null;
  scale: number;
  onNextPage: () => void;
  onPreviousPage: () => void;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onGoToPage: (page: number) => void;
  className?: string;
}

const PDFControls: React.FC<PDFControlsProps> = ({
  pageNumber,
  numPages,
  scale,
  onNextPage,
  onPreviousPage,
  onZoomIn,
  onZoomOut,
  onGoToPage,
  className,
}) => {
  const [inputPage, setInputPage] = useState<string>(pageNumber.toString());

  const handlePageInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputPage(e.target.value);
  };

  const handlePageInputBlur = () => {
    const pageNum = parseInt(inputPage);
    if (!isNaN(pageNum) && pageNum > 0 && numPages && pageNum <= numPages) {
      onGoToPage(pageNum);
    } else {
      setInputPage(pageNumber.toString());
    }
  };

  const handlePageInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handlePageInputBlur();
    }
  };

  return (
    <div 
      className={cn(
        "fixed bottom-0 left-0 right-0 z-10 flex items-center justify-between",
        "bg-white/90 backdrop-blur-sm border-t p-3 shadow-md",
        className
      )}
    >
      <div className="flex items-center gap-1">
        <Button
          variant="outline"
          size="icon"
          onClick={onPreviousPage}
          disabled={pageNumber <= 1}
          className="h-9 w-9"
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
        
        <div className="flex items-center gap-1 text-sm">
          <Input
            type="text"
            value={inputPage}
            onChange={handlePageInputChange}
            onBlur={handlePageInputBlur}
            onKeyDown={handlePageInputKeyDown}
            className="w-12 h-9 text-center p-1"
            aria-label="Current page"
          />
          <span className="mx-0.5">of</span>
          <span className="font-medium">{numPages || '-'}</span>
        </div>
        
        <Button
          variant="outline"
          size="icon"
          onClick={onNextPage}
          disabled={!numPages || pageNumber >= numPages}
          className="h-9 w-9"
        >
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>

      <div className="flex items-center gap-1">
        <Button
          variant="outline"
          size="icon"
          onClick={onZoomOut}
          disabled={scale <= 0.5}
          className="h-9 w-9"
        >
          <ZoomOut className="h-5 w-5" />
        </Button>
        
        <span className="text-sm font-medium w-16 text-center">
          {Math.round(scale * 100)}%
        </span>
        
        <Button
          variant="outline"
          size="icon"
          onClick={onZoomIn}
          disabled={scale >= 2.0}
          className="h-9 w-9"
        >
          <ZoomIn className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};

export default PDFControls;
