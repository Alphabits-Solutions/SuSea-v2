import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Scheduled Maintenance | Susea.ai",
  description: "Susea.ai is currently undergoing scheduled maintenance. We'll be back shortly.",
  robots: { index: false, follow: false },
};

export default function MaintenancePage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-8">
      <div className="text-center max-w-xl">
        <div className="w-20 h-20 signature-gradient rounded-2xl flex items-center justify-center mx-auto mb-8">
          <span className="material-symbols-outlined text-4xl text-white">build</span>
        </div>
        <h1 className="font-headline text-5xl font-extrabold tracking-tighter mb-6">
          Back Soon.
        </h1>
        <p className="text-on-surface-variant text-xl mb-10 leading-relaxed">
          We&apos;re upgrading our systems to serve you better. Scheduled
          maintenance is in progress — we&apos;ll be live again shortly.
        </p>
        <a
          href="mailto:hello@susea.ai"
          className="text-primary font-headline font-bold hover:opacity-70 transition-opacity text-lg"
        >
          hello@susea.ai
        </a>
      </div>
    </div>
  );
}
