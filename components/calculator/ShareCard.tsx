"use client";

import { useState } from "react";

interface Props {
  totalSavings: number;
}

export default function ShareCard({ totalSavings }: Props) {
  const [copied, setCopied] = useState(false);
  const formatted = totalSavings.toLocaleString("en-US");
  const shareText = `I just discovered my business could save $${formatted}/year with automation! Find your savings at susea.ai 🚀`;
  const shareUrl = typeof window !== "undefined" ? window.location.href : "https://susea.ai/automation-calculator";

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(`${shareText}\n${shareUrl}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback — silently ignore
    }
  };

  const handleTwitter = () => {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="flex flex-wrap items-center gap-3">
      <span className="text-sm text-on-surface-variant font-label">Share your score:</span>
      <button
        onClick={handleCopy}
        className="flex items-center gap-2 px-4 py-2 rounded-xl border border-outline-variant/30 bg-surface-container text-on-surface-variant hover:text-on-surface hover:border-outline-variant/60 transition-all text-sm font-medium"
      >
        <span className="material-symbols-outlined text-sm">
          {copied ? "check" : "content_copy"}
        </span>
        {copied ? "Copied!" : "Copy Link"}
      </button>
      <button
        onClick={handleTwitter}
        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#1a1a2e] border border-[#1DA1F2]/30 text-[#1DA1F2] hover:bg-[#1DA1F2]/10 transition-all text-sm font-medium"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
        Share on X
      </button>
    </div>
  );
}
