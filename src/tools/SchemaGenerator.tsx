import { useState } from 'react';
import { Sparkles, Copy, Check, FileJson, Layers, HelpCircle } from 'lucide-react';
import { ToolLayout } from '../components/ToolLayout';

export function SchemaGenerator() {
  const [schemaType, setSchemaType] = useState<'Article' | 'Product' | 'Organization' | 'LocalBusiness'>('Article');
  const [copied, setCopied] = useState<boolean>(false);

  // Article State templates
  const [artTitle, setArtTitle] = useState('How to Build Secure Client-Side Web Utilities');
  const [artAuthor, setArtAuthor] = useState('ToolVerse Engineering Team');
  const [artPub, setArtPub] = useState('ToolVerse');
  const [artUrl, setArtUrl] = useState('https://toolverse.app/blog/secure-utilities');

  // Product State templates
  const [prodName, setProdName] = useState('Professional Design Kit');
  const [prodBrand, setProdBrand] = useState('CreativeSuite');
  const [prodPrice, setProdPrice] = useState('49.99');
  const [prodCurrency, setProdCurrency] = useState('USD');
  const [prodSku, setProdSku] = useState('CS-DK-99');

  // Organization State templates
  const [orgName, setOrgName] = useState('ToolVerse Global Inc.');
  const [orgUrl, setOrgUrl] = useState('https://toolverse.app');
  const [orgLogo, setOrgLogo] = useState('https://toolverse.app/assets/logo.png');

  // LocalBusiness State templates
  const [bizName, setBizName] = useState('ToolVerse Coffee Laboratory');
  const [bizAddr, setBizAddr] = useState('128 Sandbox Avenue, San Francisco, CA');
  const [bizPhone, setBizPhone] = useState('+1-555-888-2026');

  // Real-time generator of JSON-LD script strings
  const getJsonLdMarkup = (): string => {
    let contextObj: any = {
      "@context": "https://schema.org"
    };

    if (schemaType === 'Article') {
      contextObj["@type"] = "NewsArticle";
      contextObj["headline"] = artTitle;
      contextObj["author"] = {
        "@type": "Person",
        "name": artAuthor
      };
      contextObj["publisher"] = {
        "@type": "Organization",
        "name": artPub,
        "logo": {
          "@type": "ImageObject",
          "url": orgLogo
        }
      };
      contextObj["mainEntityOfPage"] = artUrl;
    } else if (schemaType === 'Product') {
      contextObj["@type"] = "Product";
      contextObj["name"] = prodName;
      contextObj["brand"] = {
        "@type": "Brand",
        "name": prodBrand
      };
      contextObj["sku"] = prodSku;
      contextObj["offers"] = {
        "@type": "Offer",
        "price": prodPrice,
        "priceCurrency": prodCurrency,
        "availability": "https://schema.org/InStock"
      };
    } else if (schemaType === 'Organization') {
      contextObj["@type"] = "Organization";
      contextObj["name"] = orgName;
      contextObj["url"] = orgUrl;
      contextObj["logo"] = orgLogo;
    } else if (schemaType === 'LocalBusiness') {
      contextObj["@type"] = "LocalBusiness";
      contextObj["name"] = bizName;
      contextObj["address"] = {
        "@type": "PostalAddress",
        "streetAddress": bizAddr
      };
      contextObj["telephone"] = bizPhone;
      contextObj["url"] = orgUrl;
    }

    return `<script type="application/ld+json">\n${JSON.stringify(contextObj, null, 2)}\n</script>`;
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(getJsonLdMarkup());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const seoContent = {
    h1: "Free Structured Data Schema Generator",
    introduction: "Design search-engine integrated structured metadata schemas for articles, local businesses, organizations, and commercial products instantly.",
    whatItIs: "An automated browser markup generator compiling standardized Schema.org JSON-LD code blocks directly without unneeded configurations.",
    whyItMatters: "Structured data feeds Google micro-formats for search displays, unlocking high-click banners, rich snippet snippets, stars, and reviews overlays.",
    useCases: [
      { title: "Standard Article Blogging", description: "Incorporate article schema JSON-LD configurations onto directories to enhance carousel visibility." },
      { title: "Product Commercial listings", description: "Inject product ratings, brand tags, and local pricing attributes into listing pages." }
    ],
    features: [
      { title: "Standard schema types", description: "Covers Articles, Local Businesses, Organizations, and Product models." },
      { title: "Instant JSON-LD validation", description: "Formats syntax cleanly to qualify inside Google Structured Testing validators." }
    ]
  };

  return (
    <ToolLayout
      title="Schema Markup Generator"
      description="Compile structured Schema.org JSON-LD tags to improve search ranking snippets."
      category="SEO Tools"
      icon={<Layers className="h-8 w-8 text-indigo-400" />}
      seoContent={seoContent}
    >
      <div className="p-6 md:p-8">
        <div className="grid lg:grid-cols-2 gap-8">
          
          {/* Custom Creator Form Inputs */}
          <div className="p-6 bg-slate-50 dark:bg-[#020617]/50 border border-slate-200 dark:border-white/10 rounded-2xl space-y-6">
            <div className="flex items-center gap-3 pb-3 border-b border-slate-200 dark:border-white/10">
              <span className="text-xs uppercase font-bold text-slate-500">Pick Schema Category</span>
              <select
                value={schemaType}
                onChange={(e) => setSchemaType(e.target.value as any)}
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-lg px-2 py-1 text-xs font-bold text-slate-800 dark:text-white"
              >
                <option value="Article">Article (Blog Post)</option>
                <option value="Product">Product Details</option>
                <option value="Organization">Organization Business</option>
                <option value="LocalBusiness">Local Brick-and-Mortar Store</option>
              </select>
            </div>

            {/* Template-dependent Fields */}
            {schemaType === 'Article' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-[10px] uppercase font-bold text-slate-500 mb-1">Headline TITLE</label>
                  <input
                    type="text"
                    value={artTitle}
                    onChange={(e) => setArtTitle(e.target.value)}
                    className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-lg text-sm text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase font-bold text-slate-500 mb-1">Author Name</label>
                  <input
                    type="text"
                    value={artAuthor}
                    onChange={(e) => setArtAuthor(e.target.value)}
                    className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-lg text-sm text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase font-bold text-slate-500 mb-1">Publisher</label>
                  <input
                    type="text"
                    value={artPub}
                    onChange={(e) => setArtPub(e.target.value)}
                    className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-lg text-sm text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase font-bold text-slate-500 mb-1">Article Absolute URL</label>
                  <input
                    type="text"
                    value={artUrl}
                    onChange={(e) => setArtUrl(e.target.value)}
                    className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-lg text-sm text-slate-900 dark:text-white"
                  />
                </div>
              </div>
            )}

            {schemaType === 'Product' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-[10px] uppercase font-bold text-slate-500 mb-1">Product Name</label>
                  <input
                    type="text"
                    value={prodName}
                    onChange={(e) => setProdName(e.target.value)}
                    className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-lg text-sm text-slate-900 dark:text-white"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] uppercase font-bold text-slate-500 mb-1">Brand</label>
                    <input
                      type="text"
                      value={prodBrand}
                      onChange={(e) => setProdBrand(e.target.value)}
                      className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-lg text-sm text-slate-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase font-bold text-slate-500 mb-1">SKU identifier</label>
                    <input
                      type="text"
                      value={prodSku}
                      onChange={(e) => setProdSku(e.target.value)}
                      className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-lg text-sm text-slate-900 dark:text-white"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] uppercase font-bold text-slate-500 mb-1">Retail Price</label>
                    <input
                      type="text"
                      value={prodPrice}
                      onChange={(e) => setProdPrice(e.target.value)}
                      className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-lg text-sm text-slate-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase font-bold text-slate-500 mb-1">Currency Code</label>
                    <input
                      type="text"
                      value={prodCurrency}
                      onChange={(e) => setProdCurrency(e.target.value)}
                      className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-lg text-sm text-slate-900 dark:text-white"
                    />
                  </div>
                </div>
              </div>
            )}

            {schemaType === 'Organization' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-[10px] uppercase font-bold text-slate-500 mb-1">Organization Name</label>
                  <input
                    type="text"
                    value={orgName}
                    onChange={(e) => setOrgName(e.target.value)}
                    className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-lg text-sm text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase font-bold text-slate-500 mb-1">Website URL</label>
                  <input
                    type="text"
                    value={orgUrl}
                    onChange={(e) => setOrgUrl(e.target.value)}
                    className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-lg text-sm text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase font-bold text-slate-500 mb-1">Logo icon URL</label>
                  <input
                    type="text"
                    value={orgLogo}
                    onChange={(e) => setOrgLogo(e.target.value)}
                    className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-lg text-sm text-slate-900 dark:text-white"
                  />
                </div>
              </div>
            )}

            {schemaType === 'LocalBusiness' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-[10px] uppercase font-bold text-slate-500 mb-1">Local Business Name</label>
                  <input
                    type="text"
                    value={bizName}
                    onChange={(e) => setBizName(e.target.value)}
                    className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-lg text-sm text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase font-bold text-slate-500 mb-1">Postal Street Address</label>
                  <input
                    type="text"
                    value={bizAddr}
                    onChange={(e) => setBizAddr(e.target.value)}
                    className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-lg text-sm text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase font-bold text-slate-500 mb-1">Store Telephone Number</label>
                  <input
                    type="text"
                    value={bizPhone}
                    onChange={(e) => setBizPhone(e.target.value)}
                    className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-lg text-sm text-slate-900 dark:text-white"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Compiled Output Preview */}
          <div className="space-y-4 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-slate-800 dark:text-white flex items-center gap-1.5">
                <FileJson className="h-4 w-4 text-indigo-400" /> Compiled Schema Tags
              </h4>
              <button
                onClick={copyToClipboard}
                className="text-xs text-indigo-505 bg-white dark:bg-white/[0.02] border border-slate-200 dark:border-white/10 hover:bg-slate-100 px-3 py-1.5 rounded-lg font-bold flex items-center gap-1 cursor-pointer"
              >
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
                {copied ? 'Copied LD!' : 'Copy Schema'}
              </button>
            </div>

            <textarea
              readOnly
              value={getJsonLdMarkup()}
              className="w-full flex-1 min-h-[300px] lg:min-h-0 p-4 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-2xl text-slate-700 dark:text-slate-300 font-mono text-xs leading-relaxed"
            />
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
