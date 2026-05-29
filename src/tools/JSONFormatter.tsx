import { useState } from 'react';
import { ToolLayout } from '../components/ToolLayout';
import { Braces, AlertCircle, Check } from 'lucide-react';

export function JSONFormatter() {
  const [input, setInput] = useState('');
  const [error, setError] = useState('');

  const formatJSON = (spaces: number) => {
    try {
      if (!input.trim()) return;
      const parsed = JSON.parse(input);
      setInput(JSON.stringify(parsed, null, spaces));
      setError('');
    } catch (e: any) {
      setError(e.message);
    }
  };

  const minifyJSON = () => {
    try {
      if (!input.trim()) return;
      const parsed = JSON.parse(input);
      setInput(JSON.stringify(parsed));
      setError('');
    } catch (e: any) {
      setError(e.message);
    }
  };

  const seoContent = {
    h1: "Free Online JSON Formatter, Validator & Minifier",
    introduction: "Our precise JSON Formatter helps developers beautify, format, validate, and minify JSON data instantly. Designed for software engineers, data analysts, and API developers, this tool operates autonomously in your browser without sending sensitive payloads to an external server.",
    whatItIs: "JSON (JavaScript Object Notation) is the standard data interchange format on the web. It is lightweight for machines to parse but can be extremely difficult for humans to read when it is returned as a single, unformatted (minified) string from an API response. This tool is a JSON beautifier and validator. It takes dense, compacted JSON strings, rigorously checks them for syntax errors, and restructures them into a cleanly indented hierarchy.",
    whyItMatters: "Debugging API responses or writing complex configuration files can be notoriously difficult if your JSON structure is broken. A missing comma or an unmatched brace will crash applications. Our validator acts as a safety layer, automatically pinpointing structural errors (like unexpected tokens) before you deploy your code. Furthermore, standardizing indented code (whether 2, 3, or 4 spaces) ensures team-wide readability and cleaner version control diffs.",
    useCases: [
      { title: "API Debugging", description: "When intercepting a dense payload from a REST endpoint using cURL or Postman, paste the raw string here to immediately unpack its visual hierarchy and pinpoint nested data structures." },
      { title: "Configuration Management", description: "Writing complex .json files for Node.js (package.json) or Docker requires strict syntax. Run your hand-written JSON through our validator to ensure it won't crash your build pipeline." },
      { title: "Data Preparation", description: "If you have beautifully formatted JSON but need to dramatically reduce its overall file size for production caching or network transmission, use the 'Minify' function to strip all white space." },
      { title: "Syntax Error Hunting", description: "If an application throws a 'JSON.parse() SyntaxError', finding the bad comma in a 5,000-line file manually is impossible. Simply paste it here, and our error trapper will find the fault." }
    ],
    howToUse: [
      { step: "Paste raw JSON", description: "Paste your minified or unformatted JSON string directly into the dark editor window above." },
      { step: "Validate & Format", description: "Click on 'Format (2 Spaces)', '3 Spaces', or '4 Spaces' to restructure the code. If there are syntax errors, a red warning box will display the exact error." },
      { step: "Minify", description: "If your goal is compression over readability, click 'Minify / Compact' to convert a bloated JSON payload into a highly compressed single-line string." },
      { step: "Copy to Clipboard", description: "Click the 'Copy JSON' button to quickly send the validated and formatted text to your clipboard for deployment." }
    ],
    features: [
      { title: "Strict Syntax Error Trapping", description: "If your JSON is improperly formatted, we will highlight the error cause immediately using the native browser parsing engine." },
      { title: "Beautify & Minify", description: "Easily swap back and forth between human-readable formatted JSON and compacted, production-ready minified JSON." },
      { title: "Zero Payload Tracking", description: "Developer privacy is paramount. Your JSON data stays tightly contained within your browser's local memory and is never logged, tracked, or sent outbound." }
    ],
    bestPractices: [
      { title: "Always Validate Before Deployment", description: "Never commit a hand-typed JSON file to a repository without running it through a validator first to avoid catastrophic runtime errors." },
      { title: "Use Deep Indentation for Complex Files", description: "When dealing with deeply nested JSON arrays, formatting with 4 spaces instead of 2 can make the visual hierarchy much easier to read." },
      { title: "Minify Production Payloads", description: "Whenever you are transmitting static JSON over a network, minify it first. Stripping whitespace saves significant bandwidth and decreases download latency." }
    ],
    faqs: [
      { question: "Is my JSON payload safe to paste here?", answer: "Absolutely. This tool relies entirely on native browser JavaScript engines (`JSON.parse` and `JSON.stringify`) to process your payload. Zero network requests are made, meaning you can safely format proprietary or sensitive data." },
      { question: "Can it handle large JSON files?", answer: "Yes, modern browsers can handle reasonably large JSON payloads (several megabytes) instantaneously. However, pasting payloads larger than 50MB may cause the browser window to momentarily freeze while rendering the text element." },
      { question: "What does 'Unexpected token' mean?", answer: "This is a common error thrown when your JSON contains syntactical faults. It typically means you left a trailing comma at the end of an array, forgot to wrap a key in double quotes, or are missing a closing brace." }
    ]
  };

  return (
    <ToolLayout 
      title="JSON Formatter & Validator" 
      description="Format, validate, and beautify minified JSON data instantly."
      category="Developer Tools"
      icon={<Braces className="h-8 w-8 text-indigo-400" />}
      seoContent={seoContent}
    >
      <div className="p-6 flex flex-col space-y-6">
        
        {/* Controls */}
        <div className="flex flex-wrap gap-2">
          <button onClick={() => formatJSON(2)} className="px-4 py-2 bg-white dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white rounded-lg hover:bg-slate-200 dark:bg-white/[0.08] transition-all font-medium text-sm shadow-sm backdrop-blur-sm">Format (2 Spaces)</button>
          <button onClick={() => formatJSON(3)} className="px-4 py-2 bg-white dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white rounded-lg hover:bg-slate-200 dark:bg-white/[0.08] transition-all font-medium text-sm shadow-sm backdrop-blur-sm">Format (3 Spaces)</button>
          <button onClick={() => formatJSON(4)} className="px-4 py-2 bg-white dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white rounded-lg hover:bg-slate-200 dark:bg-white/[0.08] transition-all font-medium text-sm shadow-sm backdrop-blur-sm">Format (4 Spaces)</button>
          <button onClick={() => minifyJSON()} className="px-4 py-2 bg-white dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white rounded-lg hover:bg-slate-200 dark:bg-white/[0.08] transition-all font-medium text-sm shadow-sm backdrop-blur-sm">Minify / Compact</button>
        </div>

        {error && (
          <div className="p-4 bg-red-500/10 text-red-400 border border-red-500/20 rounded-xl flex items-start gap-3 backdrop-blur-sm shadow-sm">
            <AlertCircle className="h-5 w-5 shrink-0 mt-0.5 text-red-400" />
            <div>
              <p className="font-bold text-sm tracking-wide">Invalid JSON</p>
              <p className="text-sm opacity-90 leading-relaxed mt-1">{error}</p>
            </div>
          </div>
        )}

        {/* Editor */}
        <div className="relative">
          <textarea
            className="w-full h-[500px] p-5 font-mono text-sm border border-slate-200 dark:border-white/10 rounded-xl bg-slate-100/50 dark:bg-[#020617]/50 text-slate-700 dark:text-slate-300 focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 focus:outline-none resize-y transition-all shadow-inner"
            placeholder='{ "paste": "your json payload here..." }'
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              if (error) setError('');
            }}
            spellCheck="false"
          />
        </div>

        {/* Actions */}
        <div className="flex justify-between items-center">
          <div className="text-sm text-slate-600 dark:text-slate-400 flex items-center gap-2 font-medium">
            {!error && input.trim() && (
               <><Check className="h-4 w-4 text-emerald-400"/> <span className="text-emerald-400">Valid JSON</span></>
            )}
          </div>
          <div className="flex gap-3">
             <button 
              onClick={() => {
                setInput('');
                setError('');
              }}
              className="px-5 py-2.5 text-sm font-semibold text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-white/10 rounded-lg hover:bg-slate-100 dark:bg-white/[0.05] hover:text-slate-900 dark:text-white transition-all shadow-sm"
            >
               Clear Editor
            </button>
            <button 
              onClick={() => navigator.clipboard.writeText(input)}
              className="px-5 py-2.5 text-sm font-semibold bg-indigo-500 text-slate-900 dark:text-white rounded-lg hover:bg-indigo-600 transition-all shadow-lg shadow-indigo-500/20"
            >
              Copy JSON
            </button>
          </div>
        </div>

      </div>
    </ToolLayout>
  );
}
