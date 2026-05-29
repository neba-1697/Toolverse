import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';
import { TOOLS, CATEGORIES } from '../data/tools';
import { SEO } from '../components/SEO';

export function Home() {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <>
      <SEO 
        title="ToolVerse - Free Online Utility Tools for Developers & Creators"
        description="A premium suite of 50+ free online tools for formatting text, converting images, handling PDFs, encoding data, and optimizing SEO."
      />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-slate-200 dark:border-white/10 pt-24 pb-32">
        <div className="container relative mx-auto max-w-5xl px-4 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-slate-900 dark:text-white mb-6"
          >
            Your ultimate <span className="text-slate-600 dark:text-slate-400">utility</span> toolkit.
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-xl text-slate-600 dark:text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed"
          >
            Dozens of premium online tools for developers, designers, and everyday users. Fast, secure, and always free. No installation required.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
             <a href="#tools" className="h-9 rounded-full bg-white px-8 py-3 text-sm font-semibold text-black hover:bg-slate-200 transition-all inline-flex items-center justify-center shadow-lg shadow-white/10">
              Explore Tools
            </a>
          </motion.div>
        </div>
      </section>

      {/* Tools Section */}
      <section id="tools" className="py-24">
        <div className="container mx-auto max-w-7xl px-4">
          
          {CATEGORIES.map(category => {
            const categoryTools = TOOLS.filter(t => t.category === category.id);
            const CatIcon = (Icons as any)[category.icon] || Icons.HelpCircle;

            return (
              <div key={category.id} id={category.id} className="mb-24 last:mb-0 scroll-mt-24">
                <div className="mb-10 flex items-center gap-4 border-b border-slate-200 dark:border-white/10 pb-4">
                  <div className="rounded-lg bg-indigo-500/10 p-2">
                    <CatIcon className="h-6 w-6 text-indigo-400" />
                  </div>
                  <div>
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">{category.name}</h2>
                    <p className="text-slate-600 dark:text-slate-400 mt-1">{category.description}</p>
                  </div>
                </div>

                <motion.div 
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, margin: "-100px" }}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6"
                >
                  {categoryTools.map(tool => {
                    const ToolIcon = (Icons as any)[tool.icon] || Icons.Wrench;
                    return (
                      <motion.div key={tool.id} variants={itemVariants} className="flex">
                        <Link 
                          to={tool.path}
                          className="group flex flex-col w-full h-full select-none rounded-2xl border border-slate-100 dark:border-white/5 bg-white dark:bg-white/[0.03] p-5 md:p-6 backdrop-blur-xl no-underline outline-none transition-all hover:bg-slate-100 hover:dark:bg-white/[0.05] hover:border-indigo-500/50 hover:shadow-lg hover:shadow-indigo-500/5 focus:ring-4 focus:ring-indigo-500/20 active:scale-[0.98]"
                        >
                          <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-500/20 text-indigo-400 shrink-0">
                            <ToolIcon className="h-6 w-6" />
                          </div>
                          <div className="text-lg font-bold leading-tight text-slate-900 dark:text-white mb-2">
                            {tool.name}
                          </div>
                          <p className="line-clamp-3 md:line-clamp-2 text-sm leading-relaxed text-slate-500 mt-auto">
                            {tool.description}
                          </p>
                        </Link>
                      </motion.div>
                    );
                  })}
                </motion.div>
              </div>
            );
          })}
        </div>
      </section>

      {/* SEO Bottom Content */}
      <section className="py-24 border-t border-slate-100 dark:border-white/5">
        <div className="container mx-auto max-w-4xl px-4 prose prose-invert">
          <h2 className="text-3xl font-bold tracking-tight text-center text-slate-900 dark:text-white mb-12">Why choose ToolVerse?</h2>
          <div className="grid md:grid-cols-2 gap-12 not-prose">
            <div>
              <h3 className="flex items-center gap-2 font-bold text-sm text-slate-900 dark:text-white mb-2">
                <Icons.Zap className="h-5 w-5 text-indigo-400" /> Fast & Reliable
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Most of our tools run entirely in your browser using modern Web APIs. This means zero upload time, instant results, and no bandwidth limits.
              </p>
            </div>
            <div>
              <h3 className="flex items-center gap-2 font-bold text-sm text-slate-900 dark:text-white mb-2">
                <Icons.ShieldCheck className="h-5 w-5 text-indigo-400" /> Privacy First
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                We believe your data is yours. Files processed client-side never leave your device. Server-side processing is encrypted and immediately deleted.
              </p>
            </div>
            <div>
              <h3 className="flex items-center gap-2 font-bold text-sm text-slate-900 dark:text-white mb-2">
                <Icons.MonitorSmartphone className="h-5 w-5 text-indigo-400" /> Works Anywhere
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Fully responsive and mobile-optimized. Use ToolVerse seamlessly on your desktop, tablet, or smartphone without downloading any apps.
              </p>
            </div>
            <div>
               <h3 className="flex items-center gap-2 font-bold text-sm text-slate-900 dark:text-white mb-2">
                <Icons.Layers className="h-5 w-5 text-indigo-400" /> Constantly Growing
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                We are continually expanding our suite of tools. From deep SEO analysis to complex data formatting, we're building the ultimate Swiss Army knife for the web.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
