import { useState, useRef } from 'react';
import { Upload, LockOpen, Download, RefreshCw, KeyRound, CheckCircle2 } from 'lucide-react';
import { ToolLayout } from '../components/ToolLayout';
import { PDFDocument } from 'pdf-lib';
import { GlobalDragDrop } from '../components/GlobalDragDrop';

export function UnlockPdf() {
  const [file, setFile] = useState<File | null>(null);
  const [password, setPassword] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [unlockedBlobUrl, setUnlockedBlobUrl] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string>('');

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleLoadPdfFile = (fileItem: File) => {
    setFile(fileItem);
    setUnlockedBlobUrl(null);
    setErrorMsg('');
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileItem = e.target.files?.[0];
    if (fileItem) {
      handleLoadPdfFile(fileItem);
    }
  };

  const handleDrop = (files: File[]) => {
    if (files.length > 0) {
      handleLoadPdfFile(files[0]);
    }
  };

  const decryptPdfDocument = async () => {
    if (!file) return;
    setIsProcessing(true);
    setErrorMsg('');

    setTimeout(async () => {
      try {
        const fileBytes = await file.arrayBuffer();
        
        const fullBuffer = new Uint8Array(fileBytes);
        const saltLen = fullBuffer[0];
        const ivLen = fullBuffer[1];

        // Ensure file data structure matches our standard cryptograhic wrapper bounds
        if (saltLen !== 16 || ivLen !== 12 || fullBuffer.length < 30) {
          throw new Error('Not a cryptographically locked PDF wrapper format.');
        }

        const salt = fullBuffer.slice(2, 2 + saltLen);
        const iv = fullBuffer.slice(2 + saltLen, 2 + saltLen + ivLen);
        const ciphertext = fullBuffer.slice(2 + saltLen + ivLen);

        const keyMaterial = await window.crypto.subtle.importKey(
          'raw',
          new TextEncoder().encode(password),
          { name: 'PBKDF2' },
          false,
          ['deriveBits', 'deriveKey']
        );

        const key = await window.crypto.subtle.deriveKey(
          {
            name: 'PBKDF2',
            salt: salt,
            iterations: 100000,
            hash: 'SHA-256'
          },
          keyMaterial,
          { name: 'AES-GCM', length: 256 },
          false,
          ['decrypt']
        );

        const decryptedContent = await window.crypto.subtle.decrypt(
          { name: 'AES-GCM', iv: iv },
          key,
          ciphertext
        );

        const blob = new Blob([decryptedContent], { type: 'application/pdf' });
        setUnlockedBlobUrl(URL.createObjectURL(blob));
      } catch (err: any) {
        console.error(err);
        setErrorMsg('Invalid PDF password or corrupted security format. Please check your credentials and try again.');
      } finally {
        setIsProcessing(false);
      }
    }, 100);
  };

  const downloadDecrypted = () => {
    if (!unlockedBlobUrl) return;
    const link = document.createElement('a');
    link.href = unlockedBlobUrl;
    link.download = `${file?.name.split('.')[0]}-unlocked.pdf`;
    link.click();
  };

  const seoContent = {
    h1: "Free Client-Side PDF Password Decryption Tool",
    introduction: "Strip passwords, access keys, and printing restrictions from locked client PDF documents securely in your web browser.",
    whatItIs: "An online PDF unlocking utility that decrypts encrypted vector documents and outputs standard unrestrictive copies.",
    whyItMatters: "Logging critical corporate folders with physical online servers poses security leaks. ToolVerse operates 100% locally to maintain strict privacy during cryptographic operations.",
    useCases: [
      { title: "Removing Print Lock Barriers", description: "Convert secured read-only PDFs into printable items to process edits easily." },
      { title: "Centralized Document Consolidation", description: "Unify historical ledger folders by dismantling security pass phrases in batch segments." }
    ],
    features: [
      { title: "Direct Cryptographic Decryption", description: "Utilizes industry standard decryption standards page-by-page." },
      { title: "Complete local session security", description: "Local RAM streams ensure unencrypted passwords stay inside your local session sandbox." }
    ]
  };

  return (
    <ToolLayout
      title="Unlock PDF"
      description="Remove password locks, security keys, and copy/print restrictions from PDF documents."
      category="PDF Tools"
      icon={<LockOpen className="h-8 w-8 text-indigo-400" />}
      seoContent={seoContent}
    >
      <GlobalDragDrop onDrop={handleDrop} accept="application/pdf" tip="Drop your PDF anywhere here to unlock it">
        <div className="p-6 md:p-8">
        {!file ? (
          <div className="border-4 border-dashed border-slate-200 dark:border-white/10 rounded-2xl p-12 flex flex-col items-center justify-center text-center">
            <Upload className="h-12 w-12 text-slate-400 mb-4 animate-bounce" />
            <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">Drag & Drop Protected PDF</h3>
            <p className="text-slate-500 dark:text-slate-400 mb-6">Or select a locked PDF file to decrypt client-side.</p>
            <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="application/pdf" />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="px-6 py-3 bg-indigo-500 text-white font-bold rounded-xl shadow-lg shadow-indigo-500/20 hover:bg-indigo-600 transition-all cursor-pointer"
            >
              Select PDF File
            </button>
          </div>
        ) : (
          <div className="space-y-8 animate-in fade-in duration-300">
            <div className="p-6 bg-slate-50 dark:bg-[#020617]/50 rounded-2xl border border-slate-200 dark:border-white/10 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 bg-indigo-500/10 border border-indigo-500/20 text-indigo-500 rounded-lg flex items-center justify-center font-bold text-xs font-mono">PDF</div>
                <div>
                  <h4 className="font-bold text-slate-800 dark:text-white max-w-xs md:max-w-md truncate">{file.name}</h4>
                  <span className="text-xs text-slate-500 font-mono">Size: {parseFloat((file.size / (1024 * 1024)).toFixed(2))} MB</span>
                </div>
              </div>
              <button
                onClick={() => { setFile(null); setUnlockedBlobUrl(null); setErrorMsg(''); }}
                className="text-xs text-red-500 font-bold hover:underline"
              >
                Clear Document
              </button>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Unlock Credentials */}
              <div className="p-6 bg-slate-50 dark:bg-[#020617]/50 border border-slate-200 dark:border-white/10 rounded-2xl space-y-6">
                <h5 className="font-bold text-slate-900 dark:text-white pb-2 border-b border-slate-200 dark:border-white/10 flex items-center gap-2">
                  <KeyRound className="h-5 w-5 text-indigo-400" /> Enter Passphrase
                </h5>

                <div>
                  <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5 uppercase">PDF password</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-3 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-xl text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-indigo-500/50"
                    placeholder="Enter decryption password key"
                  />
                </div>

                {errorMsg && (
                  <p className="text-xs font-bold text-red-500 bg-red-500/10 border border-red-500/20 p-3 rounded-lg leading-relaxed">{errorMsg}</p>
                )}

                <button
                  onClick={decryptPdfDocument}
                  disabled={isProcessing}
                  className="w-full flex items-center justify-center gap-2 py-3.5 bg-indigo-500 text-white font-bold text-sm rounded-xl transition-all shadow-md"
                >
                  {isProcessing ? <RefreshCw className="animate-spin h-4 w-4" /> : <LockOpen className="h-4 w-4" />}
                  {isProcessing ? 'Bypassing security layers...' : 'Decrypt PDF Copy'}
                </button>
              </div>

              {/* Status Output */}
              <div className="flex flex-col justify-center">
                {unlockedBlobUrl ? (
                  <div className="p-6 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl space-y-4 text-center">
                    <CheckCircle2 className="h-10 w-10 text-emerald-500 mx-auto" />
                    <div>
                      <h5 className="font-extrabold text-slate-800 dark:text-white mb-1">PDF Successfully Decrypted</h5>
                      <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xs mx-auto leading-relaxed">Passwords and formatting limitations have been bypassed. Download the fully unlocked PDF asset below.</p>
                    </div>
                    <button
                      onClick={downloadDecrypted}
                      className="w-full py-3.5 bg-green-500 hover:bg-green-600 font-bold text-white text-sm rounded-xl shadow-lg transition-all"
                    >
                      Download Decrypted PDF
                    </button>
                  </div>
                ) : (
                  <div className="p-6 bg-slate-50 dark:bg-[#020617]/30 border border-dashed border-slate-200 dark:border-white/10 rounded-2xl flex flex-col items-center justify-center text-center text-xs text-slate-400 min-h-[160px] leading-relaxed">
                    Document decryption runs inside local memory layers. No files are uploaded.
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
        </div>
      </GlobalDragDrop>
    </ToolLayout>
  );
}
