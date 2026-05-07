export interface BlogFaq {
  question: string;
  answer: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  category: string;
  readTime: string;
  author: string;
  authorRole: string;
  excerpt: string;
  featured: boolean;
  /** SEO meta description — under 155 chars. Falls back to excerpt if not set. */
  description?: string;
  /** 5–8 specific technical keywords for JSON-LD and meta. */
  keywords?: string[];
  /** FAQ entries rendered as visible text and FAQPage JSON-LD. */
  faq?: BlogFaq[];
  content?: string;
}

export type BlogFrontmatter = Omit<BlogPost, "slug" | "content">;
