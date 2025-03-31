
import React, { useState, useEffect } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import { useToast } from '@/hooks/use-toast';
import PDFControls from './PDFControls';
import PDFLoadingIndicator from './PDFLoadingIndicator';
import PDFErrorMessage from './PDFErrorMessage';
import { cn } from '@/lib/utils';

// Set up the worker for PDF.js
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

interface PDFViewerProps {
  url: string;
  className?: string;
}

const PDFViewer: React.FC<PDFViewerProps> = ({ url, className }) => {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [scale, setScale] = useState<number>(1.0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const { toast } = useToast();

  // Reset state when URL changes
  useEffect(() => {
    setPageNumber(1);
    setScale(1.0);
    setIsLoading(true);
    setError(null);
  }, [url]);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    setIsLoading(false);
    setError(null);
    toast({
      title: "PDF Loaded Successfully",
      description: `Document contains ${numPages} pages`,
      duration: 3000,
    });
  };

  const onDocumentLoadError = (error: Error) => {
    setIsLoading(false);
    setError(error);
    toast({
      title: "Error Loading PDF",
      description: "Failed to load the document. Please try again.",
      variant: "destructive",
    });
  };

  const handleZoomIn = () => {
    if (scale < 2.0) {
      setScale(prevScale => Math.min(prevScale + 0.1, 2.0));
    }
  };

  const handleZoomOut = () => {
    if (scale > 0.5) {
      setScale(prevScale => Math.max(prevScale - 0.1, 0.5));
    }
  };

  const goToNextPage = () => {
    if (numPages && pageNumber < numPages) {
      setPageNumber(pageNumber + 1);
    }
  };

  const goToPreviousPage = () => {
    if (pageNumber > 1) {
      setPageNumber(pageNumber - 1);
    }
  };

  const goToPage = (page: number) => {
    if (numPages && page >= 1 && page <= numPages) {
      setPageNumber(page);
    }
  };

  return (
    <div className={cn("flex flex-col items-center w-full h-full", className)}>
      <PDFControls 
        pageNumber={pageNumber}
        numPages={numPages}
        scale={scale}
        onNextPage={goToNextPage}
        onPreviousPage={goToPreviousPage}
        onZoomIn={handleZoomIn}
        onZoomOut={handleZoomOut}
        onGoToPage={goToPage}
      />
      
      <div className="flex-1 w-full overflow-auto pb-20 px-2">
        {isLoading && <PDFLoadingIndicator />}
        
        {error ? (
          <PDFErrorMessage error={error} />
        ) : (
          <Document
            file={url}
            onLoadSuccess={onDocumentLoadSuccess}
            onLoadError={onDocumentLoadError}
            loading={<PDFLoadingIndicator />}
            error={<PDFErrorMessage />}
            className="flex flex-col items-center"
          >
            <Page
              key={`page_${pageNumber}`}
              pageNumber={pageNumber}
              scale={scale}
              renderTextLayer={true}
              renderAnnotationLayer={true}
              loading={<PDFLoadingIndicator />}
              className="shadow-lg rounded-lg my-2"
              width={undefined}
              height={undefined}
            />
          </Document>
        )}
      </div>
    </div>
  );
};

export default PDFViewer;
