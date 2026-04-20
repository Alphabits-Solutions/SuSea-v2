import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Automation Savings Calculator | Susea.ai",
  description:
    "Discover how much your business could save with intelligent automation. Get a personalized automation roadmap with ROI estimates across 200+ workflows. Free instant results.",
  alternates: { canonical: "https://susea.ai/automation-calculator" },
  openGraph: {
    title: "Free Automation Savings Calculator | Susea.ai",
    description:
      "Discover how much your business could save with automation. Get a personalized roadmap with ROI estimates across 200+ workflows.",
    url: "https://susea.ai/automation-calculator",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Automation Savings Calculator",
    description: "Find out how much your business could save with AI automation — free instant results.",
  },
};

export default function CalculatorLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
