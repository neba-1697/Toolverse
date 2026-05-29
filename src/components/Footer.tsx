import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="py-6 border-t border-slate-100 dark:border-white/5 bg-slate-50 dark:bg-[#020617] px-8 flex flex-col md:flex-row items-center justify-between text-xs font-medium text-slate-600 gap-4">
      <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 md:gap-6">
        <span className="flex items-center gap-2"><div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></div> All Systems Operational</span>
        <span>&copy; {new Date().getFullYear()} Nebil Shebab. All rights reserved.</span>
        <Link to="/legal/privacy" className="hover:text-slate-900 dark:text-white transition-colors">Privacy Policy</Link>
        <Link to="/legal/terms" className="hover:text-slate-900 dark:text-white transition-colors">Terms of Service</Link>
        <Link to="/legal/about" className="hover:text-slate-900 dark:text-white transition-colors">About Us</Link>
        <Link to="/legal/contact" className="hover:text-slate-900 dark:text-white transition-colors">Contact</Link>
      </div>
      <div className="flex flex-wrap items-center justify-center md:justify-end gap-6">
        <span>Version 1.0.4-stable</span>
        <div className="flex items-center gap-4">
          <span className="text-slate-500 hover:text-slate-900 dark:text-white cursor-pointer transition-colors">Twitter</span>
          <span className="text-slate-500 hover:text-slate-900 dark:text-white cursor-pointer transition-colors">GitHub</span>
          <span className="text-slate-500 hover:text-slate-900 dark:text-white cursor-pointer transition-colors">LinkedIn</span>
        </div>
      </div>
    </footer>
  );
}
