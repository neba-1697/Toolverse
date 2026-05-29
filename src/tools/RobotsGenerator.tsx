import { useState } from 'react';
import { Copy, Bot, RotateCcw } from 'lucide-react';
import { ToolLayout } from '../components/ToolLayout';

export function RobotsGenerator() {
  const [output, setOutput] = useState('User-agent: *\nDisallow: /private/');
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
  };

  const seoContent = {
    h1: "Free Online Robots.txt Generator",
    introduction: "Create an optimized robots.txt file to instruct search engine crawlers which pages to index and which to ignore. Fast, browser-based tool.",
    whatItIs: "A robots.txt file provides instructions to search engine web crawlers about which parts of your site should not be accessed.",
    whyItMatters: "Properly configured robots.txt helps prevent search engines from indexing unimportant, duplicated, or private pages, saving your crawl budget.",
    useCases: [
      { title: "SEO Control", description: "Prevent sensitive or staging areas of your site from appearing in search results." }
    ],
    features: [
      { title: "Clean Syntax", description: "Generates valid robots.txt syntax ready for deployment." }
    ]
  };

  return (
    <ToolLayout 
      title="Robots.txt Generator" 
      description="Create a robots.txt file."
      category="SEO Tools"
      icon={<Bot className="h-8 w-8 text-indigo-400" />}
      seoContent={seoContent}
    >
      <div className="p-6 md:p-8">
        <textarea 
          value={output} 
          onChange={(e) => setOutput(e.target.value)} 
          className="w-full h-64 p-4 font-mono text-sm bg-white dark:bg-white/[0.02] border border-slate-200 dark:border-white/10 rounded-xl mb-6"
        />
        <button onClick={copyToClipboard} className="px-6 py-3 bg-indigo-500 text-white font-bold rounded-xl shadow-lg shadow-indigo-500/20 hover:bg-indigo-600 transition-all flex items-center gap-2">
            <Copy className="h-4 w-4" /> Copy robots.txt
        </button>
      </div>
    </ToolLayout>
  );
}
