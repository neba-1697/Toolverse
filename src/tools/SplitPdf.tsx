import { useState, useRef } from 'react';
import { Scissors, Upload, File as FileIcon, X } from 'lucide-react';
import { ToolLayout } from '../components/ToolLayout';
import { PDFDocument } from 'pdf-lib';
import { GlobalDragDrop } from '../components/GlobalDragDrop';

export function SplitPdf() {
  const [pdf, setPdf] = useState<File | null>(null);
  const [pageToExtract, setPageToExtract] = useState(1);
  const [isSplitting, setIsSplitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrop = (files: File[]) => {
    if (files.length > 0) {
      setPdf(files[0]);
    }
  };

  const handleSplit = async () => {
    if (!pdf) return;
    setIsSplitting(true);
    try {
      const pdfBytes = await pdf.arrayBuffer();
      const pdfDoc = await PDFDocument.load(pdfBytes);
      const totalPages = pdfDoc.getPageCount();
      
      if (pageToExtract < 1 || pageToExtract > totalPages) {
        alert(`Invalid page number. The document has ${totalPages} pages.`);
        return;
      }
      
      const newPdf = await PDFDocument.create();
      // Pages are 0-indexed in pdf-lib
      const [page] = await newPdf.copyPages(pdfDoc, [pageToExtract - 1]);
      newPdf.addPage(page);
      
      const newPdfBytes = await newPdf.save();
      const blob = new Blob([newPdfBytes], { type: 'application/pdf' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `${pdf.name.replace('.pdf', '')}_page_${pageToExtract}.pdf`;
      link.click();
    } catch (e) {
      console.error(e);
      alert("Failed to split PDF. Check if it is encrypted or corrupted.");
    } finally {
      setIsSplitting(false);
    }
  };

  const seoContent = {
    h1: "Free Online PDF Page Extractor",
    introduction: "Extract a specific page from your PDF document securely in your browser.",
    whatItIs: "A client-side utility to extract a single page from a larger PDF file without relying on external cloud processing.",
    whyItMatters: "Sometimes you only need one page from a 100-page report. This tool lets you extract it securely and instantly.",
    useCases: [{ title: "Extraction", description: "Extract a single invoice page from a bulk billing report." }],
    features: [{ title: "Secure", description: "Your files never leave your browser memory." }]
  };

  return (
    <ToolLayout 
      title="Split PDF" 
      description="Extract a specific page from a PDF."
      category="PDF Tools"
      icon={<Scissors className="h-8 w-8 text-indigo-400" />}
      seoContent={seoContent}
    >
      <GlobalDragDrop onDrop={handleDrop} accept="application/pdf" tip="Drop your PDF anywhere here to extract a page">
        <div className="p-6 md:p-8">
          {!pdf ? (
            <div className="border-4 border-dashed border-slate-200 dark:border-white/10 rounded-2xl p-10 flex flex-col items-center justify-center text-center w-full min-h-[300px]">
              <Upload className="h-12 w-12 text-slate-400 mb-4" />
              <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">Drag & Drop PDF</h3>
              <p className="text-slate-500 dark:text-slate-400 mb-6">Or click to select a file from your computer.</p>
              <input 
                 type="file" 
                 accept="application/pdf" 
                 onChange={(e) => setPdf(e.target.files?.[0] || null)} 
                 className="hidden" 
                 ref={fileInputRef} 
              />
              <button 
                 onClick={() => fileInputRef.current?.click()} 
                 className="px-6 py-3 bg-indigo-500 text-white font-bold rounded-xl shadow-lg shadow-indigo-500/20 hover:bg-indigo-600 transition-all"
              >
                Select PDF File
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              <h4 className="text-lg font-bold text-slate-800 dark:text-white">Selected Document</h4>
              <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-white/10">
                <div className="flex items-center gap-3">
                   <FileIcon className="h-5 w-5 text-indigo-400" />
                   <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{pdf.name}</span>
                </div>
                <button 
                  onClick={() => setPdf(null)}
                  className="p-1 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-md transition-colors"
                  title="Remove file"
                >
                  <X className="h-4 w-4 text-slate-500" />
                </button>
              </div>
              
              <div className="flex flex-col gap-2">
                 <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Page Number to Extract (1-indexed)</label>
                 <input 
                   type="number" 
                   min="1" 
                   value={pageToExtract} 
                   onChange={(e) => setPageToExtract(Math.max(1, parseInt(e.target.value) || 1))} 
                   className="w-full md:w-1/2 p-3 border border-slate-200 dark:border-white/10 rounded-xl bg-white dark:bg-white/[0.02]" 
                 />
              </div>
              
              <button 
                 onClick={handleSplit} 
                 disabled={isSplitting}
                 className={`w-full py-4 text-white font-bold rounded-xl shadow-lg transition-all ${isSplitting ? 'bg-slate-400 cursor-not-allowed' : 'bg-green-500 shadow-green-500/20 hover:bg-green-600'}`}
              >
                {isSplitting ? 'Extracting...' : 'Extract Page'}
              </button>
            </div>
          )}
        </div>
      </GlobalDragDrop>
    </ToolLayout>
  );
}
