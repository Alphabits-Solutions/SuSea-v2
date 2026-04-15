import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts } from "@/lib/mdx";
import JsonLd from "@/components/JsonLd";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Blog — Practical AI. No Hype.",
  description:
    "Technical insights, strategy playbooks, and engineering deep-dives from the Susea.ai team. Curated for builders and C-suite leaders.",
  path: "/blog",
});

export default async function BlogPage() {
  const posts = await getAllPosts();
  const featured = posts.find((p) => p.featured) ?? posts[0];
  const rest = posts.filter((p) => p.slug !== featured?.slug);

  const ITEM_LIST_SCHEMA = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Susea.ai Blog",
    url: "https://susea.ai/blog",
    itemListElement: posts.map((post, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `https://susea.ai/blog/${post.slug}`,
      name: post.title,
    })),
  };

  return (
    <>
      <JsonLd data={ITEM_LIST_SCHEMA} />

      <div className="pt-24">
        {/* Header */}
        <header className="max-w-7xl mx-auto px-8 pt-16 pb-12">
          <div className="mb-4">
            <span className="inline-block px-4 py-1 rounded-full border border-outline-variant/30 text-primary font-mono text-xs uppercase tracking-widest">
              Insights
            </span>
          </div>
          <h1 className="font-headline text-6xl md:text-8xl font-extrabold tracking-tighter mb-6">
            Practical AI.{" "}
            <span className="signature-text-gradient">No Hype.</span>
          </h1>
          <p className="text-on-surface-variant text-xl max-w-2xl">
            Engineering deep-dives, strategy playbooks, and industry analysis
            from the Susea.ai team.
          </p>
        </header>

        {/* Category filter — client component for interactivity */}
        <div className="max-w-7xl mx-auto px-8 mb-16 flex gap-3 overflow-x-auto no-scrollbar pb-2">
          {["All", "Engineering", "Strategy", "Operations", "Deployment", "Ethics"].map((cat) => (
            <button
              key={cat}
              className="px-6 py-2 rounded-full bg-surface-container text-on-surface-variant hover:text-on-surface transition-colors text-sm font-label shrink-0"
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Featured Post */}
        {featured && (
          <section className="max-w-7xl mx-auto px-8 mb-24">
            <Link
              href={`/blog/${featured.slug}`}
              className="group relative overflow-hidden rounded-xl bg-surface-container-low min-h-[600px] flex items-end block"
            >
              <div className="absolute inset-0 z-0 overflow-hidden" aria-hidden>
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent z-10" />
                <div className="w-full h-full signature-gradient opacity-30 blur-3xl scale-110 group-hover:scale-100 transition-transform duration-700" />
              </div>
              <div className="relative z-20 p-12 w-full">
                <div className="flex items-center gap-4 mb-6">
                  <span className="bg-secondary-container text-on-secondary px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                    Featured
                  </span>
                  <span className="text-on-surface-variant text-sm font-mono">
                    {featured.readTime}
                  </span>
                </div>
                <div className="grid md:grid-cols-2 gap-12 items-end">
                  <div>
                    <h2 className="text-4xl md:text-6xl font-headline font-bold tracking-tighter text-on-surface mb-6 leading-tight">
                      {featured.title}
                    </h2>
                    <p className="text-on-surface-variant text-lg leading-relaxed max-w-lg mb-8">
                      {featured.excerpt}
                    </p>
                  </div>
                  <div className="flex flex-col items-start md:items-end justify-end">
                    <div className="flex items-center gap-4 mb-8">
                      <div className="text-right">
                        <p className="text-on-surface font-semibold">{featured.author}</p>
                        <p className="text-on-surface-variant text-xs">{featured.authorRole}</p>
                      </div>
                      <div className="w-12 h-12 rounded-full bg-surface-container-highest flex items-center justify-center">
                        <span className="material-symbols-outlined text-primary">person</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 text-primary font-bold text-lg">
                      Read Article
                      <span className="material-symbols-outlined group-hover:translate-x-2 transition-transform">
                        arrow_forward
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </section>
        )}

        {/* Article grid */}
        <section className="max-w-7xl mx-auto px-8 mb-32">
          <div className="grid md:grid-cols-3 gap-12">
            {rest.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group"
              >
                <article>
                  <div className="aspect-[16/10] bg-surface-container rounded-xl mb-6 overflow-hidden">
                    <div className="w-full h-full signature-gradient opacity-10 group-hover:opacity-30 transition-opacity flex items-center justify-center">
                      <span className="material-symbols-outlined text-5xl text-primary">
                        article
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="px-3 py-1 bg-primary/10 text-primary text-[10px] font-bold uppercase rounded-full">
                      {post.category}
                    </span>
                    <span className="text-xs text-on-surface-variant/60 font-mono">
                      {post.readTime}
                    </span>
                  </div>
                  <h3 className="text-xl font-headline font-bold mb-3 group-hover:text-primary transition-colors leading-snug">
                    {post.title}
                  </h3>
                  <p className="text-on-surface-variant text-sm line-clamp-2 mb-4">
                    {post.excerpt}
                  </p>
                  <span className="text-sm font-label text-on-surface-variant/60 font-mono">
                    {new Date(post.date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                </article>
              </Link>
            ))}
          </div>
        </section>

        {/* Newsletter */}
        <section className="max-w-7xl mx-auto px-8 mb-32">
          <div className="bg-surface-container-lowest rounded-xl p-12 md:p-20 relative overflow-hidden border border-outline-variant/10">
            <div
              className="absolute top-0 right-0 w-1/3 h-full signature-gradient opacity-10 blur-[100px]"
              aria-hidden
            />
            <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-5xl font-headline font-bold tracking-tighter mb-6">
                  Stay ahead of the curve.
                </h2>
                <p className="text-on-surface-variant text-lg max-w-md">
                  Get curated technical insights and strategy playbooks delivered
                  to your inbox once a month.
                </p>
              </div>
              <form className="flex flex-col sm:flex-row gap-4">
                <div className="flex-grow relative">
                  <label
                    htmlFor="newsletter-email"
                    className="absolute -top-6 left-0 text-xs font-mono text-on-surface-variant uppercase tracking-widest"
                  >
                    Email Address
                  </label>
                  <input
                    id="newsletter-email"
                    type="email"
                    placeholder="you@company.ai"
                    className="w-full bg-transparent border-b border-outline-variant focus:border-primary focus:ring-0 text-on-surface py-3 px-0 placeholder:text-outline/40 outline-none transition-colors"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-secondary-container text-on-secondary px-8 py-3 rounded-xl font-headline font-bold hover:opacity-90 transition-opacity"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
