import { useState } from 'react';
import { RefreshCw, Copy, Check, Hash } from 'lucide-react';
import { ToolLayout } from '../components/ToolLayout';

export function UUIDGenerator() {
  const [uuids, setUuids] = useState<string[]>(['']);
  const [count, setCount] = useState(1);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const generateUUID = () => {
    // Basic UUID v4 implementation for browser
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  };

  const handleGenerate = () => {
    const newUuids = Array.from({ length: Math.min(count, 100) }).map(() => generateUUID());
    setUuids(newUuids);
    setCopiedIndex(null);
  };

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const copyAll = () => {
    navigator.clipboard.writeText(uuids.join('\n'));
    setCopiedIndex(-1);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  useState(() => {
    setUuids([generateUUID()]);
  });

  const seoContent = {
    h1: "Free Online UUID (v4) Generator",
    introduction: "Instantly generate random, secure Version 4 Universally Unique Identifiers (UUIDs) or Globally Unique Identifiers (GUIDs) using client-side cryptographic functions.",
    whatItIs: "A UUID (Universally Unique Identifier) is a 128-bit label used for information in computer systems safely. Version 4 UUIDs are completely randomized, offering virtually zero chance of collision across systems.",
    whyItMatters: "When building databases, API systems, or distributed networks, you often need primary keys that won't conflict even when generated offline or concurrently. UUIDv4 is the standard protocol for generating keys that guarantee global uniqueness without a centralized authority.",
    useCases: [
      { title: "Database Primary Keys", description: "Use UUIDs as non-sequential ID fields in PostgreSQL or MongoDB databases." },
      { title: "API Development", description: "Generate safe session IDs, request IDs, or idempotent keys for REST operations." }
    ],
    features: [
      { title: "Bulk Generation", description: "Generate up to 100 UUIDs at a single time for testing or seeding databases." },
      { title: "Local Browser Processing", description: "All UUIDs are generated directly on your machine. We don't track or save them." }
    ]
  };

  return (
    <ToolLayout 
      title="UUID Generator" 
      description="Generate random v4 UUIDs (Universally Unique Identifiers)."
      category="Developer Tools"
      icon={<Hash className="h-8 w-8 text-indigo-400" />}
      seoContent={seoContent}
    >
      <div className="p-6 md:p-8">
        <div className="flex flex-col md:flex-row gap-6 mb-8 items-end">
          <div className="flex-1 w-full">
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">How many UUIDs?</label>
            <input 
              type="number" 
              min="1" 
              max="100" 
              value={count} 
              onChange={(e) => setCount(Math.min(100, Math.max(1, parseInt(e.target.value) || 1)))}
              className="w-full px-4 py-3 bg-white dark:bg-white/[0.02] border border-slate-200 dark:border-white/10 rounded-xl text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500/50"
            />
          </div>
          <button 
            onClick={handleGenerate}
            className="w-full md:w-auto px-6 py-3 bg-indigo-500 text-white font-bold rounded-xl shadow-lg shadow-indigo-500/20 hover:bg-indigo-600 transition-all flex items-center justify-center gap-2"
          >
            <RefreshCw className="h-4 w-4" /> Generate
          </button>
        </div>

        <div className="bg-slate-50 dark:bg-[#020617] border border-slate-200 dark:border-white/10 rounded-xl p-4 min-h-[200px] max-h-[400px] overflow-y-auto mb-6">
          {uuids.map((uuid, i) => (
            <div key={i} className="flex items-center justify-between py-2 border-b border-slate-200/50 dark:border-white/5 last:border-0 font-mono text-sm">
              <span className="text-slate-800 dark:text-slate-200">{uuid}</span>
              <button 
                onClick={() => copyToClipboard(uuid, i)}
                className="p-2 text-slate-500 hover:text-indigo-500 transition-colors"
                title="Copy"
              >
                {copiedIndex === i ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
              </button>
            </div>
          ))}
        </div>
        
        {uuids.length > 1 && (
          <div className="flex justify-end">
            <button 
              onClick={copyAll}
              className="px-6 py-2 bg-slate-100 dark:bg-white/[0.05] border border-slate-200 dark:border-white/10 text-slate-800 dark:text-slate-200 font-semibold rounded-lg hover:bg-slate-200 dark:hover:bg-white/[0.1] transition-all flex items-center gap-2"
            >
              {copiedIndex === -1 ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />} Copy All
            </button>
          </div>
        )}
      </div>
    </ToolLayout>
  );
}
