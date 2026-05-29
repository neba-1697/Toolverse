import { useState } from 'react';
import { Copy, FileCode2, RotateCcw } from 'lucide-react';
import { ToolLayout } from '../components/ToolLayout';
import CleanCSS from 'clean-css';

export function CssMinifier() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  const minifyCSS = () => {
    const minifier = new CleanCSS({});
    const output = minifier.minify(input);
    if (output.errors.length > 0) {
      setOutput('Error: Could not minify CSS. ' + output.errors.join(', '));
    } else {
      setOutput(output.styles);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
  };

  const seoContent = {
    h1: "Free Online CSS Minifier",
    introduction: "Minify your CSS stylesheets for faster web performance. A fast, strict, and secure utility for web developers.",
    whatItIs: "CSS minification removes unnecessary whitespace, comments, and line breaks from stylesheets, reducing file size and improving load times.",
    whyItMatters: "Smaller CSS files mean faster page downloads, especially on mobile networks, enhancing Core Web Vitals and user experience.",
    useCases: [
      { title: "Production Deployment", description: "Prepare stylesheets for deployment to production servers." }
    ],
    features: [
      { title: "Instant Minification", description: "Processes large stylesheets in milliseconds." }
    ]
  };

  return (
    <ToolLayout 
      title="CSS Minifier" 
      description="Minify your CSS code."
      category="Developer Tools"
      icon={<FileCode2 className="h-8 w-8 text-indigo-400" />}
      seoContent={seoContent}
    >
      <div className="p-6 md:p-8">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Paste CSS here..."
          className="w-full h-64 p-4 font-mono text-sm bg-white dark:bg-white/[0.02] border border-slate-200 dark:border-white/10 rounded-xl text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500/50 resize-y mb-6"
        />
        
        <div className="flex gap-4 mb-6">
          <button 
            onClick={minifyCSS}
            className="px-6 py-3 bg-indigo-500 text-white font-bold rounded-xl shadow-lg shadow-indigo-500/20 hover:bg-indigo-600 transition-all flex items-center gap-2"
          >
            Minify CSS
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
               Minified CSS
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
