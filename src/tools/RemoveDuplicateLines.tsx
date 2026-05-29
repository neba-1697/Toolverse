import { useState } from 'react';
import { Copy, ListMinus, RotateCcw } from 'lucide-react';
import { ToolLayout } from '../components/ToolLayout';

export function RemoveDuplicateLines() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [metrics, setMetrics] = useState({ removed: 0, original: 0, final: 0 });

  const processLines = (text: string) => {
    const lines = text.split('\n');
    const uniqueLines = [...new Set(lines)];
    
    setMetrics({
      original: lines.length > 0 && text ? lines.length : 0,
      final: uniqueLines.length > 0 && uniqueLines[0] !== "" ? uniqueLines.length : 0,
      removed: text ? lines.length - uniqueLines.length : 0
    });
    
    setOutput(uniqueLines.join('\n'));
  };

  const handleInput = (val: string) => {
    setInput(val);
    processLines(val);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
  };

  const seoContent = {
    h1: "Remove Duplicate Lines - Free Formatting Tool",
    introduction: "Clean up massive lists by automatically finding and removing duplicate lines of text in a split second. Fast, free, and operates securely in your browser.",
    whatItIs: "This tool takes a raw body of text, interprets each line break as an individual array item, and uses a Set algorithm to strip out any identical matches. It preserves the exact order of the original list while ensuring absolute uniqueness.",
    whyItMatters: "Data normalization is a tedious process. When compiling email lists, joining datasets, or extracting server logs, duplicate entries inflate file sizes and ruin data accuracy. Removing duplicates programmatically saves massive amounts of time.",
    useCases: [
      { title: "Email Marketing", description: "Paste a massive list of comma or line-separated email addresses to ensure no user receives your outreach template twice." },
      { title: "Log Analysis", description: "Filter out repetitive error logs to find unique event signatures in development environments." }
    ],
    features: [
      { title: "Order Preservation", description: "Unique lines remain in the exact order they were originally pasted." },
      { title: "Real-Time Tracking", description: "Watch the dashboard immediately calculate exactly how many duplicates were detected and purged." }
    ]
  };

  return (
    <ToolLayout 
      title="Remove Duplicate Lines" 
      description="Quickly trace and remove text duplicates."
      category="Text Tools"
      icon={<ListMinus className="h-8 w-8 text-indigo-400" />}
      seoContent={seoContent}
    >
      <div className="p-6 md:p-8">
        
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="p-4 rounded-xl bg-white dark:bg-white/[0.02] border border-slate-200 dark:border-white/10 flex flex-col items-center justify-center text-center shadow-sm">
            <span className="text-3xl font-bold text-slate-900 dark:text-white mb-1">{metrics.original}</span>
            <span className="text-[10px] uppercase tracking-widest text-slate-600 dark:text-slate-400 font-semibold">Original Lines</span>
          </div>
          <div className="p-4 rounded-xl relative overflow-hidden bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-200 dark:border-indigo-500/20 flex flex-col items-center justify-center text-center shadow-sm">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-transparent pointer-events-none"></div>
            <span className="text-3xl font-bold text-indigo-600 dark:text-indigo-400 mb-1">{metrics.removed}</span>
            <span className="text-[10px] uppercase tracking-widest text-indigo-600 dark:text-indigo-400 font-semibold">Duplicates Removed</span>
          </div>
          <div className="p-4 rounded-xl bg-white dark:bg-white/[0.02] border border-slate-200 dark:border-white/10 flex flex-col items-center justify-center text-center shadow-sm">
            <span className="text-3xl font-bold text-slate-900 dark:text-white mb-1">{metrics.final}</span>
            <span className="text-[10px] uppercase tracking-widest text-slate-600 dark:text-slate-400 font-semibold">Final Lines</span>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
              Original List
            </label>
            <textarea
              value={input}
              onChange={(e) => handleInput(e.target.value)}
              placeholder="Paste your source list here..."
              className="w-full h-80 p-4 font-mono text-sm bg-white dark:bg-white/[0.02] border border-slate-200 dark:border-white/10 rounded-xl text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500/50 resize-none whitespace-pre"
            />
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                Cleaned List
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
              placeholder="Cleaned list will appear here..."
              className="w-full h-80 p-4 font-mono text-sm bg-slate-50 dark:bg-[#020617]/50 border border-slate-200 dark:border-white/10 rounded-xl text-slate-900 dark:text-slate-300 resize-none whitespace-pre outline-none shadow-inner"
            />
          </div>
        </div>
        
        <div className="mt-6 flex items-center justify-between">
           <button 
              onClick={() => handleInput('')}
              className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-slate-500 hover:text-slate-800 dark:hover:text-white transition-colors"
            >
              <RotateCcw className="h-4 w-4" /> Clear All
            </button>
            <button 
              onClick={copyToClipboard}
              className="px-6 py-3 bg-indigo-500 text-white font-bold rounded-xl shadow-lg shadow-indigo-500/20 hover:bg-indigo-600 transition-all flex items-center gap-2"
            >
              <Copy className="h-5 w-5" /> Copy Result
            </button>
        </div>

      </div>
    </ToolLayout>
  );
}
