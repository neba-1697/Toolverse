import { Link } from 'react-router-dom';
import { ToolLayout } from '../components/ToolLayout';
import { TOOLS } from '../data/tools';

export function GenericTool({ toolId }: { toolId: string }) {
  const tool = TOOLS.find(t => t.id === toolId);

  if (!tool) {
    return <div>Tool not found</div>;
  }

  return (
    <ToolLayout
      title={tool.name}
      description={tool.description}
      category={tool.category}
      seoContent={{
        h1: `Free Online ${tool.name}`,
        introduction: `Welcome to ToolVerse's ${tool.name}. This utility is currently undergoing upgrades and will be fully functionally released in our next platform update. We are rebuilding it from the ground up for maximum performance and security.`,
        howToUse: [],
        features: [],
        faqs: []
      }}
    >
      <div className="p-12 text-center flex flex-col items-center justify-center space-y-4 min-h-[300px]">
        <div className="h-16 w-16 bg-slate-100 dark:bg-white/[0.05] border border-slate-200 dark:border-white/10 rounded-full flex items-center justify-center mb-4 shadow-inner backdrop-blur-sm relative overflow-hidden">
          <div className="absolute inset-0 border-t-2 border-indigo-400 rounded-full animate-spin"></div>
          <span className="text-2xl opacity-50 relative z-10">🛠️</span>
        </div>
        <h3 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Under Construction</h3>
        <p className="text-slate-600 dark:text-slate-400 max-w-md leading-relaxed">
          Our engineering team is actively upgrading the {tool.name} to deliver a faster, fully client-side experience. Check back soon!
        </p>
        <Link to="/" className="mt-8 px-6 py-2 border border-slate-200 dark:border-white/10 bg-white dark:bg-white/[0.03] text-slate-900 dark:text-white hover:bg-slate-200 dark:bg-white/[0.08] transition-all rounded-lg font-semibold inline-block shadow-sm">
          Explore other tools
        </Link>
      </div>
    </ToolLayout>
  );
}
