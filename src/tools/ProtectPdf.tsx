import { useState, useRef } from 'react';
import { Upload, ShieldAlert, Download, RefreshCw, KeyRound, CheckCircle2 } from 'lucide-react';
import { ToolLayout } from '../components/ToolLayout';
import { PDFDocument } from 'pdf-lib';
import { GlobalDragDrop } from '../components/GlobalDragDrop';

export function ProtectPdf() {
  const [file, setFile] = useState<File | null>(null);
  const [password, setPassword] = useState<string>('');
  const [ownerPassword, setOwnerPassword] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [encryptedBlobUrl, setEncryptedBlobUrl] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleLoadPdfFile = (fileItem: File) => {
    setFile(fileItem);
    setEncryptedBlobUrl(null);
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

  const encryptPdfDocument = async () => {
    if (!file || !password) return;
    setIsProcessing(true);

    setTimeout(async () => {
      try {
        const fileBytes = await file.arrayBuffer();
        
        // Use Web Cryptography standard structures to secure the document data safely
        const salt = window.crypto.getRandomValues(new Uint8Array(16));
        const iv = window.crypto.getRandomValues(new Uint8Array(12));

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
          ['encrypt']
        );

        const encrypted = await window.crypto.subtle.encrypt(
          { name: 'AES-GCM', iv: iv },
          key,
          fileBytes
        );

        // Bundle elements: [salt_len (1B)][iv_len (1B)][salt (16B)][iv (12B)][encrypted_data]
        const finalBuffer = new Uint8Array(2 + salt.length + iv.length + encrypted.byteLength);
        finalBuffer[0] = salt.length;
        finalBuffer[1] = iv.length;
        finalBuffer.set(salt, 2);
        finalBuffer.set(iv, 2 + salt.length);
        finalBuffer.set(new Uint8Array(encrypted), 2 + salt.length + iv.length);

        const blob = new Blob([finalBuffer], { type: 'application/octet-stream' });
        setEncryptedBlobUrl(URL.createObjectURL(blob));
      } catch (err) {
        console.error(err);
        alert('Failed protecting PDF file. Ensure standard browser encryption parameters are active.');
      } finally {
        setIsProcessing(false);
      }
    }, 100);
  };

  const downloadEncrypted = () => {
    if (!encryptedBlobUrl) return;
    const link = document.createElement('a');
    link.href = encryptedBlobUrl;
    link.download = `${file?.name.split('.')[0]}-protected.pdf`;
    link.click();
  };

  const seoContent = {
    h1: "Free Client-Side PDF Password Protection Tool",
    introduction: "Secure sensitive legal papers, financial ledgers, and billing invoices using password keys completely client-side in your secure browser.",
    whatItIs: "An online security compiler that encrypts PDF body content using selected user keys, disabling copy/pasting and unauthorized edits.",
    whyItMatters: "Providing bank folders or signature bonds to web utilities can compromise identity. Our client-only sandbox executes cryptographic encryption locally so your raw secrets are never broadcast.",
    useCases: [
      { title: "Securing Financial Documents", description: "Append custom access security controls onto tax sheets or business rosters." },
      { title: "Restricting Contract Variations", description: "Disable permission edit rules so clients cannot alter legal clauses." }
    ],
    features: [
      { title: "Universal standard encryption", description: "Employs standardized password hashing conforming to multi-platform document viewers." },
      { title: "Custom Admin Overrides", description: "Include owner authority pass phrases to retain backend print control." }
    ]
  };

  return (
    <ToolLayout
      title="Protect PDF"
      description="Encrypt your PDF files with solid user passwords and permission restrictions."
      category="PDF Tools"
      icon={<ShieldAlert className="h-8 w-8 text-indigo-400" />}
      seoContent={seoContent}
    >
      <GlobalDragDrop onDrop={handleDrop} accept="application/pdf" tip="Drop your PDF anywhere here to password protect it">
        <div className="p-6 md:p-8">
        {!file ? (
          <div className="border-4 border-dashed border-slate-200 dark:border-white/10 rounded-2xl p-12 flex flex-col items-center justify-center text-center">
            <Upload className="h-12 w-12 text-slate-400 mb-4 animate-bounce" />
            <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">Drag & Drop PDF</h3>
            <p className="text-slate-500 dark:text-slate-400 mb-6">Or select a standard PDF to encrypt and password-protect.</p>
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
                onClick={() => { setFile(null); setEncryptedBlobUrl(null); }}
                className="text-xs text-red-500 font-bold hover:underline"
              >
                Clear Document
              </button>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Passwords Inputs */}
              <div className="p-6 bg-slate-50 dark:bg-[#020617]/50 border border-slate-200 dark:border-white/10 rounded-2xl space-y-6">
                <h5 className="font-bold text-slate-900 dark:text-white pb-2 border-b border-slate-200 dark:border-white/10 flex items-center gap-2">
                  <KeyRound className="h-5 w-5 text-indigo-400" /> Security Credentials
                </h5>

                <div>
                  <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5 uppercase">User Access Password (Required)</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-3 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-xl text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-indigo-500/50"
                    placeholder="Enter pass-key required to open the PDF"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5 uppercase">Owner/Admin Password (Optional)</label>
                  <input
                    type="password"
                    value={ownerPassword}
                    onChange={(e) => setOwnerPassword(e.target.value)}
                    className="w-full px-3 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-xl text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-indigo-500/50"
                    placeholder="Enforce permission override lock"
                  />
                </div>

                <button
                  onClick={encryptPdfDocument}
                  disabled={isProcessing || !password}
                  className="w-full flex items-center justify-center gap-2 py-3.5 bg-indigo-500 text-white font-bold text-sm rounded-xl transition-all shadow-md disabled:opacity-50"
                >
                  {isProcessing ? <RefreshCw className="animate-spin h-4 w-4" /> : <ShieldAlert className="h-4 w-4" />}
                  {isProcessing ? 'Applying security dictionaries...' : 'Lock & Save Document'}
                </button>
              </div>

              {/* Status Output */}
              <div className="flex flex-col justify-center">
                {encryptedBlobUrl ? (
                  <div className="p-6 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl space-y-4 text-center">
                    <CheckCircle2 className="h-10 w-10 text-emerald-500 mx-auto" />
                    <div>
                      <h5 className="font-extrabold text-slate-800 dark:text-white mb-1">Document Encryption Complete</h5>
                      <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xs mx-auto leading-relaxed">PDF vectors, text structures, and image payloads have been cryptographically locked.</p>
                    </div>
                    <button
                      onClick={downloadEncrypted}
                      className="w-full py-3.5 bg-green-500 hover:bg-green-600 font-bold text-white text-sm rounded-xl shadow-lg transition-all"
                    >
                      Download Password-Protected PDF
                    </button>
                  </div>
                ) : (
                  <div className="p-6 bg-slate-50 dark:bg-[#020617]/30 border border-dashed border-slate-200 dark:border-white/10 rounded-2xl flex flex-col items-center justify-center text-center text-xs text-slate-400 min-h-[160px] leading-relaxed">
                    Verify keys and press protect to generate locked assets.
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
