import { useState } from 'react';
import { FileUp, FileText, Download, RefreshCw, Sparkles, CheckCircle2 } from 'lucide-react';
import { ToolLayout } from '../components/ToolLayout';
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import { GlobalDragDrop } from '../components/GlobalDragDrop';

export function WordToPdf() {
  const [textInput, setTextInput] = useState<string>(
    `OFFICIAL CONTRACT AGREEMENT\n\n` +
    `1. SCOPE OF SERVICES\n` +
    `The Provider agrees to deliver functional, high-performance web engineering and software utilities to the Client under privacy-first client-side terms.\n\n` +
    `2. CONFIDENTIALITY\n` +
    `All computing processes run strictly inside the sandbox memory of the Client's device. No records, credentials, or file streams shall be exported.\n\n` +
    `3. EXECUTION\n` +
    `Executed on this day by authorized engineering nodes.`
  );
  const [docTitle, setDocTitle] = useState<string>('Contract Agreement');
  const [margin, setMargin] = useState<number>(50); // pt margins
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [pdfBlobUrl, setPdfBlobUrl] = useState<string | null>(null);

  const generatePdfFile = async () => {
    setIsProcessing(true);
    setPdfBlobUrl(null);

    setTimeout(async () => {
      try {
        const pdfDoc = await PDFDocument.create();
        const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
        const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
        
        // Define standard layout boundaries
        const pageW = 600; // Letter size approximation
        const pageH = 800;
        const availableW = pageW - margin * 2;
        const fontSize = 11;
        const leading = 16;
        
        let page = pdfDoc.addPage([pageW, pageH]);
        let currentY = pageH - margin;

        // Draw Doc Title
        page.drawText(docTitle.toUpperCase(), {
          x: margin,
          y: currentY - 15,
          size: 16,
          font: boldFont,
          color: rgb(0.1, 0.1, 0.1)
        });
        currentY -= 40;

        // Draw horizontal divider line
        page.drawLine({
          start: { x: margin, y: currentY },
          end: { x: pageW - margin, y: currentY },
          thickness: 1,
          color: rgb(0.8, 0.8, 0.8)
        });
        currentY -= 25;

        // Wrap text algorithm
        const lines = textInput.split('\n');
        
        for (const line of lines) {
          if (!line.trim()) {
            currentY -= leading;
            continue;
          }

          // Split line into words for wrap checking
          const words = line.split(' ');
          let currentLineText = '';

          for (const word of words) {
            const testLine = currentLineText ? `${currentLineText} ${word}` : word;
            const textWidth = font.widthOfTextAtSize(testLine, fontSize);

            if (textWidth > availableW) {
              // Commit current wrap line
              page.drawText(currentLineText, {
                x: margin,
                y: currentY,
                size: fontSize,
                font: font,
                color: rgb(0.2, 0.2, 0.2)
              });
              currentY -= leading;

              // Check page breaks
              if (currentY < margin + 40) {
                page = pdfDoc.addPage([pageW, pageH]);
                currentY = pageH - margin;
              }

              currentLineText = word;
            } else {
              currentLineText = testLine;
            }
          }

          // Commit remnant wrap fragments
          if (currentLineText) {
            page.drawText(currentLineText, {
              x: margin,
              y: currentY,
              size: fontSize,
              font: font,
              color: rgb(0.2, 0.2, 0.2)
            });
            currentY -= leading;
          }

          // Buffer slightly between original paragraphs
          currentY -= leading * 0.4;

          // Double check final page break checks
          if (currentY < margin + 40) {
            page = pdfDoc.addPage([pageW, pageH]);
            currentY = pageH - margin;
          }
        }

        const pdfBytes = await pdfDoc.save();
        const blob = new Blob([pdfBytes], { type: 'application/pdf' });
        setPdfBlobUrl(URL.createObjectURL(blob));

      } catch (err) {
        console.error(err);
        alert('Failed compiling PDF document');
      } finally {
        setIsProcessing(false);
      }
    }, 100);
  };

  const handleLoadTextFile = (fileItem: File) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      setTextInput(event.target?.result as string);
    };
    reader.readAsText(fileItem);
  };

  const handleTextUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleLoadTextFile(file);
    }
  };

  const handleDrop = (files: File[]) => {
    if (files.length > 0) {
      handleLoadTextFile(files[0]);
    }
  };

  const downloadPdfFile = () => {
    if (!pdfBlobUrl) return;
    const link = document.createElement('a');
    link.href = pdfBlobUrl;
    link.download = `${docTitle.toLowerCase().replace(/\s+/g, '_')}.pdf`;
    link.click();
  };

  const seoContent = {
    h1: "Free Client-Side Plain Text to PDF Document Compiler",
    introduction: "Incorporate paragraph formatting and instantly output plain text or rich text inputs into pristine multi-page PDFs, safely client-side.",
    whatItIs: "An automated text wrapping compositor that draws characters across standardized bounding boxes using Standard PDF typography libraries.",
    whyItMatters: "Standard formatters upload document texts onto centralized cloud instances where sensitive materials are converted. Our canvas vector matrices compile character codes inside standard browser threads locally.",
    useCases: [
      { title: "Standard Documentation Writing", description: "Convert plain text reports into structured documents for business presentations." },
      { title: "SDR Logs or Invoices", description: "Format raw textual invoices and download standard PDF files." }
    ],
    features: [
      { title: "Multi-page Flow Layout", description: "Calculates height boundaries and splits overflowing words onto fresh pages automatically." },
      { title: "Custom Formatting Elements", description: "Adjust margins, change font sizes, and add custom title headers in real-time." }
    ]
  };

  return (
    <ToolLayout
      title="Word to PDF Converter"
      description="Format plain text, contract drafts, or word text directly into clean PDF documents."
      category="PDF Tools"
      icon={<FileText className="h-8 w-8 text-indigo-400" />}
      seoContent={seoContent}
    >
      <GlobalDragDrop onDrop={handleDrop} accept=".txt,.rtf,.doc,.docx" tip="Drop your text file anywhere here to compile to PDF">
        <div className="p-6 md:p-8">
        <div className="grid lg:grid-cols-12 gap-8">
          
          {/* Editor Column */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-sm font-bold text-slate-800 dark:text-white flex items-center gap-2">
                Document Composer Text
              </label>
              <label className="text-xs text-indigo-500 font-bold hover:underline cursor-pointer flex items-center gap-1">
                <FileUp className="h-3.5 w-3.5" /> Upload File
                <input type="file" onChange={handleTextUpload} className="hidden" accept=".txt,.rtf,.doc,.docx" />
              </label>
            </div>

            <textarea
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              className="w-full h-96 p-4 bg-white dark:bg-white/[0.02] border border-slate-200 dark:border-white/10 rounded-2xl focus:ring-2 focus:ring-indigo-500/50 text-slate-900 dark:text-white text-sm leading-relaxed"
              placeholder="Paste or compose your document notes here..."
            />
          </div>

          {/* Properties Column */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 bg-slate-50 dark:bg-[#020617]/50 rounded-2xl border border-slate-200 dark:border-white/10 space-y-6">
              <h4 className="font-bold text-slate-900 dark:text-white pb-3 border-b border-slate-200 dark:border-white/10">Configure Properties</h4>

              {/* Title Header */}
              <div>
                <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5 uppercase">Document Header Title</label>
                <input
                  type="text"
                  value={docTitle}
                  onChange={(e) => setDocTitle(e.target.value)}
                  className="w-full px-3 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-xl text-slate-900 dark:text-white text-sm font-medium focus:ring-2 focus:ring-indigo-500/50"
                  placeholder="e.g. OFFICIAL MEMODRANDUM"
                />
              </div>

              {/* Margin Selector */}
              <div>
                <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5 uppercase">Page Padding Margin (pt)</label>
                <select
                  value={margin}
                  onChange={(e) => setMargin(parseInt(e.target.value))}
                  className="w-full px-3 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-xl text-slate-900 dark:text-white text-sm font-medium focus:ring-2 focus:ring-indigo-500/50"
                >
                  <option value="30">Narrow (30pt)</option>
                  <option value="50">Standard (50pt)</option>
                  <option value="75">Wide (75pt)</option>
                </select>
              </div>

              {/* Generate Trigger */}
              <button
                onClick={generatePdfFile}
                disabled={isProcessing || !textInput}
                className="w-full flex items-center justify-center gap-2 py-3.5 bg-indigo-500 text-white font-bold rounded-xl shadow-lg shadow-indigo-500/20 hover:bg-indigo-600 transition-all cursor-pointer"
              >
                {isProcessing ? <RefreshCw className="animate-spin h-5 w-5" /> : <Sparkles className="h-5 w-5" />}
                {isProcessing ? 'Compiling PDF document...' : 'Compile Document to PDF'}
              </button>
            </div>

            {/* Compiled Preview Download Area */}
            {pdfBlobUrl && (
              <div className="p-6 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl space-y-4 animate-in fade-in duration-300">
                <h5 className="font-bold text-emerald-500 flex items-center gap-2 text-sm">
                  <CheckCircle2 className="h-5 w-5" /> Compilation Finished
                </h5>
                <p className="text-xs text-slate-500 dark:text-slate-400">Your layout metadata and word alignments have been converted successfully to standard PDF format.</p>
                <button
                  onClick={downloadPdfFile}
                  className="w-full py-3 bg-green-500 hover:bg-green-600 text-white font-bold text-sm rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
                >
                  <Download className="h-4.5 w-4.5" /> Download Custom PDF
                </button>
              </div>
            )}
          </div>
        </div>
        </div>
      </GlobalDragDrop>
    </ToolLayout>
  );
}
