import Link from "next/link";
import { getAllPosts } from "@/lib/mdx";

export default async function LatestInsights() {
  const posts = await getAllPosts();
  const latest = posts.slice(0, 3);

  return (
    <section className="bg-[#F7F7F5] py-32" aria-labelledby="insights-heading">
      <div className="max-w-7xl mx-auto px-8">
        <div className="flex justify-between items-end mb-16">
          <div>
            <h2
              id="insights-heading"
              className="font-headline text-4xl md:text-5xl font-extrabold tracking-tighter text-inverse-on-surface mb-4"
            >
              Latest Insights
            </h2>
            <p className="text-inverse-on-surface/60">
              Strategic perspectives for C-suite leaders.
            </p>
          </div>
          <Link
            href="/blog"
            className="text-inverse-on-surface font-headline font-bold border-b-2 border-primary pb-1 hover:text-primary transition-colors"
          >
            View All Thinking
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {latest.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group cursor-pointer"
            >
              <div className="aspect-[16/10] bg-white rounded-xl mb-6 overflow-hidden border border-outline-variant/10">
                <div className="w-full h-full signature-gradient opacity-10 group-hover:opacity-30 transition-opacity flex items-center justify-center">
                  <span className="material-symbols-outlined text-6xl text-primary">
                    psychology
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-4 mb-3">
                <span className="px-3 py-1 bg-primary/10 text-primary-container text-[10px] font-bold uppercase rounded-full">
                  {post.category}
                </span>
                <span className="text-xs text-inverse-on-surface/40 font-mono">
                  {post.readTime}
                </span>
              </div>
              <h3 className="text-xl font-headline font-bold text-inverse-on-surface mb-3 group-hover:text-primary transition-colors">
                {post.title}
              </h3>
              <span className="material-symbols-outlined text-inverse-on-surface group-hover:translate-x-2 transition-transform inline-block">
                trending_flat
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
