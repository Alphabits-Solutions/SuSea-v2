import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import FAQSection from "@/components/ui/FAQSection";
import { buildMetadata, buildBreadcrumbs, buildHowToSchema } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Managed Maintenance — Year-Round Coverage",
  description:
    "Software isn't a static asset. We ensure your architecture remains secure, optimized, and ready to scale with editorial precision.",
  path: "/services/maintenance",
});

const PAIN_POINTS = [
  {
    icon: "security_update_warning",
    iconBg: "bg-error-container/20",
    iconColor: "text-error",
    title: "Security Drift",
    desc: "Dependencies age daily. Without proactive patching, your infrastructure becomes a playground for vulnerabilities.",
  },
  {
    icon: "database_off",
    iconBg: "bg-primary-container/20",
    iconColor: "text-primary",
    title: "Performance Decay",
    desc: "Query times slow down as databases grow. Minor inefficiencies today become system failures tomorrow.",
  },
  {
    icon: "architecture",
    iconBg: "bg-secondary-container/20",
    iconColor: "text-secondary",
    title: "Architectural Debt",
    desc: "Quick fixes pile up. We provide the structural integrity required to keep your tech stack elegant and scalable.",
  },
];

const AUDIT_CHECKLIST = [
  "Dependency Updates",
  "Log Analysis",
  "Resource Optimization",
  "Security Hardening",
];

const WHO_FOR = [
  {
    icon: "rocket_launch",
    title: "Scale-ups with Lean Teams",
    desc: "For startups that have found PMF and need to ensure their MVP doesn't buckle under the weight of new users.",
  },
  {
    icon: "corporate_fare",
    title: "Established Enterprises",
    desc: "For companies running mission-critical internal tools that cannot afford a single hour of downtime.",
  },
  {
    icon: "emergency_home",
    title: "Technical Debt Survivors",
    desc: "For those who have inherited messy codebases and need professional intervention to stabilize and modernize.",
  },
];

const TIERS = [
  {
    name: "Essential",
    subtitle: "Base Layer",
    nameColor: "text-on-surface-variant",
    bg: "bg-surface-container border border-outline-variant/10",
    btnClass: "border border-outline-variant text-on-surface hover:bg-surface-container-high",
    ring: false,
    badge: null,
    features: [
      "Monthly security patching",
      "Uptime monitoring (24/7)",
      "Monthly status report",
      "Email support",
    ],
  },
  {
    name: "Architect",
    subtitle: "Growth Suite",
    nameColor: "text-primary",
    bg: "bg-surface-container-highest ring-2 ring-primary",
    btnClass: "bg-primary text-on-primary hover:opacity-90 shadow-lg shadow-primary/10",
    ring: true,
    badge: "Most Selected",
    features: [
      "Everything in Essential",
      "8 Emergency hours / month",
      "Quarterly strategic review",
      "Database performance tuning",
      "Slack priority channel",
    ],
  },
  {
    name: "Custom",
    subtitle: "Enterprise",
    nameColor: "text-on-surface-variant",
    bg: "bg-surface-container border border-outline-variant/10",
    btnClass: "border border-outline-variant text-on-surface hover:bg-surface-container-high",
    ring: false,
    badge: null,
    features: [
      "Dedicated technical architect",
      "24/7 Phone priority",
      "Penetration testing (Annual)",
      "Multi-cloud orchestration",
    ],
  },
];

const FAQS = [
  {
    q: "What's included in the monthly maintenance?",
    a: "Every month we perform dependency updates, security patch application, log analysis and anomaly detection, database query optimisation, cloud cost reviews, and a written status report. The Architect and Custom tiers include additional emergency hours and strategic reviews.",
  },
  {
    q: "How do emergency hours work?",
    a: "Emergency hours are pre-allocated blocks of engineering time for critical bug fixes or urgent deployments. If you exceed your monthly allocation, additional hours are billed at a fixed rate agreed in advance — no surprise invoices.",
  },
  {
    q: "What is your uptime guarantee?",
    a: "Our monitoring covers 24/7 alerting with a 15-minute response window. We cannot guarantee uptime for infrastructure we don't control (e.g., your cloud provider), but we manage all dependencies and respond to incidents immediately.",
  },
  {
    q: "Can you maintain a codebase you didn't build?",
    a: "Yes. We perform an initial technical audit of any inherited codebase before commencing maintenance. This surfaces critical issues upfront and allows us to establish a baseline for ongoing work.",
  },
  {
    q: "Do you handle multi-cloud environments?",
    a: "Yes. We support AWS, Google Cloud, and Azure individually or in combination. Our engineers are certified across all three major platforms and have experience with complex multi-region and hybrid cloud setups.",
  },
  {
    q: "How do I escalate a critical issue outside business hours?",
    a: "Architect and Custom tier clients have access to a dedicated Slack priority channel monitored 24/7. Essential tier clients can escalate via email with a 4-hour response SLA during business hours.",
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
  name: "Managed Maintenance",
  url: "https://susea.ai/services/maintenance",
  provider: { "@type": "Organization", name: "Susea.ai", url: "https://susea.ai" },
  description:
    "Year-round managed maintenance covering security patching, performance monitoring, cloud tuning, and architectural reviews.",
  serviceType: "Managed IT & Software Maintenance",
  areaServed: ["US", "GB", "EU", "SG"],
};

const HOWTO_SCHEMA = buildHowToSchema({
  name: "How to Set Up Managed Maintenance for Your Application",
  description:
    "Susea.ai's ongoing maintenance cycle covering the four pillars of production software health.",
  steps: [
    { name: "Dependency Updates", text: "Ensure all npm, pip, and system packages are current and free from known CVEs." },
    { name: "Log Analysis", text: "Review application and infrastructure logs for anomalies, errors, and unusual traffic patterns." },
    { name: "Resource Optimization", text: "Tune server resources, query performance, and cloud costs to eliminate inefficiencies." },
    { name: "Security Hardening", text: "Apply security patches, tighten IAM policies, and update firewall rules proactively." },
  ],
});

const BREADCRUMB_SCHEMA = buildBreadcrumbs([
  { name: "Home", url: "https://susea.ai" },
  { name: "Services", url: "https://susea.ai/services/maintenance" },
  { name: "Managed Maintenance", url: "https://susea.ai/services/maintenance" },
]);

export default function MaintenancePage() {
  return (
    <>
      <JsonLd data={SERVICE_SCHEMA} />
      <JsonLd data={FAQ_SCHEMA} />
      <JsonLd data={HOWTO_SCHEMA} />
      <JsonLd data={BREADCRUMB_SCHEMA} />

      {/* Hero */}
      <section className="relative min-h-[819px] flex items-center justify-center px-4 md:px-6 overflow-hidden pt-20">
        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none" aria-hidden>
          <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-primary/30 rounded-full blur-[120px]" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-secondary-container/20 rounded-full blur-[100px]" />
        </div>
        <div className="relative z-10 max-w-5xl text-center space-y-8">
          <div className="inline-block px-4 py-1.5 rounded-full bg-surface-container-highest border border-outline-variant/15 text-primary text-xs uppercase tracking-widest font-bold">
            Managed Maintenance
          </div>
          <h1 className="font-headline text-4xl sm:text-6xl md:text-8xl font-extrabold tracking-tighter leading-[0.95] signature-text-gradient">
            Your Tech, Fully Covered. Year-Round.
          </h1>
          <p className="max-w-2xl mx-auto text-on-surface-variant text-xl md:text-2xl leading-relaxed">
            Software isn&apos;t a static asset. We ensure your architecture remains secure,
            optimized, and ready to scale with editorial precision.
          </p>
          <div className="pt-4">
            <Link
              href="/contact"
              className="signature-gradient text-on-primary px-10 py-5 rounded-xl text-lg font-headline font-bold shadow-2xl hover:opacity-90 transition-all active:scale-95 inline-block"
            >
              Get a Quote
            </Link>
          </div>
        </div>
      </section>

      {/* Pain Points */}
      <section className="py-32 px-6 bg-surface-container-low" aria-labelledby="pain-heading">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-6">
              <span className="text-secondary text-xs uppercase tracking-widest font-bold">
                The Reality
              </span>
              <h2 id="pain-heading" className="font-headline text-5xl md:text-6xl font-bold tracking-tighter leading-tight">
                Software Doesn&apos;t Maintain Itself
              </h2>
              <p className="text-on-surface-variant text-lg leading-relaxed">
                Legacy code, security vulnerabilities, and technical debt are silent killers of
                business momentum. Our architects intervene before the cracks appear.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-6">
              {PAIN_POINTS.map(({ icon, iconBg, iconColor, title, desc }) => (
                <div
                  key={title}
                  className="p-8 rounded-xl bg-surface-container border border-outline-variant/10 hover:border-primary/30 transition-all duration-500"
                >
                  <div className={`w-12 h-12 rounded-lg ${iconBg} flex items-center justify-center mb-6 ${iconColor}`}>
                    <span className="material-symbols-outlined">{icon}</span>
                  </div>
                  <h3 className="font-headline text-2xl font-bold mb-3">{title}</h3>
                  <p className="text-on-surface-variant leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Bento Grid */}
      <section className="py-32 px-6" aria-labelledby="features-heading">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20 space-y-4">
            <h2 id="features-heading" className="font-headline text-4xl md:text-5xl font-bold tracking-tighter">
              Here&apos;s Exactly What You Get
            </h2>
            <p className="text-on-surface-variant max-w-xl mx-auto">
              A comprehensive, architect-led checklist executed monthly to ensure operational excellence.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Large card — Monthly Audits */}
            <div className="md:col-span-2 p-10 rounded-xl bg-surface-container-high relative overflow-hidden group">
              <div className="relative z-10 space-y-6">
                <span
                  className="material-symbols-outlined text-4xl text-primary"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  verified_user
                </span>
                <h3 className="font-headline text-3xl font-bold">Monthly Deep-Tissue Audits</h3>
                <p className="text-on-surface-variant text-lg leading-relaxed max-w-lg">
                  Our team performs a full-stack diagnostic every 30 days. We analyze logs, monitor
                  resource spikes, and review access controls to ensure your system is breathing
                  correctly.
                </p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                  {AUDIT_CHECKLIST.map((item) => (
                    <li key={item} className="flex items-center gap-3 text-on-surface">
                      <span className="material-symbols-outlined text-primary">check_circle</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div
                className="absolute -right-20 -bottom-20 w-80 h-80 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-all"
                aria-hidden
              />
            </div>

            {/* Real-time fixes */}
            <div className="p-10 rounded-xl bg-surface-container border border-outline-variant/10 flex flex-col justify-between">
              <div className="space-y-6">
                <span className="material-symbols-outlined text-4xl text-secondary">speed</span>
                <h3 className="font-headline text-2xl font-bold">Real-time Performance Fixes</h3>
                <p className="text-on-surface-variant leading-relaxed">
                  We don&apos;t just report issues; we resolve them. Includes 5 emergency hours per
                  month for critical bug squashing.
                </p>
              </div>
              <div className="pt-8">
                <Link
                  href="/contact"
                  className="text-primary font-bold hover:underline inline-flex items-center gap-2"
                >
                  View SLA Details <span className="material-symbols-outlined">arrow_forward</span>
                </Link>
              </div>
            </div>

            {/* Cloud Tuning */}
            <div className="p-10 rounded-xl bg-surface-container border border-outline-variant/10 flex flex-col justify-between">
              <div className="space-y-6">
                <span className="material-symbols-outlined text-4xl text-tertiary">cloud_sync</span>
                <h3 className="font-headline text-2xl font-bold">Cloud Infrastructure Tuning</h3>
                <p className="text-on-surface-variant leading-relaxed">
                  Cost and efficiency audits of your AWS/GCP/Azure environments to prevent
                  &apos;billing shock&apos;.
                </p>
              </div>
              <div className="pt-8 flex -space-x-3">
                {["AWS", "GCP", "AZR"].map((cloud) => (
                  <div
                    key={cloud}
                    className="w-10 h-10 rounded-full border-2 border-surface-container bg-surface-variant flex items-center justify-center font-mono text-xs"
                  >
                    {cloud}
                  </div>
                ))}
              </div>
            </div>

            {/* Strategic Roadmap */}
            <div className="md:col-span-2 p-10 rounded-xl bg-surface-container-high flex items-center gap-12 group">
              <div className="hidden lg:block w-1/3">
                <div className="aspect-square bg-surface-container-highest rounded-xl border border-outline-variant/10 flex items-center justify-center">
                  <span className="material-symbols-outlined text-6xl text-primary/20 group-hover:scale-110 transition-transform duration-500">
                    analytics
                  </span>
                </div>
              </div>
              <div className="flex-1 space-y-4">
                <h3 className="font-headline text-2xl font-bold">Strategic Roadmap Sessions</h3>
                <p className="text-on-surface-variant text-lg leading-relaxed">
                  Every quarter, we sit down with your leadership to map technical maintenance to
                  business goals, ensuring your tech stack is always 6 months ahead.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Tiers */}
      <section className="py-32 px-6 bg-surface-container-low" aria-labelledby="pricing-heading">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20 space-y-4">
            <h2 id="pricing-heading" className="font-headline text-4xl md:text-5xl font-bold tracking-tighter">
              Choose Your Coverage Level
            </h2>
            <p className="text-on-surface-variant">
              Predictable maintenance, tailored to your technical complexity.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TIERS.map(({ name, subtitle, nameColor, bg, btnClass, badge, features }) => (
              <div key={name} className={`flex flex-col p-10 rounded-xl ${bg} relative h-full`}>
                {badge && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary text-on-primary text-xs font-bold rounded-full uppercase tracking-widest whitespace-nowrap">
                    {badge}
                  </div>
                )}
                <div className="mb-8">
                  <h3 className={`font-headline text-xl font-bold mb-2 ${nameColor}`}>{name}</h3>
                  <div className="font-headline text-4xl font-black text-on-surface">{subtitle}</div>
                </div>
                <ul className="space-y-4 mb-12 flex-1">
                  {features.map((f) => (
                    <li key={f} className="flex gap-3 text-on-surface-variant">
                      <span className="material-symbols-outlined text-primary shrink-0">done</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/contact"
                  className={`w-full py-4 rounded-xl font-headline font-bold text-center transition-all ${btnClass}`}
                >
                  Get a Quote
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who This Is For */}
      <section className="py-32 px-6" aria-labelledby="who-heading">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
            <div className="space-y-6">
              <h2 id="who-heading" className="font-headline text-4xl md:text-5xl font-bold tracking-tighter">
                Who This Is For
              </h2>
              <div className="space-y-10">
                {WHO_FOR.map(({ icon, title, desc }) => (
                  <div key={title} className="flex gap-6">
                    <div className="text-primary pt-1 shrink-0">
                      <span className="material-symbols-outlined">{icon}</span>
                    </div>
                    <div>
                      <h4 className="font-headline text-xl font-bold mb-2">{title}</h4>
                      <p className="text-on-surface-variant leading-relaxed">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="glass-panel p-8 rounded-xl border border-outline-variant/20">
                <p className="italic text-on-surface-variant text-lg leading-relaxed">
                  &ldquo;Maintenance isn&apos;t an expense; it&apos;s an insurance policy against
                  technical stagnation.&rdquo;
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <FAQSection faqs={FAQS} title="Managed Maintenance FAQs" />

      {/* CTA */}
      <section className="py-24 md:py-32 px-4 md:px-8">
        <div className="max-w-5xl mx-auto signature-gradient rounded-[2rem] p-12 md:p-20 text-center relative overflow-hidden">
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
              backgroundSize: "40px 40px",
            }}
            aria-hidden
          />
          <div className="relative z-10">
            <h2 className="font-headline text-4xl md:text-5xl font-extrabold text-on-primary mb-8 tracking-tight">
              Secure Your Infrastructure Today.
            </h2>
            <p className="text-white text-lg mb-12 max-w-2xl mx-auto leading-relaxed">
              Stop worrying about what might break. Let the architects handle it.
            </p>
            <Link
              href="/contact"
              className="bg-white text-on-primary-fixed px-12 py-5 rounded-full font-headline text-xl font-bold shadow-2xl hover:scale-105 transition-transform active:scale-95 inline-block"
            >
              Get a Quote
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
