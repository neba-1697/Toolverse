import { SEO } from '../components/SEO';
import { useParams, Navigate, Link } from 'react-router-dom';
import { Mail, Clock, ShieldAlert } from 'lucide-react';

type PageKey = 'privacy' | 'terms' | 'about' | 'contact';

const CMS_CONTENT: Record<PageKey, { title: string; date: string; introduction: string; sections: { heading: string; content: string[] }[] }> = {
  privacy: {
    title: 'Privacy Policy',
    date: 'Last updated: May 25, 2026',
    introduction: 'We value your privacy. This policy explains how we handle your data when you use ToolVerse, particularly highlighting our client-side processing approach and adherence to global advertising standards.',
    sections: [
      {
        heading: "1. Information We Collect",
        content: [
          "ToolVerse is designed as a privacy-first platform. For the vast majority of our tools, we process data locally within your browser.",
          "However, we do collect certain technical information automatically, such as your IP address, browser type, and usage metrics (like pages visited) to ensure the proper functioning and security of our services."
        ]
      },
      {
        heading: "2. Google AdSense and Cookies",
        content: [
          "We use third-party advertising companies to serve ads when you visit our website. These companies may use aggregated information (not including your name, address, email address or telephone number) about your visits to this and other websites in order to provide advertisements about goods and services of interest to you.",
          "• Third party vendors, including Google, use cookies to serve ads based on a user's prior visits to your website or other websites.",
          "• Google's use of advertising cookies enables it and its partners to serve ads to your users based on their visit to your sites and/or other sites on the Internet.",
          "• Users may opt out of personalized advertising by visiting Ads Settings (https://www.google.com/settings/ads)."
        ]
      },
      {
        heading: "3. Local Data Processing",
        content: [
          "Tools such as our PDF Merger, PDF Splitter, Image Converter, and HTML Formatter handle your files and data directly in the browser utilizing modern Web APIs.",
          "This means your sensitive documents and inputs are never uploaded to our servers, keeping them completely secure and private to your device."
        ]
      },
      {
        heading: "4. Third-Party Links",
        content: [
          "Our website may contain links to third-party websites or services that are not owned or controlled by ToolVerse.",
          "We have no control over, and assume no responsibility for, the content, privacy policies, or practices of any third party web sites or services."
        ]
      },
      {
         heading: "5. Changes to This Privacy Policy",
         content: [
           "We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.",
           "You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page."
         ]
      }
    ]
  },
  terms: {
    title: 'Terms of Service',
    date: 'Last updated: May 25, 2026',
    introduction: 'These Terms of Service govern your use of the ToolVerse website and features. Please read them carefully before using our tools.',
    sections: [
      {
        heading: "1. Acceptance of Terms",
        content: [
          "By accessing and using ToolVerse (\"the Website\"), you accept and agree to be bound by the terms and provision of this agreement.",
          "If you do not agree to abide by these terms, please do not use this Website."
        ]
      },
      {
        heading: "2. Description of Service",
        content: [
          "ToolVerse provides users with access to a rich collection of resources, including various developer tools, formatting utilities, and file processing applications.",
          "You understand and agree that the Service is provided \"AS-IS\" and that ToolVerse assumes no responsibility for the timeliness, deletion, mis-delivery, or failure to store any user communications or personalization settings."
        ]
      },
      {
        heading: "3. User Conduct",
        content: [
          "You agree not to use the Website in any way that causes, or may cause, damage to the Website or impairment of the availability or accessibility of the Website.",
          "You must not use the Website in any way which is unlawful, illegal, fraudulent or harmful, or in connection with any unlawful, illegal, fraudulent or harmful purpose or activity."
        ]
      },
      {
        heading: "4. Intellectual Property Rights",
        content: [
          "All copyright, trademarks, design rights, patents and other intellectual property rights (registered and unregistered) in and on ToolVerse belong to ToolVerse and/or third parties.",
          "Nothing in the Terms grants you a right or license to use any trademark, design right or copyright owned or controlled by ToolVerse or any other third party except as expressly provided in the Terms."
        ]
      },
       {
        heading: "5. Limitation of Liability",
        content: [
          "In no event shall ToolVerse, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages.",
          "This includes without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Service."
        ]
      }
    ]
  },
  about: {
    title: 'About Us',
    date: 'Last updated: May 25, 2026',
    introduction: 'ToolVerse is a suite of carefully engineered, privacy-focused online utilities designed for modern professionals.',
    sections: [
      {
        heading: "Our Mission",
        content: [
          "ToolVerse was built by Nebil Shebab to provide developers, marketers, and everyday users with reliable, client-side, and privacy-first utilities.",
          "Our mission is to replace slow, ad-ridden, and insecure web tools with a lightning-fast interface that performs most operations directly in your browser."
        ]
      },
      {
        heading: "Who We Are",
        content: [
          "I am an engineer obsessed with performance and design. I noticed that performing simple operations like PDF merging, base64 encoding, and text manipulation often required uploading sensitive files to unknown third-party servers.",
          "I decided to build a platform that brings the processing power back to the user's device."
        ]
      },
      {
         heading: "The Technology",
         content: [
           "Built on modern web technologies like React, TypeScript, and Tailwind CSS, ToolVerse leverages extensive browser Web APIs and WebAssembly (WASM) to perform heavy computing locally.",
           "This ensures low latency and high privacy standards for everyone."
         ]
      }
    ]
  },
  contact: {
    title: 'Contact Us',
    date: 'Last updated: May 25, 2026',
    introduction: 'We are always looking for ways to improve ToolVerse. Reach out to us if you have suggestions, questions, or concerns.',
    sections: [
      {
        heading: "Get in Touch",
        content: [
          "We'd love to hear from you. Whether you have a feature request, encountered a bug, or want to discuss a partnership, we are always open to feedback.",
          "Please review our Help Center before reaching out, as many common questions about our tools (like PDF merging limits or formatting errors) are answered there."
        ]
      }
    ]
  }
};

export function LegalPage() {
  const { page } = useParams<{ page: PageKey }>();

  if (!page || !CMS_CONTENT[page]) {
    return <Navigate to="/" replace />;
  }

  const content = CMS_CONTENT[page];

  return (
    <>
      <SEO 
        title={`${content.title} | ToolVerse`}
        description={`${content.title} documentation and terms for the ToolVerse platform.`}
      />
      
      <div className="py-12 md:py-20 lg:py-24">
        <div className="container mx-auto max-w-4xl px-4 md:px-6">
          <div className="flex flex-col lg:flex-row gap-12">
            
            {/* Sidebar Navigation */}
            <aside className="lg:w-64 shrink-0">
              <nav className="sticky top-24 flex flex-col gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2 ml-4">Legal & Information</span>
                {Object.entries(CMS_CONTENT).map(([key, item]) => (
                  <Link 
                    key={key} 
                    to={`/legal/${key}`}
                    className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                      page === key 
                        ? 'bg-indigo-500 text-white shadow-md shadow-indigo-500/20' 
                        : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    {item.title}
                  </Link>
                ))}
              </nav>
            </aside>

            {/* Main Content Area */}
            <article className="flex-1 min-w-0">
              <header className="mb-10 lg:mb-16 border-b border-slate-200 dark:border-white/10 pb-8">
                <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-white mb-6">
                  {content.title}
                </h1>
                <p className="text-lg md:text-xl text-indigo-400 font-medium leading-relaxed mb-6">
                  {content.introduction}
                </p>
                <div className="flex items-center gap-4 text-sm font-medium text-slate-500 bg-slate-50 dark:bg-slate-800/50 inline-flex px-4 py-2 rounded-lg border border-slate-200 dark:border-white/5">
                  <Clock className="h-4 w-4" />
                  {content.date}
                </div>
              </header>

              <div className="space-y-12">
                {content.sections.map((section, idx) => (
                  <section key={idx} className="scroll-mt-24">
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
                      {section.heading}
                    </h2>
                    <div className="space-y-4">
                      {section.content.map((paragraph, pIdx) => (
                        <p key={pIdx} className="text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                          {paragraph.startsWith('•') ? (
                            <span className="ml-4 block">{paragraph}</span>
                          ) : (
                            paragraph
                          )}
                        </p>
                      ))}
                    </div>
                  </section>
                ))}
              </div>

              {page === 'contact' && (
                <div className="mt-12 grid sm:grid-cols-2 gap-6">
                   <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-2xl border border-slate-200 dark:border-white/10 flex flex-col items-center text-center">
                      <div className="h-12 w-12 bg-indigo-100 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 rounded-xl flex items-center justify-center mb-4">
                         <Mail className="h-6 w-6" />
                      </div>
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Email Support</h3>
                      <p className="text-sm text-slate-500 mb-4">For general formatting questions or bug reports.</p>
                      <a href="mailto:contact@nebil.dev" className="font-medium text-emerald-500 hover:text-emerald-600">contact@nebil.dev</a>
                   </div>
                   
                   <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-2xl border border-slate-200 dark:border-white/10 flex flex-col items-center text-center">
                      <div className="h-12 w-12 bg-amber-100 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400 rounded-xl flex items-center justify-center mb-4">
                         <ShieldAlert className="h-6 w-6" />
                      </div>
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Legal & Privacy</h3>
                      <p className="text-sm text-slate-500 mb-4">For urgent privacy related inquiries or DMCA.</p>
                      <a href="mailto:legal@nebil.dev" className="font-medium text-emerald-500 hover:text-emerald-600">legal@nebil.dev</a>
                   </div>
                </div>
              )}

              <div className="mt-16 bg-gradient-to-r from-slate-50 to-white dark:from-white/[0.05] dark:to-white/[0.02] border border-slate-200 dark:border-white/10 rounded-2xl p-6 md:p-8 flex items-start gap-4">
                <ShieldAlert className="h-6 w-6 text-emerald-400 shrink-0 mt-1" />
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-1">Legal Disclaimer</h4>
                  <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                    The information provided on this page does not constitute legal advice. If you have any formal legal inquiries or questions about this document's enforceability, please consult a licensed attorney. Contact our administration team at <span className="text-emerald-400 font-medium">legal@nebil.dev</span> for any platform-specific claims.
                  </p>
                </div>
              </div>
            </article>

          </div>
        </div>
      </div>
    </>
  );
}
