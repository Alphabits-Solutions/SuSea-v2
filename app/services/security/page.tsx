import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import FAQSection from "@/components/ui/FAQSection";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: "AI Security — Enterprise-Grade Compliance",
  description:
    "From AI-driven threat detection to rigorous regulatory compliance, Susea.ai architects digital fortresses that turn security into your competitive advantage.",
  path: "/services/security",
});

const STAT_CARDS = [
  { value: "43%", color: "text-primary", label: "Cyber attacks targeting small to mid-market entities", offset: "" },
  { value: "$4.4M", color: "text-secondary", label: "Average cost of a data breach in 2024", offset: "mt-12" },
  { value: "277", color: "text-primary", label: "Avg. days to identify and contain a breach", offset: "" },
  { value: "0", color: "text-secondary", label: "Compromised clients under Susea Managed Defense", offset: "mt-12" },
];

const SERVICES = [
  { icon: "api", title: "API Security", desc: "Securing the connective tissue of your modern applications with rigorous endpoint testing and traffic analysis." },
  { icon: "phone_iphone", title: "Application Security", desc: "Full-stack penetration testing and code reviews to ensure your software is hardened against contemporary threats." },
  { icon: "cloud", title: "Cloud Defense", desc: "Zero-trust architecture for AWS, Azure, and GCP, optimizing identity access and container security." },
  { icon: "security", title: "vCISO Strategy", desc: "Strategic executive leadership to align your security posture with your business goals and budget." },
  { icon: "policy", title: "Threat Intelligence", desc: "Proactive monitoring of the dark web and emerging attack vectors specifically targeting your industry." },
  { icon: "gavel", title: "Incident Response", desc: "Rapid 24/7 containment and remediation services to minimize damage and restore operations immediately." },
];

const PROCESS = [
  { step: "01. Audit", title: "Discovery & Analysis", desc: "We conduct deep-tissue scans of your network, applications, and human processes to identify every possible entry point.", borderColor: "border-primary", stepColor: "text-primary" },
  { step: "02. Fix", title: "Remediation & Hardening", desc: "Not just a report — we build the patches, reconfigure the firewalls, and refactor the code to neutralize threats.", borderColor: "border-secondary", stepColor: "text-secondary" },
  { step: "03. Certify", title: "Compliance & Continuity", desc: "Final validation and submission for regulatory standards, followed by 24/7 autonomous monitoring and reporting.", borderColor: "border-on-surface", stepColor: "text-on-surface" },
];

const COMPLIANCE = ["SOC2 TYPE II", "ISO 27001", "HIPAA", "GDPR", "PCI DSS", "CCPA"];

const FAQS = [
  {
    q: "What does a security audit involve?",
    a: "Our audit covers network penetration testing, application code review, cloud infrastructure scanning, identity & access management review, and social engineering assessments. You receive a prioritised remediation report within 5 business days.",
  },
  {
    q: "How do you handle AI-specific security risks?",
    a: "We assess prompt injection vulnerabilities, data leakage through LLM APIs, model inversion attacks, and shadow AI usage by employees. We also implement governance policies to ensure corporate data never enters public LLM training pipelines.",
  },
  {
    q: "Which compliance frameworks do you support?",
    a: "We support SOC 2 Type II, ISO 27001, HIPAA, GDPR, PCI DSS, and CCPA. We work with your legal and compliance teams to prepare documentation and evidence packages for certification audits.",
  },
  {
    q: "What is a vCISO and do we need one?",
    a: "A Virtual CISO provides executive-level security leadership without the cost of a full-time hire. If you don't have a dedicated CISO but handle sensitive data or are pursuing compliance certifications, a vCISO engagement is highly recommended.",
  },
  {
    q: "How quickly can you respond to a security incident?",
    a: "Our Incident Response team operates 24/7 with a 1-hour acknowledgement SLA and a 4-hour initial containment protocol for active breaches. We provide post-incident forensic reports and remediation roadmaps.",
  },
  {
    q: "Do you work with startups or only large enterprises?",
    a: "We work with companies at every stage. Startups benefit enormously from early security hardening — it's far cheaper to build secure than to fix breaches later. We offer right-sized engagements for Series A through Fortune 500.",
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
  name: "AI Security & Compliance",
  url: "https://susea.ai/services/security",
  provider: { "@type": "Organization", name: "Susea.ai" },
  description: "Enterprise-grade security, compliance, and AI guardrails for modern organizations.",
  areaServed: ["US", "GB", "EU"],
};

export default function SecurityPage() {
  return (
    <>
      <JsonLd data={SERVICE_SCHEMA} />
      <JsonLd data={FAQ_SCHEMA} />

      {/* Hero */}
      <section className="relative min-h-[819px] flex items-center justify-center overflow-hidden px-4 md:px-6 pt-20">
        <div className="absolute inset-0 z-0" aria-hidden>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] opacity-20 blur-[120px] rounded-full signature-gradient" />
        </div>
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container-high mb-8">
            <span className="material-symbols-outlined text-primary text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>
              verified_user
            </span>
            <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant font-semibold">
              Enterprise Security Excellence
            </span>
          </div>
          <h1 className="font-headline text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tighter mb-8 leading-[1.1]">
            Security Isn&apos;t Optional.
            <br />
            <span className="signature-text-gradient">Neither Are We.</span>
          </h1>
          <p className="font-body text-lg text-on-surface-variant max-w-2xl mx-auto mb-12">
            From AI-driven threat detection to rigorous regulatory compliance, Susea.ai architects
            digital fortresses that turn security into your competitive advantage.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="signature-gradient text-on-primary px-8 py-4 rounded-xl font-headline font-bold text-lg hover:opacity-90 transition-all"
            >
              Initiate Strategy
            </Link>
            <button className="bg-surface-container-highest text-on-surface px-8 py-4 rounded-xl font-headline font-bold text-lg hover:bg-surface-bright transition-all border border-outline-variant/15">
              View Certifications
            </button>
          </div>
        </div>
        {/* Abstract circles */}
        <div className="absolute bottom-0 right-0 w-96 h-96 opacity-30 select-none pointer-events-none" aria-hidden>
          <div className="relative w-full h-full">
            <div className="absolute inset-0 border-[40px] border-primary/20 rounded-full translate-x-1/2 translate-y-1/2" />
            <div className="absolute inset-0 border border-primary/40 rounded-full translate-x-1/3 translate-y-1/3 scale-110" />
          </div>
        </div>
      </section>

      {/* Stat Cards */}
      <section className="py-32 bg-surface-container-low relative overflow-hidden" aria-labelledby="stats-heading">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 items-center">
            <div>
              <span className="font-label text-xs uppercase tracking-widest text-secondary font-bold mb-4 block">
                The Real Cost
              </span>
              <h2 id="stats-heading" className="font-headline text-4xl md:text-5xl font-bold mb-6 text-on-surface">
                One Vulnerability. That&apos;s All It Takes.
              </h2>
              <p className="text-on-surface-variant text-lg mb-8 leading-relaxed">
                In the age of interconnected systems, a single weak point can compromise an entire
                enterprise. We don&apos;t just patch holes; we eliminate the conditions that allow them to exist.
              </p>
              <div className="flex gap-4">
                <div className="w-1 bg-secondary rounded-full" />
                <p className="font-mono text-sm text-secondary-fixed-dim italic">
                  &ldquo;Security is a process, not a product.&rdquo; — Bruce Schneier
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              {STAT_CARDS.map(({ value, color, label, offset }) => (
                <div
                  key={label}
                  className={`bg-surface-container p-8 rounded-xl border border-outline-variant/10 shadow-2xl shadow-black/20 ${offset}`}
                >
                  <div className={`font-headline text-5xl font-extrabold ${color} mb-2`}>{value}</div>
                  <p className="font-label text-[10px] uppercase tracking-wider text-on-surface-variant">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Security Services */}
      <section className="py-32 bg-surface" aria-labelledby="services-heading">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex justify-between items-end mb-16">
            <div className="max-w-2xl">
              <h2 id="services-heading" className="font-headline text-4xl md:text-5xl font-bold mb-4">
                Our Security Services
              </h2>
              <p className="text-on-surface-variant text-lg">Specialized engineering for high-stakes environments.</p>
            </div>
            <button className="text-primary font-headline font-bold flex items-center gap-2 hover:translate-x-1 transition-transform">
              View All Services <span className="material-symbols-outlined">arrow_forward</span>
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {SERVICES.map(({ icon, title, desc }) => (
              <div key={title} className="group bg-surface-container-low p-10 rounded-xl hover:bg-surface-container transition-all duration-300">
                <span className="material-symbols-outlined text-4xl text-primary mb-6 block">{icon}</span>
                <h3 className="font-headline text-xl font-bold mb-4">{title}</h3>
                <p className="text-on-surface-variant text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Process */}
      <section className="py-32 bg-surface-container-low" aria-labelledby="process-heading">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-20">
            <span className="font-label text-xs uppercase tracking-widest text-primary font-bold mb-4 block">Methodology</span>
            <h2 id="process-heading" className="font-headline text-4xl md:text-5xl font-bold">The Process</h2>
          </div>
          <div className="relative flex flex-col md:flex-row justify-between gap-12">
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-[1px] bg-outline-variant/30 -z-0" aria-hidden />
            {PROCESS.map(({ step, title, desc, borderColor, stepColor }) => (
              <div key={step} className="flex-1 relative z-10">
                <div className={`mb-8 font-mono text-2xl font-bold ${stepColor}`}>{step}</div>
                <div className={`bg-surface-container p-8 rounded-xl border-b-4 ${borderColor}`}>
                  <h4 className="font-headline text-lg font-bold mb-3">{title}</h4>
                  <p className="text-on-surface-variant text-sm leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Compliance Grid */}
      <section className="py-32 bg-surface" aria-labelledby="compliance-heading">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-16">
            <h2 id="compliance-heading" className="font-headline text-3xl md:text-4xl font-bold mb-4">
              Compliance Standards
            </h2>
            <p className="text-on-surface-variant max-w-xl mx-auto">
              We ensure your infrastructure meets and exceeds global regulatory requirements.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center opacity-60">
            {COMPLIANCE.map((standard) => (
              <div
                key={standard}
                className="flex justify-center p-8 bg-surface-container-low rounded-xl grayscale hover:grayscale-0 hover:opacity-100 transition-all cursor-default group"
              >
                <div className="font-mono text-lg font-bold group-hover:text-primary transition-colors text-center">
                  {standard}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <FAQSection faqs={FAQS} title="Security & Compliance FAQs" />

      {/* CTA */}
      <section className="py-24 md:py-32 px-4 md:px-8">
        <div className="max-w-5xl mx-auto signature-gradient rounded-[2rem] p-12 md:p-20 text-center relative overflow-hidden">
          <div
            className="absolute inset-0 opacity-10"
            style={{ backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)", backgroundSize: "40px 40px" }}
            aria-hidden
          />
          <div className="relative z-10">
            <h2 className="font-headline text-4xl md:text-5xl font-extrabold text-on-primary mb-8 tracking-tight">
              Ready to Harden Your Defenses?
            </h2>
            <p className="text-white text-lg mb-12 max-w-xl mx-auto">
              Join the 200+ enterprises that trust Susea.ai with their most critical assets. Let&apos;s start
              with a comprehensive security audit.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="bg-on-primary text-white px-10 py-5 rounded-xl font-headline font-black text-lg hover:bg-surface-bright transition-all shadow-xl"
              >
                Get a Quote
              </Link>
              <button className="bg-transparent border-2 border-on-primary/30 text-on-primary px-10 py-5 rounded-xl font-headline font-bold text-lg hover:bg-on-primary/10 transition-all">
                Download Capability Statement
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
