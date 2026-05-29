import { useState, useRef, useEffect } from 'react';
import { Upload, Crop, Download, RefreshCw } from 'lucide-react';
import { ToolLayout } from '../components/ToolLayout';
import { GlobalDragDrop } from '../components/GlobalDragDrop';

export function CropImage() {
  const [image, setImage] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>('image');
  const [originalWidth, setOriginalWidth] = useState<number>(0);
  const [originalHeight, setOriginalHeight] = useState<number>(0);
  
  // Crop offsets and sizes in percent to adapt dynamically to loaded UI
  const [cropX, setCropX] = useState<number>(10);
  const [cropY, setCropY] = useState<number>(10);
  const [cropW, setCropW] = useState<number>(80);
  const [cropH, setCropH] = useState<number>(80);
  const [aspectPreset, setAspectPreset] = useState<string>('custom');
  
  const [isCropping, setIsCropping] = useState<boolean>(false);

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

  const handleImageLoad = () => {
    if (imgRef.current) {
      setOriginalWidth(imgRef.current.naturalWidth);
      setOriginalHeight(imgRef.current.naturalHeight);
      setCropX(10);
      setCropY(10);
      setCropW(80);
      setCropH(80);
      setAspectPreset('custom');
    }
  };

  const applyPreset = (preset: string) => {
    setAspectPreset(preset);
    if (!originalWidth || !originalHeight) return;

    if (preset === '1:1') {
      const size = Math.min(80, 80 * (originalHeight / originalWidth));
      setCropW(size);
      setCropH(size * (originalWidth / originalHeight));
      setCropX(Math.round((100 - size) / 2));
      setCropY(Math.round((100 - size * (originalWidth / originalHeight)) / 2));
    } else if (preset === '16:9') {
      const targetH = (cropW * originalWidth * 9) / (originalHeight * 16);
      if (targetH + cropY <= 100) {
        setCropH(targetH);
      } else {
        setCropH(100 - cropY);
        setCropW((cropH * originalHeight * 16) / (originalWidth * 9));
      }
    } else if (preset === '4:3') {
      const targetH = (cropW * originalWidth * 3) / (originalHeight * 4);
      if (targetH + cropY <= 100) {
        setCropH(targetH);
      } else {
        setCropH(100 - cropY);
        setCropW((cropH * originalHeight * 4) / (originalWidth * 3));
      }
    } else if (preset === '9:16') {
      const targetW = (cropH * originalHeight * 9) / (originalWidth * 16);
      if (targetW + cropX <= 100) {
        setCropW(targetW);
      } else {
        setCropW(100 - cropX);
        setCropH((cropW * originalWidth * 16) / (originalHeight * 9));
      }
    }
  };

  const cropAndDownload = () => {
    if (!imgRef.current || !originalWidth || !originalHeight) return;
    setIsCropping(true);

    setTimeout(() => {
      try {
        const xPx = Math.round((cropX / 100) * originalWidth);
        const yPx = Math.round((cropY / 100) * originalHeight);
        const wPx = Math.round((cropW / 100) * originalWidth);
        const hPx = Math.round((cropH / 100) * originalHeight);

        const canvas = document.createElement('canvas');
        canvas.width = wPx;
        canvas.height = hPx;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        ctx.drawImage(imgRef.current!, xPx, yPx, wPx, hPx, 0, 0, wPx, hPx);

        const dataUrl = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.href = dataUrl;
        link.download = `${fileName}-cropped.png`;
        link.click();
      } catch (err) {
        console.error(err);
      } finally {
        setIsCropping(false);
      }
    }, 50);
  };

  const seoContent = {
    h1: "Free Online Image Cropper",
    introduction: "Crop your images to standard proportions or custom dimension offsets. Safe, privacy-first, and processed 100% locally.",
    whatItIs: "An online canvas-based tool to slice borders and focus your images manually or with pre-set standard configurations like square or full landscape.",
    whyItMatters: "Most online tools upload raw photos to their data vaults before crop processing. Our image cropper processes pixels in your memory, meaning zero external servers will interact with your assets.",
    useCases: [
      { title: "Profile Avatars", description: "Crop portraits into clean 1:1 square shapes for forums, social platforms, and corporate pages." },
      { title: "SDR/Full HD Aspect Conversions", description: "Convert standard shots to widescreen 16:9 headers easily." }
    ],
    features: [
      { title: "Interactive Canvas Overlay", description: "Real-time overlay grid highlights what will be trimmed versus what is preserved." },
      { title: "Ratio Lock presets", description: "Avoid calculating math. Choose 1:1, 16:9, or 4:3 configurations instantly." }
    ],
    faqs: [
      { question: "Can I undo a crop operations?", answer: "Yes, you can alter the crop offsets repeatedly on the same preview image without degrading quality." },
      { question: "Is registration required?", answer: "No, ToolVerse values simplicity. Crop infinite images instantly without login steps." }
    ]
  };

  return (
    <ToolLayout
      title="Crop Image"
      description="Select specific focus regions and crop images."
      category="Image Tools"
      icon={<Crop className="h-8 w-8 text-indigo-400" />}
      seoContent={seoContent}
    >
      <GlobalDragDrop onDrop={handleDrop} accept="image/*" tip="Drop your image anywhere here to crop it">
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
              {/* Image Editor Area */}
              <div className="lg:col-span-7 bg-slate-50 dark:bg-[#020617]/50 rounded-2xl border border-slate-200 dark:border-white/10 p-6 flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-bold text-slate-800 dark:text-white">Workspace</h4>
                  <button 
                    onClick={() => { setImage(null); }}
                    className="text-xs text-red-500 font-semibold hover:underline"
                  >
                    Clear
                  </button>
                </div>
                
                {/* Simulated Cropper Grid Area */}
                <div className="relative overflow-hidden rounded-xl bg-slate-100 dark:bg-slate-900 checkerboard-bg min-h-[300px] flex items-center justify-center">
                  <div className="relative inline-block max-w-full">
                    <img
                      ref={imgRef}
                      src={image}
                      onLoad={handleImageLoad}
                      alt="Crop target"
                      className="max-h-[450px] max-w-full object-contain block opacity-40 select-none pointer-events-none"
                    />
                    
                    {/* Active crop window overlay */}
                    {originalWidth > 0 && (
                      <div 
                        className="absolute border-2 border-indigo-500 shadow-[0_0_0_9999px_rgba(15,23,42,0.65)] overflow-hidden"
                        style={{
                          left: `${cropX}%`,
                          top: `${cropY}%`,
                          width: `${cropW}%`,
                          height: `${cropH}%`,
                        }}
                      >
                        {/* Highlights actual image */}
                        <img 
                          src={image}
                          alt="Crop mask"
                          className="absolute max-h-[450px] max-w-none origin-top-left invisible"
                          style={{
                            left: `-${(cropX / cropW) * 100}%`,
                            top: `-${(cropY / cropH) * 100}%`,
                            width: `${(100 / cropW) * 100}%`,
                            height: `${(100 / cropH) * 100}%`,
                          }}
                        />
                        
                        {/* Crop Grid Lines */}
                        <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 pointer-events-none opacity-40">
                          <div className="border-r border-b border-white"></div>
                          <div className="border-r border-b border-white"></div>
                          <div className="border-b border-white"></div>
                          <div className="border-r border-b border-white"></div>
                          <div className="border-r border-b border-white"></div>
                          <div className="border-b border-white"></div>
                          <div className="border-r border-white"></div>
                          <div className="border-r border-white"></div>
                          <div></div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                
                {originalWidth > 0 && (
                  <div className="mt-4 text-center text-xs text-slate-500 dark:text-slate-400 font-mono">
                    Target Dimensions: {originalWidth}x{originalHeight}px
                  </div>
                )}
              </div>

              {/* Offset Controllers */}
              <div className="lg:col-span-5 space-y-6">
                <div className="p-6 bg-slate-50 dark:bg-[#020617]/50 rounded-2xl border border-slate-200 dark:border-white/10 space-y-6">
                  <h4 className="font-bold text-slate-900 dark:text-white pb-3 border-b border-slate-200 dark:border-white/10">Crop Boundaries</h4>

                  {/* Ratio Presets */}
                  <div>
                    <span className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-2 uppercase">Aspect Ratio presets</span>
                    <div className="grid grid-cols-5 gap-2">
                      {['custom', '1:1', '16:9', '4:3', '9:16'].map((preset) => (
                        <button
                          key={preset}
                          type="button"
                          onClick={() => applyPreset(preset)}
                          className={`px-1.5 py-2 border text-xs font-bold rounded-lg transition-colors capitalize ${aspectPreset === preset ? 'bg-indigo-500 border-indigo-500 text-white' : 'bg-white dark:bg-white/[0.02] border-slate-200 dark:border-white/10 text-slate-800 dark:text-white hover:bg-slate-100 dark:hover:bg-white/[0.06]'}`}
                        >
                          {preset}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Crop Offsets Sliders */}
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">
                        <span>Left Offset (X)</span>
                        <span>{cropX}%</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max={100 - cropW}
                        value={cropX}
                        onChange={(e) => {
                          setCropX(parseInt(e.target.value));
                          setAspectPreset('custom');
                        }}
                        className="w-full accent-indigo-500"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">
                        <span>Top Offset (Y)</span>
                        <span>{cropY}%</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max={100 - cropH}
                        value={cropY}
                        onChange={(e) => {
                          setCropY(parseInt(e.target.value));
                          setAspectPreset('custom');
                        }}
                        className="w-full accent-indigo-500"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">
                        <span>Crop Width</span>
                        <span>{cropW}%</span>
                      </div>
                      <input
                        type="range"
                        min="10"
                        max={100 - cropX}
                        value={cropW}
                        onChange={(e) => {
                          setCropW(parseInt(e.target.value));
                          setAspectPreset('custom');
                        }}
                        className="w-full accent-indigo-500"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">
                        <span>Crop Height</span>
                        <span>{cropH}%</span>
                      </div>
                      <input
                        type="range"
                        min="10"
                        max={100 - cropY}
                        value={cropH}
                        onChange={(e) => {
                          setCropH(parseInt(e.target.value));
                          setAspectPreset('custom');
                        }}
                        className="w-full accent-indigo-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Crop Button */}
                <button
                  type="button"
                  onClick={cropAndDownload}
                  disabled={isCropping}
                  className="w-full flex items-center justify-center gap-2 py-4 bg-gradient-to-r from-indigo-500 to-indigo-600 text-white font-bold rounded-xl shadow-lg shadow-indigo-500/20 hover:from-indigo-600 hover:to-indigo-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isCropping ? <RefreshCw className="animate-spin h-5 w-5" /> : <Crop className="h-5 w-5" />}
                  {isCropping ? 'Processing Crop...' : 'Crop & Download PNG'}
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
