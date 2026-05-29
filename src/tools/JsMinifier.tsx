import { useState } from 'react';
import { Copy, Braces, RotateCcw } from 'lucide-react';
import { ToolLayout } from '../components/ToolLayout';
import { minify } from 'terser';

export function JsMinifier() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  const minifyJS = async () => {
    try {
      const result = await minify(input);
      setOutput(result.code || '');
    } catch (e) {
      setOutput('Error: Could not minify JS. Please check your syntax.');
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
  };

  const seoContent = {
    h1: "Free Online JavaScript Minifier",
    introduction: "Minify your JavaScript code for production. Reduce file size to improve website load times.",
    whatItIs: "JS minification removes unnecessary characters like comments, whitespace, and newlines from your JavaScript files.",
    whyItMatters: "Smaller JS files transmit faster to the client, leading to a snappier website and improved performance rankings.",
    useCases: [
      { title: "Production Build", description: "Minify code before shipping to production environments." }
    ],
    features: [
      { title: "Fast Processing", description: "Instant feedback on your minified JS." }
    ]
  };

  return (
    <ToolLayout 
      title="JavaScript Minifier" 
      description="Minify your JS code."
      category="Developer Tools"
      icon={<Braces className="h-8 w-8 text-indigo-400" />}
      seoContent={seoContent}
    >
      <div className="p-6 md:p-8">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Paste JS here..."
          className="w-full h-64 p-4 font-mono text-sm bg-white dark:bg-white/[0.02] border border-slate-200 dark:border-white/10 rounded-xl text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500/50 resize-y mb-6"
        />
        
        <div className="flex gap-4 mb-6">
          <button 
            onClick={minifyJS}
            className="px-6 py-3 bg-indigo-500 text-white font-bold rounded-xl shadow-lg shadow-indigo-500/20 hover:bg-indigo-600 transition-all flex items-center gap-2"
          >
            Minify JS
          </button>
          <button 
            onClick={() => { setInput(''); setOutput(''); }}
            className="px-6 py-3 bg-white dark:bg-white/[0.05] border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 font-bold rounded-xl hover:bg-slate-100 dark:hover:bg-white/[0.1] transition-all flex items-center gap-2"
          >
            <RotateCcw className="h-4 w-4" /> Clear
          </button>
        </div>

        <div className="flex flex-col gap-2">
           <div className="flex justify-between items-center">
             <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
               Minified JS
             </label>
             {output && (
               <button 
                 onClick={copyToClipboard}
                 className="text-xs flex items-center gap-1 text-indigo-500 hover:text-indigo-600 dark:text-indigo-400 font-semibold"
               >
                 <Copy className="h-3 w-3" /> Copy
               </button>
             )}
           </div>
           <textarea
             readOnly
             value={output}
             className="w-full h-80 p-4 font-mono text-sm bg-slate-50 dark:bg-[#020617]/50 border border-slate-200 dark:border-white/10 rounded-xl text-slate-900 dark:text-slate-300 resize-y focus:outline-none shadow-inner"
           />
        </div>
      </div>
    </ToolLayout>
  );
}
