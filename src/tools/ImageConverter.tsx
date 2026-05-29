import { useState, useRef } from 'react';
import { Upload, FileImage, Download } from 'lucide-react';
import { ToolLayout } from '../components/ToolLayout';
import { GlobalDragDrop } from '../components/GlobalDragDrop';

export function ImageConverter() {
  const [image, setImage] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>('image');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  const handleImageFile = (file: File) => {
    setFileName(file.name.split('.')[0]);
    const reader = new FileReader();
    reader.onload = (event) => setImage(event.target?.result as string);
    reader.readAsDataURL(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleImageFile(file);
    }
  };

  const handleDrop = (files: File[]) => {
    if (files.length > 0) {
      handleImageFile(files[0]);
    }
  };

  const convertAndDownload = (format: 'png' | 'jpeg' | 'webp') => {
    if (!imgRef.current) return;
    
    const canvas = document.createElement('canvas');
    canvas.width = imgRef.current.naturalWidth;
    canvas.height = imgRef.current.naturalHeight;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    if (format === 'jpeg') {
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
    
    ctx.drawImage(imgRef.current, 0, 0);
    
    const dataUrl = canvas.toDataURL(`image/${format}`, 0.9);
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = `${fileName}-converted.${format}`;
    link.click();
  };

  const seoContent = {
    h1: "Free Online Image Converter",
    introduction: "Convert between popular image formats instantly. A fast, secure, browser-based tool for common image manipulations.",
    whatItIs: "An image converter that re-encodes images directly in your browser without uploading your photos to a server.",
    whyItMatters: "Privacy-focused image conversion ensures your data stays on your machine during format transformations.",
    useCases: [
      { title: "Format Standardization", description: "Convert legacy formats like BMP or TIFF to modern web formats like JPEG or PNG." }
    ],
    features: [
      { title: "Instant Conversion", description: "Processes images locally instantly." }
    ]
  };

  return (
    <ToolLayout 
      title="Image Converter" 
      description="Convert between popular image formats."
      category="Image Tools"
      icon={<FileImage className="h-8 w-8 text-indigo-400" />}
      seoContent={seoContent}
    >
      <GlobalDragDrop onDrop={handleDrop} accept="image/*" tip="Drop your image anywhere here to convert it">
        <div className="p-6 md:p-8">
          <div className="border-4 border-dashed border-slate-200 dark:border-white/10 rounded-2xl p-12 flex flex-col items-center justify-center text-center">
            <Upload className="h-12 w-12 text-slate-400 mb-4" />
            <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">Drag & Drop Image</h3>
            <p className="text-slate-500 dark:text-slate-400 mb-6">Or click to select an image from your computer.</p>
            <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/*" />
            <button 
              onClick={() => fileInputRef.current?.click()}
              className="px-6 py-3 bg-indigo-500 text-white font-bold rounded-xl shadow-lg shadow-indigo-500/20 hover:bg-indigo-600 transition-all cursor-pointer"
            >
              Select Image
            </button>
          </div>
          
          {image && (
            <div className="mt-8 p-6 bg-slate-50 dark:bg-[#020617]/50 rounded-xl border border-slate-200 dark:border-white/10">
              <h4 className="text-lg font-bold text-slate-800 dark:text-white mb-4">Preview</h4>
              <div className="flex justify-center mb-6 overflow-hidden rounded-lg bg-slate-200 dark:bg-slate-800 checkerboard-bg">
                  <img ref={imgRef} src={image} alt="Preview" className="max-w-full h-auto object-contain max-h-[500px]" />
              </div>
              <div className="flex flex-wrap gap-4">
                <button onClick={() => convertAndDownload('png')} className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-indigo-500 text-white font-bold rounded-xl shadow hover:bg-indigo-600 transition-all cursor-pointer">
                    <Download className="h-4 w-4" /> Download PNG
                </button>
                <button onClick={() => convertAndDownload('jpeg')} className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-indigo-500 text-white font-bold rounded-xl shadow hover:bg-indigo-600 transition-all cursor-pointer">
                    <Download className="h-4 w-4" /> Download JPG
                </button>
                <button onClick={() => convertAndDownload('webp')} className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-indigo-500 text-white font-bold rounded-xl shadow hover:bg-indigo-600 transition-all cursor-pointer">
                    <Download className="h-4 w-4" /> Download WEBP
                </button>
              </div>
            </div>
          )}
        </div>
      </GlobalDragDrop>
    </ToolLayout>
  );
}
