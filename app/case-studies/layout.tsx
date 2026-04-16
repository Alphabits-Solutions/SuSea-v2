import type { Metadata } from "next";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Case Studies — Results, Not Promises",
  description:
    "Real problems. Real solutions. Real numbers. Explore how Susea.ai has engineered efficiency for global enterprises and rapid-growth startups.",
  path: "/case-studies",
});

export default function CaseStudiesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
