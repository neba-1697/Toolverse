import { useState, useRef } from 'react';
import { Upload, FileCode2, Download, Check, Copy } from 'lucide-react';
import { ToolLayout } from '../components/ToolLayout';
import { GlobalDragDrop } from '../components/GlobalDragDrop';

export function SvgOptimizer() {
  const [svgInput, setSvgInput] = useState<string>('');
  const [optimizedSvg, setOptimizedSvg] = useState<string>('');
  const [originalSize, setOriginalSize] = useState<number>(0);
  const [optimizedSize, setOptimizedSize] = useState<number>(0);
  const [copied, setCopied] = useState<boolean>(false);
  const [decimals, setDecimals] = useState<number>(2);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleLoadSvgFile = (file: File) => {
    setOriginalSize(file.size);
    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      setSvgInput(text);
      optimizeSvg(text, decimals);
    };
    reader.readAsText(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleLoadSvgFile(file);
    }
  };

  const handleDrop = (files: File[]) => {
    if (files.length > 0) {
      handleLoadSvgFile(files[0]);
    }
  };

  const getPercentageDiff = () => {
    if (originalSize === 0) return 0;
    const diff = originalSize - optimizedSize;
    return Math.round((diff / originalSize) * 100);
  };

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const optimizeSvg = (rawText: string, decimalLimit: number) => {
    if (!rawText) return;

    // 1. Estimate original size if uploaded raw text
    if (originalSize === 0) {
      setOriginalSize(new Blob([rawText]).size);
    }

    let cleaned = rawText;

    // 2. Remove XML prefix and XML declarations
    cleaned = cleaned.replace(/<\?xml[^>]*\?>/gi, '');
    
    // 3. Remove doctype definition
    cleaned = cleaned.replace(/<!DOCTYPE[^>]*>/gi, '');

    // 4. Remove comments
    cleaned = cleaned.replace(/<!--[\s\S]*?-->/g, '');

    // 5. Remove Editor Metadata and proprietary elements (Inkscape, Illustrator)
    cleaned = cleaned.replace(/<(sodipodi|inkscape):[^>]*>([\s\S]*?)<\/\1:[^>]*>/gi, '');
    cleaned = cleaned.replace(/<(sodipodi|inkscape):[^>]*\/>/gi, '');
    cleaned = cleaned.replace(/\s(sodipodi|inkscape|xmlns:sodipodi|xmlns:inkscape|xmlns:illustrator|xmlns:adobe|adobe:[\w]+|i:[\w]+|illustrator:[\w]+)="[^"]*"/gi, '');
    
    // 6. Truncate float coordinate numbers inside paths to defined decimal accuracy
    // Matches expressions like d="M12.34567 45.678" or standard point clusters
    const floatRegex = /(-?\d+\.\d+)/g;
    cleaned = cleaned.replace(floatRegex, (match) => {
       const num = parseFloat(match);
       if (!isNaN(num)) {
          return num.toFixed(decimalLimit).replace(/\.?0+$/, ''); // trim trailing zeroes recursively
       }
       return match;
    });

    // 7. Remove empty or unneeded namespaces and layout space compression
    cleaned = cleaned.replace(/\s+/g, ' ');
    cleaned = cleaned.replace(/>\s+</g, '><');
    cleaned = cleaned.trim();

    setOptimizedSvg(cleaned);
    setOptimizedSize(new Blob([cleaned]).size);
  };

  const triggerOptimize = () => {
    optimizeSvg(svgInput, decimals);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(optimizedSvg);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadSvgFile = () => {
    const blob = new Blob([optimizedSvg], { type: 'image/svg+xml' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'optimized.svg';
    link.click();
  };

  const seoContent = {
    h1: "Free Online SVG Optimizer",
    introduction: "Clean, minify, and condense proprietary metadata out of SVG vector illustrations instantly completely client-side in your secure browser.",
    whatItIs: "An automated browser SVG tag trimmer that processes coordinate precision, strips legacy namespaces, elements, illustration tags, and inline descriptions.",
    whyItMatters: "Illustrator and Inkscape bundle thick layers of descriptive namespaces that contribute up to 60% of graphic payloads. Removing standard comments and rounding point decimals drastically improves web latency.",
    useCases: [
      { title: "Direct Inline Embeds", description: "Convert raw image node vectors into high-speed inline elements avoiding browser bloating." },
      { title: "SaaS Asset Deployment", description: "Compress platform icon packages to secure the lowest footprint on storage arrays." }
    ],
    features: [
      { title: "Trigonometric Precision Compactor", description: "Cap coordinate floats to selected decimal bounds to minimize path payloads without sacrificing curve definitions." },
      { title: "Double Window Sandbox", description: "Inspect code variations side-by-side with instant statistical gains." }
    ]
  };

  return (
    <ToolLayout
      title="SVG Optimizer"
      description="Minify and clean vector graphic SVG markup code securely."
      category="Image Tools"
      icon={<FileCode2 className="h-8 w-8 text-indigo-400" />}
      seoContent={seoContent}
    >
      <GlobalDragDrop onDrop={handleDrop} accept=".svg" tip="Drop your SVG file anywhere here to optimize it">
        <div className="p-6 md:p-8">
        <div className="grid lg:grid-cols-2 gap-8">
          
          {/* Input Panel */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-sm font-bold text-slate-800 dark:text-white">Input SVG Markup</label>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="text-xs text-indigo-500 font-bold hover:underline cursor-pointer flex items-center gap-1"
              >
                <Upload className="h-3.5 w-3.5" /> Upload File
              </button>
              <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept=".svg" />
            </div>

            <textarea
              value={svgInput}
              onChange={(e) => {
                setSvgInput(e.target.value);
                setOriginalSize(0); // recalculate text-based size
              }}
              className="w-full h-80 p-4 bg-white dark:bg-white/[0.02] border border-slate-200 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-indigo-500/50 text-slate-900 dark:text-white font-mono text-xs leading-relaxed"
              placeholder="Paste raw <svg>...</svg> tag string here..."
            />

            <div className="flex items-center gap-4 p-4 bg-slate-50 dark:bg-[#020617]/50 rounded-xl border border-slate-200 dark:border-white/10">
              <div className="flex-1">
                <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1 uppercase">Coordinate Accuracy</label>
                <select
                  value={decimals}
                  onChange={(e) => {
                    const dec = parseInt(e.target.value);
                    setDecimals(dec);
                    if (svgInput) optimizeSvg(svgInput, dec);
                  }}
                  className="w-full px-2 py-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-lg text-slate-900 dark:text-white text-xs font-semibold"
                >
                  <option value="0">0 (Integer Coordinates)</option>
                  <option value="1">1 Decimal Place</option>
                  <option value="2">2 Decimal Places</option>
                  <option value="3">3 Decimal Places</option>
                  <option value="4">4 Decimal Places</option>
                </select>
              </div>
              <button
                onClick={triggerOptimize}
                disabled={!svgInput}
                className="px-6 py-2.5 bg-indigo-500 text-white font-bold rounded-xl shadow-md text-sm hover:bg-indigo-600 transition-colors disabled:opacity-50"
              >
                Optimize Code
              </button>
            </div>
          </div>

          {/* Output Panel */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-slate-800 dark:text-white flex items-center gap-2">Optimized Output</h4>
            
            <textarea
              value={optimizedSvg}
              readOnly
              className="w-full h-80 p-4 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-xl text-slate-700 dark:text-slate-300 font-mono text-xs leading-relaxed"
              placeholder="Click optimize to generate condensed markup vectors..."
            />

            {optimizedSvg && (
              <div className="space-y-4">
                {/* Stats board */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="p-3 bg-slate-50 dark:bg-[#020617]/50 border border-slate-200 dark:border-white/10 rounded-xl text-center">
                    <span className="block text-[10px] uppercase font-bold text-slate-400">Original Size</span>
                    <span className="block text-sm font-extrabold text-slate-700 dark:text-white font-mono">{formatBytes(originalSize)}</span>
                  </div>
                  <div className="p-3 bg-slate-50 dark:bg-[#020617]/50 border border-slate-200 dark:border-white/10 rounded-xl text-center">
                    <span className="block text-[10px] uppercase font-bold text-slate-400">Optimized Size</span>
                    <span className="block text-sm font-extrabold text-slate-700 dark:text-white font-mono">{formatBytes(optimizedSize)}</span>
                  </div>
                  <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-center">
                    <span className="block text-[10px] uppercase font-bold text-emerald-400">Savings Gain</span>
                    <span className="block text-sm font-extrabold text-emerald-500 font-mono">-{getPercentageDiff()}%</span>
                  </div>
                </div>

                {/* Transact Buttons */}
                <div className="flex gap-4">
                  <button
                    onClick={copyToClipboard}
                    className="flex-1 flex items-center justify-center gap-2 py-3 border border-slate-200 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-white/[0.04] text-slate-900 dark:text-white font-bold text-sm rounded-xl transition-all"
                  >
                    {copied ? <Check className="h-4 w-4 text-emerald-500" /> : <Copy className="h-4 w-4" />}
                    {copied ? 'Copied XML!' : 'Copy Code'}
                  </button>

                  <button
                    onClick={downloadSvgFile}
                    className="flex-1 flex items-center justify-center gap-2 py-3 bg-green-500 text-white hover:bg-green-600 font-bold text-sm rounded-xl transition-all shadow-lg shadow-green-500/15"
                  >
                    <Download className="h-4 w-4" /> Download SVG
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
        </div>
      </GlobalDragDrop>
    </ToolLayout>
  );
}
