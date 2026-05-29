import { useState } from 'react';
import { Copy, FileCode, RotateCcw } from 'lucide-react';
import { ToolLayout } from '../components/ToolLayout';
import { html as beautifyHtml } from 'js-beautify';

export function HtmlFormatter() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  const formatHTML = () => {
    try {
      const formatted = beautifyHtml(input, {
        indent_size: 2,
        indent_char: ' ',
        max_preserve_newlines: 2,
        preserve_newlines: true,
        keep_array_indentation: false,
        break_chained_methods: false,
        indent_scripts: 'normal',
        brace_style: 'collapse',
        space_before_conditional: true,
        unescape_strings: false,
        jslint_happy: false,
        end_with_newline: false,
        split_lines: false,
        wrap_line_length: 0,
        no_preserve_newlines: false,
        advanced: true,
      });
      setOutput(formatted);
    } catch (e) {
      setOutput('Error: Invalid HTML formatting. Please check your syntax.');
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
  };

  const seoContent = {
    h1: "Free Online HTML Formatter & Beautifier",
    introduction: "Instantly beautify, unminify, and clean up messy HTML code. A fast, strict, and secure utility for web developers.",
    whatItIs: "An HTML formatter restructures unformatted, minified, or disorganized HTML code into a cleanly indented, human-readable hierarchy.",
    whyItMatters: "Messy, unindented HTML makes debugging UI issues and CSS styling extremely difficult. Proper indentation ensures structural integrity and team-wide consistency.",
    useCases: [
      { title: "Cleaning Scraping Results", description: "Format raw DOM strings extracted from scraping utilities." },
      { title: "Debugging UI", description: "Visualize tangled nested HTML structures easily." }
    ],
    features: [
      { title: "Instant Beautification", description: "Processes complex DOM structures in milliseconds within your browser." }
    ]
  };

  return (
    <ToolLayout 
      title="HTML Formatter" 
      description="Format and beautify your HTML code."
      category="Developer Tools"
      icon={<FileCode className="h-8 w-8 text-indigo-400" />}
      seoContent={seoContent}
    >
      <div className="p-6 md:p-8">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Paste raw HTML here..."
          className="w-full h-64 p-4 font-mono text-sm bg-white dark:bg-white/[0.02] border border-slate-200 dark:border-white/10 rounded-xl text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500/50 resize-y mb-6"
        />
        
        <div className="flex gap-4 mb-6">
          <button 
            onClick={formatHTML}
            className="px-6 py-3 bg-indigo-500 text-white font-bold rounded-xl shadow-lg shadow-indigo-500/20 hover:bg-indigo-600 transition-all flex items-center gap-2"
          >
            Format HTML
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
               Formatted HTML
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
