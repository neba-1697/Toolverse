import { useState } from 'react';
import { Eye, Copy, Check, Tags, Shield, Code } from 'lucide-react';
import { ToolLayout } from '../components/ToolLayout';

export function OpenGraph() {
  const [title, setTitle] = useState('ToolVerse - Lightning-Fast Privacy-First Web Utilities');
  const [desc, setDesc] = useState('Process documents, images, code files, and SEO campaigns entirely in your local browser sandbox. Complete privacy.');
  const [url, setUrl] = useState('https://toolverse.app');
  const [imageUrl, setImageUrl] = useState('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80');
  const [siteName, setSiteName] = useState('ToolVerse App');
  const [copied, setCopied] = useState<boolean>(false);

  const getMetaMarkup = (): string => {
    return `<!-- Common HTML Meta Tags -->\n` +
      `<title>${title}</title>\n` +
      `<meta name="description" content="${desc}" />\n\n` +
      `<!-- Open Graph / Facebook Meta Tags -->\n` +
      `<meta property="og:type" content="website" />\n` +
      `<meta property="og:url" content="${url}" />\n` +
      `<meta property="og:title" content="${title}" />\n` +
      `<meta property="og:description" content="${desc}" />\n` +
      `<meta property="og:image" content="${imageUrl}" />\n` +
      `<meta property="og:site_name" content="${siteName}" />\n\n` +
      `<!-- Twitter/X Card Meta Tags -->\n` +
      `<meta name="twitter:card" content="summary_large_image" />\n` +
      `<meta name="twitter:url" content="${url}" />\n` +
      `<meta name="twitter:title" content="${title}" />\n` +
      `<meta name="twitter:description" content="${desc}" />\n` +
      `<meta name="twitter:image" content="${imageUrl}" />`;
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(getMetaMarkup());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const seoContent = {
    h1: "Free Open Graph Meta Tag Generator",
    introduction: "Validate Title and Description metadata and construct Facebook, Twitter/X, and social platform share tags instantly, matching visual display cards.",
    whatItIs: "An automated visual metatags compiler displaying interactive layout simulations matching real-world digital sharing environments.",
    whyItMatters: "Social platforms fetch og:tags to paint embedded preview cards. Missing elements fallback to awkward raw URLs, lowering organic CTR ratios.",
    useCases: [
      { title: "Pre-Launch Auditing", description: "Verify social image banners and site tag lengths beforehand to prevent text truncation issues." },
      { title: "Campaign Asset Verification", description: "Standardize promotional URLs to ensure brand designs render cohesively." }
    ],
    features: [
      { title: "Double Social Simulator Cards", description: "Emulates high-fidelity sharing preview components mimicking standard layouts." },
      { title: "One-Click Header Compilation", description: "Packages tags matching semantic specifications perfectly." }
    ]
  };

  return (
    <ToolLayout
      title="Open Graph Generator"
      description="Design Title, Description, and image Open Graph configurations with live visual preview simulations."
      category="SEO Tools"
      icon={<Tags className="h-8 w-8 text-indigo-400" />}
      seoContent={seoContent}
    >
      <div className="p-6 md:p-8">
        <div className="grid lg:grid-cols-2 gap-8">
          
          {/* Inputs Section */}
          <div className="p-6 bg-slate-50 dark:bg-[#020617]/50 border border-slate-200 dark:border-white/10 rounded-2xl space-y-5">
            <h4 className="font-bold text-slate-900 dark:text-white pb-2 border-b border-slate-200 dark:border-white/10 flex items-center gap-2">Configure Tags</h4>

            <div className="space-y-4">
              <div>
                <label className="block text-[10px] uppercase font-bold text-slate-500 mb-1">Open Graph Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-lg text-sm text-slate-800 dark:text-white focus:ring-2 focus:ring-indigo-500/50"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase font-bold text-slate-500 mb-1">Description (Max 160 chars recommended)</label>
                <textarea
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                  className="w-full h-20 p-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-lg text-sm text-slate-800 dark:text-white focus:ring-2 focus:ring-indigo-500/50"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase font-bold text-slate-500 mb-1">Absolute Site URL</label>
                <input
                  type="text"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-lg text-sm text-slate-850 dark:text-white focus:ring-2 focus:ring-indigo-500/50"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase font-bold text-slate-500 mb-1">Meta Social Image URL</label>
                <input
                  type="text"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-lg text-sm text-slate-850 dark:text-white focus:ring-2 focus:ring-indigo-500/50"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase font-bold text-slate-500 mb-1">Site Brand Name</label>
                <input
                  type="text"
                  value={siteName}
                  onChange={(e) => setSiteName(e.target.value)}
                  className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-lg text-sm text-slate-850 dark:text-white focus:ring-2 focus:ring-indigo-500/50"
                />
              </div>
            </div>
          </div>

          {/* Social Preview Simulations & Code Section */}
          <div className="space-y-6">
            
            {/* Simulation Tabs */}
            <h4 className="font-bold text-slate-900 dark:text-white flex items-center gap-2"><Eye className="h-5 w-5 text-indigo-400" /> Share Preview Simulation</h4>

            {/* Standard Widescreen Card emulation (Facebook / LinkedIn) */}
            <div className="p-4 bg-[#f0f2f5] dark:bg-[#18191a] text-black dark:text-white rounded-xl border border-slate-200 dark:border-white/5 space-y-2 max-w-[500px]">
              <span className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wide">Facebook Widescreen Embed</span>
              <div className="bg-white dark:bg-[#242526] rounded-lg overflow-hidden border border-slate-200 dark:border-white/10 shadow-sm">
                <img src={imageUrl} alt="OG Card Banner" className="w-full h-44 object-cover" />
                <div className="p-3 space-y-1">
                  <span className="text-[10px] text-[#606770] uppercase uppercase tracking-wider block font-mono">{siteName || url.replace('https://', '')}</span>
                  <h5 className="font-bold text-sm tracking-tight text-slate-900 dark:text-white leading-tight limit-lines-1 truncate">{title}</h5>
                  <p className="text-xs text-[#606770] leading-snug truncate limit-lines-2">{desc}</p>
                </div>
              </div>
            </div>

            {/* Code Output panel */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h5 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1"><Code className="h-4 w-4" /> HTML HEAD Tag Blocks</h5>
                <button
                  onClick={copyToClipboard}
                  className="text-xs text-indigo-500 hover:underline flex items-center gap-1 font-bold cursor-pointer"
                >
                  {copied ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
                  {copied ? 'Copied HTML!' : 'Copy Elements'}
                </button>
              </div>
              <textarea
                readOnly
                value={getMetaMarkup()}
                className="w-full h-44 p-3.5 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-xl text-slate-700 dark:text-slate-300 font-mono text-[10px] leading-relaxed"
              />
            </div>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
