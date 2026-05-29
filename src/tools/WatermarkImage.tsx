import { useState, useRef } from 'react';
import { Upload, Stamp, Download, RefreshCw } from 'lucide-react';
import { ToolLayout } from '../components/ToolLayout';
import { GlobalDragDrop } from '../components/GlobalDragDrop';

export function WatermarkImage() {
  const [image, setImage] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>('image');
  const [stampText, setStampText] = useState<string>('CONFIDENTIAL');
  const [color, setColor] = useState<string>('#ffffff');
  const [opacity, setOpacity] = useState<number>(40);
  const [fontSizePercent, setFontSizePercent] = useState<number>(8); // relative to image width
  const [position, setPosition] = useState<string>('center'); // bottom-right, top-left, center, etc.
  const [fontStyle, setFontStyle] = useState<'sans-serif' | 'monospace' | 'serif'>('sans-serif');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  const handleLoadImageFile = (file: File) => {
    setFileName(file.name.split('.')[0]);
    const reader = new FileReader();
    reader.onload = (event) => setImage(event.target?.result as string);
    reader.readAsDataURL(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleLoadImageFile(file);
    }
  };

  const handleDrop = (files: File[]) => {
    if (files.length > 0) {
      handleLoadImageFile(files[0]);
    }
  };

  const applyWatermarkAndDownload = () => {
    if (!imgRef.current) return;
    setIsProcessing(true);

    setTimeout(() => {
      try {
        const originalWidth = imgRef.current!.naturalWidth;
        const originalHeight = imgRef.current!.naturalHeight;

        const canvas = document.createElement('canvas');
        canvas.width = originalWidth;
        canvas.height = originalHeight;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Draw original image
        ctx.drawImage(imgRef.current!, 0, 0);

        // Configure text style
        const calculatedFontSize = Math.round((fontSizePercent / 100) * originalWidth);
        ctx.font = `bold ${calculatedFontSize}px ${fontStyle}`;
        
        // Handle opacity & fill
        ctx.globalAlpha = opacity / 100;
        ctx.fillStyle = color;

        // Alignment measurements
        const textMetrics = ctx.measureText(stampText);
        const textWidth = textMetrics.width;
        const textHeight = calculatedFontSize; // rough approximation

        let x = originalWidth / 2;
        let y = originalHeight / 2;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        if (position === 'top-left') {
          x = textWidth / 2 + originalWidth * 0.05;
          y = textHeight / 2 + originalHeight * 0.05;
        } else if (position === 'top-center') {
          x = originalWidth / 2;
          y = textHeight / 2 + originalHeight * 0.05;
        } else if (position === 'top-right') {
          x = originalWidth - (textWidth / 2 + originalWidth * 0.05);
          y = textHeight / 2 + originalHeight * 0.05;
        } else if (position === 'middle-left') {
          x = textWidth / 2 + originalWidth * 0.05;
          y = originalHeight / 2;
        } else if (position === 'middle-right') {
          x = originalWidth - (textWidth / 2 + originalWidth * 0.05);
          y = originalHeight / 2;
        } else if (position === 'bottom-left') {
          x = textWidth / 2 + originalWidth * 0.05;
          y = originalHeight - (textHeight / 2 + originalHeight * 0.05);
        } else if (position === 'bottom-center') {
          x = originalWidth / 2;
          y = originalHeight - (textHeight / 2 + originalHeight * 0.05);
        } else if (position === 'bottom-right') {
          x = originalWidth - (textWidth / 2 + originalWidth * 0.05);
          y = originalHeight - (textHeight / 2 + originalHeight * 0.05);
        }

        ctx.fillText(stampText, x, y);

        // Reset global alpha
        ctx.globalAlpha = 1.0;

        const dataUrl = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.href = dataUrl;
        link.download = `${fileName}-watermarked.png`;
        link.click();
      } catch (err) {
        console.error(err);
      } finally {
        setIsProcessing(false);
      }
    }, 50);
  };

  const seoContent = {
    h1: "Free Online Image Watermarker",
    introduction: "Incorporate discrete text watermarks overlays onto your photographs securely and instantly completely inside your local desktop environment.",
    whatItIs: "An automated browser stamp overlay compiler. Input signature statements, secure copyrights, copyright years, or proprietary tags across photos manually.",
    whyItMatters: "Most services compile watermarks on remote servers which catalog your media records. Your assets remain exclusive to your sandbox when compiled on standard Canvas elements locally.",
    useCases: [
      { title: "Proprietary Proof Sharing", description: "Incorporate 'DRAFT', 'CONFIDENTIAL' or 'DO NOT COPY' overlays across business documents or design layouts." },
      { title: "Creative Copyright Preservation", description: "Incorporate discrete photographer names across corners before social syndication." }
    ],
    features: [
      { title: "Dynamic Responsive Scale", description: "Watermark scale dynamically coordinates relative to horizontal photo widths, preventing text distortion across wide ratios." },
      { title: "Nine Cardinal Locations", description: "Convenient positional triggers place typography perfectly into primary configurations with a mouse-click." }
    ]
  };

  return (
    <ToolLayout
      title="Watermark Image"
      description="Add customizable text watermarks to your photographs."
      category="Image Tools"
      icon={<Stamp className="h-8 w-8 text-indigo-400" />}
      seoContent={seoContent}
    >
      <GlobalDragDrop onDrop={handleDrop} accept="image/*" tip="Drop your image anywhere here to watermark it">
        <div className="p-6 md:p-8">
        {!image ? (
          <div className="border-4 border-dashed border-slate-200 dark:border-white/10 rounded-2xl p-12 flex flex-col items-center justify-center text-center">
            <Upload className="h-12 w-12 text-slate-400 mb-4 animate-bounce" />
            <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">Drag & Drop Image</h3>
            <p className="text-slate-500 dark:text-slate-400 mb-6">Choose any JPEG, PNG, WebP image to watermark securely.</p>
            <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/*" />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="px-6 py-3 bg-indigo-500 text-white font-bold rounded-xl shadow-lg shadow-indigo-500/20 hover:bg-indigo-600 transition-all cursor-pointer"
            >
              Select Image
            </button>
          </div>
        ) : (
          <div className="space-y-8">
            <div className="grid lg:grid-cols-12 gap-8">
              {/* Working Area / Preview */}
              <div className="lg:col-span-7 bg-slate-50 dark:bg-[#020617]/50 rounded-2xl border border-slate-200 dark:border-white/10 p-6 flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-bold text-slate-800 dark:text-white">Watermark Preview</h4>
                  <button 
                    onClick={() => { setImage(null); }}
                    className="text-xs text-red-500 font-semibold hover:underline"
                  >
                    Clear Image
                  </button>
                </div>
                <div className="flex-1 flex items-center justify-center overflow-hidden rounded-xl bg-slate-100 dark:bg-slate-900 checkerboard-bg min-h-[300px] max-h-[500px]">
                  <img
                    ref={imgRef}
                    src={image}
                    alt="Loaded preview"
                    className="max-w-full h-auto object-contain max-h-[450px]"
                  />
                  
                  {/* Subtle CSS Representation of overlay strictly for previewing */}
                  <div className="hidden">Watermark preview engine</div>
                </div>
              </div>

              {/* Controls Panel */}
              <div className="lg:col-span-5 space-y-6">
                <div className="p-6 bg-slate-50 dark:bg-[#020617]/50 rounded-2xl border border-slate-200 dark:border-white/10 space-y-6">
                  <h4 className="font-bold text-slate-900 dark:text-white pb-3 border-b border-slate-200 dark:border-white/10">Overlay Options</h4>

                  {/* Stamp Text */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5 uppercase">Watermark Text</label>
                    <input
                      type="text"
                      value={stampText}
                      onChange={(e) => setStampText(e.target.value)}
                      className="w-full px-3 py-2.5 bg-white dark:bg-white/[0.02] border border-slate-200 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-indigo-500/50 text-slate-900 dark:text-white font-medium text-sm"
                      placeholder="e.g. COPYRIGHT 2026"
                    />
                  </div>

                  {/* Positioning cardinal points */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-2 uppercase">Placement Area</label>
                    <div className="grid grid-cols-3 gap-1.5 max-w-[200px]">
                      {['top-left', 'top-center', 'top-right', 'middle-left', 'center', 'middle-right', 'bottom-left', 'bottom-center', 'bottom-right'].map((pos) => (
                        <button
                          key={pos}
                          type="button"
                          onClick={() => setPosition(pos)}
                          className={`h-8 border text-[10px] font-bold rounded transition-all ${position === pos ? 'bg-indigo-500 border-indigo-500 text-white shadow-sm' : 'bg-white dark:bg-white/[0.02] border-slate-200 dark:border-white/10 text-slate-500 hover:bg-slate-50 dark:hover:bg-white/[0.04]'}`}
                          title={pos.replace('-', ' ')}
                        >
                          ●
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Size and Opacity Controls */}
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">
                        <span>Font Size Index</span>
                        <span>{fontSizePercent}% of Width</span>
                      </div>
                      <input
                        type="range"
                        min="2"
                        max="25"
                        value={fontSizePercent}
                        onChange={(e) => setFontSizePercent(parseInt(e.target.value))}
                        className="w-full accent-indigo-500"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">
                        <span>Opacity Accent</span>
                        <span>{opacity}%</span>
                      </div>
                      <input
                        type="range"
                        min="10"
                        max="100"
                        value={opacity}
                        onChange={(e) => setOpacity(parseInt(e.target.value))}
                        className="w-full accent-indigo-500"
                      />
                    </div>
                  </div>

                  {/* Font Style & Colors */}
                  <div className="grid grid-cols-2 gap-4 pt-2">
                    <div>
                      <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5 uppercase">Font Style</label>
                      <select
                        value={fontStyle}
                        onChange={(e) => setFontStyle(e.target.value as any)}
                        className="w-full px-2 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-indigo-500/50 text-slate-900 dark:text-white text-xs font-medium"
                      >
                        <option value="sans-serif">Modern Sans</option>
                        <option value="monospace">Tech Mono</option>
                        <option value="serif">Classic Serif</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5 uppercase">Color Code</label>
                      <div className="flex gap-2">
                        <input
                          type="color"
                          value={color}
                          onChange={(e) => setColor(e.target.value)}
                          className="h-9 w-10 p-0.5 border-0 rounded-lg cursor-pointer bg-transparent"
                        />
                        <span className="font-mono text-xs self-center text-slate-600 dark:text-slate-300">{color.toUpperCase()}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Apply and Download */}
                <button
                  type="button"
                  onClick={applyWatermarkAndDownload}
                  disabled={isProcessing || !stampText}
                  className="w-full flex items-center justify-center gap-2 py-4 bg-gradient-to-r from-indigo-500 to-indigo-600 text-white font-bold rounded-xl shadow-lg shadow-indigo-500/20 hover:from-indigo-600 hover:to-indigo-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isProcessing ? <RefreshCw className="animate-spin h-5 w-5" /> : <Stamp className="h-5 w-5" />}
                  {isProcessing ? 'Burning Watermark...' : 'Watermark & Save'}
                </button>
              </div>
            </div>
          </div>
        )}
        </div>
      </GlobalDragDrop>
    </ToolLayout>
  );
}
