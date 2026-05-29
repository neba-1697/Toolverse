import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Layout } from './components/Layout';
import { ThemeProvider } from './components/ThemeProvider';
import { Home } from './pages/Home';
import { BlogList } from './pages/BlogList';
import { BlogPost } from './pages/BlogPost';
import { LegalPage } from './pages/LegalPage';

// Import tools
import { WordCounter } from './tools/WordCounter';
import { CharacterCounter } from './tools/CharacterCounter';
import { CaseConverter } from './tools/CaseConverter';
import { JSONFormatter } from './tools/JSONFormatter';
import { UUIDGenerator } from './tools/UUIDGenerator';
import { Base64Encoder } from './tools/Base64Encoder';
import { RemoveDuplicateLines } from './tools/RemoveDuplicateLines';
import { PasswordGenerator } from './tools/PasswordGenerator';
import { SlugGenerator } from './tools/SlugGenerator';
import { Base64Decoder } from './tools/Base64Decoder';
import { UrlEncoder } from './tools/UrlEncoder';
import { UrlDecoder } from './tools/UrlDecoder';
import { LoremIpsum } from './tools/LoremIpsum';
import { TextToBinary } from './tools/TextToBinary';
import { BinaryToText } from './tools/BinaryToText';
import { ReverseText } from './tools/ReverseText';
import { MarkdownPreview } from './tools/MarkdownPreview';
import { JwtDecoder } from './tools/JwtDecoder';
import { ColorPicker } from './tools/ColorPicker';
import { HtmlFormatter } from './tools/HtmlFormatter';
import { CssMinifier } from './tools/CssMinifier';
import { JsMinifier } from './tools/JsMinifier';
import { ImageConverter } from './tools/ImageConverter';
import { MetaGenerator } from './tools/MetaGenerator';
import { RobotsGenerator } from './tools/RobotsGenerator';
import { MergePdf } from './tools/MergePdf';
import { SplitPdf } from './tools/SplitPdf';
import { SeoAnalyzer } from './tools/SeoAnalyzer';
import { GenericTool } from './tools/GenericTool';

// Import newly implemented tools
import { ResizeImage } from './tools/ResizeImage';
import { CropImage } from './tools/CropImage';
import { WatermarkImage } from './tools/WatermarkImage';
import { SvgOptimizer } from './tools/SvgOptimizer';
import { MemeGenerator } from './tools/MemeGenerator';
import { ColorExtractor } from './tools/ColorExtractor';
import { CompressPdf } from './tools/CompressPdf';
import { PdfToWord } from './tools/PdfToWord';
import { WordToPdf } from './tools/WordToPdf';
import { PdfToJpg } from './tools/PdfToJpg';
import { ProtectPdf } from './tools/ProtectPdf';
import { UnlockPdf } from './tools/UnlockPdf';
import { KeywordDensity } from './tools/KeywordDensity';
import { SchemaGenerator } from './tools/SchemaGenerator';
import { OpenGraph } from './tools/OpenGraph';

import { TOOLS } from './data/tools';

const toolRoutes = TOOLS.map(tool => {
  let element;
  
  // Specific tool implementations
  switch (tool.id) {
    case 'word-counter':
       element = <WordCounter />;
       break;
    case 'character-counter':
       element = <CharacterCounter />;
       break;
    case 'case-converter':
       element = <CaseConverter />;
       break;
    case 'remove-duplicate-lines':
       element = <RemoveDuplicateLines />;
       break;
    case 'password-generator':
       element = <PasswordGenerator />;
       break;
    case 'slug-generator':
       element = <SlugGenerator />;
       break;
    case 'json-formatter':
       element = <JSONFormatter />;
       break;
    case 'uuid-generator':
       element = <UUIDGenerator />;
       break;
    case 'base64-encoder':
       element = <Base64Encoder />;
       break;
    case 'base64-decoder':
       element = <Base64Decoder />;
       break;
    case 'url-encoder':
       element = <UrlEncoder />;
       break;
    case 'url-decoder':
       element = <UrlDecoder />;
       break;
    case 'lorem-ipsum':
       element = <LoremIpsum />;
       break;
    case 'text-to-binary':
       element = <TextToBinary />;
       break;
    case 'binary-to-text':
       element = <BinaryToText />;
       break;
    case 'reverse-text':
       element = <ReverseText />;
       break;
    case 'markdown-preview':
       element = <MarkdownPreview />;
       break;
    case 'jwt-decoder':
       element = <JwtDecoder />;
       break;
    case 'color-picker':
       element = <ColorPicker />;
       break;
    case 'html-formatter':
       element = <HtmlFormatter />;
       break;
    case 'css-minifier':
       element = <CssMinifier />;
       break;
    case 'js-minifier':
       element = <JsMinifier />;
       break;
    case 'image-converter':
    case 'png-to-jpg':
    case 'jpg-to-png':
    case 'image-compressor':
       element = <ImageConverter />;
       break;
    case 'resize-image':
       element = <ResizeImage />;
       break;
    case 'crop-image':
       element = <CropImage />;
       break;
    case 'watermark-image':
       element = <WatermarkImage />;
       break;
    case 'svg-optimizer':
       element = <SvgOptimizer />;
       break;
    case 'meme-generator':
       element = <MemeGenerator />;
       break;
    case 'color-extractor':
       element = <ColorExtractor />;
       break;
    case 'compress-pdf':
       element = <CompressPdf />;
       break;
    case 'pdf-to-word':
       element = <PdfToWord />;
       break;
    case 'word-to-pdf':
       element = <WordToPdf />;
       break;
    case 'pdf-to-jpg':
       element = <PdfToJpg />;
       break;
    case 'protect-pdf':
       element = <ProtectPdf />;
       break;
    case 'unlock-pdf':
       element = <UnlockPdf />;
       break;
    case 'keyword-density':
       element = <KeywordDensity />;
       break;
    case 'schema-generator':
       element = <SchemaGenerator />;
       break;
    case 'open-graph':
       element = <OpenGraph />;
       break;
    case 'meta-generator':
       element = <MetaGenerator />;
       break;
    case 'robots-generator':
       element = <RobotsGenerator />;
       break;
    case 'serp-preview':
    case 'seo-analyzer':
       element = <SeoAnalyzer />;
       break;
    case 'merge-pdf':
       element = <MergePdf />;
       break;
    case 'split-pdf':
       element = <SplitPdf />;
       break;
    default:
       // Fallback for stubs to prove architecture scalability
       element = <GenericTool toolId={tool.id} />;
  }

  // Slice off the initial slash from tool.path as router paths are relative
  return {
    path: tool.path.slice(1),
    element
  };
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "blog", element: <BlogList /> },
      { path: "blog/:slug", element: <BlogPost /> },
      { path: "legal/:page", element: <LegalPage /> },
      // Legal and About placeholder routes
      { 
        path: "about", 
        element: (
          <div className="container p-12 text-center text-xl text-muted-foreground">
            About Us page (Scalable routing demo)
          </div>
        ) 
      },
      ...toolRoutes
    ],
  },
]);

export default function App() {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <RouterProvider router={router} />
      </ThemeProvider>
    </HelmetProvider>
  );
}
