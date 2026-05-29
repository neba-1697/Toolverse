import { useState, useEffect } from 'react';
import { Copy, FileDigit, ArrowRightLeft } from 'lucide-react';
import { ToolLayout } from '../components/ToolLayout';

export function BinaryToText() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    setError('');
    if (!input) {
      setOutput('');
      return;
    }
    
    try {
      const cleanInput = input.replace(/[^01\s]/g, '').trim();
      if (!cleanInput) {
        setOutput('');
        return;
      }

      const bytes = cleanInput.split(/\s+/);
      const text = bytes.map(byte => {
        if (byte.length > 8) throw new Error('Invalid byte length');
        return String.fromCharCode(parseInt(byte, 2));
      }).join('');
      
      setOutput(text);
    } catch (err) {
      setError('Invalid binary sequence. Please ensure blocks are 8 bits separated by spaces.');
      setOutput('');
    }
  }, [input]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
  };

  const seoContent = {
    h1: "Free Online Binary to Text Converter",
    introduction: "Convert binary code blocks back into human-readable text. Fast, strict decoding within your browser.",
    whatItIs: "This tool decodes space-separated 8-bit binary strings (1s and 0s) back into standard ASCII text characters.",
    whyItMatters: "Decoding binary sequences is useful when debugging systems or learning about character encoding schemes under the hood.",
    useCases: [
      { title: "Decoding", description: "Quickly convert raw binary dumps into readable ASCII strings." }
    ],
    features: [
      { title: "Error Checking", description: "Safely traps poorly formatted sequences and ignores formatting characters." }
    ]
  };

  return (
    <ToolLayout 
      title="Binary to Text" 
      description="Decode binary code into readable text."
      category="Text Tools"
      icon={<FileDigit className="h-8 w-8 text-indigo-400" />}
      seoContent={seoContent}
    >
      <div className="p-6 md:p-8">
        
        <div className="grid lg:grid-cols-2 gap-6 relative">
          <div className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-[#020617] border border-slate-200 dark:border-white/10 p-2 rounded-full z-10 text-slate-400">
             <ArrowRightLeft className="h-5 w-5" />
          </div>
          
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
              Input (Binary String)
            </label>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="01001000 01100101 01101100 01101100 01101111..."
              className="w-full h-80 p-4 font-mono text-sm bg-white dark:bg-white/[0.02] border border-slate-200 dark:border-white/10 rounded-xl text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500/50 resize-y"
            />
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                Output (Plain Text)
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
            {error ? (
              <div className="w-full h-80 p-4 font-mono text-sm border border-red-500/50 bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 rounded-xl flex items-center justify-center">
                {error}
              </div>
            ) : (
              <textarea
                readOnly
                value={output}
                placeholder="Decoded text will appear here..."
                className="w-full h-80 p-4 text-sm bg-slate-50 dark:bg-[#020617]/50 border border-slate-200 dark:border-white/10 rounded-xl text-slate-900 dark:text-slate-300 resize-y focus:outline-none shadow-inner"
              />
            )}
          </div>
        </div>

      </div>
    </ToolLayout>
  );
}
