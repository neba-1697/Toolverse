import { useState, useEffect } from 'react';
import { Copy, FileLock2, ArrowRightLeft } from 'lucide-react';
import { ToolLayout } from '../components/ToolLayout';

export function Base64Encoder() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const [error, setError] = useState('');

  useEffect(() => {
    setError('');
    if (!input) {
      setOutput('');
      return;
    }
    try {
      if (mode === 'encode') {
        setOutput(btoa(unescape(encodeURIComponent(input))));
      } else {
        setOutput(decodeURIComponent(escape(atob(input))));
      }
    } catch (err) {
      setError('Invalid input for selected operation.');
      setOutput('');
    }
  }, [input, mode]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
  };

  const seoContent = {
    h1: "Free Online Base64 Encoder & Decoder",
    introduction: "Encode text into Base64 format or decode Base64 strings back to plain text. A fast, strict, and secure utility for developers.",
    whatItIs: "Base64 is an encoding scheme that converts binary data (or plain text) into a printable ASCII string format. It translates data into a radix-64 representation.",
    whyItMatters: "Base64 is essential for safely transmitting data over text-based protocols (like HTTP or SMTP) without data corruption. It's heavily used for inline image embedding in CSS (data URIs), encoding JSON Web Tokens (JWTs), and basic HTTP authentication headers.",
    useCases: [
      { title: "HTML/CSS Embedded Images", description: "Convert an SVG or image text block into Base64 to serve it directly in an HTML document." },
      { title: "Basic Authentication", description: "Easily encode 'username:password' strings required for standard HTTP Authorization headers." }
    ],
    features: [
      { title: "UTF-8 Support", description: "Correctly handles Unicode characters by utilizing safe URL encoding before Base64 processing." },
      { title: "Zero Data Logging", description: "All encoding is calculated mathematically in-browser via native APIs." }
    ]
  };

  return (
    <ToolLayout 
      title="Base64 Encoder / Decoder" 
      description="Encode and decode strings into safely transmittable Base64."
      category="Developer Tools"
      icon={<FileLock2 className="h-8 w-8 text-indigo-400" />}
      seoContent={seoContent}
    >
      <div className="p-6 md:p-8">
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setMode('encode')}
            className={`px-4 py-2 font-semibold text-sm rounded-lg transition-all ${mode === 'encode' ? 'bg-indigo-500 text-white shadow-lg' : 'bg-slate-100 dark:bg-white/[0.03] text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-white/10 hover:bg-slate-200 dark:hover:bg-white/[0.08]'}`}
          >
            Encode
          </button>
          <button
            onClick={() => setMode('decode')}
            className={`px-4 py-2 font-semibold text-sm rounded-lg transition-all ${mode === 'decode' ? 'bg-indigo-500 text-white shadow-lg' : 'bg-slate-100 dark:bg-white/[0.03] text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-white/10 hover:bg-slate-200 dark:hover:bg-white/[0.08]'}`}
          >
            Decode
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-6 relative">
          <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-[#020617] border border-slate-200 dark:border-white/10 p-2 rounded-full z-10 text-slate-400">
             <ArrowRightLeft className="h-5 w-5" />
          </div>
          
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-slate-600 dark:text-slate-300">
              Input {mode === 'encode' ? '(Plain Text)' : '(Base64 String)'}
            </label>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={`Enter ${mode === 'encode' ? 'plain text' : 'Base64 string'}...`}
              className="w-full h-64 p-4 font-mono text-sm bg-white dark:bg-[#020617]/50 border border-slate-200 dark:border-white/10 rounded-xl text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500/50 resize-y"
            />
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <label className="text-sm font-semibold text-slate-600 dark:text-slate-300">
                Output {mode === 'encode' ? '(Base64 String)' : '(Plain Text)'}
              </label>
              {output && (
                <button 
                  onClick={copyToClipboard}
                  className="text-xs flex items-center gap-1 text-indigo-500 hover:text-indigo-600 dark:text-indigo-400 dark:hover:text-indigo-300 font-semibold transition-colors"
                >
                  <Copy className="h-3 w-3" /> Copy
                </button>
              )}
            </div>
            {error ? (
              <div className="w-full h-64 p-4 font-mono text-sm border border-red-500/50 bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 rounded-xl flex items-center justify-center">
                {error}
              </div>
            ) : (
              <textarea
                readOnly
                value={output}
                placeholder="Result will appear here..."
                className="w-full h-64 p-4 font-mono text-sm bg-slate-50 dark:bg-[#020617]/80 border border-slate-200 dark:border-white/10 rounded-xl text-slate-900 dark:text-slate-300 resize-y focus:outline-none"
              />
            )}
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
