import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { SEO } from './SEO';
import { AdSlot } from './AdSlot';

interface ToolLayoutProps {
  title: string;
  description: string;
  category: string;
  icon?: ReactNode;
  children: ReactNode; // The actual interactive tool
  seoContent?: {
    h1: string;
    introduction: string;
    whatItIs?: string;
    whyItMatters?: string;
    useCases?: { title: string; description: string }[];
    howToUse?: { step: string; description: string }[];
    features?: { title: string; description: string }[];
    bestPractices?: { title: string; description: string }[];
    faqs?: { question: string; answer: string }[];
  };
}

export function ToolLayout({ title, description, category, icon, children, seoContent }: ToolLayoutProps) {
  
  const schema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": title,
    "operatingSystem": "All",
    "applicationCategory": "BrowserApplication",
    "description": description,
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
  };

  const faqSchema = seoContent?.faqs && seoContent.faqs.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": seoContent.faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  } : null;

  return (
    <>
      <SEO 
        title={`${title} - Free Online Tool | ToolVerse`}
        description={description}
        canonical={`/tools/${title.toLowerCase().replace(/\s+/g, '-')}`}
        schema={faqSchema ? [schema, faqSchema] : schema}
      />
      
      {/* Tool Header */}
      <div className="bg-slate-50 dark:bg-[#020617] border-b border-slate-200 dark:border-white/10 py-8 md:py-12 mt-[-1px]">
        <div className="container mx-auto max-w-6xl px-4">
          <nav className="flex items-center gap-2 text-xs text-slate-500 mb-8 font-medium tracking-wide">
            <Link to="/" className="hover:text-slate-900 dark:text-white transition-colors">Home</Link>
            <ChevronRight className="h-3 w-3" />
            <Link to={`/#${category.toLowerCase().replace(/\s+/g, '-')}`} className="hover:text-slate-900 dark:text-white transition-colors">{category}</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-indigo-400">{title}</span>
          </nav>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div className="flex flex-col md:flex-row md:items-center gap-6">
              {icon && (
                 <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-500/10 shadow-sm border border-indigo-500/20 text-indigo-400 shrink-0">
                  {icon}
                 </div>
              )}
              <div>
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 dark:text-white mb-2">{title}</h1>
                <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl">{description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-6xl px-4 py-8">
        <AdSlot type="banner" slotId="top-banner" className="mb-8 hidden md:flex" />
      </div>

      {/* Tool Workspace */}
      <div className="bg-slate-50 dark:bg-[#020617] relative pb-12 min-h-[400px]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(99,102,241,0.05),_transparent_40%)] pointer-events-none"></div>
        <div className="container relative mx-auto max-w-6xl px-4 z-10 flex flex-col lg:flex-row gap-8">
          <div className="w-full lg:w-[70%]">
            <div className="bg-white dark:bg-white/[0.03] backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-2xl shadow-xl overflow-hidden min-h-[500px]">
               {children}
            </div>
            {/* Inline Ad Content */}
            <div className="mt-8">
              <AdSlot type="banner" slotId="inline-banner" />
            </div>
          </div>
          
          <aside className="w-full lg:w-[30%] space-y-8">
            <AdSlot type="rectangle" slotId="sidebar-top" />
            
            <div className="bg-white dark:bg-white/[0.02] border border-slate-100 dark:border-white/5 rounded-2xl p-6">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-widest mb-4">Why use this tool?</h3>
              <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-400">
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400">✓</span> 100% Free to use
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400">✓</span> No installation required
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400">✓</span> Client-side processing
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400">✓</span> Fast & secure
                </li>
              </ul>
            </div>

            <AdSlot type="rectangle" slotId="sidebar-bottom" className="sticky top-24" />
          </aside>
        </div>
      </div>

      {/* Structured SEO Content */}
      {seoContent && (
        <article className="py-16 md:py-24 border-t border-slate-200 dark:border-white/10">
          <div className="container mx-auto max-w-3xl px-4 prose prose-invert lg:prose-lg prose-p:text-slate-600 dark:text-slate-400 prose-headings:text-slate-900 dark:text-white prose-strong:text-slate-900 dark:text-white">
            
            <h2 className="text-3xl font-bold tracking-tight mb-6">{seoContent.h1}</h2>
            <p className="lead text-xl text-indigo-300 mb-12 font-medium">{seoContent.introduction}</p>

            {seoContent.whatItIs && (
              <div className="mb-12">
                <h3 className="text-2xl font-bold mb-4">What is the {title}?</h3>
                <p>{seoContent.whatItIs}</p>
              </div>
            )}

            {seoContent.whyItMatters && (
              <div className="mb-12">
                <h3 className="text-2xl font-bold mb-4">Why It Matters</h3>
                <p>{seoContent.whyItMatters}</p>
              </div>
            )}

            {/* How to Use Section */}
            {seoContent.howToUse && seoContent.howToUse.length > 0 && (
              <div className="mb-16">
                <h3 className="text-2xl font-bold mb-6">How to use {title}</h3>
                <div className="not-prose space-y-4">
                  {seoContent.howToUse.map((step, idx) => (
                    <div key={idx} className="flex gap-4 p-5 rounded-xl bg-white dark:bg-white/[0.03] border border-slate-100 dark:border-white/5 backdrop-blur-sm">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-indigo-500/20 text-indigo-400 font-bold text-sm border border-indigo-500/30">
                        {idx + 1}
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900 dark:text-white mb-1 tracking-wide">{step.step}</h4>
                        <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {seoContent.useCases && seoContent.useCases.length > 0 && (
              <div className="mb-16">
                <h3 className="text-2xl font-bold mb-6">Common Use Cases</h3>
                <div className="grid md:grid-cols-2 gap-4 not-prose">
                  {seoContent.useCases.map((useCase, idx) => (
                    <div key={idx} className="p-6 rounded-xl bg-white dark:bg-white/[0.02] border border-slate-100 dark:border-white/5">
                      <h4 className="font-bold text-slate-900 dark:text-white mb-2">{useCase.title}</h4>
                      <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{useCase.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Features Section */}
            {seoContent.features && seoContent.features.length > 0 && (
              <div className="mb-16">
                <h3 className="text-2xl font-bold mb-6">Key Features & Benefits</h3>
                <ul className="space-y-4 text-slate-600 dark:text-slate-400">
                  {seoContent.features.map((feature, idx) => (
                     <li key={idx}>
                      <strong className="text-slate-900 dark:text-white">{feature.title}:</strong> {feature.description}
                     </li>
                  ))}
                </ul>
              </div>
            )}

            {seoContent.bestPractices && seoContent.bestPractices.length > 0 && (
              <div className="mb-16">
                <h3 className="text-2xl font-bold mb-6">Best Practices</h3>
                <ul className="space-y-4 text-slate-600 dark:text-slate-400">
                  {seoContent.bestPractices.map((practice, idx) => (
                    <li key={idx}>
                      <strong className="text-slate-900 dark:text-white">{practice.title}:</strong> {practice.description}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* FAQs Section */}
             {seoContent.faqs && seoContent.faqs.length > 0 && (
              <div className="mb-16">
                <h3 className="text-2xl font-bold mb-6">Frequently Asked Questions</h3>
                <div className="space-y-8">
                  {seoContent.faqs.map((faq, idx) => (
                     <div key={idx}>
                        <h4 className="font-bold text-lg text-slate-900 dark:text-white mb-2">{faq.question}</h4>
                        <p className="text-slate-600 dark:text-slate-400 m-0">{faq.answer}</p>
                     </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        </article>
      )}
    </>
  );
}
