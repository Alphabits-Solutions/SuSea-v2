import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";
import type { BlogPost, BlogFrontmatter } from "@/types/blog";

const CONTENT_DIR = path.join(process.cwd(), "content", "blog");

function getSlugs(): string[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  return fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

export async function getAllPosts(): Promise<BlogPost[]> {
  const slugs = getSlugs();

  const posts = slugs.map((slug) => {
    const filePath = path.join(CONTENT_DIR, `${slug}.mdx`);
    const raw = fs.readFileSync(filePath, "utf-8");
    const { data, content } = matter(raw);
    const fm = data as BlogFrontmatter;

    return {
      slug,
      title: fm.title,
      date: fm.date,
      category: fm.category,
      readTime: fm.readTime ?? readingTime(content).text,
      author: fm.author,
      authorRole: fm.authorRole,
      excerpt: fm.excerpt,
      featured: fm.featured ?? false,
      description: fm.description,
      keywords: fm.keywords,
      faq: fm.faq,
    } satisfies BlogPost;
  });

  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export async function getPostBySlug(
  slug: string
): Promise<(BlogPost & { rawContent: string }) | null> {
  const filePath = path.join(CONTENT_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  const fm = data as BlogFrontmatter;

  return {
    slug,
    title: fm.title,
    date: fm.date,
    category: fm.category,
    readTime: fm.readTime ?? readingTime(content).text,
    author: fm.author,
    authorRole: fm.authorRole,
    excerpt: fm.excerpt,
    featured: fm.featured ?? false,
    description: fm.description,
    keywords: fm.keywords,
    faq: fm.faq,
    rawContent: content,
  };
}
