import { useState } from 'react';
import { Copy, FileDown, Eye, Edit3, Sun, Moon } from 'lucide-react';
import { ToolLayout } from '../components/ToolLayout';
import Markdown from 'react-markdown';

export function MarkdownPreview() {
  const [input, setInput] = useState('# Hello World\n\nWrite your **markdown** here...');
  const [view, setView] = useState<'split' | 'edit' | 'preview'>('split');
  const [previewTheme, setPreviewTheme] = useState<'light' | 'dark'>('light');

  const copyToClipboard = () => {
    navigator.clipboard.writeText(input);
  };

  const seoContent = {
    h1: "Free Online Markdown Previewer & Editor",
    introduction: "Write, preview, and format Markdown in real-time. A clean, distraction-free environment for creating READMEs and documentation.",
    whatItIs: "Markdown is a lightweight markup language that allows you to format text using plain-text syntax. This tool renders your syntax into formatted HTML blocks instantly.",
    whyItMatters: "Software developers rely on Markdown for writing documentation, GitHub README files, and blog posts. An instant previewer helps prevent formatting errors before committing files.",
    useCases: [
      { title: "Writing READMEs", description: "Draft the perfect GitHub landing page for your open source repository." },
      { title: "Blogging", description: "Write blog posts in Markdown before pushing them to static site generators." }
    ],
    features: [
      { title: "Live Preview", description: "Changes reflect immediately as you type." },
      { title: "Split View", description: "Compare your raw text and the generated output side by side." }
    ]
  };

  return (
    <ToolLayout 
      title="Markdown Preview" 
      description="Write and preview Markdown in real-time."
      category="Developer Tools"
      icon={<FileDown className="h-8 w-8 text-indigo-400" />}
      seoContent={seoContent}
    >
      <div className="p-6 md:p-8">
        
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setView('edit')}
            className={`px-4 py-2 font-semibold text-sm rounded-lg transition-all flex items-center gap-2 ${view === 'edit' ? 'bg-indigo-500 text-white shadow-lg' : 'bg-slate-100 dark:bg-white/[0.03] text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-white/10 hover:bg-slate-200 dark:hover:bg-white/[0.08]'}`}
          >
            <Edit3 className="h-4 w-4" /> Edit
          </button>
          <button
            onClick={() => setView('split')}
            className={`hidden md:flex px-4 py-2 font-semibold text-sm rounded-lg transition-all items-center gap-2 ${view === 'split' ? 'bg-indigo-500 text-white shadow-lg' : 'bg-slate-100 dark:bg-white/[0.03] text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-white/10 hover:bg-slate-200 dark:hover:bg-white/[0.08]'}`}
          >
             Split View
          </button>
          <button
            onClick={() => setView('preview')}
            className={`px-4 py-2 font-semibold text-sm rounded-lg transition-all flex items-center gap-2 ${view === 'preview' ? 'bg-indigo-500 text-white shadow-lg' : 'bg-slate-100 dark:bg-white/[0.03] text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-white/10 hover:bg-slate-200 dark:hover:bg-white/[0.08]'}`}
          >
            <Eye className="h-4 w-4" /> Preview
          </button>
        </div>

        <div className={`grid gap-6 ${view === 'split' ? 'md:grid-cols-2' : 'grid-cols-1'}`}>
          
          {(view === 'edit' || view === 'split') && (
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                Markdown Source
              </label>
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="w-full h-[600px] p-4 font-mono text-sm bg-white dark:bg-white/[0.02] border border-slate-200 dark:border-white/10 rounded-xl text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500/50 resize-none"
              />
            </div>
          )}

          {(view === 'preview' || view === 'split') && (
             <div className="flex flex-col gap-2">
               <div className="flex justify-between items-center mb-1 flex-wrap gap-2">
                 <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                   Preview
                 </label>
                 <div className="flex items-center gap-3">
                   {/* Visual Theme Toggle */}
                   <div className="flex items-center gap-1 bg-slate-100 dark:bg-white/[0.04] p-0.5 rounded-lg border border-slate-200/50 dark:border-white/5">
                     <button
                       onClick={() => setPreviewTheme('light')}
                       title="Light preview theme"
                       className={`px-2.5 py-1 text-xs font-bold rounded-md flex items-center gap-1 transition-all cursor-pointer ${
                         previewTheme === 'light'
                           ? 'bg-white dark:bg-slate-800 text-slate-800 dark:text-white shadow-sm'
                           : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'
                       }`}
                     >
                       <Sun className="h-3 w-3 text-amber-500" /> Light
                     </button>
                     <button
                       onClick={() => setPreviewTheme('dark')}
                       title="Dark preview theme"
                       className={`px-2.5 py-1 text-xs font-bold rounded-md flex items-center gap-1 transition-all cursor-pointer ${
                         previewTheme === 'dark'
                           ? 'bg-white dark:bg-slate-800 text-slate-800 dark:text-white shadow-sm'
                           : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'
                       }`}
                     >
                       <Moon className="h-3 w-3 text-indigo-400" /> Dark
                     </button>
                   </div>
                   
                   <button 
                     onClick={copyToClipboard}
                     className="text-xs flex items-center gap-1 text-indigo-500 hover:text-indigo-600 dark:text-indigo-400 font-semibold cursor-pointer"
                   >
                     <Copy className="h-3 w-3" /> Copy Source
                   </button>
                 </div>
               </div>
               <div className={`w-full h-[600px] p-8 border rounded-xl overflow-y-auto outline-none shadow-inner max-w-none transition-all duration-200 ${
                 previewTheme === 'dark'
                   ? 'bg-slate-950 text-slate-100 border-slate-800 prose prose-invert prose-headings:text-slate-100 prose-p:text-slate-300 prose-strong:text-white prose-code:text-indigo-300 prose-blockquote:text-slate-400 prose-blockquote:border-slate-700 prose-hr:border-slate-800 prose-ol:text-slate-300 prose-ul:text-slate-300'
                   : 'bg-white text-slate-800 border-slate-200 prose prose-slate prose-headings:text-slate-900 prose-p:text-slate-700 prose-strong:text-slate-950 prose-code:text-indigo-600 prose-blockquote:text-slate-500 prose-blockquote:border-slate-200 prose-hr:border-slate-100 prose-ol:text-slate-700 prose-ul:text-slate-700'
               }`}>
                 <Markdown>{input}</Markdown>
               </div>
             </div>
          )}
        </div>

      </div>
    </ToolLayout>
  );
}
