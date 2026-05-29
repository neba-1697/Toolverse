import { useState, useEffect } from 'react';
import { Copy, Link2Off, ArrowRightLeft } from 'lucide-react';
import { ToolLayout } from '../components/ToolLayout';

export function UrlDecoder() {
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
      setOutput(decodeURIComponent(input.replace(/\+/g, ' ')));
    } catch (err) {
      setError('Invalid URL-encoded string.');
      setOutput('');
    }
  }, [input]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
  };

  const seoContent = {
    h1: "Free Online URL Decoder",
    introduction: "Instantly decode URL-encoded text and parameters back into a readable format. A secure, client-side utility for developers.",
    whatItIs: "URL decoding (or percent-decoding) replaces URL-encoded characters (like %20 or %3D) back with their original ASCII equivalents. It allows encoded queries to be read plainly.",
    whyItMatters: "When reading analytics logs, tracking data, or deep linking structures, parameters are frequently heavily encoded. Decoding them is necessary to troubleshoot routing problems or inspect transferred data payloads securely.",
    useCases: [
      { title: "Query Inspection", description: "Convert complex UTM parameter strings into highly readable configuration arrays." },
      { title: "Network Troubleshooting", description: "Decode API routing variables from failing application requests." }
    ],
    features: [
      { title: "Plus Sign Support", description: "Properly decodes the + character to spaces according to standard specifications." },
      { title: "Zero Logging", description: "Your requests and decoded strings never leave your browser for absolute privacy." }
    ]
  };

  return (
    <ToolLayout 
      title="URL Decoder" 
      description="Decode URL-encoded strings back to standard text."
      category="Developer Tools"
      icon={<Link2Off className="h-8 w-8 text-indigo-400" />}
      seoContent={seoContent}
    >
      <div className="p-6 md:p-8">
        
        <div className="grid lg:grid-cols-2 gap-6 relative">
          <div className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-[#020617] border border-slate-200 dark:border-white/10 p-2 rounded-full z-10 text-slate-400">
             <ArrowRightLeft className="h-5 w-5" />
          </div>
          
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
              Input (Encoded String)
            </label>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Paste URL-encoded string here (e.g., Hello%20World)..."
              className="w-full h-80 p-4 font-mono text-sm bg-white dark:bg-white/[0.02] border border-slate-200 dark:border-white/10 rounded-xl text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500/50 resize-y"
            />
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                Output (Decoded Text)
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
                className="w-full h-80 p-4 font-mono text-sm bg-slate-50 dark:bg-[#020617]/50 border border-slate-200 dark:border-white/10 rounded-xl text-slate-900 dark:text-slate-300 resize-y focus:outline-none shadow-inner"
              />
            )}
          </div>
        </div>

      </div>
    </ToolLayout>
  );
}
