import { useParams, Link, Navigate } from 'react-router-dom';
import Markdown from 'react-markdown';
import { BLOG_POSTS } from '../data/blog';
import { SEO } from '../components/SEO';
import { ChevronRight } from 'lucide-react';
import { AdSlot } from '../components/AdSlot';

export function BlogPost() {
  const { slug } = useParams();
  const post = BLOG_POSTS.find(p => p.slug === slug);

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  // Find related posts (same category, excluding current)
  const relatedPosts = BLOG_POSTS.filter(p => p.category === post.category && p.id !== post.id).slice(0, 3);

  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.excerpt,
    "image": post.featuredImage || "https://toolverse.com/og-default.jpg",
    "author": {
      "@type": "Person",
      "name": post.author
    },
    "datePublished": post.date,
    "publisher": {
      "@type": "Organization",
      "name": "ToolVerse",
      "logo": {
        "@type": "ImageObject",
        "url": "https://toolverse.com/logo.png"
      }
    }
  };

  return (
    <>
      <SEO 
        title={`${post.title} | ToolVerse Blog`}
        description={post.excerpt}
        type="article"
        canonical={`/blog/${post.slug}`}
        schema={schema}
      />
      
      <div className="py-12 md:py-16">
        <article className="container mx-auto max-w-4xl px-4">
          
          <nav className="flex items-center gap-2 text-xs text-slate-500 mb-8 font-medium tracking-wide">
            <Link to="/" className="hover:text-slate-900 dark:text-white transition-colors">Home</Link>
            <ChevronRight className="h-3 w-3" />
            <Link to="/blog" className="hover:text-slate-900 dark:text-white transition-colors">Blog</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-indigo-400 truncate max-w-[200px]">{post.category}</span>
          </nav>

          <header className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-indigo-500 text-slate-900 dark:text-white shadow-lg shadow-indigo-500/20">
                {post.category}
              </span>
              <span className="text-sm font-medium text-slate-500">
                {new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </span>
              <span className="text-sm text-slate-500">·</span>
              <span className="text-sm font-medium text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-white/[0.05] px-2 py-1 rounded-md">{post.readTime}</span>
            </div>
            
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 dark:text-white mb-6 leading-[1.1]">
              {post.title}
            </h1>
            
            <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
              {post.excerpt}
            </p>
            
          </header>

          {post.featuredImage && (
            <div className="mb-12 w-full h-[400px] rounded-2xl overflow-hidden border border-slate-200 dark:border-white/10 shadow-2xl relative">
              <div className="absolute inset-0 bg-gradient-to-t from-[#020617] to-transparent opacity-60 z-10"></div>
              <img src={post.featuredImage} alt={post.title} className="w-full h-full object-cover" />
            </div>
          )}

          <div className="mb-12 mt-4 hidden md:block">
             <AdSlot type="banner" slotId="blog-post-top" />
          </div>

          <div className="flex flex-col lg:flex-row gap-12">
            <div className="w-full lg:w-[70%]">
              <div className="prose prose-invert lg:prose-lg max-w-none prose-headings:text-slate-900 dark:text-white prose-p:text-slate-600 dark:text-slate-400 prose-a:text-indigo-400 hover:prose-a:text-indigo-300 prose-strong:text-slate-900 dark:text-white prose-li:text-slate-600 dark:text-slate-400">
                <Markdown>{post.content}</Markdown>
              </div>

              {post.tags && post.tags.length > 0 && (
                <div className="mt-12 flex items-center gap-2 flex-wrap">
                  <span className="text-sm font-bold text-slate-900 dark:text-white mr-2">Tags:</span>
                  {post.tags.map(tag => (
                    <span key={tag} className="px-3 py-1 bg-white dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 rounded-lg text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:text-white hover:bg-slate-200 dark:bg-white/[0.08] transition-all cursor-pointer">
                      #{tag}
                    </span>
                  ))}
                </div>
              )}

              <div className="mt-12">
                <AdSlot type="banner" slotId="blog-post-bottom" />
              </div>

              {/* Author Box */}
              <div className="mt-16 p-8 rounded-2xl bg-white dark:bg-white/[0.02] border border-slate-200 dark:border-white/10 flex flex-col md:flex-row gap-6 items-center md:items-start text-center md:text-left">
                {post.authorAvatar ? (
                  <img src={post.authorAvatar} alt={post.author} className="w-20 h-20 rounded-full border-2 border-indigo-500/30 shadow-lg" />
                ) : (
                  <div className="w-20 h-20 rounded-full bg-indigo-500/10 border-2 border-indigo-500/30 flex items-center justify-center text-2xl font-bold text-indigo-400 shrink-0">
                    {post.author.charAt(0)}
                  </div>
                )}
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Written by {post.author}</h3>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                    {post.authorBio || "Staff writer and engineer at ToolVerse. Passionate about web performance, tooling, and sharing knowledge with the community."}
                  </p>
                  <div className="flex justify-center md:justify-start gap-4">
                     <span className="text-indigo-400 font-medium text-sm hover:underline cursor-pointer">Twitter</span>
                     <span className="text-indigo-400 font-medium text-sm hover:underline cursor-pointer">LinkedIn</span>
                     <span className="text-indigo-400 font-medium text-sm hover:underline cursor-pointer">GitHub</span>
                  </div>
                </div>
              </div>
            </div>

            <aside className="w-full lg:w-[30%] space-y-8">
              <AdSlot type="rectangle" slotId="blog-sidebar-top" />
              
              <div className="bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border border-indigo-500/20 rounded-2xl p-6 text-center">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Build Faster</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">
                  Join thousands of developers using ToolVerse to format, analyze, and optimize their daily workflows.
                </p>
                <Link to="/" className="inline-block w-full py-3 bg-indigo-500 text-slate-900 dark:text-white font-bold rounded-xl shadow-lg shadow-indigo-500/20 hover:bg-indigo-600 transition-all">
                  Explore Tools
                </Link>
              </div>

              <AdSlot type="rectangle" slotId="blog-sidebar-sticky" className="sticky top-24" />
            </aside>
          </div>
        </article>
      </div>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <div className="bg-slate-50 dark:bg-[#020617] border-t border-slate-200 dark:border-white/10 py-16 md:py-24">
          <div className="container mx-auto max-w-5xl px-4">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-12 text-center md:text-left">Related Articles</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedPosts.map(related => (
                <Link 
                  key={related.id} 
                  to={`/blog/${related.slug}`}
                  className="group flex flex-col h-full bg-white dark:bg-white/[0.03] border border-slate-100 dark:border-white/5 rounded-2xl overflow-hidden hover:bg-slate-100 dark:bg-white/[0.05] hover:border-indigo-500/50 hover:shadow-lg hover:shadow-indigo-500/5 backdrop-blur-xl transition-all no-underline"
                >
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                        {related.category}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3 leading-snug group-hover:text-indigo-400 transition-colors">
                      {related.title}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400 text-sm line-clamp-2 mt-auto">
                      {related.excerpt}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
