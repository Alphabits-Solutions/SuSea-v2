import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/mdx";

const BASE_URL = "https://susea.ai";

const STATIC_ROUTES = [
  { url: "/", priority: 1.0, changeFrequency: "weekly" as const },
  { url: "/about", priority: 0.8, changeFrequency: "monthly" as const },
  { url: "/contact", priority: 0.9, changeFrequency: "monthly" as const },
  { url: "/blog", priority: 0.9, changeFrequency: "daily" as const },
  { url: "/case-studies", priority: 0.8, changeFrequency: "weekly" as const },
  { url: "/services/agents", priority: 0.8, changeFrequency: "monthly" as const },
  { url: "/services/consulting", priority: 0.8, changeFrequency: "monthly" as const },
  { url: "/services/rapid-mvp", priority: 0.8, changeFrequency: "monthly" as const },
  { url: "/services/fix-agent", priority: 0.8, changeFrequency: "monthly" as const },
  { url: "/services/vibe-code-rescue", priority: 0.8, changeFrequency: "monthly" as const },
  { url: "/services/security", priority: 0.8, changeFrequency: "monthly" as const },
  { url: "/services/hire", priority: 0.7, changeFrequency: "monthly" as const },
  { url: "/services/maintenance", priority: 0.8, changeFrequency: "monthly" as const },
  { url: "/resources/free-tools", priority: 0.8, changeFrequency: "weekly" as const },
  { url: "/resources/ai-agent-diagnostic", priority: 0.8, changeFrequency: "monthly" as const },
  { url: "/resources/ai-readiness-scorecard", priority: 0.8, changeFrequency: "monthly" as const },
  { url: "/resources/ai-readiness-report", priority: 0.7, changeFrequency: "monthly" as const },
  { url: "/resources/playbooks", priority: 0.7, changeFrequency: "weekly" as const },
  { url: "/terms-of-service", priority: 0.4, changeFrequency: "yearly" as const },
  { url: "/privacy-policy", priority: 0.4, changeFrequency: "yearly" as const },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getAllPosts();

  const blogEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map(
    ({ url, priority, changeFrequency }) => ({
      url: `${BASE_URL}${url}`,
      lastModified: new Date(),
      changeFrequency,
      priority,
    })
  );

  return [...staticEntries, ...blogEntries];
}
