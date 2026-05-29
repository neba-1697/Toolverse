import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';
import { BLOG_POSTS } from '../data/blog';
import { SEO } from '../components/SEO';
import { AdSlot } from '../components/AdSlot';

export function BlogList() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = Array.from(new Set(BLOG_POSTS.map(post => post.category)));

  const filteredPosts = BLOG_POSTS.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory ? post.category === selectedCategory : true;
    return matchesSearch && matchesCategory;
  });

  return (
    <>
      <SEO 
        title="ToolVerse Blog - Insights on SEO, Web Dev & Productivity"
        description="Discover the latest articles, tutorials, and strategies on search engine optimization, web development, and daily productivity."
      />
      
      <div className="bg-slate-50 dark:bg-[#020617] border-b border-slate-200 dark:border-white/10 py-16 mt-[-1px] relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(99,102,241,0.08),_transparent_40%)] pointer-events-none"></div>
        <div className="container mx-auto max-w-5xl px-4 text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-white mb-4">ToolVerse Journal</h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-12">
            Insights, guides, and engineering logs from the team building the internet's fastest suite of utilities.
          </p>

          <div className="max-w-2xl mx-auto flex flex-col md:flex-row gap-4 justify-center items-center">
            <div className="relative w-full md:w-96">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-slate-500" />
              </div>
              <input
                type="text"
                placeholder="Search articles..."
                className="block w-full pl-10 pr-3 py-3 border border-slate-200 dark:border-white/10 rounded-xl bg-white dark:bg-white/[0.03] text-slate-900 dark:text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all sm:text-sm shadow-inner"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="flex flex-wrap gap-2 justify-center">
              <button
                onClick={() => setSelectedCategory(null)}
                className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all border ${!selectedCategory ? 'bg-indigo-500 text-slate-900 dark:text-white border-indigo-500 shadow-lg shadow-indigo-500/20' : 'bg-white dark:bg-white/[0.03] text-slate-600 dark:text-slate-400 border-slate-200 dark:border-white/10 hover:bg-slate-200 dark:bg-white/[0.08]'}`}
              >
                All
              </button>
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all border ${selectedCategory === cat ? 'bg-indigo-500 text-slate-900 dark:text-white border-indigo-500 shadow-lg shadow-indigo-500/20' : 'bg-white dark:bg-white/[0.03] text-slate-600 dark:text-slate-400 border-slate-200 dark:border-white/10 hover:bg-slate-200 dark:bg-white/[0.08]'}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="py-8 bg-slate-50 dark:bg-[#020617]">
        <div className="container mx-auto max-w-6xl px-4">
          <AdSlot type="banner" slotId="blog-list-top" className="my-4 hidden md:flex" />
        </div>
      </div>

      <div className="py-12 bg-slate-50 dark:bg-[#020617] min-h-[500px]">
        <div className="container mx-auto max-w-6xl px-4">
          
          {filteredPosts.length === 0 ? (
            <div className="text-center py-20 border border-slate-200 dark:border-white/10 rounded-2xl bg-white dark:bg-white/[0.02]">
              <div className="w-16 h-16 bg-slate-100 dark:bg-white/[0.05] rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="h-8 w-8 text-slate-500" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">No articles found</h3>
              <p className="text-slate-600 dark:text-slate-400">Try adjusting your search query or category filters.</p>
              <button onClick={() => { setSearchQuery(''); setSelectedCategory(null); }} className="mt-6 text-indigo-400 font-medium hover:text-indigo-300">
                Clear all filters
              </button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map(post => (
                <Link 
                  key={post.id} 
                  to={`/blog/${post.slug}`}
                  className="group flex flex-col h-full bg-white dark:bg-white/[0.03] border border-slate-100 dark:border-white/5 rounded-2xl overflow-hidden hover:bg-slate-100 dark:bg-white/[0.05] hover:border-indigo-500/50 hover:shadow-lg hover:shadow-indigo-500/5 backdrop-blur-xl transition-all no-underline"
                >
                  {post.featuredImage && (
                    <div className="w-full h-48 overflow-hidden bg-white dark:bg-white/[0.02] border-b border-slate-100 dark:border-white/5 relative">
                      <div className="absolute inset-0 bg-gradient-to-t from-[#020617]/80 to-transparent z-10" />
                      <img src={post.featuredImage} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                  )}
                  {!post.featuredImage && (
                    <div className="w-full h-48 flex items-center justify-center bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border-b border-slate-100 dark:border-white/5 relative overflow-hidden group-hover:from-indigo-500/20 group-hover:to-purple-500/20 transition-all duration-500">
                      <span className="text-5xl opacity-10 font-bold tracking-tighter text-indigo-500">{post.category.substring(0,3).toUpperCase()}</span>
                    </div>
                  )}

                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center gap-3 mb-4 mt-[-40px] z-20">
                      <span className="text-xs font-semibold px-3 py-1 rounded-full bg-indigo-500 text-slate-900 dark:text-white shadow-lg shadow-indigo-500/20">
                        {post.category}
                      </span>
                    </div>
                    
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3 leading-snug group-hover:text-indigo-400 transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-slate-600 dark:text-slate-400 text-sm line-clamp-3 mb-6 flex-1">
                      {post.excerpt}
                    </p>
                    
                    <div className="mt-auto flex items-center justify-between border-t border-slate-200 dark:border-white/10 pt-4">
                      <div className="flex items-center gap-2">
                        {post.authorAvatar ? (
                           <img src={post.authorAvatar} alt={post.author} className="w-6 h-6 rounded-full border border-slate-300 dark:border-white/20" />
                        ) : (
                          <div className="w-6 h-6 rounded-full bg-slate-100 dark:bg-white/[0.05] border border-slate-200 dark:border-white/10 flex items-center justify-center text-[10px] font-bold text-slate-600 dark:text-slate-400">
                            {post.author.charAt(0)}
                          </div>
                        )}
                        <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">{post.author}</span>
                      </div>
                      <div className="text-sm text-slate-500 font-medium">
                        {post.readTime}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {/* Pagination Placeholder */}
          {filteredPosts.length > 0 && (
            <div className="mt-16 flex justify-center">
               <nav className="flex items-center gap-2">
                 <button className="px-4 py-2 border border-slate-200 dark:border-white/10 rounded-lg text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:text-white hover:bg-slate-100 dark:bg-white/[0.05] transition-all disabled:opacity-50" disabled>Previous</button>
                 <button className="px-4 py-2 bg-indigo-500 text-slate-900 dark:text-white rounded-lg text-sm font-bold shadow-lg shadow-indigo-500/20">1</button>
                 <button className="px-4 py-2 border border-slate-200 dark:border-white/10 rounded-lg text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:text-white hover:bg-slate-100 dark:bg-white/[0.05] transition-all">2</button>
                 <button className="px-4 py-2 border border-slate-200 dark:border-white/10 rounded-lg text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:text-white hover:bg-slate-100 dark:bg-white/[0.05] transition-all">Next</button>
               </nav>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
