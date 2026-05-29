import { Tool, ToolCategory } from '../types';

export const CATEGORIES: { id: ToolCategory; name: string; description: string; icon: string }[] = [
  { id: 'Text', name: 'Text Tools', description: 'Format, count, and manipulate text strings quickly.', icon: 'Type' },
  { id: 'Developer', name: 'Developer Tools', description: 'Encoding, decoding, formatting, and generation tools.', icon: 'Terminal' },
  { id: 'Image', name: 'Image Tools', description: 'Compress, convert, and edit image files online.', icon: 'Image' },
  { id: 'PDF', name: 'PDF Tools', description: 'Merge, split, and compress PDF documents securely.', icon: 'FileText' },
  { id: 'SEO', name: 'SEO Tools', description: 'Generate meta tags, sitemaps, and analyze SEO metrics.', icon: 'Search' },
];

export const TOOLS: Tool[] = [
  // --- TEXT TOOLS ---
  { id: 'word-counter', name: 'Word Counter', description: 'Count words, characters, sentences, and paragraphs in real-time.', category: 'Text', icon: 'FileText', path: '/tool/word-counter' },
  { id: 'character-counter', name: 'Character Counter', description: 'Count characters and spaces for social media limits.', category: 'Text', icon: 'Hash', path: '/tool/character-counter' },
  { id: 'case-converter', name: 'Case Converter', description: 'Convert text to UPPERCASE, lowercase, Title Case, and more.', category: 'Text', icon: 'Type', path: '/tool/case-converter' },
  { id: 'remove-duplicate-lines', name: 'Remove Duplicate Lines', description: 'Quickly remove duplicate lines from a text block.', category: 'Text', icon: 'ListMinus', path: '/tool/remove-duplicate-lines' },
  { id: 'password-generator', name: 'Password Generator', description: 'Generate strong, secure, random passwords.', category: 'Text', icon: 'KeyRound', path: '/tool/password-generator' },
  { id: 'slug-generator', name: 'URL Slug Generator', description: 'Convert strings into SEO-friendly URL slugs.', category: 'Text', icon: 'Link', path: '/tool/slug-generator' },
  { id: 'lorem-ipsum', name: 'Lorem Ipsum Generator', description: 'Generate placeholder text for design mockups.', category: 'Text', icon: 'AlignLeft', path: '/tool/lorem-ipsum' },
  { id: 'text-to-binary', name: 'Text to Binary', description: 'Convert plain text to binary code representations.', category: 'Text', icon: 'Binary', path: '/tool/text-to-binary' },
  { id: 'binary-to-text', name: 'Binary to Text', description: 'Decode binary back into readable plain text.', category: 'Text', icon: 'FileDigit', path: '/tool/binary-to-text' },
  { id: 'reverse-text', name: 'Reverse Text', description: 'Reverse the order of characters or words in a string.', category: 'Text', icon: 'Reply', path: '/tool/reverse-text' },

  // --- DEVELOPER TOOLS ---
  { id: 'json-formatter', name: 'JSON Formatter', description: 'Format and beautify minified JSON data.', category: 'Developer', icon: 'Braces', path: '/tool/json-formatter' },
  { id: 'html-formatter', name: 'HTML Formatter', description: 'Beautify HTML code with proper indentation.', category: 'Developer', icon: 'Code', path: '/tool/html-formatter' },
  { id: 'css-minifier', name: 'CSS Minifier', description: 'Compress CSS code to speed up website load times.', category: 'Developer', icon: 'FileCode2', path: '/tool/css-minifier' },
  { id: 'js-minifier', name: 'JS Minifier', description: 'Minify JavaScript files to reduce file size.', category: 'Developer', icon: 'FileJson', path: '/tool/js-minifier' },
  { id: 'base64-encoder', name: 'Base64 Encoder', description: 'Encode plain text or data into Base64 format.', category: 'Developer', icon: 'FileLock2', path: '/tool/base64-encoder' },
  { id: 'base64-decoder', name: 'Base64 Decoder', description: 'Decode Base64 encoded data back to text.', category: 'Developer', icon: 'FileKey2', path: '/tool/base64-decoder' },
  { id: 'url-encoder', name: 'URL Encoder', description: 'Safely encode URLs for parameters and requests.', category: 'Developer', icon: 'Link2', path: '/tool/url-encoder' },
  { id: 'url-decoder', name: 'URL Decoder', description: 'Decode URL-encoded strings back to standard text.', category: 'Developer', icon: 'Link2Off', path: '/tool/url-decoder' },
  { id: 'markdown-preview', name: 'Markdown Previewer', description: 'Write Markdown and preview HTML output instantly.', category: 'Developer', icon: 'PencilLine', path: '/tool/markdown-preview' },
  { id: 'color-picker', name: 'Color Picker & Converter', description: 'Pick colors and convert between HEX, RGB, HSL.', category: 'Developer', icon: 'Palette', path: '/tool/color-picker' },
  { id: 'uuid-generator', name: 'UUID Generator', description: 'Generate Version 4 UUIDs (Universally Unique Identifiers).', category: 'Developer', icon: 'Hash', path: '/tool/uuid-generator' },
  { id: 'jwt-decoder', name: 'JWT Decoder', description: 'Decode JSON Web Tokens and view header/payload.', category: 'Developer', icon: 'ShieldCheck', path: '/tool/jwt-decoder' },

  // --- IMAGE TOOLS (Stubs for future implementation) ---
  { id: 'image-compressor', name: 'Image Compressor', description: 'Reduce image file size without losing quality.', category: 'Image', icon: 'Minimize', path: '/tool/image-compressor' },
  { id: 'png-to-jpg', name: 'PNG to JPG', description: 'Convert PNG images to JPG format easily.', category: 'Image', icon: 'ImagePlus', path: '/tool/png-to-jpg' },
  { id: 'jpg-to-png', name: 'JPG to PNG', description: 'Convert JPG images to PNG format securely.', category: 'Image', icon: 'ImageUp', path: '/tool/jpg-to-png' },
  { id: 'resize-image', name: 'Resize Image', description: 'Change the dimensions of your images in bulk.', category: 'Image', icon: 'Maximize', path: '/tool/resize-image' },
  { id: 'crop-image', name: 'Crop Image', description: 'Crop images to specific aspect ratios.', category: 'Image', icon: 'Crop', path: '/tool/crop-image' },
  { id: 'watermark-image', name: 'Watermark Image', description: 'Add your logo or text watermark to images.', category: 'Image', icon: 'Stamp', path: '/tool/watermark-image' },
  { id: 'image-converter', name: 'Image Converter', description: 'Convert images to WEBP, BMP, GIF, and more.', category: 'Image', icon: 'ArrowRightLeft', path: '/tool/image-converter' },
  { id: 'svg-optimizer', name: 'SVG Optimizer', description: 'Clean and minify SVG vector files.', category: 'Image', icon: 'Dna', path: '/tool/svg-optimizer' },
  { id: 'meme-generator', name: 'Meme Generator', description: 'Add text to images to create custom memes.', category: 'Image', icon: 'Smile', path: '/tool/meme-generator' },
  { id: 'color-extractor', name: 'Color Extractor', description: 'Extract the dominant color palette from any image.', category: 'Image', icon: 'Pipette', path: '/tool/color-extractor' },

  // --- PDF TOOLS (Stubs) ---
  { id: 'merge-pdf', name: 'Merge PDF', description: 'Combine multiple PDF files into one single document.', category: 'PDF', icon: 'Layers', path: '/tool/merge-pdf' },
  { id: 'split-pdf', name: 'Split PDF', description: 'Extract pages from your PDF or save each page as a separate PDF.', category: 'PDF', icon: 'Scissors', path: '/tool/split-pdf' },
  { id: 'compress-pdf', name: 'Compress PDF', description: 'Reduce PDF file size for easy sharing and email.', category: 'PDF', icon: 'FileDown', path: '/tool/compress-pdf' },
  { id: 'pdf-to-word', name: 'PDF to Word', description: 'Convert PDF files to editable Word documents.', category: 'PDF', icon: 'FileText', path: '/tool/pdf-to-word' },
  { id: 'word-to-pdf', name: 'Word to PDF', description: 'Convert Word documents to PDF files.', category: 'PDF', icon: 'FileUp', path: '/tool/word-to-pdf' },
  { id: 'pdf-to-jpg', name: 'PDF to JPG', description: 'Extract images from PDF or convert pages to JPG.', category: 'PDF', icon: 'Images', path: '/tool/pdf-to-jpg' },
  { id: 'protect-pdf', name: 'Protect PDF', description: 'Add a password to encrypt and secure your PDF files.', category: 'PDF', icon: 'Lock', path: '/tool/protect-pdf' },
  { id: 'unlock-pdf', name: 'Unlock PDF', description: 'Remove password restrictions from PDF files.', category: 'PDF', icon: 'Unlock', path: '/tool/unlock-pdf' },

  // --- SEO TOOLS (Stubs) ---
  { id: 'meta-generator', name: 'Meta Tag Generator', description: 'Generate optimal title and meta tags for your website.', category: 'SEO', icon: 'Tags', path: '/tool/meta-generator' },
  { id: 'robots-generator', name: 'Robots.txt Generator', description: 'Create a robots.txt file to control search engine crawlers.', category: 'SEO', icon: 'Bot', path: '/tool/robots-generator' },
  { id: 'seo-analyzer', name: 'SEO Content Analyzer', description: 'Analyze URLs for Meta Tags, Headings, and Accessibility.', category: 'SEO', icon: 'Search', path: '/tool/seo-analyzer' },
  { id: 'keyword-density', name: 'Keyword Density', description: 'Analyze text to calculate keyword density percentages.', category: 'SEO', icon: 'Percent', path: '/tool/keyword-density' },
  { id: 'schema-generator', name: 'Schema Generator', description: 'Generate JSON-LD structured data for rich snippets.', category: 'SEO', icon: 'Braces', path: '/tool/schema-generator' },
  { id: 'serp-preview', name: 'SERP Preview', description: 'Preview how your webpage will look on Google search results.', category: 'SEO', icon: 'MonitorSmartphone', path: '/tool/serp-preview' },
  { id: 'open-graph', name: 'Open Graph Generator', description: 'Generate meta tags for perfect social media sharing cards.', category: 'SEO', icon: 'Share2', path: '/tool/open-graph' },
];
