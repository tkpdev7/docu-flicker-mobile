
import React, { useState } from 'react';
import PDFViewer from '@/components/PDFViewer';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

// Default PDF for demonstration
const SAMPLE_PDF = 'https://arxiv.org/pdf/2308.11491.pdf';

const Index = () => {
  const [pdfUrl, setPdfUrl] = useState<string>(SAMPLE_PDF);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      const url = URL.createObjectURL(file);
      setPdfUrl(url);
      toast({
        title: "PDF Loaded",
        description: `Loading ${file.name}`,
      });
    } else if (file) {
      toast({
        title: "Invalid File Type",
        description: "Please select a PDF file",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex flex-col h-screen bg-pdf-background">
      <header className="bg-white border-b px-4 py-3 shadow-sm flex items-center">
        <h1 className="text-lg font-semibold text-pdf-text">Dharani Flicker</h1>
        <div className="ml-auto">
          <Button 
            variant="outline" 
            onClick={() => document.getElementById('pdf-upload')?.click()}
            className="text-sm"
          >
            Open PDF
          </Button>
          <input
            id="pdf-upload"
            type="file"
            accept="application/pdf"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>
      </header>
      
      <main className="flex-1 overflow-hidden relative">
        <PDFViewer url={pdfUrl} />
      </main>
    </div>
  );
};

export default Index;
