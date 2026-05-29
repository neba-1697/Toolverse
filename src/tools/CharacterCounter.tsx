import { useState } from 'react';
import { Hash, Copy, RotateCcw } from 'lucide-react';
import { ToolLayout } from '../components/ToolLayout';

export function CharacterCounter() {
  const [text, setText] = useState('');

  const chars = text.length;
  const charsNoSpaces = text.replace(/\\s/g, '').length;
  const words = text.trim() === '' ? 0 : text.trim().split(/\\s+/).length;
  const paragraphs = text.trim() === '' ? 0 : text.trim().split(/\\n+/).length;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(text);
  };

  const seoContent = {
    h1: "Free Online Character Counter for Social Media",
    introduction: "Ensure your tweets, meta descriptions, and Instagram captions perfectly fit their designated limits with our real-time character counter.",
    whatItIs: "A character counter analyzes string length, including or excluding invisible spacing markers. Unlike a word counter, it provides a 1:1 mapping of every keystroke made.",
    whyItMatters: "Every social media platform enforces strict character limits. Exceeding a limit forces truncation, which ruins engagement rates and hides Call To Actions. Hitting optimal character counts ensures perfect readability everywhere.",
    useCases: [
      { title: "Twitter / X", description: "Ensure your posts stay within the 280-character limit (or 4,000 for Premium users)." },
      { title: "SEO Meta Tags", description: "Keep Title Tags near 60 characters and Meta Descriptions near 150 characters to prevent Google from truncating your SERP snippets." }
    ],
    features: [
      { title: "Whitespace Toggle", description: "Easily view character counts with and without spaces for development databases." },
      { title: "Real-time Metrics", description: "Metrics update instantaneously. No clicking required." }
    ]
  };

  return (
    <ToolLayout 
      title="Character Counter" 
      description="Count characters and spaces in real-time."
      category="Text Tools"
      icon={<Hash className="h-8 w-8 text-indigo-400" />}
      seoContent={seoContent}
    >
      <div className="p-6 md:p-8">
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <StatBox label="Characters" value={chars} />
          <StatBox label="Without Spaces" value={charsNoSpaces} />
          <StatBox label="Words" value={words} />
          <StatBox label="Paragraphs" value={paragraphs} />
        </div>

        <div className="relative group">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type or paste your text here..."
            className="w-full h-80 p-5 border border-slate-200 dark:border-white/10 rounded-xl bg-white dark:bg-white/[0.02] text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 focus:outline-none resize-y transition-all"
            spellCheck="false"
          />
        </div>

        <div className="flex items-center justify-between mt-4">
          <button 
            onClick={() => setText('')}
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

function StatBox({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="p-4 rounded-xl bg-white dark:bg-white/[0.02] border border-slate-200 dark:border-white/10 flex flex-col items-center justify-center text-center shadow-sm backdrop-blur-sm">
      <span className="text-3xl font-bold text-slate-900 dark:text-white mb-1">{value}</span>
      <span className="text-[10px] uppercase tracking-widest text-slate-600 dark:text-slate-400 font-semibold">{label}</span>
    </div>
  );
}
