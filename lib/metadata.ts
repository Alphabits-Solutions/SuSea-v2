import type { Metadata } from "next";

const BASE_URL = "https://susea.ai";

/** Builds a URL for the dynamic /api/og image generator. */
export function buildOgImageUrl(params: { title?: string; category?: string } = {}): string {
  const url = new URL(`${BASE_URL}/api/og`);
  if (params.title) url.searchParams.set("title", params.title);
  if (params.category) url.searchParams.set("category", params.category);
  return url.toString();
}

export function buildMetadata({
  title,
  description,
  path = "",
  type = "website",
  image,
}: {
  title: string;
  description: string;
  path?: string;
  type?: "website" | "article";
  image?: string;
}): Metadata {
  const url = `${BASE_URL}${path}`;
  const ogImage = image ?? buildOgImageUrl({ title });

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      type,
      siteName: "Susea.ai",
      locale: "en_US",
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      site: "@suseaai",
      images: [ogImage],
    },
  };
}

/** Schema.org BreadcrumbList — inject via JsonLd on any page with hierarchy */
export function buildBreadcrumbs(
  items: Array<{ name: string; url: string }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/** Schema.org HowTo — for "how it works" process steps on service pages */
export function buildHowToSchema({
  name,
  description,
  totalTime,
  steps,
}: {
  name: string;
  description: string;
  totalTime?: string;
  steps: Array<{ name: string; text: string }>;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name,
    description,
    ...(totalTime ? { totalTime } : {}),
    step: steps.map((s, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: s.name,
      text: s.text,
    })),
  };
}

export const ORGANIZATION_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${BASE_URL}/#organization`,
  name: "Susea.ai",
  url: BASE_URL,
  logo: `${BASE_URL}/logo.png`,
  foundingDate: "2022",
  description:
    "Enterprise AI agency specialising in AI agents, consulting, and rapid development. Serving USA & Europe.",
  sameAs: [
    "https://linkedin.com/company/suseaai",
    "https://twitter.com/suseaai",
    "https://github.com/suseaai",
  ],
  address: [
    { "@type": "PostalAddress", addressLocality: "San Francisco", addressCountry: "US" },
    { "@type": "PostalAddress", addressLocality: "London", addressCountry: "GB" },
    { "@type": "PostalAddress", addressLocality: "Singapore", addressCountry: "SG" },
  ],
  contactPoint: {
    "@type": "ContactPoint",
    email: "hello@susea.ai",
    contactType: "customer service",
    areaServed: ["US", "GB", "EU", "SG"],
    availableLanguage: "English",
  },
  knowsAbout: [
    "Artificial Intelligence",
    "AI Agents",
    "Large Language Models",
    "Machine Learning",
    "Enterprise Software",
    "AI Consulting",
    "Agentic Workflows",
    "Retrieval-Augmented Generation",
  ],
};

export const WEBSITE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${BASE_URL}/#website`,
  name: "Susea.ai",
  url: BASE_URL,
  inLanguage: "en-US",
  potentialAction: {
    "@type": "SearchAction",
    target: `${BASE_URL}/blog?q={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
};
