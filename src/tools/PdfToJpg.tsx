import { useState, useRef } from 'react';
import { Upload, Images, Download, Check, RefreshCw, AlertCircle } from 'lucide-react';
import { ToolLayout } from '../components/ToolLayout';
import { GlobalDragDrop } from '../components/GlobalDragDrop';

interface RenderedPage {
  pageIndex: number;
  dataUrl: string;
}

export function PdfToJpg() {
  const [file, setFile] = useState<File | null>(null);
  const [pages, setPages] = useState<RenderedPage[]>([]);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [progress, setProgress] = useState<string>('');

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleLoadPdfFile = (fileItem: File) => {
    setFile(fileItem);
    setPages([]);
    setProgress('');
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileItem = e.target.files?.[0];
    if (fileItem) {
      handleLoadPdfFile(fileItem);
    }
  };

  const handleDrop = (files: File[]) => {
    if (files.length > 0) {
      handleLoadPdfFile(files[0]);
    }
  };

  const loadPdfJs = (): Promise<any> => {
    return new Promise((resolve, reject) => {
      // @ts-ignore
      if (window.pdfjsLib) {
        // @ts-ignore
        resolve(window.pdfjsLib);
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.min.js';
      script.onload = () => {
        // @ts-ignore
        window.pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.worker.min.js';
        // @ts-ignore
        resolve(window.pdfjsLib);
      };
      script.onerror = () => reject(new Error('Failed to load PDF graphics engine.'));
      document.head.appendChild(script);
    });
  };

  const convertPdfToImages = async () => {
    if (!file) return;
    setIsProcessing(true);
    setProgress('Loading graphics engine...');

    try {
      const pdfjs = await loadPdfJs();
      setProgress('Reading paper pages...');
      const fileReader = new FileReader();

      fileReader.onload = async (e) => {
        try {
          const typedArray = new Uint8Array(e.target?.result as ArrayBuffer);
          const pdfDoc = await pdfjs.getDocument(typedArray).promise;
          const totalPages = pdfDoc.numPages;
          const rendered: RenderedPage[] = [];

          for (let p = 1; p <= Math.min(totalPages, 12); p++) {
            setProgress(`Rendering page ${p} of ${totalPages}...`);
            const page = await pdfDoc.getPage(p);
            
            // Render at high scaling for crisp output
            const viewport = page.getViewport({ scale: 1.5 });
            const canvas = document.createElement('canvas');
            canvas.width = viewport.width;
            canvas.height = viewport.height;
            const ctx = canvas.getContext('2d');

            if (ctx) {
              const renderContext = {
                canvasContext: ctx,
                viewport: viewport
              };
              await page.render(renderContext).promise;
              rendered.push({
                pageIndex: p,
                dataUrl: canvas.toDataURL('image/jpeg', 0.92)
              });
            }
          }

          setPages(rendered);
          setProgress('Rendering finished successfully.');
        } catch (err) {
          console.error(err);
          setProgress('Failed reading PDF elements.');
        }
      };

      fileReader.readAsArrayBuffer(file);
    } catch (err) {
      console.error(err);
      setProgress('Dependent scripts failed to load.');
    } finally {
      setIsProcessing(false);
    }
  };

  const downloadPageImage = (dataUrl: string, index: number) => {
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = `${file?.name.split('.')[0]}-page-${index}.jpg`;
    link.click();
  };

  const seoContent = {
    h1: "Free Client-Side PDF to JPG Image Converter",
    introduction: "Split standard multi-page PDF documents and render distinct grid pages into high-resolution JPG images completely inside your local browser sandbox.",
    whatItIs: "An automated browser vector rendering compiler that translates PDF lines, pathways, and embedded images onto Canvas frames, exporting them in lossy JPG compression streams.",
    whyItMatters: "Web converters log your compliance spreadsheets, identity sheets, or proprietary documents onto unsecure databases. Our tool renders page layouts completely inside local desktop RAM.",
    useCases: [
      { title: "Writers or Designing Portfolio Presentations", description: "Convert design slides or text portfolios into high-fidelity image snippets for embedding in social posts." },
      { title: "Form Verification Uploads", description: "Convert standard PDF certificate pages into graphic JPG forms for easy system validations." }
    ],
    features: [
      { title: "High Scaling Render Vector Matrix", description: "Calculates viewport coordinates at 1.5x zoom scales to guarantee typography stays completely readable even at fine font levels." },
      { title: "One-Click Quick Save Highlights", description: "Download distinct vector pages individually, choosing which frame to export." }
    ]
  };

  return (
    <ToolLayout
      title="PDF to JPG Converter"
      description="Extract pages from PDF files and save them as separate JPG images."
      category="PDF Tools"
      icon={<Images className="h-8 w-8 text-indigo-400" />}
      seoContent={seoContent}
    >
      <GlobalDragDrop onDrop={handleDrop} accept="application/pdf" tip="Drop your PDF anywhere here to convert pages to JPG images">
        <div className="p-6 md:p-8">
        {!file ? (
          <div className="border-4 border-dashed border-slate-200 dark:border-white/10 rounded-2xl p-12 flex flex-col items-center justify-center text-center">
            <Upload className="h-12 w-12 text-slate-400 mb-4 animate-bounce" />
            <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">Drag & Drop PDF</h3>
            <p className="text-slate-500 dark:text-slate-400 mb-6">PDF document files are split page-by-page inside local memory.</p>
            <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="application/pdf" />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="px-6 py-3 bg-indigo-500 text-white font-bold rounded-xl shadow-lg shadow-indigo-500/20 hover:bg-indigo-600 transition-all cursor-pointer"
            >
              Select PDF File
            </button>
          </div>
        ) : (
          <div className="space-y-8 animate-in fade-in duration-300">
            <div className="p-6 bg-slate-50 dark:bg-[#020617]/50 rounded-2xl border border-slate-200 dark:border-white/10 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 bg-indigo-500/10 border border-indigo-500/20 text-indigo-500 rounded-lg flex items-center justify-center font-bold text-xs font-mono">PDF</div>
                <div>
                  <h4 className="font-bold text-slate-800 dark:text-white max-w-xs md:max-w-md truncate">{file.name}</h4>
                  <span className="text-xs text-slate-500 font-mono">Size: {parseFloat((file.size / (1024 * 1024)).toFixed(2))} MB</span>
                </div>
              </div>
              <button
                onClick={() => { setFile(null); setPages([]); }}
                className="text-xs text-red-500 font-bold hover:underline"
              >
                Clear Document
              </button>
            </div>

            {/* Render Preview triggers */}
            {pages.length === 0 && (
              <div className="flex flex-col items-center justify-center p-12 border border-slate-200 dark:border-white/10 rounded-2xl bg-slate-50 dark:bg-slate-800/20">
                {isProcessing ? (
                  <div className="text-center space-y-4">
                    <RefreshCw className="h-10 w-10 text-indigo-500 animate-spin mx-auto" strokeWidth={2.5} />
                    <p className="text-sm font-bold text-slate-700 dark:text-slate-300">{progress}</p>
                  </div>
                ) : (
                  <div className="text-center space-y-6">
                    <Images className="h-10 w-10 text-indigo-400 mx-auto" />
                    <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md leading-relaxed">
                      Render pages at high-resolution scalar dimensions directly in your browser frame. Click Below to execute.
                    </p>
                    <button
                      onClick={convertPdfToImages}
                      className="px-8 py-3 bg-indigo-500 text-white font-bold rounded-xl shadow-lg shadow-indigo-500/25 hover:bg-indigo-600 transition-all cursor-pointer"
                    >
                      Render Pages to JPG
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Output Pages Grid board */}
            {pages.length > 0 && (
              <div className="space-y-4">
                <h4 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">Converted Pages</h4>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {pages.map((p) => (
                    <div key={p.pageIndex} className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-white/10 space-y-3 flex flex-col justify-between">
                      <div className="relative overflow-hidden rounded-lg bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-white/10 max-h-[160px] flex items-center justify-center shadow-inner">
                        <img src={p.dataUrl} alt={`Page ${p.pageIndex}`} className="max-w-full max-h-full object-contain" />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-500">Page {p.pageIndex}</span>
                        <button
                          onClick={() => downloadPageImage(p.dataUrl, p.pageIndex)}
                          className="px-3 py-1.5 bg-indigo-500 hover:bg-indigo-600 text-white font-bold text-[10px] rounded-lg transition-colors cursor-pointer"
                        >
                          Save JPG
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
        </div>
      </GlobalDragDrop>
    </ToolLayout>
  );
}
