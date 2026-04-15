import Link from "next/link";

export default function CTABand() {
  return (
    <section className="py-24 px-8" aria-label="AI Readiness call to action">
      <div className="max-w-7xl mx-auto signature-gradient rounded-3xl p-12 md:p-20 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none" aria-hidden>
          <span className="material-symbols-outlined text-[300px] absolute -top-20 -right-20">
            analytics
          </span>
        </div>
        <div className="relative z-10">
          <h2 className="font-headline text-4xl md:text-5xl font-extrabold tracking-tighter mb-6 text-white">
            Is Your Business Ready for AI?
          </h2>
          <p className="text-white text-lg max-w-2xl mx-auto mb-10">
            Don&apos;t guess. Our 20-point diagnostic reveals exactly where your
            technical infrastructure stands and what low-hanging fruit you can
            capture today.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-white text-primary-container px-10 py-5 rounded-xl font-headline font-bold text-xl hover:shadow-2xl transition-all active:scale-95"
          >
            Get Your Free AI Readiness Assessment →
          </Link>
        </div>
      </div>
    </section>
  );
}
