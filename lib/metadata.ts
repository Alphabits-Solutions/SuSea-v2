import type { Metadata } from "next";

const BASE_URL = "https://susea.ai";

export function buildMetadata({
  title,
  description,
  path = "",
  type = "website",
}: {
  title: string;
  description: string;
  path?: string;
  type?: "website" | "article";
}): Metadata {
  const url = `${BASE_URL}${path}`;

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
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      site: "@suseaai",
    },
  };
}

export const ORGANIZATION_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Susea.ai",
  url: BASE_URL,
  logo: `${BASE_URL}/logo.png`,
  description:
    "Enterprise AI agency specialising in AI agents, consulting, and rapid development. Serving USA & Europe.",
  sameAs: [
    "https://linkedin.com/company/suseaai",
    "https://twitter.com/suseaai",
    "https://github.com/suseaai",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    email: "hello@susea.ai",
    contactType: "customer service",
    areaServed: ["US", "GB", "EU"],
  },
};

export const WEBSITE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Susea.ai",
  url: BASE_URL,
  potentialAction: {
    "@type": "SearchAction",
    target: `${BASE_URL}/blog?q={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
};
