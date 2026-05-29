import { useState } from 'react';
import { Copy, AlignLeft, RotateCcw } from 'lucide-react';
import { ToolLayout } from '../components/ToolLayout';

export function LoremIpsum() {
  const [paragraphs, setParagraphs] = useState(3);
  const [format, setFormat] = useState<'text' | 'html'>('text');
  const [output, setOutput] = useState('');

  const loremText = [
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    "Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius, turpis et commodo pharetra, est eros bibendum elit, nec luctus magna felis sollicitudin mauris. Integer in mauris eu nibh euismod gravida. Duis ac tellus et risus vulputate vehicula. Donec lobortis risus a elit. Etiam tempor. Ut ullamcorper, ligula eu tempor congue, eros est euismod turpis, id tincidunt sapien risus a quam. Maecenas fermentum consequat mi. Donec fermentum. Pellentesque malesuada nulla a mi.",
    "Phasellus in felis. Donec semper sapien a libero. Nam interdum ligula sed metus. Aliquam id arcu. Morbi et nisl. Fusce interdum justo a pede. Phasellus ut odio vel nisl faucibus ultrices. Donec sit amet quam. In hac habitasse platea dictumst. Morbi pretium varius ligula. In hac habitasse platea dictumst. Nullam et augue. Quisque posuere libero non magna.",
    "Aenean ut lectus. Nulla tristique magna eu ligula. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Vivamus vel wisi. Vivamus convallis mattis leo. Phasellus nonummy pede nonummy magna. Phasellus non felis. Praesent ut ligula. Aliquam id massa et magna dignissim molestie. Pellentesque porttitor pede a eros. Aenean posuere aliquet velit. Vivamus ut lorem vitae mi consequat mattis. Vivamus et risus.",
    "Vestibulum id nisl. Praesent nec augue eget ante tempus aliquet. Phasellus pellentesque metus. Quisque vel wisi. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos hymenaeos. Aliquam pede wisi, rutrum quis, feugiat in, laoreet id, wisi. Aliquam feugiat dolor quis purus. Maecenas et diam. Donec in mauris eu wisi scelerisque vulputate. Morbi in urna aliquet pede tincidunt sagittis."
  ];

  const generateLorem = () => {
    let result = '';
    for (let i = 0; i < paragraphs; i++) {
      const pText = loremText[i % loremText.length];
      if (format === 'html') {
        result += `<p>${pText}</p>\n`;
      } else {
        result += `${pText}\n\n`;
      }
    }
    setOutput(result.trim());
  };

  useState(() => {
    generateLorem();
  });

  const handleGenerate = () => {
    generateLorem();
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
  };

  const seoContent = {
    h1: "Free Online Lorem Ipsum Generator",
    introduction: "Generate placeholder 'Lorem Ipsum' text for your design mockups, prototypes, and web layouts. Highly customizable and instantly copyable.",
    whatItIs: "Lorem Ipsum is standard dummy text used by the typesetting and web design industry to simulate real content loading without distracting viewers with readable prose.",
    whyItMatters: "When pitching a design or demonstrating a responsive grid layout, the focus should remain on structure, typography pairing, and spacing—not the meaning of the words. Placeholder text balances content volume without semantic distraction.",
    useCases: [
      { title: "UI Mockups", description: "Inject realistic text volumes into Figma or Photoshop designs to gauge vertical bounding boxes." },
      { title: "Frontend Prototyping", description: "Use the HTML export mode to quickly pad a webpage with paragraph tags." }
    ],
    features: [
      { title: "Variable Volumes", description: "Generate from 1 to 100 paragraphs instantly." },
      { title: "HTML Wrapping", description: "Export directly as structurally compliant <p> tags for immediate integration into your codebase." }
    ]
  };

  return (
    <ToolLayout 
      title="Lorem Ipsum Generator" 
      description="Generate placeholder text for design mockups."
      category="Text Tools"
      icon={<AlignLeft className="h-8 w-8 text-indigo-400" />}
      seoContent={seoContent}
    >
      <div className="p-6 md:p-8">
        
        <div className="flex flex-col md:flex-row gap-6 mb-8 bg-slate-50 dark:bg-[#020617]/50 border border-slate-200 dark:border-white/10 rounded-xl p-6 shadow-inner">
          <div className="flex-1 w-full">
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Number of Paragraphs</label>
            <input 
              type="number" 
              min="1" 
              max="50" 
              value={paragraphs} 
              onChange={(e) => setParagraphs(Math.max(1, Math.min(50, parseInt(e.target.value) || 1)))}
              className="w-full px-4 py-3 bg-white dark:bg-white/[0.02] border border-slate-200 dark:border-white/10 rounded-xl text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500/50"
            />
          </div>

          <div className="flex-1 w-full flex flex-col">
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Output Format</label>
            <div className="flex bg-white dark:bg-[#020617] border border-slate-200 dark:border-white/10 rounded-xl p-1 h-full">
               <button 
                 onClick={() => setFormat('text')}
                 className={`flex-1 rounded-lg text-sm font-semibold transition-all ${format === 'text' ? 'bg-indigo-500 text-white shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'}`}
               >
                 Plain Text
               </button>
               <button 
                 onClick={() => setFormat('html')}
                 className={`flex-1 rounded-lg text-sm font-semibold transition-all ${format === 'html' ? 'bg-indigo-500 text-white shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'}`}
               >
                 HTML Tags
               </button>
            </div>
          </div>
          
          <div className="flex items-end">
            <button 
              onClick={handleGenerate}
              className="w-full md:w-auto px-6 py-3 bg-indigo-500 text-white font-bold rounded-xl shadow-lg shadow-indigo-500/20 hover:bg-indigo-600 transition-all flex items-center justify-center gap-2"
            >
              <RotateCcw className="h-4 w-4" /> Generate
            </button>
          </div>
        </div>

        <div className="relative group">
          <textarea
            readOnly
            value={output}
            className="w-full h-[400px] p-6 font-serif text-slate-800 dark:text-slate-300 bg-white dark:bg-white/[0.02] border border-slate-200 dark:border-white/10 rounded-xl focus:outline-none resize-y shadow-sm"
          />
          <button 
              onClick={copyToClipboard}
              className="absolute bottom-6 right-6 px-5 py-2.5 text-sm font-semibold bg-indigo-500 text-white rounded-lg shadow-lg shadow-indigo-500/20 hover:bg-indigo-600 transition-all flex items-center gap-2"
            >
              <Copy className="h-4 w-4" /> Copy Text
            </button>
        </div>

      </div>
    </ToolLayout>
  );
}
