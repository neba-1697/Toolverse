import { useState } from 'react';
import { Copy, Link, RotateCcw } from 'lucide-react';
import { ToolLayout } from '../components/ToolLayout';

export function SlugGenerator() {
  const [input, setInput] = useState('');
  const [slug, setSlug] = useState('');

  const generateSlug = (text: string) => {
    return text
      .toString()
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-')           // Replace spaces with -
      .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
      .replace(/\-\-+/g, '-')         // Replace multiple - with single -
      .replace(/^-+/, '')             // Trim - from start of text
      .replace(/-+$/, '');            // Trim - from end of text
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    setInput(val);
    setSlug(generateSlug(val));
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(slug);
  };

  const handleClear = () => {
    setInput('');
    setSlug('');
  };

  const seoContent = {
    h1: "Free Online URL Slug Generator",
    introduction: "Convert any text, blog title, or product name into an SEO-friendly URL slug instantly. Perfect for ensuring your web pages have clean, accessible routes.",
    whatItIs: "A URL slug generator maps human-readable text into a format suitable for web URL paths. It removes special characters, converts spaces to hyphens, and formats everything to lowercase letters.",
    whyItMatters: "Clean URL slugs are critical for Search Engine Optimization (SEO). URLs that contain readable hyphens instead of random numbers or encoded spaces (%20) rank better on Google and are more likely to be clicked by users.",
    useCases: [
      { title: "Blog Posts", description: "Convert '10 Best Coffee Shops in NYC!' into a clean '10-best-coffee-shops-in-nyc' route." },
      { title: "E-Commerce", description: "Ensure product pages have uniform URL structures for better indexability." }
    ],
    features: [
      { title: "Regex Cleansing", description: "Automatically strips emojis, punctuation, and non-alphanumeric characters." },
      { title: "Instant Conversion", description: "Generates your slug in real-time as you type, entirely in your browser." }
    ]
  };

  return (
    <ToolLayout 
      title="URL Slug Generator" 
      description="Convert strings into clean, SEO-friendly URL slugs."
      category="Text Tools"
      icon={<Link className="h-8 w-8 text-indigo-400" />}
      seoContent={seoContent}
    >
      <div className="p-6 md:p-8">
        
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
              Input Text (e.g., Blog Title)
            </label>
            <textarea
              value={input}
              onChange={handleChange}
              placeholder="Enter your title here..."
              className="w-full h-32 p-4 text-sm bg-white dark:bg-white/[0.02] border border-slate-200 dark:border-white/10 rounded-xl text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500/50 resize-y"
            />
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                Generated Slug
              </label>
              {slug && (
                <button 
                   onClick={copyToClipboard}
                   className="text-xs flex items-center gap-1 text-indigo-500 hover:text-indigo-600 dark:text-indigo-400 font-semibold"
                >
                  <Copy className="h-3 w-3" /> Copy
                </button>
              )}
            </div>
            <div className="w-full min-h-[80px] p-4 font-mono text-sm bg-slate-50 dark:bg-[#020617]/50 border border-slate-200 dark:border-white/10 rounded-xl text-slate-900 dark:text-slate-300 break-all flex items-center shadow-inner">
              {slug || <span className="text-slate-400">your-slug-will-appear-here</span>}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between mt-8">
          <button 
            onClick={handleClear}
            className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-slate-500 hover:text-slate-800 dark:hover:text-white transition-colors"
          >
            <RotateCcw className="h-4 w-4" /> Clear
          </button>
          
          <button 
            onClick={copyToClipboard}
            className="px-5 py-2.5 text-sm font-semibold bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-all shadow-lg shadow-indigo-500/20 flex items-center gap-2"
          >
            <Copy className="h-4 w-4" /> Copy Slug
          </button>
        </div>

      </div>
    </ToolLayout>
  );
}
