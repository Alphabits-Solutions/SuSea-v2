import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllPosts, getPostBySlug } from "@/lib/mdx";
import JsonLd from "@/components/JsonLd";
import { buildMetadata, buildBreadcrumbs, buildOgImageUrl } from "@/lib/metadata";
import ReadingProgress from "@/components/sections/blog/ReadingProgress";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};

  const metaDescription = post.description ?? post.excerpt;
  const ogImage = buildOgImageUrl({ title: post.title, category: post.category });

  return {
    ...buildMetadata({
      title: post.title,
      description: metaDescription,
      path: `/blog/${slug}`,
      type: "article",
      image: ogImage,
    }),
    keywords: post.keywords,
    openGraph: {
      title: post.title,
      description: metaDescription,
      url: `https://susea.ai/blog/${slug}`,
      type: "article",
      siteName: "Susea.ai",
      locale: "en_US",
      images: [{ url: ogImage, width: 1200, height: 630, alt: post.title }],
      publishedTime: post.date,
      modifiedTime: post.date,
      section: post.category,
      tags: post.keywords ?? [post.category, "AI", "Susea.ai"],
      authors: [post.author],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const postKeywords = post.keywords ?? ["AI agents", "enterprise AI", post.category, "Susea.ai"];
  const ogImageUrl = buildOgImageUrl({ title: post.title, category: post.category });

  const ARTICLE_SCHEMA = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description ?? post.excerpt,
    articleBody: post.rawContent,
    articleSection: post.category,
    keywords: postKeywords,
    inLanguage: "en-US",
    datePublished: post.date,
    dateModified: post.date,
    url: `https://susea.ai/blog/${slug}`,
    image: {
      "@type": "ImageObject",
      url: ogImageUrl,
      width: 1200,
      height: 630,
    },
    author: {
      "@type": "Person",
      name: post.author,
      jobTitle: post.authorRole,
      sameAs: ["https://linkedin.com/company/suseaai", "https://twitter.com/suseaai"],
    },
    publisher: {
      "@type": "Organization",
      name: "Susea.ai",
      url: "https://susea.ai",
      logo: { "@type": "ImageObject", url: "https://susea.ai/logo.png" },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://susea.ai/blog/${slug}`,
    },
  };

  const BREADCRUMB_SCHEMA = buildBreadcrumbs([
    { name: "Home", url: "https://susea.ai" },
    { name: "Blog", url: "https://susea.ai/blog" },
    { name: post.title, url: `https://susea.ai/blog/${slug}` },
  ]);

  const FAQ_SCHEMA = post.faq?.length
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: post.faq.map(({ question, answer }) => ({
          "@type": "Question",
          name: question,
          acceptedAnswer: { "@type": "Answer", text: answer },
        })),
      }
    : null;

  return (
    <>
      <JsonLd data={ARTICLE_SCHEMA} />
      <JsonLd data={BREADCRUMB_SCHEMA} />
      {FAQ_SCHEMA && <JsonLd data={FAQ_SCHEMA} />}

      <div className="pt-32 pb-20 max-w-[1440px] mx-auto px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Sticky editorial sidebar */}
          <aside className="hidden lg:flex flex-col p-8 lg:col-span-3 sticky top-32 h-[calc(100vh-10rem)] bg-surface-container-low rounded-xl shadow-2xl shadow-black/20 font-headline text-sm tracking-wide">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-full bg-primary-container flex items-center justify-center">
                <span className="material-symbols-outlined text-on-primary-container">
                  architecture
                </span>
              </div>
              <div>
                <div className="text-lg font-bold text-primary">Editorial Index</div>
                <div className="text-xs text-on-surface-variant/50">Deep Dive Analysis</div>
              </div>
            </div>
            <nav className="flex flex-col space-y-6" aria-label="Article sections">
              <div className="text-on-surface-variant/50 pl-4 flex items-center gap-3">
                <span className="material-symbols-outlined text-lg">person</span>
                <span>{post.author}</span>
              </div>
              <div className="text-on-surface-variant/50 pl-4 flex items-center gap-3">
                <span className="material-symbols-outlined text-lg">schedule</span>
                <span>{post.readTime}</span>
              </div>
              <div className="text-on-surface-variant/50 pl-4 flex items-center gap-3">
                <span className="material-symbols-outlined text-lg">calendar_today</span>
                <span>
                  {new Date(post.date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </div>
              <div className="text-on-surface-variant/50 pl-4 flex items-center gap-3">
                <span className="material-symbols-outlined text-lg">label</span>
                <span className="capitalize">{post.category}</span>
              </div>
              {post.keywords && post.keywords.length > 0 && (
                <div className="pl-4 pt-2 border-t border-outline-variant/10">
                  <div className="text-xs uppercase tracking-widest text-on-surface-variant/40 mb-3">Keywords</div>
                  <div className="flex flex-wrap gap-1.5">
                    {post.keywords.map((kw) => (
                      <span key={kw} className="px-2 py-0.5 rounded-full bg-surface-container text-xs text-on-surface-variant/60 font-mono">
                        {kw}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </nav>
            <ReadingProgress />
          </aside>

          {/* Main content */}
          <div className="lg:col-span-9">
            {/* Article header */}
            <header className="mb-20">
              <div className="text-sm uppercase tracking-[0.2em] text-secondary font-bold mb-6 font-label">
                {post.category} Deep Dive
              </div>
              <h1 className="text-5xl md:text-7xl font-headline font-extrabold tracking-tighter editorial-gradient-text leading-[1.1] mb-8">
                {post.title}
              </h1>
              <div className="flex flex-wrap items-center gap-6 text-on-surface-variant/60 font-mono text-sm">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-base">calendar_today</span>
                  {new Date(post.date)
                    .toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
                    .toUpperCase()}
                </div>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-base">schedule</span>
                  {post.readTime.toUpperCase()}
                </div>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-base">person</span>
                  {post.author.toUpperCase()}
                </div>
              </div>
            </header>

            {/* MDX body */}
            <article className="prose prose-invert prose-lg max-w-none prose-headings:font-headline prose-headings:tracking-tight prose-a:text-primary prose-strong:text-on-surface prose-code:text-secondary prose-code:font-mono">
              <MDXRemote source={post.rawContent} />
            </article>

            {/* FAQ section — visible text mirrors FAQPage JSON-LD */}
            {post.faq && post.faq.length > 0 && (
              <section className="mt-24 pt-12 border-t border-outline-variant/10" aria-labelledby="faq-heading">
                <h2
                  id="faq-heading"
                  className="text-3xl font-headline font-bold tracking-tight mb-10"
                >
                  Frequently Asked Questions
                </h2>
                <dl className="space-y-8">
                  {post.faq.map(({ question, answer }) => (
                    <div key={question} className="p-6 rounded-xl bg-surface-container border border-outline-variant/10">
                      <dt className="text-lg font-headline font-semibold text-on-surface mb-3">
                        {question}
                      </dt>
                      <dd className="text-on-surface-variant leading-relaxed">{answer}</dd>
                    </div>
                  ))}
                </dl>
              </section>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
