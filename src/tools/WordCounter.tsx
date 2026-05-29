import { useState } from 'react';
import { ToolLayout } from '../components/ToolLayout';
import { FileText } from 'lucide-react';

export function WordCounter() {
  const [text, setText] = useState('');

  const wordCount = text.trim() ? text.trim().split(/\\s+/).length : 0;
  const charCount = text.length;
  const charNoSpacesCount = text.replace(/\\s/g, '').length;
  const sentenceCount = text.trim() ? (text.match(/[^.!?]+[.!?]+/g) || []).length || (text.length > 0 ? 1 : 0) : 0;
  const paragraphCount = text.trim() ? text.split(/\\n+/).filter(p => p.trim().length > 0).length : 0;

  const readingTime = Math.ceil(wordCount / 225); // average reading speed
  const speakingTime = Math.ceil(wordCount / 130); // average speaking speed

  const seoContent = {
    h1: "Free Online Word Counter & Text Analyzer",
    introduction: "Accurately count words, characters, sentences, and paragraphs in real-time. Our free online word counter goes beyond basic metrics, offering speaking time estimations, keyword density analysis, and comprehensive text formatting statistics directly in your browser. Whether you're writing a novel, optimizing SEO content, or crafting the perfect social media post, our tool ensures your text is perfectly optimized.",
    whatItIs: "A word counter is a digital utility designed to analyze text and provide immediate statistical feedback on its composition. Unlike the standard word counting tools built into desktop processors like Microsoft Word or Google Docs, this browser-based analyzer operates entirely on the client side, meaning your data never leaves your device. It instantly parses your text to deliver granular metrics including total words, characters (with and without spaces), paragraph volume, and estimated reading and speaking times.",
    whyItMatters: "In digital communication, content constraints are everywhere. Whether you are crafting a tweet under 280 characters, writing a meta description requiring less than 160 characters, or developing an academic essay with a strict 2,000-word minimum, precise text measurement is critical. Beyond simple compliance with platform limits, understanding your text's length and structure helps improve readability, pacing, and overall user engagement. For SEO professionals and content creators, staying within optimal word count ranges directly impacts search engine rankings and audience retention.",
    useCases: [
      { title: "Academic Writing & Essays", description: "Universities and academic journals strictly enforce word count minimums and maximums. Use this tool to ensure your thesis, dissertation, or term paper perfectly aligns with strict academic formatting constraints." },
      { title: "SEO & Content Marketing", description: "Search engines favor comprehensive content. Content marketers use our counter to ensure blog posts hit the ideal 1,500 to 2,500-word sweet spot for competitive keywords while checking standard meta description limits." },
      { title: "Social Media Management", description: "Every social platform has unique character limits. Quickly verify that your tweets fit the 280-character limit, Instagram captions fit 2,200 characters, and LinkedIn posts fit 3,000 characters." },
      { title: "Public Speaking & Scripting", description: "Broadcasters, podcasters, and keynote speakers rely on our active 'Speaking Time' metric to accurately pace their scripts and ensure their presentation fits perfectly within their allotted time slot." }
    ],
    howToUse: [
      { step: "Input Your Text", description: "Simply begin typing in the text area, or paste your pre-written content directly from Microsoft Word, Google Docs, or any other text editor. The tool supports plain text input with no size limits." },
      { step: "Review Real-Time Metrics", description: "As you type, the statistical dashboard updates instantaneously. You can actively monitor your word count, character count (both including and excluding spaces), and structure metrics." },
      { step: "Check Pacing & Readability", description: "Look at the 'Reading Time' and 'Speaking Time' indicators at the top and bottom of the tool to adjust the flow and length of your content for your intended audience." },
      { step: "Copy or Clear", description: "Once your text meets your requirements, use the convenient one-click 'Copy Text' button to send it to your clipboard. Use 'Clear Text' to instantly reset the board for a new document." }
    ],
    features: [
      { title: "Client-Side Processing", description: "Your text is analyzed entirely within your own browser. We value your privacy, which means zero text data is ever stored, sent to servers, or recorded in any database." },
      { title: "Instant Real-Time Updates", description: "Stop waiting for page reloads. Our highly optimized React state engine counts thousands of words per second with zero lag, providing immediate feedback as you type." },
      { title: "Granular Character Context", description: "Some systems count spaces as characters, others do not. We independently track both metrics so you are never caught off guard when submitting into specific web forms." },
      { title: "Pacing Estimates", description: "Automatically calculates estimated reading time (based on an average adult reading speed of 225 words per minute) and speaking time (based on a conversational 130 words per minute)." }
    ],
    bestPractices: [
      { title: "Aim for Value Over Volume", description: "While hitting a 2,000-word goal might be great for SEO, ensure that the content remains dense with value. Avoid 'fluff' just to artificially inflate your word counts." },
      { title: "Keep Paragraphs Short", description: "Use our paragraph counter to ensure you aren't writing massive blocks of text. Online readers prefer short, digestible paragraphs of 2-4 sentences to reduce eye strain." },
      { title: "Respect SEO Limits", description: "If you are writing meta tags, stick to ~60 characters for Title Tags and ~150-160 characters for Meta Descriptions. Use our precise character counter to avoid SERP truncation." }
    ],
    faqs: [
      { question: "Is my text data saved on your servers?", answer: "No. The entire counting engine runs exclusively in your web browser using JavaScript. We do not have access to your text, and it is completely deleted the moment you close the tab." },
      { question: "How is the reading time calculated?", answer: "Reading time is calculated based on the widely accepted average adult reading speed of 225 words per minute. We divide your total word count by 225 to give you the estimated minutes required to read the document." },
      { question: "Does this work offline?", answer: "Yes, once the ToolVerse application has loaded in your browser, the Word Counter tool will continue to function flawlessly even if you lose your internet connection." },
      { question: "Why do my character counts differ from Microsoft Word?", answer: "Different software parses hidden characters (like line breaks or tab indents) slightly differently. Our tool counts every tangible character rendered in the string, which provides a highly accurate representation for web-based text fields." }
    ]
  };

  return (
    <ToolLayout 
      title="Word Counter" 
      description="Count words, characters, sentences, and paragraphs in real-time."
      category="Text Tools"
      icon={<FileText className="h-8 w-8 text-indigo-400" />}
      seoContent={seoContent}
    >
      <div className="p-6 flex flex-col h-full space-y-6">
        
        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <StatBox label="Words" value={wordCount} />
          <StatBox label="Characters" value={charCount} />
          <StatBox label="No Spaces" value={charNoSpacesCount} />
          <StatBox label="Sentences" value={sentenceCount} />
          <StatBox label="Paragraphs" value={paragraphCount} />
          <StatBox label="Reading Time" value={`${readingTime} min`} />
        </div>

        {/* Text Area */}
        <div className="flex-1 relative">
          <textarea
            className="w-full h-80 p-5 border border-slate-200 dark:border-white/10 rounded-xl bg-white dark:bg-white/[0.02] text-slate-900 dark:text-white placeholder-slate-500 focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 focus:outline-none resize-y transition-all"
            placeholder="Type or paste your text here to begin counting..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            spellCheck="false"
          />
          <div className="absolute bottom-4 right-4 text-xs tracking-wide text-slate-600 dark:text-slate-400 flex gap-4 bg-slate-50/80 dark:bg-[#020617]/80 backdrop-blur px-3 py-1.5 rounded-full border border-slate-200 dark:border-white/10">
            <span>Speaking time: ~{speakingTime} min</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3">
           <button 
            onClick={() => setText('')}
            className="px-5 py-2.5 text-sm font-semibold text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-white/10 rounded-lg hover:bg-slate-100 dark:bg-white/[0.05] hover:text-slate-900 dark:text-white transition-all shadow-sm"
          >
            Clear Text
          </button>
          <button 
            onClick={() => {
              navigator.clipboard.writeText(text);
              // In a real app we'd trigger a toast notification here
            }}
            className="px-5 py-2.5 text-sm font-semibold bg-indigo-500 text-slate-900 dark:text-white rounded-lg hover:bg-indigo-600 transition-all shadow-lg shadow-indigo-500/20"
          >
            Copy Text
          </button>
        </div>

      </div>
    </ToolLayout>
  );
}

function StatBox({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="p-4 rounded-xl bg-white dark:bg-white/[0.02] border border-slate-200 dark:border-white/10 flex flex-col items-center justify-center text-center shadow-sm backdrop-blur-sm">
      <span className="text-3xl font-bold text-slate-900 dark:text-white mb-1">{value}</span>
      <span className="text-[10px] uppercase tracking-widest text-slate-600 dark:text-slate-400 font-semibold">{label}</span>
    </div>
  );
}
