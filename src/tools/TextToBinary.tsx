import { useState } from 'react';
import { Copy, Binary, ArrowRightLeft } from 'lucide-react';
import { ToolLayout } from '../components/ToolLayout';

export function TextToBinary() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  const convertToBinary = (text: string) => {
    return text.split('').map(char => {
      return char.charCodeAt(0).toString(2).padStart(8, '0');
    }).join(' ');
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    setInput(val);
    setOutput(convertToBinary(val));
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
  };

  const seoContent = {
    h1: "Free Online Text to Binary Converter",
    introduction: "Convert plain text into binary code instantly. A fast, browser-based tool for developers and students.",
    whatItIs: "This tool takes standard ASCII or UTF-8 text and converts characters into their corresponding 8-bit binary strings (1s and 0s).",
    whyItMatters: "Understanding binary is fundamental to computer science. This tool helps visualize how standard characters are stored in memory.",
    useCases: [
      { title: "Education", description: "Learn how character encoding works in low-level programming." },
      { title: "Encoding", description: "Convert simple messages into binary format." }
    ],
    features: [
      { title: "Real-time Conversion", description: "Types as you type, instantly processing the conversion." }
    ]
  };

  return (
    <ToolLayout 
      title="Text to Binary" 
      description="Convert text strings into binary code."
      category="Text Tools"
      icon={<Binary className="h-8 w-8 text-indigo-400" />}
      seoContent={seoContent}
    >
      <div className="p-6 md:p-8">
        
        <div className="grid lg:grid-cols-2 gap-6 relative">
          <div className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-[#020617] border border-slate-200 dark:border-white/10 p-2 rounded-full z-10 text-slate-400">
             <ArrowRightLeft className="h-5 w-5" />
          </div>
          
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
              Input (Plain Text)
            </label>
            <textarea
              value={input}
              onChange={handleChange}
              placeholder="Type your text here..."
              className="w-full h-80 p-4 text-sm bg-white dark:bg-white/[0.02] border border-slate-200 dark:border-white/10 rounded-xl text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500/50 resize-y"
            />
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                Output (Binary String)
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
              placeholder="Binary output will appear here..."
              className="w-full h-80 p-4 font-mono text-sm bg-slate-50 dark:bg-[#020617]/50 border border-slate-200 dark:border-white/10 rounded-xl text-slate-900 dark:text-slate-300 resize-y focus:outline-none shadow-inner"
            />
          </div>
        </div>

      </div>
    </ToolLayout>
  );
}
