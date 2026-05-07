import type { Metadata } from "next";
import { buildMetadata } from "@/lib/metadata";
import PlaybooksClient from "./PlaybooksClient";

export const metadata: Metadata = buildMetadata({
  title: "AI Playbooks",
  description:
    "Free AI implementation playbooks — hire the right agency, ship production-ready code, avoid costly mistakes, and build your MVP in 4 weeks.",
  path: "/resources/playbooks",
});

export default function PlaybooksPage() {
  return <PlaybooksClient />;
}
