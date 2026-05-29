import { useState } from 'react';
import { Copy, RefreshCcw, RotateCcw } from 'lucide-react';
import { ToolLayout } from '../components/ToolLayout';

export function ReverseText() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  const reverseText = (text: string) => {
    return text.split('').reverse().join('');
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    setInput(val);
    setOutput(reverseText(val));
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
  };
  
  const handleClear = () => {
    setInput('');
    setOutput('');
  };

  const seoContent = {
    h1: "Free Online Reverse Text Generator",
    introduction: "Reverse text strings, phrases, and paragraphs backward in an instant. A simple tool for reversing character order.",
    whatItIs: "This tool takes a standard input string and flips the character sequence backward, so the last character becomes the first.",
    whyItMatters: "While mostly a novelty, reversing strings is a common programming interview question and can be used to generate rudimentary obfuscation.",
    useCases: [
      { title: "Social Media", description: "Create backward text for fun posts." }
    ],
    features: [
      { title: "Preserves Spacing", description: "Spaces and newlines are reversed cleanly with the characters." }
    ]
  };

  return (
    <ToolLayout 
      title="Reverse Text" 
      description="Reverse text backwards."
      category="Text Tools"
      icon={<RefreshCcw className="h-8 w-8 text-indigo-400" />}
      seoContent={seoContent}
    >
      <div className="p-6 md:p-8">
        
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
              Input Text
            </label>
            <textarea
              value={input}
              onChange={handleChange}
              placeholder="Enter text to reverse..."
              className="w-full h-48 p-4 text-sm bg-white dark:bg-white/[0.02] border border-slate-200 dark:border-white/10 rounded-xl text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500/50 resize-y"
            />
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                Reversed Text
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
              placeholder="Reversed output..."
              className="w-full h-48 p-4 text-sm bg-slate-50 dark:bg-[#020617]/50 border border-slate-200 dark:border-white/10 rounded-xl text-slate-900 dark:text-slate-300 resize-y focus:outline-none shadow-inner text-right"
            />
          </div>
        </div>

        <div className="flex items-center justify-between mt-8">
          <button 
            onClick={handleClear}
            className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-slate-500 hover:text-slate-800 dark:hover:text-white transition-colors"
          >
            <RotateCcw className="h-4 w-4" /> Clear
          </button>
          
          <button 
            onClick={copyToClipboard}
            className="px-5 py-2.5 text-sm font-semibold bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-all shadow-lg shadow-indigo-500/20 flex items-center gap-2"
          >
            <Copy className="h-4 w-4" /> Copy Text
          </button>
        </div>

      </div>
    </ToolLayout>
  );
}
