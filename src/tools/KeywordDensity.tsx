import { useState } from 'react';
import { FileSearch, Sparkles, AlertCircle, BarChart3, HelpCircle } from 'lucide-react';
import { ToolLayout } from '../components/ToolLayout';

interface KeywordFrequency {
  phrase: string;
  count: number;
  density: number;
}

export function KeywordDensity() {
  const [text, setText] = useState<string>(
    `ToolVerse is a private, offline-first application for web engineering and utility building. ` +
    `Web engineering utilities traditionally upload raw images, documents, and secrets to physical databases. ` +
    `ToolVerse guarantees that your data stays secure. In ToolVerse, everything is processed inside your local browser memory. ` +
    `Get complete SEO analysis, PDF operations, image manipulation, and developer utilities in ToolVerse.`
  );
  const [ignoreStopWords, setIgnoreStopWords] = useState<boolean>(true);
  const [phraseLength, setPhraseLength] = useState<number>(1);
  const [densityList, setDensityList] = useState<KeywordFrequency[]>([]);
  const [totalWordCount, setTotalWordCount] = useState<number>(0);

  const stopWords = new Set([
    'a', 'about', 'above', 'after', 'again', 'against', 'all', 'am', 'an', 'and', 'any', 'are', 'arent', 'as', 'at', 'be', 'because', 'been', 'before', 'being', 'below', 'between', 'both', 'but', 'by', 'cant', 'cannot', 'could', 'couldnt', 'did', 'didnt', 'do', 'does', 'doesnt', 'doing', 'dont', 'down', 'during', 'each', 'few', 'for', 'from', 'further', 'had', 'hadnt', 'has', 'hasnt', 'have', 'havent', 'having', 'he', 'hed', 'hell', 'hes', 'her', 'here', 'heres', 'hers', 'herself', 'him', 'himself', 'his', 'how', 'hows', 'i', 'id', 'ill', 'im', 'ive', 'if', 'in', 'into', 'is', 'isnt', 'it', 'its', 'itself', 'lets', 'me', 'more', 'most', 'mustnt', 'my', 'myself', 'no', 'nor', 'not', 'of', 'off', 'on', 'once', 'only', 'or', 'other', 'ought', 'our', 'ours', 'ourselves', 'out', 'over', 'own', 'same', 'shant', 'she', 'shed', 'shell', 'shes', 'should', 'shouldnt', 'so', 'some', 'such', 'than', 'that', 'thats', 'the', 'their', 'theirs', 'them', 'themselves', 'then', 'there', 'theres', 'these', 'they', 'theyd', 'theyll', 'theyre', 'theyve', 'this', 'those', 'through', 'to', 'too', 'under', 'until', 'up', 'very', 'was', 'wasnt', 'we', 'wed', 'well', 'were', 'weve', 'werent', 'what', 'whats', 'when', 'whens', 'where', 'wheres', 'which', 'while', 'who', 'whos', 'whom', 'why', 'whys', 'with', 'wont', 'would', 'wouldnt', 'you', 'youd', 'youll', 'youre', 'youve', 'your', 'yours', 'yourself', 'yourselves'
  ]);

  const analyzeDensity = () => {
    if (!text.trim()) return;

    // Sanitize punctuation and keep alphanumeric words
    const cleanWords = text
      .toLowerCase()
      .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?"'\n]/g, ' ')
      .split(/\s+/)
      .filter(w => w.trim().length > 0);

    const totalWords = cleanWords.length;
    setTotalWordCount(totalWords);

    if (totalWords === 0) return;

    const frequencies: { [key: string]: number } = {};

    // Map phrases according to standard N-Gram clusters (1-word, 2-word, or 3-word phrases)
    for (let i = 0; i <= totalWords - phraseLength; i++) {
      const phraseParts = cleanWords.slice(i, i + phraseLength);
      
      // If filtering stop words, skip if either the first or last word of phrase is a stop word
      if (ignoreStopWords) {
         if (phraseLength === 1 && stopWords.has(phraseParts[0])) continue;
         if (phraseLength > 1 && (stopWords.has(phraseParts[0]) || stopWords.has(phraseParts[phraseParts.length - 1]))) continue;
      }

      const phrase = phraseParts.join(' ');
      frequencies[phrase] = (frequencies[phrase] || 0) + 1;
    }

    // Sort descending by frequency counts
    const sorted = Object.entries(frequencies)
      .map(([phrase, count]) => ({
        phrase,
        count,
        density: parseFloat(((count / (totalWords - phraseLength + 1)) * 100).toFixed(2))
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10); // Display top 10

    setDensityList(sorted);
  };

  const seoContent = {
    h1: "Free Online SEO Keyword Density Analyzer",
    introduction: "Calculate 1, 2, and 3-word phrase density percentages instantly completely client-side. Optimize paragraphs against search algorithmic saturation.",
    whatItIs: "An automated browser textual analyzer that computes semantic frequencies, filters structural prepositions, and indexes density percentages.",
    whyItMatters: "Search engines penalize 'keyword stuffing'. Maintaining density ratios between 1% and 2.5% is crucial to prevent programmatic ranking demotions.",
    useCases: [
      { title: "Optimizing Landing Page Copy", description: "Audit product details and paragraphs to verify primary organic search keywords are placed at standard scales." },
      { title: "Competitor Meta Audits", description: "Audit competitor blog lines to extract underlying high-authority semantic structures." }
    ],
    features: [
      { title: "Grammar Stop-word Filter", description: "Instantly excludes helper words like 'the, or, that' to expose genuine, rich commercial terms." },
      { title: "Incremental Gram Scales", description: "Detect compound multi-word queries like 'image generator' or 'pdf tools' with custom scales." }
    ]
  };

  return (
    <ToolLayout
      title="Keyword Density Analyzer"
      description="Calculate keyword counts and density parameters to improve indexing balances."
      category="SEO Tools"
      icon={<FileSearch className="h-8 w-8 text-indigo-400" />}
      seoContent={seoContent}
    >
      <div className="p-6 md:p-8">
        <div className="grid lg:grid-cols-12 gap-8">
          {/* Input Area */}
          <div className="lg:col-span-7 space-y-4">
            <h4 className="text-sm font-bold text-slate-850 dark:text-white uppercase tracking-wider">Analyze Content</h4>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full h-80 p-4 bg-white dark:bg-white/[0.02] border border-slate-200 dark:border-white/10 rounded-2xl focus:ring-2 focus:ring-indigo-500/50 text-slate-900 dark:text-white text-sm leading-relaxed"
              placeholder="Paste copy layout text to analyze distribution tags..."
            />

            {/* Analysis Controls */}
            <div className="p-5 bg-slate-50 dark:bg-[#020617]/50 rounded-2xl border border-slate-200 dark:border-white/10 flex flex-wrap gap-6 items-center justify-between">
              
              {/* Phrase length picker */}
              <div>
                <span className="block text-[10px] uppercase font-bold text-slate-500 mb-2">Query Structure</span>
                <div className="flex gap-2">
                  {[1, 2, 3].map((g) => (
                    <button
                      key={g}
                      onClick={() => setPhraseLength(g)}
                      className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-transform ${phraseLength === g ? 'bg-indigo-505 bg-indigo-500 text-white shadow-sm' : 'bg-white dark:bg-white/[0.02] border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300'}`}
                    >
                      {g}-word
                    </button>
                  ))}
                </div>
              </div>

              {/* Toggles */}
              <label className="flex items-center gap-2.5 cursor-pointer mt-4">
                <input
                  type="checkbox"
                  checked={ignoreStopWords}
                  onChange={(e) => setIgnoreStopWords(e.target.checked)}
                  className="rounded border-slate-300 text-indigo-500 focus:ring-indigo-500"
                />
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Exclude Common Words</span>
              </label>

              <button
                onClick={analyzeDensity}
                disabled={!text.trim()}
                className="px-6 py-3 bg-indigo-500 text-white font-bold text-sm rounded-xl shadow-md cursor-pointer hover:bg-indigo-600 transition-colors disabled:opacity-50"
              >
                Perform Analysis
              </button>
            </div>
          </div>

          {/* Results Output */}
          <div className="lg:col-span-5 space-y-6">
            <h4 className="text-sm font-bold text-slate-850 dark:text-white uppercase tracking-wider flex items-center gap-2">
              <BarChart3 className="h-4 w-4 text-indigo-400" /> Distribution metrics
            </h4>

            {densityList.length > 0 ? (
              <div className="p-6 bg-slate-50 dark:bg-[#020617]/50 border border-slate-200 dark:border-white/10 rounded-2xl space-y-4">
                <div className="flex justify-between text-xs text-slate-500 font-bold pb-2 border-b border-slate-200 dark:border-white/10">
                  <span>PHRASE LOGS ({totalWordCount} TOTAL WORDS)</span>
                  <span>DENSITY</span>
                </div>

                <div className="space-y-4">
                  {densityList.map((item, index) => (
                    <div key={index} className="space-y-1">
                      <div className="flex justify-between text-xs font-bold text-slate-800 dark:text-white">
                        <span className="truncate max-w-[200px]">{item.phrase}</span>
                        <span className="font-mono">{item.density}% <span className="text-[10px] text-slate-400">({item.count}x)</span></span>
                      </div>
                      
                      {/* Percent Slider track representation */}
                      <div className="w-full bg-slate-200 dark:bg-slate-800 rounded-full h-2 overflow-hidden shadow-inner">
                        <div
                          className="bg-indigo-500 h-full rounded-full"
                          style={{ width: `${Math.min(100, item.density * 10)}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="p-12 bg-slate-50 dark:bg-[#020617]/20 border border-dashed border-slate-200 dark:border-white/10 rounded-2xl text-center text-xs text-slate-400 flex flex-col items-center justify-center min-h-[300px]">
                <HelpCircle className="h-8 w-8 mb-3 text-slate-300" />
                Fill the editor with test sentences and click "Perform Analysis" to visualize keyword frequencies.
              </div>
            )}
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
