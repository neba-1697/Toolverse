import { useState } from 'react';
import { Copy, KeyRound, RotateCcw } from 'lucide-react';
import { ToolLayout } from '../components/ToolLayout';

export function PasswordGenerator() {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(16);
  const [options, setOptions] = useState({
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true,
  });

  const generatePassword = () => {
    const chars = {
      uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
      lowercase: 'abcdefghijklmnopqrstuvwxyz',
      numbers: '0123456789',
      symbols: '!@#$%^&*()_+~`|}{[]:;?><,./-=',
    };

    let charSet = '';
    if (options.uppercase) charSet += chars.uppercase;
    if (options.lowercase) charSet += chars.lowercase;
    if (options.numbers) charSet += chars.numbers;
    if (options.symbols) charSet += chars.symbols;

    if (charSet === '') return;

    let newPassword = '';
    for (let i = 0; i < length; i++) {
      newPassword += charSet[Math.floor(Math.random() * charSet.length)];
    }
    setPassword(newPassword);
  };

  useState(() => {
    generatePassword();
  });

  const copyToClipboard = () => {
    if (password) navigator.clipboard.writeText(password);
  };

  const handleOptionChange = (option: keyof typeof options) => {
    setOptions(prev => {
      const next = { ...prev, [option]: !prev[option] };
      if (!Object.values(next).some(Boolean)) return prev; // prevent all false
      return next;
    });
  };

  const seoContent = {
    h1: "Free Online Password Generator",
    introduction: "Generate strong, secure, and random passwords locally in your browser. Our password generator helps you protect your online accounts from brute-force attacks.",
    whatItIs: "A password generator creates random combinations of alphanumeric characters and symbols to form secure passwords. This tool operates entirely within your browser for maximum security.",
    whyItMatters: "Using weak or reused passwords is the primary cause of account breaches. Generating unique, high-entropy passwords for each service ensures that even if one account is compromised, your other accounts remain secure.",
    useCases: [
      { title: "Securing New Accounts", description: "Use this tool whenever you sign up for a new service to guarantee a strong, unique password." },
      { title: "Generating Wi-Fi Passwords", description: "Create complex passwords for your home or business Wi-Fi networks." }
    ],
    features: [
      { title: "Local Generation", description: "Your passwords are never transmitted over the internet. They are generated securely using client-side JavaScript." },
      { title: "Customizable Entropy", description: "Enable or disable uppercases, numbers, and symbols to meet specific password requirements." }
    ]
  };

  return (
    <ToolLayout 
      title="Password Generator" 
      description="Generate strong, secure, and random passwords instantly."
      category="Text Tools"
      icon={<KeyRound className="h-8 w-8 text-indigo-400" />}
      seoContent={seoContent}
    >
      <div className="p-6 md:p-8">
        <div className="bg-slate-50 dark:bg-[#020617]/50 border border-slate-200 dark:border-white/10 rounded-xl p-6 mb-8 relative flex items-center shadow-inner">
          <input 
            type="text" 
            value={password} 
            readOnly 
            className="w-full bg-transparent text-2xl md:text-3xl font-mono text-slate-800 dark:text-white outline-none tracking-wider text-center"
            placeholder="Generate a password..."
          />
          <button 
            onClick={copyToClipboard}
            className="absolute right-4 p-2 text-indigo-500 hover:text-indigo-600 dark:text-indigo-400 dark:hover:text-indigo-300 transition-colors"
            title="Copy Password"
          >
            <Copy className="h-5 w-5" />
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div>
            <div className="flex justify-between items-center mb-4">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Password Length</label>
              <span className="text-indigo-500 font-bold bg-indigo-50 dark:bg-indigo-500/10 px-3 py-1 rounded-full text-sm">
                {length} chars
              </span>
            </div>
            <input 
              type="range" 
              min="8" 
              max="128" 
              value={length} 
              onChange={(e) => setLength(parseInt(e.target.value))}
              className="w-full cursor-pointer accent-indigo-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <label className="flex items-center gap-3 cursor-pointer">
              <input 
                type="checkbox" 
                checked={options.uppercase} 
                onChange={() => handleOptionChange('uppercase')}
                className="w-5 h-5 rounded border-slate-300 text-indigo-500 focus:ring-indigo-500/50"
              />
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Uppercase (A-Z)</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input 
                type="checkbox" 
                checked={options.lowercase} 
                onChange={() => handleOptionChange('lowercase')}
                className="w-5 h-5 rounded border-slate-300 text-indigo-500 focus:ring-indigo-500/50"
              />
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Lowercase (a-z)</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input 
                type="checkbox" 
                checked={options.numbers} 
                onChange={() => handleOptionChange('numbers')}
                className="w-5 h-5 rounded border-slate-300 text-indigo-500 focus:ring-indigo-500/50"
              />
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Numbers (0-9)</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input 
                type="checkbox" 
                checked={options.symbols} 
                onChange={() => handleOptionChange('symbols')}
                className="w-5 h-5 rounded border-slate-300 text-indigo-500 focus:ring-indigo-500/50"
              />
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Symbols (@#$)</span>
            </label>
          </div>
        </div>

        <div className="flex justify-center mt-8">
          <button 
            onClick={generatePassword}
            className="w-full md:w-1/2 px-6 py-4 bg-indigo-500 text-white text-lg font-bold rounded-xl shadow-lg shadow-indigo-500/20 hover:bg-indigo-600 transition-all flex items-center justify-center gap-3"
          >
            <RotateCcw className="h-5 w-5" /> Generate Password
          </button>
        </div>
      </div>
    </ToolLayout>
  );
}
