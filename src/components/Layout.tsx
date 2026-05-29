import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

export function Layout() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50 dark:bg-[#020617] text-slate-800 dark:text-slate-200 font-sans overflow-hidden">
      <Navbar />
      <main className="flex-1 overflow-y-auto bg-[radial-gradient(circle_at_top_right,_rgba(99,102,241,0.05),_transparent_40%)]">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
