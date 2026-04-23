import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import JsonLd from "@/components/JsonLd";
import FAQSection from "@/components/ui/FAQSection";
import { buildMetadata, buildBreadcrumbs, buildHowToSchema } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Rapid MVP — From Idea to Market in 4 Weeks",
  description:
    "We build high-performance Web, Mobile, and SaaS MVPs for visionary founders. Precision engineering meets editorial design. Ship your vision in 4 weeks.",
  path: "/services/rapid-mvp",
});

const SERVICES = [
  { icon: "language", title: "Web Ecosystems", desc: "Scalable enterprise platforms and high-conversion marketing engines built with Next.js and Tailwind.", stack: "REACT • NEXT.JS • TYPESCRIPT" },
  { icon: "smartphone", title: "Native Mobile", desc: "Fluid iOS and Android experiences using React Native, designed with a focus on tactile interaction.", stack: "REACT NATIVE • EXPO • SWIFT" },
  { icon: "layers", title: "SaaS MVP", desc: "From zero to launch. Full-stack infrastructure with integrated billing, auth, and AI workflows.", stack: "NODE.JS • POSTGRES • STRIPE" },
];

const TIMELINE = [
  { num: "01", title: "Discovery & Blueprint", desc: "Defining core user flows, technical architecture, and finalizing the sprint backlog.", primary: true },
  { num: "02", title: "Design & Prototypes", desc: "High-fidelity UI design system development and interactive prototyping of key features.", primary: true },
  { num: "03", title: "Core Development", desc: "Full-stack engineering of the primary value proposition and integration of third-party APIs.", primary: true },
  { num: "04", title: "QA & Deployment", desc: "Stress testing, edge-case hardening, and production launch on high-scale infrastructure.", primary: false },
];

const WHATS_INCLUDED = [
  { icon: "verified_user", title: "Auth & Security", desc: "Robust JWT/OAuth implementation and security hardening." },
  { icon: "database", title: "Data Infrastructure", desc: "Optimized schemas for Postgres/NoSQL with caching layers." },
  { icon: "monitoring", title: "Analytics Ready", desc: "Integrated event tracking and performance monitoring." },
  { icon: "cloud_upload", title: "CI/CD Pipeline", desc: "Automated testing and deployment workflows." },
];

const TECH_STACK = ["NEXT.JS", "TYPESCRIPT", "TAILWIND", "STRIPE", "AWS", "POSTGRES"];

const FAQS = [
  {
    q: "What exactly can be built in 4 weeks?",
    a: "A fully functional, production-ready MVP covering your core value proposition. This includes authentication, a database, a primary user workflow, and a polished UI. We scope with brutal honesty in week 1 to ensure everything promised is delivered.",
  },
  {
    q: "Do I retain full ownership of the code?",
    a: "100%. You receive the full source code, all design assets, and complete documentation on day 1 of deployment. There are no licensing fees, vendor lock-in, or ongoing royalties.",
  },
  {
    q: "What happens if we need more features after launch?",
    a: "We offer post-MVP scaling packages, can introduce you to our Hire Dedicated Resources service, or help you transition to an in-house team. Most clients move to a 2-week sprint retainer after the initial launch.",
  },
  {
    q: "How involved do we need to be during the build?",
    a: "You attend two 60-minute syncs per week (Monday planning, Friday review). Outside of that, we handle everything. You don't need to manage day-to-day decisions — that's what you're paying us for.",
  },
  {
    q: "Can you integrate AI features into the MVP?",
    a: "Absolutely. Many of our MVPs include LLM-powered features such as AI chatbots, content generation, document analysis, or recommendation engines. These are scoped as part of the initial blueprint.",
  },
  {
    q: "What tech stack do you build with?",
    a: "Our default stack is Next.js (React), TypeScript, PostgreSQL, and Stripe for payments, deployed on AWS or Vercel. We adapt to your requirements — including React Native for mobile, Django/FastAPI for ML-heavy backends, or any other production-grade technology.",
  },
];

const FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map(({ q, a }) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: { "@type": "Answer", text: a },
  })),
};

const SERVICE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Rapid MVP Development",
  url: "https://susea.ai/services/rapid-mvp",
  provider: { "@type": "Organization", name: "Susea.ai", url: "https://susea.ai" },
  description: "Web, Mobile, and SaaS MVPs shipped in 4 weeks. Full ownership, production-ready.",
  serviceType: "MVP Development",
  areaServed: ["US", "GB", "EU", "SG"],
};

const HOWTO_SCHEMA = buildHowToSchema({
  name: "How to Launch an MVP in 4 Weeks",
  description: "Susea.ai's 4-sprint process for building and launching a production-ready MVP.",
  totalTime: "P4W",
  steps: TIMELINE.map((s) => ({ name: s.title, text: s.desc })),
});

const BREADCRUMB_SCHEMA = buildBreadcrumbs([
  { name: "Home", url: "https://susea.ai" },
  { name: "Services", url: "https://susea.ai/services/rapid-mvp" },
  { name: "Rapid MVP", url: "https://susea.ai/services/rapid-mvp" },
]);

export default function RapidMVPPage() {
  return (
    <>
      <JsonLd data={SERVICE_SCHEMA} />
      <JsonLd data={FAQ_SCHEMA} />
      <JsonLd data={HOWTO_SCHEMA} />
      <JsonLd data={BREADCRUMB_SCHEMA} />

      {/* Hero */}
      <section className="relative min-h-[921px] flex flex-col items-center justify-center px-6 overflow-hidden pt-24">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full opacity-20 pointer-events-none" aria-hidden>
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary-container rounded-full blur-[120px]" />
        </div>
        <div className="max-w-5xl text-center z-10">
          <span className="inline-block font-label text-xs uppercase tracking-widest text-primary mb-6">
            Expert Product Engineering
          </span>
          <h1 className="font-headline text-6xl md:text-7xl font-extrabold tracking-tighter mb-8 signature-text-gradient leading-tight">
            From Idea to Market <br />in 4 Weeks.
          </h1>
          <p className="font-body text-lg text-on-surface-variant max-w-2xl mx-auto mb-12">
            We build high-performance Web, Mobile, and SaaS MVPs for visionary founders.
            Precision engineering meets editorial design.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="signature-gradient px-10 py-4 rounded-xl font-headline font-bold text-lg hover:opacity-90 transition-all active:scale-95 text-white"
            >
              Initiate Strategy
            </Link>
            <button className="bg-surface-container-highest/50 border border-outline-variant/15 text-on-surface px-10 py-4 rounded-xl font-headline font-bold text-lg hover:bg-surface-container-highest transition-all">
              View Engineering Specs
            </button>
          </div>
        </div>

        {/* Floating Mockups */}
        <div className="mt-20 w-full max-w-7xl mx-auto relative flex justify-center items-center h-[400px]">
          {/* Left mockup */}
          <div className="absolute left-0 top-0 w-64 h-80 glass-panel rounded-xl border border-outline-variant/15 shadow-2xl -rotate-6 transform translate-y-12 z-0 hidden lg:block" aria-hidden>
            <div className="p-4 border-b border-outline-variant/10 flex gap-2">
              <div className="w-2 h-2 rounded-full bg-error" />
              <div className="w-2 h-2 rounded-full bg-secondary" />
              <div className="w-2 h-2 rounded-full bg-primary" />
            </div>
            <div className="p-6">
              <div className="h-4 w-3/4 bg-surface-container-highest rounded mb-4" />
              <div className="h-2 w-full bg-outline-variant/20 rounded mb-2" />
              <div className="h-2 w-full bg-outline-variant/20 rounded mb-2" />
              <div className="mt-8 grid grid-cols-2 gap-2">
                <div className="h-16 bg-primary/20 rounded-lg border border-primary/30" />
                <div className="h-16 bg-secondary/20 rounded-lg border border-secondary/30" />
              </div>
            </div>
          </div>
          {/* Center mockup */}
          <div className="w-full max-w-2xl h-[450px] glass-panel rounded-xl border border-outline-variant/15 shadow-[0_32px_64px_rgba(0,0,0,0.5)] z-20 overflow-hidden relative">
            <Image
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDNQYzjJBhZ5ojmql6igkzeIIhoJ1zebqCB4_NW3xRNOAEm5lPcOwO9UeVHw-2-ipTV9UIocbvLGwgmiWGbtYayLysxK34KIjio_RU1VUP9JT0HKjHV4tXpJNTdwdzZPPFDAdhwF4QAFZCncKKXwSOcGGOC6I8CeUfwJQwUwsH356bzxcthv3cQvmdWrvigWpM35W73zL4umeNxJeh8jAPTlkJUcIXgxcCrI1lKJEFFuX7JJU6xyD7wDjd8kiqzYyI_r_F2RZoHc3sP"
              alt="Abstract dark UI dashboard"
              fill
              className="object-cover opacity-60"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" aria-hidden />
          </div>
          {/* Right mockup */}
          <div className="absolute right-0 bottom-0 w-64 h-80 glass-panel rounded-xl border border-outline-variant/15 shadow-2xl rotate-3 transform -translate-y-8 z-0 hidden lg:block" aria-hidden>
            <div className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-primary-container" />
                <div className="space-y-2">
                  <div className="h-2 w-20 bg-on-surface rounded" />
                  <div className="h-2 w-12 bg-on-surface/40 rounded" />
                </div>
              </div>
              <div className="space-y-4">
                <div className="h-8 w-full bg-surface-container-highest rounded-lg" />
                <div className="h-8 w-full bg-surface-container-highest rounded-lg" />
                <div className="h-8 w-full bg-primary/40 rounded-lg" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-32 px-8 bg-surface-container-low" aria-labelledby="services-heading">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20">
            <span className="font-label text-xs uppercase tracking-widest text-secondary-container mb-4 block">
              Our Expertise
            </span>
            <h2 id="services-heading" className="font-headline text-4xl md:text-5xl font-extrabold tracking-tighter">
              Whatever You&apos;re Building,
              <br />
              We&apos;ve Done It Before
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {SERVICES.map(({ icon, title, desc, stack }) => (
              <div
                key={title}
                className="group p-8 rounded-xl bg-surface-container border border-outline-variant/10 hover:border-primary/40 transition-all duration-500"
              >
                <div className="mb-8 text-primary">
                  <span className="material-symbols-outlined text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                    {icon}
                  </span>
                </div>
                <h3 className="font-headline text-2xl font-bold mb-4">{title}</h3>
                <p className="font-body text-lg text-on-surface-variant mb-8">{desc}</p>
                <div className="font-mono text-sm text-primary/60">{stack}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-32 px-8" aria-labelledby="timeline-heading">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24">
            <h2 id="timeline-heading" className="font-headline text-4xl md:text-5xl font-extrabold tracking-tighter mb-6">
              How We Ship in 4 Weeks
            </h2>
            <p className="text-on-surface-variant max-w-xl mx-auto">
              Our proven engineering cycle designed for maximum velocity without compromising structural integrity.
            </p>
          </div>
          <div className="relative">
            <div className="absolute top-6 left-0 w-full h-px bg-outline-variant/20 hidden md:block" aria-hidden />
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 relative">
              {TIMELINE.map(({ num, title, desc, primary }) => (
                <div key={num} className="space-y-6">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center font-headline font-bold relative z-10 ${
                      primary
                        ? "bg-primary text-on-primary"
                        : "bg-secondary-container text-on-secondary"
                    }`}
                  >
                    {num}
                  </div>
                  <h4 className="font-headline font-bold text-xl">{title}</h4>
                  <p className="text-on-surface-variant text-sm">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-32 px-8 bg-surface-container-low" aria-labelledby="included-heading">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <span className="font-label text-xs uppercase tracking-widest text-primary mb-4 block">The Package</span>
              <h2 id="included-heading" className="font-headline text-4xl md:text-5xl font-extrabold tracking-tighter mb-8 leading-tight">
                What&apos;s Included <br />in Your MVP
              </h2>
              <p className="text-on-surface-variant text-lg mb-12">
                We don&apos;t just ship code; we ship a foundation for a multi-million dollar business.
                Every MVP is production-ready from day one.
              </p>
              <Link
                href="/contact"
                className="bg-primary-container text-on-primary-container px-8 py-3 rounded-xl font-headline font-bold hover:opacity-80 transition-all inline-block"
              >
                Get a Quote
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {WHATS_INCLUDED.map(({ icon, title, desc }) => (
                <div key={title} className="p-6 bg-surface-container rounded-xl border border-outline-variant/10">
                  <span className="material-symbols-outlined text-primary mb-4 block">{icon}</span>
                  <h5 className="font-headline font-bold mb-2">{title}</h5>
                  <p className="text-sm text-on-surface-variant">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Beyond MVP */}
      <section className="py-32 px-8" aria-labelledby="beyond-heading">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20 text-center">
            <h2 id="beyond-heading" className="font-headline text-4xl md:text-5xl font-extrabold tracking-tighter">
              Beyond MVP
            </h2>
            <p className="text-on-surface-variant mt-4">We partner with you for the long haul, scaling your product as you grow.</p>
          </div>
          <div className="grid grid-cols-12 gap-8">
            {/* Strategic Scaling */}
            <div className="col-span-12 md:col-span-8 p-12 rounded-xl bg-surface-container-high border border-outline-variant/15 relative overflow-hidden group min-h-[280px]">
              <div className="relative z-10 h-full flex flex-col justify-end">
                <h3 className="font-headline text-3xl font-bold mb-4">Strategic Scaling</h3>
                <p className="text-on-surface-variant max-w-md">
                  Post-launch growth engineering, load balancing, and multi-region deployment for global audiences.
                </p>
              </div>
              <div className="absolute top-0 right-0 w-1/2 h-full opacity-20 group-hover:opacity-40 transition-opacity" aria-hidden>
                <Image
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDf2oWnTIzZ8SRcry1GeQidAHcL6FFxX3sAZmts3X9cZnMuWkfyxwSG2cyPofmNe-ldQT0XAQcewIKtzLHYumwYa2SVe_NnjkaeD8gDgO7t1k8kYCo-HwPWQkg0Ze2pFE0GPTo-YmCT95ot9CvzM66g-vkxhlv8VDlcARd0F77KFa985EFqmuEdQMOoSpgV6TQdF7YPU-YUgGlXWxrwFNDJ_jOSY-hqTtXrx82z1Vf4jkYvDoYB7WEVyN6pAoAUPUm3M3QrPrpOBLop"
                  alt=""
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            {/* AI Integration */}
            <div className="col-span-12 md:col-span-4 p-8 rounded-xl bg-surface-container border border-outline-variant/15 flex flex-col justify-between">
              <span className="material-symbols-outlined text-secondary-container text-5xl">psychology</span>
              <div>
                <h3 className="font-headline text-xl font-bold mb-2">AI Integration</h3>
                <p className="text-sm text-on-surface-variant">
                  Fine-tuning LLMs and building custom agentic workflows for your business.
                </p>
              </div>
            </div>
            {/* Team Handover */}
            <div className="col-span-12 md:col-span-4 p-8 rounded-xl bg-surface-container border border-outline-variant/15 flex flex-col justify-between">
              <span className="material-symbols-outlined text-primary text-5xl">diversity_3</span>
              <div>
                <h3 className="font-headline text-xl font-bold mb-2">Team Handover</h3>
                <p className="text-sm text-on-surface-variant">
                  We help you hire and train your in-house engineering team when the time is right.
                </p>
              </div>
            </div>
            {/* 24/7 Ops */}
            <div className="col-span-12 md:col-span-8 p-12 rounded-xl bg-surface-container-high border border-outline-variant/15 flex items-center gap-12">
              <div className="flex-1">
                <h3 className="font-headline text-3xl font-bold mb-4">24/7 Precision Ops</h3>
                <p className="text-on-surface-variant">
                  Dedicated maintenance and uptime guarantees for mission-critical applications.
                </p>
              </div>
              <div className="hidden sm:flex w-32 h-32 rounded-full border-4 border-primary/20 items-center justify-center animate-pulse shrink-0" aria-hidden>
                <div className="w-24 h-24 rounded-full border-2 border-primary/40 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-primary/20" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="py-24 px-8 border-y border-outline-variant/10" aria-label="Technology stack">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12 opacity-60 hover:opacity-100 transition-all duration-700">
            {TECH_STACK.map((tech) => (
              <span key={tech} className="font-mono text-xl font-bold">{tech}</span>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <FAQSection faqs={FAQS} title="Rapid MVP FAQs" />

      {/* Final CTA */}
      <section className="py-24 md:py-40 px-4 md:px-8 relative overflow-hidden">
        <div className="absolute inset-0 signature-gradient opacity-10" aria-hidden />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="font-headline text-5xl md:text-6xl font-extrabold tracking-tighter mb-12 leading-tight">
            Ready to ship your <br />vision to the world?
          </h2>
          <Link
            href="/contact"
            className="signature-gradient px-16 py-6 rounded-xl font-headline font-bold text-2xl shadow-2xl hover:scale-105 transition-transform active:scale-95 text-white inline-block"
          >
            Initiate Your 4-Week Sprint
          </Link>
          <p className="mt-8 text-on-surface-variant font-label tracking-widest uppercase text-sm">
            LIMITED SLOTS AVAILABLE FOR Q4 2024
          </p>
        </div>
      </section>
    </>
  );
}
