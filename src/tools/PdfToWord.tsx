import { useState, useRef, useEffect } from 'react';
import { Upload, FileText, Download, Copy, Check, RefreshCw, AlertCircle } from 'lucide-react';
import { ToolLayout } from '../components/ToolLayout';
import { GlobalDragDrop } from '../components/GlobalDragDrop';

export function PdfToWord() {
  const [file, setFile] = useState<File | null>(null);
  const [extractedText, setExtractedText] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [pageNum, setPageNum] = useState<number>(0);
  const [progress, setProgress] = useState<string>('');

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleLoadPdfFile = (fileItem: File) => {
    setFile(fileItem);
    setExtractedText('');
    setPageNum(0);
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
        // Configure worker
        // @ts-ignore
        window.pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.worker.min.js';
        // @ts-ignore
        resolve(window.pdfjsLib);
      };
      script.onerror = () => reject(new Error('Failed to load PDF processing engine.'));
      document.head.appendChild(script);
    });
  };

  const convertPdfToText = async () => {
    if (!file) return;
    setIsProcessing(true);
    setProgress('Loading conversion engine...');

    try {
      const pdfjs = await loadPdfJs();
      setProgress('Reading document structure...');
      const fileReader = new FileReader();

      fileReader.onload = async (e) => {
        try {
          const typedArray = new Uint8Array(e.target?.result as ArrayBuffer);
          const pdfDoc = await pdfjs.getDocument(typedArray).promise;
          const totalPages = pdfDoc.numPages;
          setPageNum(totalPages);

          let fullText = '';
          for (let p = 1; p <= totalPages; p++) {
            setProgress(`Extracting text from page ${p} of ${totalPages}...`);
            const page = await pdfDoc.getPage(p);
            const textContent = await page.getTextContent();
            
            const pageText = textContent.items
              // @ts-ignore
              .map((item: any) => item.str)
              .join(' ');
            
            fullText += `\n\n--- PAGE ${p} ---\n\n` + pageText;
          }

          setExtractedText(fullText.trim());
          setProgress('Conversion complete.');
        } catch (err) {
          console.error(err);
          setProgress('Failed to parse PDF binary. Ensure the file is not encrypted.');
        }
      };

      fileReader.readAsArrayBuffer(file);
    } catch (err) {
      console.error(err);
      setProgress('Failed to download PDF parsing dependencies.');
    } finally {
      setIsProcessing(false);
    }
  };

  const copyText = () => {
    navigator.clipboard.writeText(extractedText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadAsDoc = () => {
    if (!extractedText) return;
    
    // Package into standard doc compatible HTML file to trigger editable Word download 
    const htmlContent = `
      <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
      <head><title>Extracted Document</title><style>body { font-family: Arial, sans-serif; line-height: 1.6; } p { margin-bottom: 10px; }</style></head>
      <body>
        ${extractedText.replace(/\n/g, '<br/>')}
      </body>
      </html>
    `;

    const blob = new Blob(['\ufeff' + htmlContent], { type: 'application/msword' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${file?.name.split('.')[0]}-extracted.doc`;
    link.click();
  };

  const seoContent = {
    h1: "Free PDF to Word Document Converter",
    introduction: "Extract editable paragraph structures and rich text elements out of static PDF documents securely and locally in your client's web browser.",
    whatItIs: "An automated browser document scanning converter that reads vector text arrays page-by-page mapping characters into copyable and download-ready Word (.doc) structures.",
    whyItMatters: "Standard converters capture your confidential contracts and PDF sheets onto external conversion computers. Our sandbox processes characters completely inside browser virtual threads.",
    useCases: [
      { title: "Contract Alteration", description: "Convert static legal PDF clauses into editable office documents for restructuring and negotiations." },
      { title: "Research Summary Extraction", description: "Strip text arrays from large-scale journal reports to merge summary files." }
    ],
    features: [
      { title: "Full Local Stream Processing", description: "Integrates modern text quantization mapping vector offsets locally." },
      { title: "Universal office export", description: "Compiles text streams into Microsoft Word-compatible .doc containers instantly." }
    ]
  };

  return (
    <ToolLayout
      title="PDF to Word"
      description="Extract readable text structures from PDF documents into editable Word formats."
      category="PDF Tools"
      icon={<FileText className="h-8 w-8 text-indigo-400" />}
      seoContent={seoContent}
    >
      <GlobalDragDrop onDrop={handleDrop} accept="application/pdf" tip="Drop your PDF anywhere here to convert to Word text">
        <div className="p-6 md:p-8">
        {!file ? (
          <div className="border-4 border-dashed border-slate-200 dark:border-white/10 rounded-2xl p-12 flex flex-col items-center justify-center text-center">
            <Upload className="h-12 w-12 text-slate-400 mb-4 animate-bounce" />
            <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">Drag & Drop PDF</h3>
            <p className="text-slate-500 dark:text-slate-400 mb-6">PDF files with copyable textual layouts are supported.</p>
            <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="application/pdf" />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="px-6 py-3 bg-indigo-500 text-white font-bold rounded-xl shadow-lg shadow-indigo-500/20 hover:bg-indigo-600 transition-all cursor-pointer"
            >
              Select PDF File
            </button>
          </div>
        ) : (
          <div className="space-y-8">
            <div className="p-6 bg-slate-50 dark:bg-[#020617]/50 rounded-2xl border border-slate-200 dark:border-white/10 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 bg-indigo-500/10 border border-indigo-500/20 text-indigo-500 rounded-lg flex items-center justify-center font-bold text-xs font-mono">PDF</div>
                <div>
                  <h4 className="font-bold text-slate-800 dark:text-white max-w-xs md:max-w-md truncate">{file.name}</h4>
                  <span className="text-xs text-slate-500 font-mono">Size: {parseFloat((file.size / (1024 * 1024)).toFixed(2))} MB</span>
                </div>
              </div>
              <button
                onClick={() => { setFile(null); setExtractedText(''); }}
                className="text-xs text-red-500 font-bold hover:underline"
              >
                Clear Document
              </button>
            </div>

            {/* Dynamic Extraction Output */}
            {!extractedText && (
              <div className="flex flex-col items-center justify-center p-12 border border-slate-200 dark:border-white/10 rounded-2xl bg-slate-50 dark:bg-slate-800/30">
                {isProcessing ? (
                  <div className="text-center space-y-4">
                    <RefreshCw className="h-10 w-10 text-indigo-500 animate-spin mx-auto" />
                    <p className="text-sm font-bold text-slate-700 dark:text-slate-300">{progress}</p>
                  </div>
                ) : (
                  <div className="text-center space-y-6">
                    <AlertCircle className="h-10 w-10 text-indigo-400 mx-auto" />
                    <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md leading-relaxed">
                      This utility will convert vector layout data into editable paragraphs completely client-side. Click Below to initiate text extraction.
                    </p>
                    <button
                      onClick={convertPdfToText}
                      className="px-8 py-3 bg-indigo-500 text-white font-bold rounded-xl shadow-lg shadow-indigo-500/25 hover:bg-indigo-600 transition-all cursor-pointer"
                    >
                      Extract Text nodes
                    </button>
                  </div>
                )}
              </div>
            )}

            {extractedText && (
              <div className="space-y-4 animate-in fade-in duration-300">
                <textarea
                  readOnly
                  value={extractedText}
                  className="w-full h-80 p-4 bg-white dark:bg-white/[0.02] border border-slate-200 dark:border-white/10 rounded-xl font-mono text-xs leading-relaxed text-slate-700 dark:text-slate-300"
                />

                <div className="flex gap-4">
                  <button
                    onClick={copyText}
                    className="flex-1 py-3 border border-slate-200 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-white/[0.04] text-slate-900 dark:text-white font-bold text-sm rounded-xl transition-all flex items-center justify-center gap-2"
                  >
                    {copied ? <Check className="h-4 w-4 text-emerald-500" /> : <Copy className="h-4 w-4" />}
                    {copied ? 'Copied text!' : 'Copy to Clipboard'}
                  </button>

                  <button
                    onClick={downloadAsDoc}
                    className="flex-1 py-3 bg-green-500 hover:bg-green-600 text-white font-bold text-sm rounded-xl transition-all flex items-center justify-center gap-2"
                  >
                    <Download className="h-4.5 w-4.5" /> Save as Word (.doc)
                  </button>
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
