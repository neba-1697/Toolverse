import { cn } from '../lib/utils';
import { useEffect, useRef } from 'react';

interface AdSlotProps {
  type: 'banner' | 'rectangle' | 'sidebar';
  className?: string;
  slotId?: string; // e.g. "1234567890" for data-ad-slot
}

export function AdSlot({ type, className, slotId }: AdSlotProps) {
  const insRef = useRef<HTMLModElement>(null);

  useEffect(() => {
    const el = insRef.current;
    if (!el) return;

    let pushed = false;
    let observer: ResizeObserver | null = null;

    const tryPush = () => {
      if (pushed) return;
      if (el.offsetWidth > 0) {
        try {
          // @ts-ignore
          (window.adsbygoogle = window.adsbygoogle || []).push({});
          pushed = true;
          if (observer) {
            observer.disconnect();
          }
        } catch (e: any) {
          const errMsg = e?.message || String(e);
          // If we encounter a timing or duplicate render error, treat it as completed and do not log to keep console clean
          if (errMsg.includes('already have ads') || errMsg.includes('No slot size for availableWidth=0')) {
            pushed = true;
            return;
          }
          console.error("AdSense error", e);
          pushed = true;
        }
      }
    };

    if (typeof ResizeObserver !== 'undefined') {
      observer = new ResizeObserver(() => {
        tryPush();
      });
      observer.observe(el);
    } else {
      const timeoutId = setTimeout(tryPush, 300);
      return () => clearTimeout(timeoutId);
    }

    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  }, []);

  return (
    <div
      className={cn(
        "relative overflow-hidden bg-white dark:bg-white/[0.02] border border-slate-100 dark:border-white/5 rounded-xl flex items-center justify-center group",
        "before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/[0.02] before:to-transparent",
        type === 'banner' && "w-full max-w-[728px] h-[90px] mx-auto", // standard leaderboard
        type === 'rectangle' && "w-full max-w-[336px] h-[280px] mx-auto", // large rectangle
        type === 'sidebar' && "w-full max-w-[300px] h-[600px] mx-auto", // half page ad
        className
      )}
      aria-hidden="true"
    >
      <ins ref={insRef}
           className="adsbygoogle"
           style={{ display: 'block', width: '100%', height: '100%' }}
           data-ad-client="ca-pub-XXXXXXXXXXXXXXXX" 
           data-ad-slot={slotId || "0987654321"}
           data-ad-format="auto"
           data-full-width-responsive="true"></ins>
           
      <div className="absolute inset-0 flex flex-col items-center justify-center -z-10 opacity-40 group-hover:opacity-60 transition-opacity">
        <span className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mb-1">Advertisement</span>
        <span className="text-xs text-slate-600">AdSlot: {type}</span>
      </div>
    </div>
  );
}
