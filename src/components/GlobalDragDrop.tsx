import React, { useState, useEffect, useRef } from 'react';
import { Upload, AlertCircle } from 'lucide-react';

interface GlobalDragDropProps {
  onDrop: (files: File[]) => void;
  accept?: string;
  tip?: string;
  children: React.ReactNode;
}

export function GlobalDragDrop({ onDrop, accept, tip = "Drop your files here", children }: GlobalDragDropProps) {
  const [isDragging, setIsDragging] = useState(false);
  const dragCounter = useRef(0);

  const validateFile = (file: File, acceptString?: string): boolean => {
    if (!acceptString) return true;
    const acceptList = acceptString.split(',').map(s => s.trim().toLowerCase());
    for (const item of acceptList) {
      if (item.startsWith('.')) {
        if (file.name.toLowerCase().endsWith(item)) {
          return true;
        }
      } else if (item.endsWith('/*')) {
        const category = item.split('/')[0];
        if (file.type.toLowerCase().startsWith(category + '/')) {
          return true;
        }
      } else {
        if (file.type.toLowerCase() === item) {
          return true;
        }
      }
    }
    return false;
  };

  const handleDragEnter = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounter.current++;
    if (e.dataTransfer && e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      setIsDragging(true);
    }
  };

  const handleDragLeave = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounter.current--;
    if (dragCounter.current === 0) {
      setIsDragging(false);
    }
  };

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    dragCounter.current = 0;

    if (e.dataTransfer && e.dataTransfer.files) {
      const droppedFiles = Array.from(e.dataTransfer.files);
      const validFiles = droppedFiles.filter(file => validateFile(file, accept));
      
      if (validFiles.length > 0) {
        onDrop(validFiles);
      } else if (droppedFiles.length > 0) {
        alert(`Invalid file type. Expected files of type: ${accept}`);
      }
    }
  };

  useEffect(() => {
    window.addEventListener('dragenter', handleDragEnter);
    window.addEventListener('dragleave', handleDragLeave);
    window.addEventListener('dragover', handleDragOver);
    window.addEventListener('drop', handleDrop);

    return () => {
      window.removeEventListener('dragenter', handleDragEnter);
      window.removeEventListener('dragleave', handleDragLeave);
      window.removeEventListener('dragover', handleDragOver);
      window.removeEventListener('drop', handleDrop);
    };
  }, [accept, onDrop]);

  return (
    <div className="relative min-h-[inherit] w-full">
      {/* Visual Overlay */}
      {isDragging && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center p-6 bg-slate-900/75 dark:bg-slate-950/85 backdrop-blur-md transition-all duration-300 animate-in fade-in">
          <div className="relative max-w-lg w-full p-12 rounded-3xl border-2 border-dashed border-indigo-500 bg-white/5 dark:bg-white/[0.02] flex flex-col items-center text-center shadow-[0_0_50px_rgba(99,102,241,0.25)] scale-95 animate-in zoom-in-95 duration-200">
            <div className="absolute inset-0 rounded-3xl bg-indigo-505/5 pointer-events-none animate-pulse" />
            <div className="p-4 bg-indigo-500/10 dark:bg-indigo-500/20 border border-indigo-500/30 text-indigo-400 rounded-2xl mb-6 shadow-inner animate-bounce">
              <Upload className="h-10 w-10 text-indigo-400 dark:text-indigo-300" />
            </div>

            <h3 className="text-2xl font-bold tracking-tight text-white mb-2">
              Ready to upload!
            </h3>
            <p className="text-slate-300 dark:text-slate-400 text-sm max-w-sm">
              {tip}
            </p>
            {accept && (
              <span className="mt-4 px-3 py-1 bg-white/[0.08] text-slate-300 rounded-lg text-xs font-mono border border-white/5 font-semibold">
                Accepts: {accept}
              </span>
            )}
          </div>
        </div>
      )}
      {children}
    </div>
  );
}
