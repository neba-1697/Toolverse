import { useState } from 'react';
import { Search, Loader2, AlertCircle, CheckCircle2, ChevronRight } from 'lucide-react';
import { ToolLayout } from '../components/ToolLayout';

export function SeoAnalyzer() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const analyze = async () => {
    if (!url) return;
    setLoading(true);
    setResult(null);
    try {
      const response = await fetch(`/api/seo-analyze?url=${encodeURIComponent(url)}`);
      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error('Analysis failed', error);
      setResult({ error: 'Failed to analyze URL. Ensure it is accessible.' });
    } finally {
      setLoading(false);
    }
  };

  const seoContent = {
    h1: "AI SEO Content Analyzer",
    introduction: "Perform deep SEO analysis on any URL using Google Gemini AI. Identify critical meta tag deficiencies, hierarchy issues, and accessibility faults instantly.",
    whatItIs: "A hybrid client-server analysis tool that fetches raw HTML from external URLs and processes it through a Large Language Model to identify SEO opportunities.",
    whyItMatters: "Standard SEO tools rely on rigid rule-sets. Using an LLM allows us to infer semantic context, detect intent mismatch, and provide human-readable actionable improvements.",
    useCases: [
      { title: "Competitor Analysis", description: "Quickly assess what meta strategies competitors are using." },
      { title: "Pre-deployment Audit", description: "Verify heading hierarchies and descriptions before pushing code." }
    ],
    features: [
      { title: "Generative AI Insights", description: "Uses Gemini 2.5 Flash to synthesize practical improvement points." }
    ]
  };

  return (
    <ToolLayout 
      title="SEO Content Analyzer" 
      description="Analyze URLs using Gemini AI for SEO improvements."
      category="SEO Tools"
      icon={<Search className="h-8 w-8 text-indigo-400" />}
      seoContent={seoContent}
    >
      <div className="p-6 md:p-8">
        <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Target URL</label>
        <div className="flex gap-2">
            <input 
              value={url} 
              onChange={(e) => setUrl(e.target.value)} 
              onKeyDown={(e) => e.key === 'Enter' && analyze()}
              placeholder="https://example.com" 
              className="w-full flex-1 p-4 bg-white dark:bg-white/[0.02] border border-slate-200 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-indigo-500/50" 
            />
            <button 
               onClick={analyze} 
               disabled={loading || !url} 
               className={`px-8 py-4 font-bold rounded-xl shadow-lg transition-all flex items-center gap-2 ${loading || !url ? 'bg-slate-300 text-slate-500 cursor-not-allowed dark:bg-slate-800 dark:text-slate-500' : 'bg-indigo-500 text-white shadow-indigo-500/20 hover:bg-indigo-600'}`}
            >
               {loading ? <Loader2 className="animate-spin h-5 w-5" /> : "Analyze"}
            </button>
        </div>

        {result && result.error && (
             <div className="mt-8 p-4 bg-red-500/10 text-red-500 border border-red-500/20 rounded-xl flex items-start gap-3 backdrop-blur-sm shadow-sm">
             <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" />
             <div>
               <p className="font-bold text-sm tracking-wide">Analysis Failed</p>
               <p className="text-sm opacity-90 leading-relaxed mt-1">{result.error}</p>
             </div>
           </div>
        )}

        {result && !result.error && (
          <div className="mt-8 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            
            {/* Score Banner */}
            <div className="flex items-center gap-6 p-6 bg-gradient-to-br from-indigo-500 to-indigo-700 rounded-2xl text-white shadow-xl shadow-indigo-500/20">
               <div className="flex flex-col items-center justify-center shrink-0 w-24 h-24 rounded-full border-4 border-white/20 bg-white/10 backdrop-blur-md">
                 <span className="text-3xl font-black">{result.score || 'N/A'}</span>
                 <span className="text-xs uppercase font-bold text-indigo-100 tracking-wider">Score</span>
               </div>
               <div>
                  <h3 className="text-2xl font-bold mb-1">AI SEO Appraisal</h3>
                  <p className="text-indigo-100 text-sm leading-relaxed">{result.ai_analysis || 'Analysis complete. Review the specific metrics and suggestions below.'}</p>
               </div>
            </div>

            {/* Metrics Grid */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-6 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-white/10">
                 <h4 className="font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                   <ChevronRight className="h-5 w-5 text-indigo-400" /> Page Metadata
                 </h4>
                 <div className="space-y-4 text-sm">
                    <div>
                      <span className="block text-xs font-semibold text-slate-500 mb-1 uppercase tracking-wider">Title Tag</span>
                      <span className={`block font-medium ${result.title ? 'text-slate-800 dark:text-slate-200' : 'text-red-500'}`}>{result.title || 'Missing Title Tag'}</span>
                    </div>
                    <div>
                      <span className="block text-xs font-semibold text-slate-500 mb-1 uppercase tracking-wider">Meta Description</span>
                      <span className={`block font-medium ${result.description ? 'text-slate-800 dark:text-slate-200' : 'text-red-500'}`}>{result.description || 'Missing Meta Description'}</span>
                    </div>
                 </div>
              </div>

              <div className="p-6 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-white/10">
                 <h4 className="font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                   <ChevronRight className="h-5 w-5 text-indigo-400" /> Heading Structure
                 </h4>
                 <div className="flex items-center gap-8 text-sm">
                    <div className="text-center">
                      <span className="block text-3xl font-bold text-slate-800 dark:text-white mb-1">{result.h1Count}</span>
                      <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">H1 Tags</span>
                    </div>
                    <div className="text-center">
                      <span className="block text-3xl font-bold text-slate-800 dark:text-white mb-1">{result.h2Count}</span>
                      <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">H2 Tags</span>
                    </div>
                 </div>
                 {result.h1Count > 1 && (
                    <p className="mt-4 text-xs text-amber-500 font-medium">Multiple H1 tags detected. While supported in HTML5, singular H1s are traditionally preferred for strong semantic focus.</p>
                 )}
                 {result.h1Count === 0 && (
                    <p className="mt-4 text-xs text-red-500 font-medium">Missing H1 tag. This is highly detrimental to SEO architecture.</p>
                 )}
              </div>
            </div>

            {/* Improvements */}
            {result.improvements && result.improvements.length > 0 && (
              <div className="p-6 bg-emerald-50 dark:bg-emerald-900/10 rounded-2xl border border-emerald-200 dark:border-emerald-500/20">
                 <h4 className="font-bold text-emerald-800 dark:text-emerald-400 mb-4 flex items-center gap-2">
                   <CheckCircle2 className="h-5 w-5" /> Actionable Improvements
                 </h4>
                 <ul className="space-y-3">
                   {result.improvements.map((imp: string, i: number) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-emerald-700 dark:text-emerald-300">
                         <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                         <span className="leading-relaxed">{imp}</span>
                      </li>
                   ))}
                 </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </ToolLayout>
  );
}
