import { useState, useCallback, useEffect } from 'react';
import { Copy, Palette } from 'lucide-react';
import { ToolLayout } from '../components/ToolLayout';

export function ColorPicker() {
  const [hex, setHex] = useState('#6366f1');
  const [rgb, setRgb] = useState('rgb(99, 102, 241)');
  const [hsl, setHsl] = useState('hsl(239, 84%, 67%)');

  const hexToRgb = (hexStr: string) => {
    let r = 0, g = 0, b = 0;
    if (hexStr.length === 4) {
      r = parseInt(hexStr[1] + hexStr[1], 16);
      g = parseInt(hexStr[2] + hexStr[2], 16);
      b = parseInt(hexStr[3] + hexStr[3], 16);
    } else if (hexStr.length === 7) {
      r = parseInt(hexStr.slice(1, 3), 16);
      g = parseInt(hexStr.slice(3, 5), 16);
      b = parseInt(hexStr.slice(5, 7), 16);
    }
    return { r, g, b };
  };

  const rgbToHsl = (r: number, g: number, b: number) => {
    r /= 255; g /= 255; b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
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
    return { 
      h: Math.round(h * 360), 
      s: Math.round(s * 100), 
      l: Math.round(l * 100) 
    };
  };

  const handleColorChange = useCallback((newHex: string) => {
    setHex(newHex);
    try {
      const rgbVals = hexToRgb(newHex);
      setRgb(`rgb(${rgbVals.r}, ${rgbVals.g}, ${rgbVals.b})`);
      
      const hslVals = rgbToHsl(rgbVals.r, rgbVals.g, rgbVals.b);
      setHsl(`hsl(${hslVals.h}, ${hslVals.s}%, ${hslVals.l}%)`);
    } catch (e) {
      // Ignored for invalid inputs while typing
    }
  }, []);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const seoContent = {
    h1: "Free Online Color Picker & Converter",
    introduction: "Select colors visually and instantly convert them between HEX, RGB, and HSL formats for web development and design.",
    whatItIs: "A visual color extraction tool that translates digital color values across the three most dominant CSS color models.",
    whyItMatters: "Different frameworks require different formats. React Native often requires HEX, standard CSS handles RGB and HSL nicely, and designers use HSL for creating shade palettes by simply adjusting the lightness channel.",
    useCases: [
      { title: "Design Systems", description: "Standardize your brand colors across different stylesheets and language targets." }
    ],
    features: [
      { title: "Native System Integration", description: "Uses your operating system's native color picking interface for maximum precision." }
    ]
  };

  return (
    <ToolLayout 
      title="Color Picker" 
      description="Select and convert colors between formats."
      category="Developer Tools"
      icon={<Palette className="h-8 w-8 text-indigo-400" />}
      seoContent={seoContent}
    >
      <div className="p-6 md:p-8">
        
        <div className="flex flex-col md:flex-row gap-8 mb-8 items-center justify-center p-8 bg-slate-50 dark:bg-[#020617]/50 rounded-2xl border border-slate-200 dark:border-white/10 shadow-inner">
          <div className="w-32 h-32 md:w-48 md:h-48 rounded-full shadow-2xl relative border-4 border-white dark:border-slate-800" style={{ backgroundColor: hex }}>
            <input 
              type="color" 
              value={hex} 
              onChange={(e) => handleColorChange(e.target.value)}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
          </div>
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">Selected Color</h2>
            <p className="text-slate-500 dark:text-slate-400 mb-6 max-w-xs">
               Click the circle to open your system's advanced color picker.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <ColorFormatBox label="HEX" value={hex} onCopy={() => copyToClipboard(hex)} onChange={(e) => handleColorChange(e.target.value)} />
          <ColorFormatBox label="RGB" value={rgb} onCopy={() => copyToClipboard(rgb)} readOnly />
          <ColorFormatBox label="HSL" value={hsl} onCopy={() => copyToClipboard(hsl)} readOnly />
        </div>

      </div>
    </ToolLayout>
  );
}

function ColorFormatBox({ label, value, onCopy, onChange, readOnly }: { label: string, value: string, onCopy: () => void, onChange?: (e: any) => void, readOnly?: boolean }) {
  return (
    <div className="bg-white dark:bg-white/[0.02] border border-slate-200 dark:border-white/10 p-5 rounded-xl shadow-sm">
      <div className="flex justify-between items-center mb-3">
        <span className="text-sm font-bold text-slate-600 dark:text-slate-400">{label}</span>
        <button 
          onClick={onCopy}
          className="text-indigo-500 hover:text-indigo-600 dark:text-indigo-400 p-1 rounded-md transition-colors"
          title="Copy"
        >
           <Copy className="h-4 w-4" />
        </button>
      </div>
      <input 
        type="text" 
        value={value} 
        onChange={onChange}
        readOnly={readOnly}
        className="w-full bg-transparent font-mono text-lg text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-indigo-500/50 rounded-md py-1"
      />
    </div>
  );
}
