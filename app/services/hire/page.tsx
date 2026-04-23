import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import FAQSection from "@/components/ui/FAQSection";
import { buildMetadata, buildBreadcrumbs, buildHowToSchema } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Hire Dedicated Resources — Top Tech Talent",
  description:
    "Skip the 3-month hiring cycle. Access pre-vetted senior engineers and designers ready to integrate into your existing workflow within 72 hours.",
  path: "/services/hire",
});

const ROLES = [
  { icon: "database", title: "Backend Architects", desc: "Scalable microservices, API engineering, and distributed systems experts. Node.js, Go, Python, and Java.", tags: ["AWS", "PostgreSQL", "Kubernetes"], span: "md:col-span-2" },
  { icon: "layers", title: "Frontend Developers", desc: "Crafting high-performance React and Vue applications with pixel-perfection.", tags: [], span: "" },
  { icon: "psychology", title: "AI/ML Engineers", desc: "LLM integration, fine-tuning, and predictive modeling for the next gen.", tags: [], span: "" },
  { icon: "smartphone", title: "Mobile Specialists", desc: "Native iOS/Android and Flutter development for fluid mobile experiences.", tags: [], span: "" },
  { icon: "view_quilt", title: "Full-stack Engineers", desc: "The versatile generalists who can own an entire feature from database schema to UI implementation.", tags: [], span: "md:col-span-2", cta: true },
  { icon: "terminal", title: "Cloud/DevOps", desc: "Automating infrastructure and CI/CD pipelines for 99.9% uptime.", tags: [], span: "" },
];

const HOW_IT_WORKS = [
  { step: "01", title: "Define Role", desc: "Tell us your tech stack, seniority requirements, and project goals in a 20-min brief." },
  { step: "02", title: "Elite Match", desc: "We present 2-3 hand-picked candidates from our internal bench within 48 hours." },
  { step: "03", title: "Interview", desc: "Meet your potential team members to ensure technical and cultural alignment." },
  { step: "04", title: "Deploy", desc: "Resources join your Slack, Jira, and GitHub. Sprint 1 starts immediately." },
];

const FAQS = [
  {
    q: "How quickly can a resource start?",
    a: "After the 20-minute briefing call, we present matched candidates within 48 hours. Once you select your engineer, they can begin within 72 hours — joining your Slack, Jira, and GitHub from day one.",
  },
  {
    q: "How do you vet your engineers?",
    a: "Every engineer on our bench has completed a multi-stage assessment: a live technical test on their core stack, a systems design interview, and a communication & collaboration evaluation. Only the top 3% of applicants are accepted.",
  },
  {
    q: "What if the resource isn't a good fit?",
    a: "We offer a 2-week risk-free trial. If for any reason the engineer isn't the right fit, we replace them at zero cost and zero delay. Our replacement track record is under 5%.",
  },
  {
    q: "Who handles payroll, taxes, and contracts?",
    a: "We handle everything. You pay one monthly invoice. We manage local employment law compliance, payroll, benefits, equipment, and any required legal agreements. Zero administrative overhead on your side.",
  },
  {
    q: "Can dedicated resources work in our time zone?",
    a: "Yes. We match resources to your preferred working hours and have engineers across North America, Europe, Latin America, and Asia. Time zone alignment is part of the matching criteria.",
  },
  {
    q: "Can we hire the engineer permanently after the engagement?",
    a: "Yes. We offer a structured transition programme for clients who want to convert a dedicated resource to a permanent employee after a minimum engagement period. Speak to us about the terms.",
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
  name: "Hire Dedicated Resources",
  url: "https://susea.ai/services/hire",
  provider: { "@type": "Organization", name: "Susea.ai", url: "https://susea.ai" },
  description: "Access pre-vetted senior engineers ready to integrate within 72 hours.",
  serviceType: "Tech Talent Staffing",
  areaServed: ["US", "GB", "EU", "SG"],
};

const HOWTO_SCHEMA = buildHowToSchema({
  name: "How to Hire a Dedicated AI Engineer",
  description: "Susea.ai's 4-step process to onboard a pre-vetted senior engineer within 72 hours.",
  totalTime: "P3D",
  steps: HOW_IT_WORKS.map((s) => ({ name: s.title, text: s.desc })),
});

const BREADCRUMB_SCHEMA = buildBreadcrumbs([
  { name: "Home", url: "https://susea.ai" },
  { name: "Services", url: "https://susea.ai/services/hire" },
  { name: "Hire Dedicated Resources", url: "https://susea.ai/services/hire" },
]);

export default function HirePage() {
  return (
    <>
      <JsonLd data={SERVICE_SCHEMA} />
      <JsonLd data={FAQ_SCHEMA} />
      <JsonLd data={HOWTO_SCHEMA} />
      <JsonLd data={BREADCRUMB_SCHEMA} />

      {/* Hero */}
      <section className="relative min-h-screen flex items-center pt-24 overflow-hidden">
        <div className="absolute inset-0 z-0" aria-hidden>
          <div className="absolute top-1/4 -left-20 w-96 h-96 bg-primary/20 rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-secondary-container/10 rounded-full blur-[120px]" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 w-full">
          <div className="max-w-4xl">
            <span className="inline-block px-4 py-1.5 rounded-full border border-outline-variant/30 text-xs uppercase tracking-widest text-primary mb-8 font-medium">
              On-Demand Engineering
            </span>
            <h1 className="text-4xl sm:text-6xl md:text-8xl font-headline font-extrabold tracking-tighter leading-[0.9] mb-8">
              Top Tech Talent.
              <br />
              Your Team.
              <br />
              <span className="signature-text-gradient">Starting This Week.</span>
            </h1>
            <p className="text-xl md:text-2xl text-on-surface-variant max-w-2xl mb-12 leading-relaxed">
              Skip the 3-month hiring cycle. Access pre-vetted senior engineers and designers ready
              to integrate into your existing workflow within 72 hours.
            </p>
            <div className="flex flex-col sm:flex-row gap-6">
              <Link
                href="/contact"
                className="signature-gradient px-10 py-5 rounded-xl font-bold text-lg hover:opacity-90 transition-all shadow-xl shadow-primary/10 text-white"
              >
                Initiate Strategy
              </Link>
              <button className="bg-surface-container-highest/50 border border-outline-variant/20 px-10 py-5 rounded-xl font-bold text-lg hover:bg-surface-container-highest transition-all">
                View Pricing Matrix
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Every Role You Need — Bento */}
      <section className="py-32 bg-surface-container-low" aria-labelledby="roles-heading">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
            <div>
              <h2 id="roles-heading" className="text-4xl md:text-6xl font-headline font-bold tracking-tight mb-4">
                Every Role You Need,
                <br />
                Ready to Go
              </h2>
              <p className="text-on-surface-variant text-lg">
                A deep bench of specialized expertise for every layer of your stack.
              </p>
            </div>
            <div className="flex gap-4">
              <button className="p-3 rounded-full border border-outline-variant/30 hover:bg-surface-container transition-colors" aria-label="Previous">
                <span className="material-symbols-outlined">arrow_back</span>
              </button>
              <button className="p-3 rounded-full border border-outline-variant/30 hover:bg-surface-container transition-colors text-primary" aria-label="Next">
                <span className="material-symbols-outlined">arrow_forward</span>
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {ROLES.map(({ icon, title, desc, tags, span, cta }) => (
              <div
                key={title}
                className={`${span} bg-surface-container p-8 rounded-xl flex flex-col justify-between min-h-[320px] group hover:bg-surface-container-high transition-all relative overflow-hidden ${cta ? "border border-primary/10" : ""}`}
              >
                <div>
                  <span className="material-symbols-outlined text-primary text-4xl mb-6 block">{icon}</span>
                  <h3 className={`${span === "md:col-span-2" ? "text-2xl" : "text-xl"} font-bold mb-3`}>{title}</h3>
                  <p className="text-on-surface-variant text-sm">{desc}</p>
                </div>
                {tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-6">
                    {tags.map((tag) => (
                      <span key={tag} className="px-3 py-1 rounded-full bg-surface-container-highest text-xs font-mono uppercase">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
                {!tags.length && !cta && (
                  <Link href="/contact" className="mt-6 text-primary text-sm font-bold flex items-center gap-2 group-hover:gap-3 transition-all">
                    Get a Quote <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </Link>
                )}
                {cta && (
                  <>
                    <Link
                      href="/contact"
                      className="mt-12 bg-primary text-on-primary px-8 py-3 rounded-lg font-bold inline-block relative z-10"
                    >
                      Get a Quote
                    </Link>
                    <div className="absolute -right-10 -bottom-10 opacity-10" aria-hidden>
                      <span className="material-symbols-outlined text-[200px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                        code
                      </span>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Susea Over a Job Board — Comparison */}
      <section className="py-32" aria-labelledby="comparison-heading">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-20">
            <h2 id="comparison-heading" className="text-4xl md:text-6xl font-headline font-bold tracking-tight mb-6">
              Why Susea Over a Job Board
            </h2>
            <p className="text-on-surface-variant text-lg max-w-2xl mx-auto">
              Traditional hiring is broken. We built a system designed for technical speed and architectural integrity.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-px bg-outline-variant/20 rounded-2xl overflow-hidden border border-outline-variant/20">
            {/* Traditional */}
            <div className="bg-surface p-12">
              <div className="flex items-center gap-3 mb-10">
                <div className="w-10 h-10 rounded-full bg-error-container/20 flex items-center justify-center">
                  <span className="material-symbols-outlined text-error text-xl">close</span>
                </div>
                <span className="font-bold text-xl opacity-60">Job Boards &amp; Freelancers</span>
              </div>
              <ul className="space-y-8">
                {[
                  { title: "Uncertain Quality", desc: "Vetting takes weeks and results are often inconsistent with project requirements." },
                  { title: "Administrative Friction", desc: "You handle contracts, local taxes, benefits, and hardware procurement." },
                  { title: "High Turnover", desc: "Freelancers often juggle multiple clients, leading to context-switching and delays." },
                ].map(({ title, desc }) => (
                  <li key={title} className="flex gap-4">
                    <span className="material-symbols-outlined text-error mt-1">remove</span>
                    <div>
                      <h4 className="font-bold mb-1">{title}</h4>
                      <p className="text-on-surface-variant text-sm">{desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            {/* Susea */}
            <div className="bg-surface-container-low p-12 relative">
              <div className="absolute top-0 right-0 p-8">
                <span className="text-primary text-xs font-mono uppercase tracking-widest bg-primary/10 px-3 py-1 rounded">
                  Recommended
                </span>
              </div>
              <div className="flex items-center gap-3 mb-10">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <span className="material-symbols-outlined text-primary text-xl">check</span>
                </div>
                <span className="font-bold text-xl text-primary">The Susea Protocol</span>
              </div>
              <ul className="space-y-8">
                {[
                  { title: "Pre-Vetted Seniority", desc: "Every engineer passes a multi-stage technical and behavioral assessment designed by architects." },
                  { title: "Zero Overhead", desc: "One monthly invoice. We handle payroll, compliance, and equipment. You focus on the code." },
                  { title: "Dedicated Focus", desc: "Your resources are 100% dedicated to your project, operating as an extension of your internal team." },
                ].map(({ title, desc }) => (
                  <li key={title} className="flex gap-4">
                    <span className="material-symbols-outlined text-primary mt-1">verified</span>
                    <div>
                      <h4 className="font-bold mb-1">{title}</h4>
                      <p className="text-on-surface-variant text-sm">{desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-32 bg-surface-container-lowest" aria-labelledby="how-heading">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid md:grid-cols-4 gap-12">
            <div className="md:col-span-4 mb-8">
              <h2 id="how-heading" className="text-4xl font-headline font-bold">How It Works</h2>
            </div>
            {HOW_IT_WORKS.map(({ step, title, desc }) => (
              <div key={step} className="relative">
                <div className="text-6xl font-black text-outline-variant/20 mb-6">{step}</div>
                <h4 className="text-xl font-bold mb-3">{title}</h4>
                <p className="text-on-surface-variant text-sm">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Engagement Models */}
      <section className="py-32" aria-labelledby="models-heading">
        <div className="max-w-7xl mx-auto px-8">
          <h2 id="models-heading" className="text-4xl md:text-5xl font-headline font-bold text-center mb-16">
            Flexible Engagement Models
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Part-time */}
            <div className="glass-panel p-10 rounded-2xl border border-outline-variant/10 flex flex-col items-center text-center">
              <span className="material-symbols-outlined text-4xl mb-6 text-on-surface-variant">schedule</span>
              <h3 className="text-2xl font-bold mb-2">Part-time</h3>
              <p className="text-on-surface-variant text-sm mb-8">
                20 hours / week. Ideal for maintenance, smaller features, or specialized consulting.
              </p>
              <Link href="/contact" className="mt-auto w-full border border-outline-variant/30 py-4 rounded-xl font-bold hover:bg-surface-container-high transition-colors text-center block">
                Get a Quote
              </Link>
            </div>
            {/* Full-time */}
            <div className="bg-primary-container/20 p-10 rounded-2xl border-2 border-primary/30 flex flex-col items-center text-center relative">
              <div className="absolute -top-4 bg-primary text-on-primary text-[10px] font-black px-4 py-1 rounded-full uppercase tracking-widest">
                Scale Engine
              </div>
              <span className="material-symbols-outlined text-4xl mb-6 text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>
                bolt
              </span>
              <h3 className="text-2xl font-bold mb-2">Full-time</h3>
              <p className="text-on-surface-variant text-sm mb-8">
                40 hours / week. Fully integrated team members dedicated entirely to your roadmap.
              </p>
              <Link href="/contact" className="mt-auto w-full bg-primary text-on-primary py-4 rounded-xl font-bold hover:opacity-90 transition-all shadow-lg shadow-primary/20 text-center block">
                Get a Quote
              </Link>
            </div>
            {/* Project-based */}
            <div className="glass-panel p-10 rounded-2xl border border-outline-variant/10 flex flex-col items-center text-center">
              <span className="material-symbols-outlined text-4xl mb-6 text-on-surface-variant">assignment</span>
              <h3 className="text-2xl font-bold mb-2">Project-based</h3>
              <p className="text-on-surface-variant text-sm mb-8">
                Defined deliverables and timelines. Best for MVPs, migrations, or architectural audits.
              </p>
              <Link href="/contact" className="mt-auto w-full border border-outline-variant/30 py-4 rounded-xl font-bold hover:bg-surface-container-high transition-colors text-center block">
                Get a Quote
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <FAQSection faqs={FAQS} title="Dedicated Resources FAQs" />

      {/* Final CTA Gradient */}
      <section className="py-24 px-4 md:px-8">
        <div className="max-w-7xl mx-auto signature-gradient rounded-[2rem] p-12 md:p-24 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-black/20" aria-hidden />
          <div className="relative z-10 max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-headline font-extrabold text-on-primary tracking-tighter mb-8 leading-tight">
              Ready to integrate world-class engineering?
            </h2>
            <p className="text-white text-xl mb-12">
              Stop hunting for talent. Start building your vision today with a team that hits the ground running.
            </p>
            <Link
              href="/contact"
              className="bg-white text-[#131315] px-12 py-5 rounded-full font-black text-lg hover:scale-105 transition-transform shadow-2xl inline-block"
            >
              Get a Quote
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
