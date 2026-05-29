import { useState, useRef, useEffect } from 'react';
import { Upload, Smile, Download, RefreshCw } from 'lucide-react';
import { ToolLayout } from '../components/ToolLayout';
import { GlobalDragDrop } from '../components/GlobalDragDrop';

export function MemeGenerator() {
  const [image, setImage] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>('meme');
  const [topText, setTopText] = useState<string>('ONE DOES NOT SIMPLY');
  const [bottomText, setBottomText] = useState<string>('BUILD WEB APPLICATIONS WITHOUT TOOLVERSE');
  const [fontSize, setFontSize] = useState<number>(10); // Percentage of image width
  const [uppercase, setUppercase] = useState<boolean>(true);
  const [textColor, setTextColor] = useState<string>('#ffffff');
  const [strokeColor, setStrokeColor] = useState<string>('#000000');
  const [isCompiling, setIsCompiling] = useState<boolean>(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

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

  const drawPreview = () => {
    if (!imgRef.current || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const w = imgRef.current.naturalWidth;
    const h = imgRef.current.naturalHeight;
    canvas.width = w;
    canvas.height = h;

    // Draw background
    ctx.drawImage(imgRef.current, 0, 0);

    // Setup Text Parameters
    const computedFontSize = Math.round((fontSize / 100) * w);
    ctx.font = `900 ${computedFontSize}px Impact, Arial Black, sans-serif`;
    ctx.textAlign = 'center';
    ctx.fillStyle = textColor;
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = Math.max(2, computedFontSize / 8);
    ctx.lineJoin = 'miter';
    ctx.miterLimit = 2;

    const tText = uppercase ? topText.toUpperCase() : topText;
    const bText = uppercase ? bottomText.toUpperCase() : bottomText;

    // Draw Top Text
    if (tText) {
      ctx.textBaseline = 'top';
      ctx.strokeText(tText, w / 2, h * 0.05);
      ctx.fillText(tText, w / 2, h * 0.05);
    }

    // Draw Bottom Text
    if (bText) {
      ctx.textBaseline = 'bottom';
      ctx.strokeText(bText, w / 2, h * 0.95);
      ctx.fillText(bText, w / 2, h * 0.95);
    }
  };

  useEffect(() => {
    if (image) {
      // Delay slightly to satisfy load lifecycle
      const timer = setTimeout(drawPreview, 100);
      return () => clearTimeout(timer);
    }
  }, [image, topText, bottomText, fontSize, uppercase, textColor, strokeColor]);

  const compileAndDownload = () => {
    if (!canvasRef.current) return;
    setIsCompiling(true);

    setTimeout(() => {
      try {
        const dataUrl = canvasRef.current!.toDataURL('image/jpeg', 0.9);
        const link = document.createElement('a');
        link.href = dataUrl;
        link.download = `${fileName}-meme.jpg`;
        link.click();
      } catch (err) {
        console.error(err);
      } finally {
        setIsCompiling(false);
      }
    }, 50);
  };

  const seoContent = {
    h1: "Free Client-Side Meme Generator",
    introduction: "Build and synthesize high-fidelity image memes using custom Impact overlays instantly and without logging in.",
    whatItIs: "An instant sandbox compiler that takes local images and overlays text with solid shadows and borders.",
    whyItMatters: "Standard generators watermarks your creations or keep personal face shots logged in content libraries. ToolVerse works strictly under sandboxed local modules to safe-keep your raw images.",
    useCases: [
      { title: "Team Announcements", description: "Design lighthearted team-building assets or humor templates to spice up Slack/Discord feeds." },
      { title: "Trending Social Dialogs", description: "Generate contextual jokes for fast-paced viral channels." }
    ],
    features: [
      { title: "Classic Impact Typography", description: "Guarantees authentic heavy text with borders to conform to historic standard designs." },
      { title: "Lossless Canvas Compiler", description: "Preserves native horizontal dimension scales so downloads stay crisp." }
    ]
  };

  return (
    <ToolLayout
      title="Meme Generator"
      description="Create customized internet memes with classic overlay typography."
      category="Image Tools"
      icon={<Smile className="h-8 w-8 text-indigo-400" />}
      seoContent={seoContent}
    >
      <GlobalDragDrop onDrop={handleDrop} accept="image/*" tip="Drop your image anywhere here to generate a meme">
        <div className="p-6 md:p-8">
        {!image ? (
          <div className="border-4 border-dashed border-slate-200 dark:border-white/10 rounded-2xl p-12 flex flex-col items-center justify-center text-center">
            <Upload className="h-12 w-12 text-slate-400 mb-4 animate-bounce" />
            <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">Drag & Drop Image Template</h3>
            <p className="text-slate-500 dark:text-slate-400 mb-6">Choose any PNG, JPG or WEBP base image to write onto.</p>
            <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/*" />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="px-6 py-3 bg-indigo-500 text-white font-bold rounded-xl shadow-lg shadow-indigo-500/20 hover:bg-indigo-600 transition-all cursor-pointer"
            >
              Select Base Photo
            </button>
          </div>
        ) : (
          <div className="space-y-8">
            <div className="grid lg:grid-cols-12 gap-8">
              {/* Working board */}
              <div className="lg:col-span-7 bg-slate-50 dark:bg-[#020617]/50 rounded-2xl border border-slate-200 dark:border-white/10 p-6 flex flex-col items-center justify-center">
                <img
                  ref={imgRef}
                  src={image}
                  onLoad={drawPreview}
                  alt="Source preview element"
                  className="hidden"
                />
                <div className="overflow-hidden rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-white/10 p-2 max-w-full">
                  <canvas
                    ref={canvasRef}
                    className="max-w-full h-auto max-h-[500px] block object-contain"
                  />
                </div>
              </div>

              {/* Text sliders control board */}
              <div className="lg:col-span-5 space-y-6">
                <div className="p-6 bg-slate-50 dark:bg-[#020617]/50 rounded-2xl border border-slate-200 dark:border-white/10 space-y-6">
                  <div className="flex justify-between items-center pb-3 border-b border-slate-200 dark:border-white/10">
                    <h4 className="font-bold text-slate-900 dark:text-white">Configure Typography</h4>
                    <button
                      onClick={() => setImage(null)}
                      className="text-xs text-red-500 font-bold hover:underline"
                    >
                      Reset Photo
                    </button>
                  </div>

                  {/* Top line input */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5 uppercase">Top Caption</label>
                    <input
                      type="text"
                      value={topText}
                      onChange={(e) => setTopText(e.target.value)}
                      className="w-full px-3 py-2.5 bg-white dark:bg-white/[0.02] border border-slate-200 dark:border-white/10 rounded-xl text-slate-900 dark:text-white font-semibold text-sm focus:ring-2 focus:ring-indigo-500/50"
                      placeholder="e.g. ONE DOES NOT SIMPLY"
                    />
                  </div>

                  {/* Bottom line input */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5 uppercase">Bottom Caption</label>
                    <input
                      type="text"
                      value={bottomText}
                      onChange={(e) => setBottomText(e.target.value)}
                      className="w-full px-3 py-2.5 bg-white dark:bg-white/[0.02] border border-slate-200 dark:border-white/10 rounded-xl text-slate-900 dark:text-white font-semibold text-sm focus:ring-2 focus:ring-indigo-500/50"
                      placeholder="Caption details here..."
                    />
                  </div>

                  {/* Text Size Percentage */}
                  <div>
                    <div className="flex justify-between text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">
                      <span className="uppercase">Relative Text Scale</span>
                      <span>{fontSize}%</span>
                    </div>
                    <input
                      type="range"
                      min="4"
                      max="20"
                      value={fontSize}
                      onChange={(e) => setFontSize(parseInt(e.target.value))}
                      className="w-full accent-indigo-500"
                    />
                  </div>

                  {/* Custom Toggles */}
                  <div className="grid grid-cols-2 gap-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={uppercase}
                        onChange={(e) => setUppercase(e.target.checked)}
                        className="rounded border-slate-300 text-indigo-500 focus:ring-indigo-500"
                      />
                      <span className="text-xs font-bold text-slate-700 dark:text-slate-300">UPPERCASE ALL</span>
                    </label>

                    <div className="flex gap-2 items-center justify-end">
                      <input
                        type="color"
                        value={textColor}
                        onChange={(e) => setTextColor(e.target.value)}
                        className="w-6 h-6 border-0 rounded cursor-pointer p-0 bg-transparent"
                        title="Text Fill Color"
                      />
                      <input
                        type="color"
                        value={strokeColor}
                        onChange={(e) => setStrokeColor(e.target.value)}
                        className="w-6 h-6 border-0 rounded cursor-pointer p-0 bg-transparent"
                        title="Text Stroke Outline"
                      />
                    </div>
                  </div>
                </div>

                {/* Compile elements */}
                <button
                  type="button"
                  onClick={compileAndDownload}
                  disabled={isCompiling}
                  className="w-full flex items-center justify-center gap-2 py-4 bg-gradient-to-r from-indigo-500 to-indigo-600 text-white font-bold rounded-xl shadow-lg shadow-indigo-500/20 hover:from-indigo-600 hover:to-indigo-700 transition-all disabled:opacity-50"
                >
                  {isCompiling ? <RefreshCw className="animate-spin h-5 w-5" /> : <Download className="h-5 w-5" />}
                  {isCompiling ? 'Rendering meme context...' : 'Save Meme as JPG'}
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
