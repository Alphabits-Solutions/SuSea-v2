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
  content?: string;
}

export type BlogFrontmatter = Omit<BlogPost, "slug" | "content">;
