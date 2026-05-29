import { useState, useEffect } from 'react';
import { Copy, FileKey2, ArrowRightLeft } from 'lucide-react';
import { ToolLayout } from '../components/ToolLayout';

export function Base64Decoder() {
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
      setOutput(decodeURIComponent(escape(atob(input))));
    } catch (err) {
      setError('Invalid Base64 input string.');
      setOutput('');
    }
  }, [input]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
  };

  const seoContent = {
    h1: "Free Online Base64 Decoder",
    introduction: "Instantly decode Base64 strings back into human-readable plain text format safely within your browser.",
    whatItIs: "Base64 decoding reverses the process of converting ASCII text or binary data from radix-64 representation back into its original standard text structure.",
    whyItMatters: "Developers frequently encounter Base64 encoded strings in email headers, data URIs, or JSON Web Tokens. Decoding these strings is necessary to read payloads, analyze data or debug network transfers.",
    useCases: [
      { title: "Debugging Data URIs", description: "Decode inline CSS/HTML image sources to verify payload content." },
      { title: "View Encoded Web Tokens", description: "Decode the content of standard base64 structures to evaluate contained claims." }
    ],
    features: [
      { title: "Fast Decoding", description: "Uses native browser APIs to securely transform the text instantly." },
      { title: "Error Trapping", description: "Flags non-compliant Base64 strings to help you troubleshoot your pipelines." }
    ]
  };

  return (
    <ToolLayout 
      title="Base64 Decoder" 
      description="Decode Base64 encoded data back to text."
      category="Developer Tools"
      icon={<FileKey2 className="h-8 w-8 text-indigo-400" />}
      seoContent={seoContent}
    >
      <div className="p-6 md:p-8">
        
        <div className="grid lg:grid-cols-2 gap-6 relative">
          <div className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-[#020617] border border-slate-200 dark:border-white/10 p-2 rounded-full z-10 text-slate-400">
             <ArrowRightLeft className="h-5 w-5" />
          </div>
          
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
              Input (Base64 String)
            </label>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Paste Base64 encoded string here..."
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
                className="w-full h-80 p-4 font-mono text-sm bg-slate-50 dark:bg-[#020617]/50 border border-slate-200 dark:border-white/10 rounded-xl text-slate-900 dark:text-slate-300 resize-y focus:outline-none shadow-inner"
              />
            )}
          </div>
        </div>

      </div>
    </ToolLayout>
  );
}
