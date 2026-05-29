import { useState, useRef, useEffect } from 'react';
import { Upload, Maximize2, Download, AlertCircle, RefreshCw } from 'lucide-react';
import { ToolLayout } from '../components/ToolLayout';
import { GlobalDragDrop } from '../components/GlobalDragDrop';

export function ResizeImage() {
  const [image, setImage] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>('image');
  const [originalWidth, setOriginalWidth] = useState<number>(0);
  const [originalHeight, setOriginalHeight] = useState<number>(0);
  const [width, setWidth] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);
  const [maintainRatio, setMaintainRatio] = useState<boolean>(true);
  const [aspectRatio, setAspectRatio] = useState<number>(1);
  const [format, setFormat] = useState<'png' | 'jpeg' | 'webp'>('png');
  const [quality, setQuality] = useState<number>(90);
  const [isResizing, setIsResizing] = useState<boolean>(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  const handleLoadImageFile = (file: File) => {
    setFileName(file.name.split('.')[0]);
    const reader = new FileReader();
    reader.onload = (event) => {
      setImage(event.target?.result as string);
    };
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

  const handleImageLoad = () => {
    if (imgRef.current) {
      const w = imgRef.current.naturalWidth;
      const h = imgRef.current.naturalHeight;
      setOriginalWidth(w);
      setOriginalHeight(h);
      setWidth(w);
      setHeight(h);
      setAspectRatio(w / h);
    }
  };

  const handleWidthChange = (val: number) => {
    setWidth(val);
    if (maintainRatio) {
      setHeight(Math.round(val / aspectRatio));
    }
  };

  const handleHeightChange = (val: number) => {
    setHeight(val);
    if (maintainRatio) {
      setWidth(Math.round(val * aspectRatio));
    }
  };

  const applyPreset = (scale: number) => {
    const newW = Math.round(originalWidth * scale);
    setWidth(newW);
    setHeight(maintainRatio ? Math.round(newW / aspectRatio) : Math.round(originalHeight * scale));
  };

  const resizeAndDownload = () => {
    if (!imgRef.current || width <= 0 || height <= 0) return;
    setIsResizing(true);

    setTimeout(() => {
      try {
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        if (format === 'jpeg') {
          ctx.fillStyle = '#FFFFFF';
          ctx.fillRect(0, 0, width, height);
        }

        ctx.drawImage(imgRef.current!, 0, 0, width, height);

        const dataUrl = canvas.toDataURL(`image/${format}`, quality / 100);
        const link = document.createElement('a');
        link.href = dataUrl;
        link.download = `${fileName}-resized.${format}`;
        link.click();
      } catch (err) {
        console.error(err);
      } finally {
        setIsResizing(false);
      }
    }, 50);
  };

  const seoContent = {
    h1: "Free Online Image Resizer",
    introduction: "Resize your images instantly to precise dimensions. Maintaining high visual fidelity completely client-side in your secure browser.",
    whatItIs: "A client-side utility to resize JPEG, PNG, and WebP images. Select custom dimensions or proportional scale presets instantly.",
    whyItMatters: "Most resizers require uploading files to third-party databases. Our local-first approach renders pixels in your memory, keeping confidential mockups or personal photos 100% secure.",
    useCases: [
      { title: "E-Commerce Mockups", description: "Standardize product shots to strict marketplace specifications like 800x800px." },
      { title: "Social Media Posts", description: "Scale assets down for custom story formats, cover headers, or profile displays." }
    ],
    features: [
      { title: "Maintain Aspect Ratio", description: "Lock dimensions together to avoid awkward horizontal or vertical stretches." },
      { title: "Precise Control", description: "Set customizable dimensions down to the exact pixel, with live scaling feedback." }
    ],
    faqs: [
      { question: "Does this affect the original image?", answer: "No, this is non-destructive. A resized duplicate is generated and downloaded." },
      { question: "Where are my images processed?", answer: "Entirely in your local browser sandbox. They are never sent to external servers." }
    ]
  };

  return (
    <ToolLayout
      title="Resize Image"
      description="Change the dimensions of your images in bulk or individually."
      category="Image Tools"
      icon={<Maximize2 className="h-8 w-8 text-indigo-400" />}
      seoContent={seoContent}
    >
      <GlobalDragDrop onDrop={handleDrop} accept="image/*" tip="Drop your image anywhere here to resize it">
        <div className="p-6 md:p-8">
        {!image ? (
          <div className="border-4 border-dashed border-slate-200 dark:border-white/10 rounded-2xl p-12 flex flex-col items-center justify-center text-center">
            <Upload className="h-12 w-12 text-slate-400 mb-4 animate-bounce" />
            <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">Drag & Drop Image</h3>
            <p className="text-slate-500 dark:text-slate-400 mb-6">JPEG, PNG, WebP or SVG format files are supported.</p>
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
              {/* Preview Container */}
              <div className="lg:col-span-7 bg-slate-50 dark:bg-[#020617]/50 rounded-2xl border border-slate-200 dark:border-white/10 p-6 flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-bold text-slate-800 dark:text-white">Image Preview</h4>
                  <button 
                    onClick={() => { setImage(null); setOriginalWidth(0); setOriginalHeight(0); }}
                    className="text-xs text-red-500 font-semibold hover:underline"
                  >
                    Clear Image
                  </button>
                </div>
                <div className="flex-1 flex items-center justify-center overflow-hidden rounded-xl bg-slate-100 dark:bg-slate-900 checkerboard-bg min-h-[300px] max-h-[500px]">
                  <img
                    ref={imgRef}
                    src={image}
                    onLoad={handleImageLoad}
                    alt="Loaded preview"
                    className="max-w-full h-auto object-contain max-h-[450px]"
                  />
                </div>
                {originalWidth > 0 && (
                  <div className="mt-4 text-center text-xs text-slate-500 dark:text-slate-400 font-mono">
                    Original Resolution: {originalWidth}x{originalHeight} pixels
                  </div>
                )}
              </div>

              {/* Resize Options */}
              <div className="lg:col-span-5 space-y-6">
                <div className="p-6 bg-slate-50 dark:bg-[#020617]/50 rounded-2xl border border-slate-200 dark:border-white/10 space-y-6">
                  <h4 className="font-bold text-slate-900 dark:text-white pb-3 border-b border-slate-200 dark:border-white/10">Dimension Controls</h4>

                  {/* Width / Height Inputs */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5 uppercase">Width (px)</label>
                      <input
                        type="number"
                        value={width || ''}
                        onChange={(e) => handleWidthChange(parseInt(e.target.value) || 0)}
                        className="w-full px-3 py-2.5 bg-white dark:bg-white/[0.02] border border-slate-200 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-indigo-500/50 text-slate-900 dark:text-white font-mono text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5 uppercase">Height (px)</label>
                      <input
                        type="number"
                        value={height || ''}
                        onChange={(e) => handleHeightChange(parseInt(e.target.value) || 0)}
                        className="w-full px-3 py-2.5 bg-white dark:bg-white/[0.02] border border-slate-200 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-indigo-500/50 text-slate-900 dark:text-white font-mono text-sm"
                      />
                    </div>
                  </div>

                  {/* Maintain Aspect Ratio Toggle */}
                  <label className="flex items-center gap-2 cursor-pointer py-1">
                    <input
                      type="checkbox"
                      checked={maintainRatio}
                      onChange={(e) => {
                        setMaintainRatio(e.target.checked);
                        if (e.target.checked && imgRef.current) {
                          setHeight(Math.round(width / aspectRatio));
                        }
                      }}
                      className="rounded border-slate-300 dark:border-white/10 text-indigo-500 focus:ring-indigo-500"
                    />
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Maintain Aspect Ratio</span>
                  </label>

                  {/* Quick Preset Buttons */}
                  <div>
                    <span className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-2 uppercase">Scale Presets</span>
                    <div className="grid grid-cols-4 gap-2">
                      {[0.25, 0.5, 0.75, 2.0].map((ratio) => (
                        <button
                          key={ratio}
                          type="button"
                          onClick={() => applyPreset(ratio)}
                          className="px-2 py-2 bg-white dark:bg-white/[0.02] border border-slate-200 dark:border-white/10 hover:bg-slate-100 dark:hover:bg-white/[0.06] text-slate-800 dark:text-white text-xs font-bold rounded-lg transition-colors"
                        >
                          {ratio * 100}%
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Export Options */}
                  <div className="space-y-4 pt-4 border-t border-slate-200 dark:border-white/10">
                    <h5 className="text-sm font-bold text-slate-800 dark:text-white">Export Properties</h5>
                    
                    <div>
                      <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5 uppercase">File Format</label>
                      <select
                        value={format}
                        onChange={(e) => setFormat(e.target.value as any)}
                        className="w-full px-3 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-indigo-500/50 text-slate-900 dark:text-white text-sm font-medium"
                      >
                        <option value="png">PNG (Lossless)</option>
                        <option value="jpeg">JPEG (Compressed)</option>
                        <option value="webp">WebP (NextGen)</option>
                      </select>
                    </div>

                    {format !== 'png' && (
                      <div>
                        <div className="flex justify-between text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">
                          <span className="uppercase">Image Quality</span>
                          <span>{quality}%</span>
                        </div>
                        <input
                          type="range"
                          min="10"
                          max="100"
                          value={quality}
                          onChange={(e) => setQuality(parseInt(e.target.value))}
                          className="w-full accent-indigo-500"
                        />
                      </div>
                    )}
                  </div>
                </div>

                {/* Resize Button */}
                <button
                  type="button"
                  onClick={resizeAndDownload}
                  disabled={isResizing || width <= 0 || height <= 0}
                  className="w-full flex items-center justify-center gap-2 py-4 bg-gradient-to-r from-indigo-500 to-indigo-600 text-white font-bold rounded-xl shadow-lg shadow-indigo-500/20 hover:from-indigo-600 hover:to-indigo-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isResizing ? <RefreshCw className="animate-spin h-5 w-5" /> : <Download className="h-5 w-5" />}
                  {isResizing ? 'Processing Rescale...' : 'Resize & Download Image'}
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
