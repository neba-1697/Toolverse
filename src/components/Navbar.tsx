import { Link, useLocation } from 'react-router-dom';
import { Layers, Menu, X, Github } from 'lucide-react';
import { useState } from 'react';
import { cn } from '../lib/utils';
import { ThemeToggle } from './ThemeToggle';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const links = [
    { name: 'Tools', path: '/' },
    { name: 'Blog', path: '/blog' },
    { name: 'About', path: '/about' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 dark:border-white/10 bg-white/80 dark:bg-white/5 backdrop-blur-md">
      <div className="container mx-auto max-w-7xl px-4 flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <span className="font-bold text-slate-900 dark:text-white">T</span>
          </div>
          <span className="font-bold text-xl tracking-tight text-slate-900 dark:text-white">ToolVerse <span className="text-xs font-normal text-slate-500 hidden sm:inline">by Nebil Shebab</span></span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium text-slate-600 dark:text-slate-400">
          {links.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                "transition-colors hover:text-slate-900 dark:text-white",
                location.pathname === link.path ? "text-slate-900 dark:text-white" : "text-slate-600 dark:text-slate-400"
              )}
            >
              {link.name}
            </Link>
          ))}
          <div className="h-4 w-px bg-slate-200 dark:bg-white/10 hidden md:block"></div>
          <a href="#" className="flex items-center gap-2 hover:text-slate-900 dark:text-white transition-colors">
            <Github className="h-4 w-4 hidden md:block" />
            <span className="hidden md:inline">Star on GitHub</span>
          </a>
          <ThemeToggle />
        </nav>

        {/* Mobile menu button */}
        <button
          className="md:hidden p-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:text-white transition-colors"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden border-b border-slate-200 dark:border-white/10 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            {links.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:text-white transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
