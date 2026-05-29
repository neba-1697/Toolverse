import { useState, useRef } from 'react';
import { Upload, Palette, Copy, Check } from 'lucide-react';
import { ToolLayout } from '../components/ToolLayout';
import { GlobalDragDrop } from '../components/GlobalDragDrop';

interface extractedColor {
  hex: string;
  rgb: string;
  hsl: string;
  percentage: number;
}

export function ColorExtractor() {
  const [image, setImage] = useState<string | null>(null);
  const [colors, setColors] = useState<extractedColor[]>([]);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  const handleLoadImageFile = (file: File) => {
    setColors([]);
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

  const rgbToHex = (r: number, g: number, b: number): string => {
    const toHex = (c: number) => {
      const hex = c.toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    };
    return '#' + toHex(r) + toHex(g) + toHex(b);
  };

  const rgbToHsl = (r: number, g: number, b: number): string => {
    r /= 255;
    g /= 255;
    b /= 255;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0, s = 0, l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }

    return `hsl(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`;
  };

  const processImagePalette = () => {
    if (!imgRef.current) return;

    try {
      const img = imgRef.current;
      const canvas = document.createElement('canvas');
      // Downscale heavily for high analysis speed
      canvas.width = 50;
      canvas.height = 50;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      ctx.drawImage(img, 0, 0, 50, 50);
      const imgData = ctx.getImageData(0, 0, 50, 50).data;

      // Group pixels into color buckets
      // Rather than building standard complex K-Means, we group similar segments using rounded RGB coordinate values
      const bucketSize = 32; // round down to multiples of 32 to group close colors
      const counts: { [key: string]: { r: number; g: number; b: number; count: number } } = {};

      for (let i = 0; i < imgData.length; i += 4) {
        const r = imgData[i];
        const g = imgData[i + 1];
        const b = imgData[i + 2];
        const a = imgData[i + 3];

        if (a < 127) continue; // ignore transparent alpha pixels

        // Round colors to buckets
        const rFloor = Math.floor(r / bucketSize) * bucketSize;
        const gFloor = Math.floor(g / bucketSize) * bucketSize;
        const bFloor = Math.floor(b / bucketSize) * bucketSize;
        const key = `${rFloor},${gFloor},${bFloor}`;

        if (!counts[key]) {
          counts[key] = { r, g, b, count: 0 };
        }
        counts[key].count++;
      }

      // Sort descending and take top 6
      const sorted = Object.values(counts)
        .sort((a, b) => b.count - a.count)
        .slice(0, 6);

      const totalSamples = sorted.reduce((acc, curr) => acc + curr.count, 0) || 1;

      const extracted: extractedColor[] = sorted.map((item) => {
        const hex = rgbToHex(item.r, item.g, item.b);
        const rgb = `rgb(${item.r}, ${item.g}, ${item.b})`;
        const hsl = rgbToHsl(item.r, item.g, item.b);
        return {
          hex,
          rgb,
          hsl,
          percentage: Math.round((item.count / totalSamples) * 100)
        };
      });

      setColors(extracted);
    } catch (e) {
      console.error(e);
    }
  };

  const copyColorValue = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 1500);
  };

  const seoContent = {
    h1: "Free Client-Side Color Palette Extractor",
    introduction: "Extract the exact core color palettes and dominant color ranges from any photograph or design template instantly inside your secure client browser.",
    whatItIs: "An automated browser color spectrum sampler. Quantizes image records in canvas memory to list hex definitions, RGB thresholds, and HSL curves.",
    whyItMatters: "Scraping UI brand presets from photos shouldn't mean sharing your mockups with unsecure color portals. ToolVerse acts locally inside sandboxed states to ensure assets stay private.",
    useCases: [
      { title: "Brand Identity Extraction", description: "Sample product sheets or vector mockups to build perfectly matched design systems." },
      { title: "Creative Web Accents", description: "Match CSS backdrops or text gradients to focal hero illustrations." }
    ],
    features: [
      { title: "Fast Bitmapped Quantization", description: "Performs low-overhead sub-sampling across 2,500 points to cluster core color blocks in milliseconds." },
      { title: "Universal Copier", description: "Instant copy shortcuts compile values in format standards including HEX, RGB, HSL chips." }
    ],
    faqs: [
      { question: "How is color dominance calculated?", answer: "By mapping pixels inside rounded RGB dimensional buckets, the system quantizes and sorts colors by relative frequency." }
    ]
  };

  return (
    <ToolLayout
      title="Color Extractor"
      description="Extract unique, dominant color schemes from any image."
      category="Image Tools"
      icon={<Palette className="h-8 w-8 text-indigo-400" />}
      seoContent={seoContent}
    >
      <GlobalDragDrop onDrop={handleDrop} accept="image/*" tip="Drop your image anywhere here to extract colors from it">
        <div className="p-6 md:p-8">
        {!image ? (
          <div className="border-4 border-dashed border-slate-200 dark:border-white/10 rounded-2xl p-12 flex flex-col items-center justify-center text-center">
            <Upload className="h-12 w-12 text-slate-400 mb-4 animate-bounce" />
            <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">Drag & Drop Image</h3>
            <p className="text-slate-500 dark:text-slate-400 mb-6">Choose any PNG, JPEG, SVG or WebP picture file.</p>
            <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/*" />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="px-6 py-3 bg-indigo-500 text-white font-bold rounded-xl shadow-lg shadow-indigo-500/20 hover:bg-indigo-600 transition-all cursor-pointer"
            >
              Upload Image File
            </button>
          </div>
        ) : (
          <div className="space-y-8">
            <div className="grid lg:grid-cols-12 gap-8">
              {/* Left Picture Column */}
              <div className="lg:col-span-6 bg-slate-50 dark:bg-[#020617]/50 rounded-2xl border border-slate-200 dark:border-white/10 p-6 flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-bold text-slate-800 dark:text-white">Uploaded Photo</h4>
                  <button 
                    onClick={() => { setImage(null); setColors([]); }}
                    className="text-xs text-red-500 font-bold hover:underline"
                  >
                    Clear Photo
                  </button>
                </div>
                <div className="flex-1 flex items-center justify-center overflow-hidden rounded-xl bg-slate-100 dark:bg-slate-900 checkerboard-bg min-h-[250px] max-h-[400px]">
                  <img
                    ref={imgRef}
                    src={image}
                    onLoad={processImagePalette}
                    alt="Palette extraction source"
                    className="max-w-full h-auto object-contain max-h-[380px]"
                  />
                </div>
              </div>

              {/* Palette Output Column */}
              <div className="lg:col-span-6 space-y-6">
                <div className="p-6 bg-slate-50 dark:bg-[#020617]/50 rounded-2xl border border-slate-200 dark:border-white/10">
                  <h4 className="font-bold text-slate-900 dark:text-white pb-3 border-b border-slate-200 dark:border-white/10 mb-4">Dominant Colors</h4>
                  
                  {colors.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-12 text-slate-500 text-sm">
                      <div className="animate-spin h-6 w-6 border-2 border-indigo-500 border-t-transparent rounded-full mb-3" />
                      Analyzing image color matrix...
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {/* Simple Color Blocks */}
                      <div className="h-14 flex rounded-xl overflow-hidden shadow-inner border border-slate-200 dark:border-white/10">
                        {colors.map((c, i) => (
                          <div
                            key={i}
                            className="h-full flex-1 transition-all hover:scale-105 group relative cursor-pointer"
                            style={{ backgroundColor: c.hex }}
                            onClick={() => copyColorValue(c.hex, i)}
                            title={`Dominance: ${c.percentage}% - Click to copy HEX`}
                          >
                            <span className="absolute bottom-1 right-2 text-[9px] font-bold text-black bg-white/70 px-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                              {c.hex.toUpperCase()}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Detailed Color List with Copy Controls */}
                      <div className="space-y-3 pt-2">
                        {colors.map((c, i) => (
                          <div key={i} className="flex items-center gap-4 p-3 bg-white dark:bg-white/[0.02] border border-slate-200 dark:border-white/10 rounded-xl">
                            <div className="w-12 h-12 rounded-lg border border-slate-200 dark:border-white/10 shadow-sm shrink-0" style={{ backgroundColor: c.hex }} />
                            
                            <div className="flex-1 min-w-0">
                              <div className="flex justify-between items-baseline mb-1">
                                <span className="font-mono text-sm font-bold text-slate-800 dark:text-white">{c.hex.toUpperCase()}</span>
                                <span className="text-[10px] font-semibold text-slate-500">{c.percentage}%</span>
                              </div>
                              <div className="flex gap-4 text-[10px] text-slate-500 font-mono">
                                <span className="cursor-pointer hover:text-indigo-500" onClick={() => copyColorValue(c.rgb, i + 10)} title="Copy RGB">{c.rgb}</span>
                                <span className="cursor-pointer hover:text-indigo-500" onClick={() => copyColorValue(c.hsl, i + 20)} title="Copy HSL">{c.hsl}</span>
                              </div>
                            </div>

                            <button
                              onClick={() => copyColorValue(c.hex, i)}
                              className="p-2 border border-slate-200 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-white/[0.04] text-slate-500 hover:text-slate-900 rounded-lg transition-colors"
                              title="Copy Hex Color"
                            >
                              {copiedIndex === i ? <Check className="h-4 w-4 text-emerald-500" /> : <Copy className="h-4 w-4" />}
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
        </div>
      </GlobalDragDrop>
    </ToolLayout>
  );
}
