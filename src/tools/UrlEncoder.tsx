import { useState, useEffect } from 'react';
import { Copy, Link2, ArrowRightLeft } from 'lucide-react';
import { ToolLayout } from '../components/ToolLayout';

export function UrlEncoder() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  useEffect(() => {
    if (!input) {
      setOutput('');
      return;
    }
    setOutput(encodeURIComponent(input));
  }, [input]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
  };

  const seoContent = {
    h1: "Free Online URL Encoder",
    introduction: "Safely encode URLs and query strings to ensure proper transmission over the web. Convert spaces, symbols, and standard structural characters into RFC 3986 compliant formats.",
    whatItIs: "URL encoding (or percent-encoding) is a mechanism for safely transmitting text over HTTP. Characters that would normally act as structural boundaries in a URL (like ?, &, = or #) are replaced with a % followed by a hex representation.",
    whyItMatters: "If you append a raw string holding a symbol like '&' to a URL, the receiving server will misinterpret it as a variable separator rather than standard text data, causing catastrophic routing crashes.",
    useCases: [
      { title: "Query Parameters", description: "Safely format user inputs to be passed into GET requests." },
      { title: "Deep Linking", description: "Encode entire fallback URLs to be passed into authentication or redirect routers securely." }
    ],
    features: [
      { title: "Full RFC 3986 Compliance", description: "Ensures rigid encoding standards compatible with node routers, apache engines, and Nginx." },
      { title: "Instant Execution", description: "Converts massive data blocks immediately using client-centric computational processing." }
    ]
  };

  return (
    <ToolLayout 
      title="URL Encoder" 
      description="Safely encode URLs for parameters and requests."
      category="Developer Tools"
      icon={<Link2 className="h-8 w-8 text-indigo-400" />}
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
              onChange={(e) => setInput(e.target.value)}
              placeholder="Paste plain text here (e.g., Hello World)..."
              className="w-full h-80 p-4 font-mono text-sm bg-white dark:bg-white/[0.02] border border-slate-200 dark:border-white/10 rounded-xl text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500/50 resize-y"
            />
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                Output (Encoded String)
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
              placeholder="Encoded URL will appear here..."
              className="w-full h-80 p-4 font-mono text-sm bg-slate-50 dark:bg-[#020617]/50 border border-slate-200 dark:border-white/10 rounded-xl text-slate-900 dark:text-slate-300 resize-y focus:outline-none shadow-inner"
            />
          </div>
        </div>

      </div>
    </ToolLayout>
  );
}
