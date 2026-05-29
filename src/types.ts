export interface Tool {
  id: string;
  name: string;
  description: string;
  category: ToolCategory;
  icon: string;
  path: string;
}

export type ToolCategory = 'Image' | 'PDF' | 'Text' | 'Developer' | 'SEO';

export interface CategoryData {
  id: ToolCategory;
  name: string;
  description: string;
  icon: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  tags?: string[];
  author: string;
  authorBio?: string;
  authorAvatar?: string;
  date: string;
  readTime: string;
  slug: string;
  featuredImage?: string;
}

export interface ToolSEOContent {
  toolId: string;
  title: string;
  metaDescription: string;
  h1: string;
  introduction: string;
  howToUse: { step: string; description: string }[];
  features: { title: string; description: string }[];
  benefits: string;
  faqs: { question: string; answer: string }[];
}
