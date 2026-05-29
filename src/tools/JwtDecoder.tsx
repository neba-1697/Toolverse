import { useState, useEffect } from 'react';
import { Copy, KeySquare, ShieldAlert, ShieldCheck } from 'lucide-react';
import { ToolLayout } from '../components/ToolLayout';

export function JwtDecoder() {
  const [input, setInput] = useState('');
  const [header, setHeader] = useState('');
  const [payload, setPayload] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    setError('');
    const parts = input.split('.');
    
    if (!input) {
      setHeader('');
      setPayload('');
      return;
    }

    if (parts.length !== 3) {
      setError('Invalid JWT structure. A JWT must have exactly 3 parts separated by dots.');
      setHeader('');
      setPayload('');
      return;
    }

    try {
      // Decode Header
      const decodedHeader = decodeURIComponent(escape(atob(parts[0])));
      setHeader(JSON.stringify(JSON.parse(decodedHeader), null, 2));

      // Decode Payload
      const decodedPayload = decodeURIComponent(escape(atob(parts[1].replace(/-/g, '+').replace(/_/g, '/'))));
      setPayload(JSON.stringify(JSON.parse(decodedPayload), null, 2));
    } catch (err) {
      setError('Failed to parse JWT segments. They may not be valid Base64-encoded JSON.');
      setHeader('');
      setPayload('');
    }

  }, [input]);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const seoContent = {
    h1: "Free Online JWT Decoder",
    introduction: "Decode JSON Web Tokens instantly to inspect their headers, payloads, and claims without sending any data to a server.",
    whatItIs: "JSON Web Tokens (JWTs) are an open standard for securely transmitting information between parties as a JSON object. This tool decodes the public payload sections of the token.",
    whyItMatters: "When building authentication systems, you often need to inspect the contents of a session token to verify user IDs, expiration times, or roles. Our decoder unwraps the Base64 safely in your browser.",
    useCases: [
      { title: "Debugging OAuth", description: "Verify the claims returned by Google, Auth0, or Firebase authentication." },
      { title: "Role Inspection", description: "Decode access tokens to see what permissions are structurally granted to a user." }
    ],
    features: [
      { title: "Strict Local Processing", description: "We do not transmit your tokens or verify signatures. All decoding is processed via local client-side Javascript." }
    ]
  };

  return (
    <ToolLayout 
      title="JWT Decoder" 
      description="Safely decode JSON Web Tokens and inspect their claims."
      category="Developer Tools"
      icon={<KeySquare className="h-8 w-8 text-indigo-400" />}
      seoContent={seoContent}
    >
      <div className="p-6 md:p-8">
        
        <div className="flex flex-col gap-8">
          
          {/* Input Section */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
              Encoded JWT
            </label>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Paste your JWT here (e.g. eyJhbGci...)"
              className={`w-full h-40 p-4 font-mono text-sm bg-white dark:bg-white/[0.02] border rounded-xl text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500/50 resize-y transition-colors ${error ? 'border-red-500/50 focus:border-red-500/50 focus:ring-red-500/50' : 'border-slate-200 dark:border-white/10'}`}
            />
            {error && (
              <div className="flex items-center gap-2 mt-2 text-sm text-red-600 dark:text-red-400 font-semibold">
                <ShieldAlert className="h-4 w-4" /> {error}
              </div>
            )}
            {!error && input && (
              <div className="flex items-center gap-2 mt-2 text-sm text-green-600 dark:text-green-400 font-semibold">
                <ShieldCheck className="h-4 w-4" /> Valid JWT Structure (Signature Not Verified)
              </div>
            )}
          </div>

          {/* Output Section */}
          <div className="grid md:grid-cols-2 gap-6">
            
            {/* Header */}
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                  Header <span className="text-pink-500 ml-2 font-normal">Algorithm & Token Type</span>
                </label>
                {header && (
                  <button 
                    onClick={() => copyToClipboard(header)}
                    className="text-xs flex items-center gap-1 text-indigo-500 hover:text-indigo-600 dark:text-indigo-400 font-semibold"
                  >
                    <Copy className="h-3 w-3" /> Copy
                  </button>
                )}
              </div>
              <textarea
                readOnly
                value={header}
                placeholder="Decoded header..."
                className="w-full h-48 p-4 font-mono text-sm border-t-4 border-pink-500 bg-slate-50 dark:bg-[#020617]/50 border-slate-200 dark:border-white/10 rounded-b-xl rounded-t-sm text-slate-900 dark:text-slate-300 resize-none focus:outline-none shadow-inner"
              />
            </div>

            {/* Payload */}
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                  Payload <span className="text-indigo-500 ml-2 font-normal">Data & Claims</span>
                </label>
                {payload && (
                  <button 
                    onClick={() => copyToClipboard(payload)}
                    className="text-xs flex items-center gap-1 text-indigo-500 hover:text-indigo-600 dark:text-indigo-400 font-semibold"
                  >
                    <Copy className="h-3 w-3" /> Copy
                  </button>
                )}
              </div>
              <textarea
                readOnly
                value={payload}
                placeholder="Decoded payload..."
                className="w-full h-80 p-4 font-mono text-sm border-t-4 border-indigo-500 bg-slate-50 dark:bg-[#020617]/50 border-slate-200 dark:border-white/10 rounded-b-xl rounded-t-sm text-slate-900 dark:text-slate-300 resize-none focus:outline-none shadow-inner"
              />
            </div>
          </div>
          
        </div>

      </div>
    </ToolLayout>
  );
}
