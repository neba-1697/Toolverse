import { useState } from 'react';
import { ToolLayout } from '../components/ToolLayout';
import { Type } from 'lucide-react';

export function CaseConverter() {
  const [text, setText] = useState('');

  const handleConvert = (type: string) => {
    switch (type) {
      case 'uppercase':
        setText(text.toUpperCase());
        break;
      case 'lowercase':
        setText(text.toLowerCase());
        break;
      case 'titlecase':
        setText(
          text.toLowerCase().split(' ').map(word => 
            word.charAt(0).toUpperCase() + word.slice(1)
          ).join(' ')
        );
        break;
      case 'sentencecase':
        setText(
          text.toLowerCase().replace(/(^\\s*\\w|[\\.!?]\\s*\\w)/g, c => c.toUpperCase())
        );
        break;
      case 'alternating':
        setText(
          text.split('').map((c, i) => i % 2 !== 0 ? c.toUpperCase() : c.toLowerCase()).join('')
        );
        break;
    }
  };

  const seoContent = {
    h1: "Free Online Case Converter & Capitalization Tool",
    introduction: "Accidentally left the caps lock on? Don't worry. Our free online case converter instantly transforms your text to UPPERCASE, lowercase, Title Case, Sentence case, and aLTeRnAtInG cAsE directly in your browser. Perfect for cleaning up messy formatting, standardizing datasets, or perfectly capitalizing essay titles.",
    whatItIs: "A case converter is a specialized typography tool designed to programmatically alter the capitalization of text. Rather than manually deleting and retyping entire paragraphs because you accidentally struck the Caps Lock key, you can paste your content into this utility and transform its casing with a single click. It supports multiple stylistic patterns to serve both grammatical correction and creative formatting needs.",
    whyItMatters: "Proper capitalization is a crucial element of readable, professional communication. Presenting a document entirely in lowercase looks informal and rushed, while writing in ALL CAPS is universally interpreted as shouting online. Standardizing text casing is also vital for database management, coding, and SEO string formatting. By utilizing an automated case converter, you ensure consistency, adhere to strict stylistic guidelines (such as APA or MLA title casing), and save a significant amount of manual editing time.",
    useCases: [
      { title: "Fixing 'Caps Lock' Errors", description: "You looked down at your keyboard, typed an entire paragraph, and looked up to realize Caps Lock was on. Instead of retyping everything, simply paste it here and click 'Sentence case'." },
      { title: "Formatting Blog Titles", description: "Ensure your headlines look professional. Use the 'Title Case' function to perfectly capitalize the first letter of major words in your essay titles, YouTube video headlines, or blog posts." },
      { title: "Data Cleaning", description: "Database administrators often receive messy, inconsistently formatted spreadsheets. Converting an entire column of names or email addresses to 'lowercase' ensures data uniformity before import." },
      { title: "Social Media Formatting", description: "Looking to mock up internet culture text? Easily generate the popular 'SpongeBob' mocking text format by converting any standard sentence into 'aLtErNaTiNg CaSe'." }
    ],
    howToUse: [
      { step: "Paste your text", description: "Insert the text you want to convert into the large text area. There are no size limits, so you can paste entire documents or spreadsheets." },
      { step: "Select your format", description: "Click on one of the quick-action buttons (Sentence case, lower case, UPPER CASE, Title Case) to instantly transform the grammatical structure of your text." },
      { step: "Review Character Count", description: "Glance at the bottom left of the tool to confirm that your character count and word count remain correct after formatting." },
      { step: "Copy result", description: "Click the blue 'Copy Text' button to securely copy your properly capitalized text back to your device's clipboard." }
    ],
    features: [
      { title: "Sentence case", description: "Capitalizes the first letter of each sentence and forces the rest of the text into lowercase. Ideal for fixing ALL CAPS paragraphs." },
      { title: "Title Case", description: "Capitalizes the first letter of almost every word. It is commonly used for book titles, article headlines, and movie names." },
      { title: "Client-Side Processing", description: "All formatting is done instantly in your browser via JavaScript. We respect your security—no text data is ever sent to our servers." }
    ],
    bestPractices: [
      { title: "Use Title Case for Headers", description: "For maximum readability, use Title Case for H1 and H2 tags in web development, but switch to Sentence case for standard H3 tags or body copy." },
      { title: "Avoid ALL CAPS in Body Text", description: "Screen readers for visually impaired users generally read consecutive capital letters as acronyms. Avoid writing full sentences in UPPER CASE for better web accessibility." }
    ],
    faqs: [
      { question: "What is Title Case?", answer: "Title Case prioritizes capitalizing the first letter of almost every word. While advanced linguistic title casing ignores minor words (like 'and', 'the', 'of'), this tool broadly capitalizes all words for quick, uniform capitalization." },
      { question: "What is Sentence case?", answer: "Sentence case only capitalizes the very first letter of the sentence. It forces the remainder of the sentence into lowercase. Note: Because this is a syntax-based tool, it cannot automatically detect proper nouns (like 'London' or 'John') to keep them capitalized." },
      { question: "Is my text data stored anywhere?", answer: "No. The Case Converter utility runs 100% inside your web browser. When you close the tab, your text is completely destroyed." }
    ]
  };

  return (
    <ToolLayout 
      title="Case Converter" 
      description="Convert text to UPPERCASE, lowercase, Title Case, and more."
      category="Text Tools"
      icon={<Type className="h-8 w-8 text-indigo-400" />}
      seoContent={seoContent}
    >
      <div className="p-6 flex flex-col space-y-6">
        
        {/* formatting buttons */}
        <div className="flex flex-wrap gap-2">
          <button onClick={() => handleConvert('sentencecase')} className="px-4 py-2 bg-white dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white rounded-lg hover:bg-slate-200 dark:bg-white/[0.08] transition-all font-medium text-sm shadow-sm backdrop-blur-sm">Sentence case</button>
          <button onClick={() => handleConvert('lowercase')} className="px-4 py-2 bg-white dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white rounded-lg hover:bg-slate-200 dark:bg-white/[0.08] transition-all font-medium text-sm shadow-sm backdrop-blur-sm">lower case</button>
          <button onClick={() => handleConvert('uppercase')} className="px-4 py-2 bg-white dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white rounded-lg hover:bg-slate-200 dark:bg-white/[0.08] transition-all font-medium text-sm shadow-sm backdrop-blur-sm">UPPER CASE</button>
          <button onClick={() => handleConvert('titlecase')} className="px-4 py-2 bg-white dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white rounded-lg hover:bg-slate-200 dark:bg-white/[0.08] transition-all font-medium text-sm shadow-sm backdrop-blur-sm">Title Case</button>
          <button onClick={() => handleConvert('alternating')} className="px-4 py-2 bg-white dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white rounded-lg hover:bg-slate-200 dark:bg-white/[0.08] transition-all font-medium text-sm shadow-sm backdrop-blur-sm">aLtErNaTiNg CaSe</button>
        </div>

        {/* Text Area */}
        <div className="relative">
          <textarea
            className="w-full h-80 p-5 border border-slate-200 dark:border-white/10 rounded-xl bg-white dark:bg-white/[0.02] text-slate-900 dark:text-white placeholder-slate-500 focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 focus:outline-none resize-y transition-all"
            placeholder="Type or paste your text here..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            spellCheck="false"
          />
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3">
          <span className="mr-auto my-auto text-sm text-slate-600 dark:text-slate-400 font-medium">
            Count: {text.length} characters | {text.trim() ? text.trim().split(/\s+/).length : 0} words
          </span>
           <button 
            onClick={() => setText('')}
            className="px-5 py-2.5 text-sm font-semibold text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-white/10 rounded-lg hover:bg-slate-100 dark:bg-white/[0.05] hover:text-slate-900 dark:text-white transition-all shadow-sm"
          >
             Clear Text
          </button>
          <button 
            onClick={() => navigator.clipboard.writeText(text)}
            className="px-5 py-2.5 text-sm font-semibold bg-indigo-500 text-slate-900 dark:text-white rounded-lg hover:bg-indigo-600 transition-all shadow-lg shadow-indigo-500/20"
          >
            Copy Text
          </button>
        </div>

      </div>
    </ToolLayout>
  );
}
