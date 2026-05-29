import { useState } from 'react';
import { Copy, Tags, RotateCcw } from 'lucide-react';
import { ToolLayout } from '../components/ToolLayout';

export function MetaGenerator() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [output, setOutput] = useState('');

  const generateMeta = () => {
    setOutput(`<title>${title}</title>\n<meta name="description" content="${description}">`);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
  };

  const seoContent = {
    h1: "Free Online Meta Tag Generator",
    introduction: "Generate optimized title and meta description tags for your website to improve SEO rankings. Fast, browser-based tool.",
    whatItIs: "Meta tags provide search engines with concise summaries of your page content, which helps determine relevancy for search queries.",
    whyItMatters: "Well-crafted title tags and descriptions directly influence CTR (Click-Through Rate) from search results.",
    useCases: [
      { title: "SEO Optimization", description: "Standardize page titles and meta descriptions for all site pages." }
    ],
    features: [
      { title: "Real-time Construction", description: "Generate tags as you type." }
    ]
  };

  return (
    <ToolLayout 
      title="Meta Tag Generator" 
      description="Generate optimal title and meta tags."
      category="SEO Tools"
      icon={<Tags className="h-8 w-8 text-indigo-400" />}
      seoContent={seoContent}
    >
      <div className="p-6 md:p-8">
        <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Page Title</label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full p-3 bg-white dark:bg-white/[0.02] border border-slate-200 dark:border-white/10 rounded-xl mb-4" placeholder="Enter page title..." />
        
        <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Meta Description</label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="w-full h-32 p-3 bg-white dark:bg-white/[0.02] border border-slate-200 dark:border-white/10 rounded-xl mb-4" placeholder="Enter meta description..." />
        
        <button onClick={generateMeta} className="px-6 py-3 bg-indigo-500 text-white font-bold rounded-xl mb-6">Generate Tags</button>
        
        <textarea readOnly value={output} className="w-full h-32 p-4 font-mono text-sm bg-slate-50 dark:bg-[#020617]/50 border border-slate-200 dark:border-white/10 rounded-xl" />
      </div>
    </ToolLayout>
  );
}
