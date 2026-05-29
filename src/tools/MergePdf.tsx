import { useState, useRef } from 'react';
import { Layers, Upload, File as FileIcon, X } from 'lucide-react';
import { ToolLayout } from '../components/ToolLayout';
import { PDFDocument } from 'pdf-lib';
import { GlobalDragDrop } from '../components/GlobalDragDrop';

export function MergePdf() {
  const [pdfs, setPdfs] = useState<File[]>([]);
  const [isMerging, setIsMerging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrop = (files: File[]) => {
    setPdfs(prev => [...prev, ...files]);
  };

  const handleMerge = async () => {
    if (pdfs.length < 2) return;
    setIsMerging(true);
    try {
      const mergedPdf = await PDFDocument.create();
      for (const pdfFile of pdfs) {
        const pdfBytes = await pdfFile.arrayBuffer();
        const pdfDoc = await PDFDocument.load(pdfBytes);
        const copiedPages = await mergedPdf.copyPages(pdfDoc, pdfDoc.getPageIndices());
        copiedPages.forEach((page) => mergedPdf.addPage(page));
      }
      const mergedPdfBytes = await mergedPdf.save();
      const blob = new Blob([mergedPdfBytes], { type: 'application/pdf' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'merged.pdf';
      link.click();
    } catch (e) {
      console.error(e);
      alert("Failed to merge PDFs. Make sure they are valid PDF files without encryption.");
    } finally {
      setIsMerging(false);
    }
  };

  const seoContent = {
    h1: "Free Online PDF Merger",
    introduction: "Combine multiple PDF documents into one single file instantly using client-side processing.",
    whatItIs: "A client-side utility to merge separate PDF files using advanced browser-based PDF libraries without uploading them to our servers.",
    whyItMatters: "Organize your documents efficiently while keeping sensitive files safe from third-party interception.",
    useCases: [{ title: "Document Organization", description: "Combine multiple receipts or pages." }],
    features: [{ title: "Secure", description: "Your files never leave your browser." }]
  };

  return (
    <ToolLayout 
      title="Merge PDF" 
      description="Combine multiple PDF files."
      category="PDF Tools"
      icon={<Layers className="h-8 w-8 text-indigo-400" />}
      seoContent={seoContent}
    >
      <GlobalDragDrop onDrop={handleDrop} accept="application/pdf" tip="Drop your PDF files anywhere here to merge them">
        <div className="p-6 md:p-8">
          <div className="border-4 border-dashed border-slate-200 dark:border-white/10 rounded-2xl p-10 flex flex-col items-center justify-center text-center w-full min-h-[300px]">
            <Upload className="h-12 w-12 text-slate-400 mb-4" />
            <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">Drag & Drop PDFs</h3>
            <p className="text-slate-500 dark:text-slate-400 mb-6">Or click to select files from your computer.</p>
            <input 
               type="file" 
               multiple 
               accept="application/pdf" 
               onChange={(e) => setPdfs(prev => [...prev, ...Array.from(e.target.files || [])])} 
               className="hidden" 
               ref={fileInputRef} 
            />
            <button 
               onClick={() => fileInputRef.current?.click()} 
               className="px-6 py-3 bg-indigo-500 text-white font-bold rounded-xl shadow-lg shadow-indigo-500/20 hover:bg-indigo-600 transition-all"
            >
              Select PDF Files
            </button>
          </div>

          {pdfs.length > 0 && (
            <div className="mt-8">
              <h4 className="text-lg font-bold text-slate-800 dark:text-white mb-4">Selected Files</h4>
              <div className="space-y-3 mb-6">
                {pdfs.map((file, i) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-white/10">
                    <div className="flex items-center gap-3">
                       <FileIcon className="h-5 w-5 text-indigo-400" />
                       <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{file.name}</span>
                    </div>
                    <button 
                      onClick={() => setPdfs(pdfs.filter((_, index) => index !== i))}
                      className="p-1 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-md transition-colors"
                    >
                      <X className="h-4 w-4 text-slate-500" />
                    </button>
                  </div>
                ))}
              </div>
              
              <button 
                 onClick={handleMerge} 
                 disabled={pdfs.length < 2 || isMerging}
                 className={`w-full py-4 text-white font-bold rounded-xl shadow-lg transition-all ${pdfs.length < 2 || isMerging ? 'bg-slate-400 cursor-not-allowed' : 'bg-green-500 shadow-green-500/20 hover:bg-green-600'}`}
              >
                {isMerging ? 'Merging...' : pdfs.length < 2 ? 'Select at least 2 files' : 'Merge PDFs Now'}
              </button>
            </div>
          )}
        </div>
      </GlobalDragDrop>
    </ToolLayout>
  );
}
