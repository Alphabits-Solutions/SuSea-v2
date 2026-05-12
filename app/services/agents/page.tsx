import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import FAQSection from "@/components/ui/FAQSection";
import { buildMetadata, buildBreadcrumbs, buildHowToSchema } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Custom AI Agents — Built for Your Business",
  description:
    "Ready-to-deploy AI agents for calling, support, sales, HR, admin, and marketing. Fully custom-built, integrated with your tools, and live in 7 days. Powered by GPT-4, Claude & Gemini.",
  path: "/services/agents",
});

const AGENTS = [
  {
    icon: "call",
    name: "Calling Agent",
    desc: "Outbound & inbound AI calling for sales, scheduling, and support. Handles objections, books demos, and updates your CRM automatically.",
    tags: ["Outbound Sales", "Appointment Setting", "IVR Replacement"],
  },
  {
    icon: "support_agent",
    name: "Support Agent",
    desc: "24/7 tier-1 customer support that deflects 80%+ of tickets and escalates only when human judgment is needed.",
    tags: ["Ticket Deflection", "Live Escalation", "Multi-channel"],
  },
  {
    icon: "trending_up",
    name: "Sales Agent",
    desc: "Qualifies inbound leads in real-time, books demos with decision-makers, and keeps your CRM updated without a single manual entry.",
    tags: ["Lead Scoring", "Demo Booking", "CRM Sync"],
  },
  {
    icon: "people",
    name: "HR Agent",
    desc: "Automates candidate screening, employee onboarding workflows, and resolves common HR FAQs round the clock.",
    tags: ["Resume Screening", "Onboarding", "Policy Q&A"],
  },
  {
    icon: "description",
    name: "Admin Agent",
    desc: "Handles document parsing, contract extraction, data entry, and intelligent workflow routing — eliminating repetitive back-office work.",
    tags: ["Document Parsing", "Data Entry", "Workflow Routing"],
  },
  {
    icon: "campaign",
    name: "Marketing Agent",
    desc: "Generates on-brand content, schedules social posts, monitors performance, and drafts campaign reports without lifting a finger.",
    tags: ["Content Gen", "Social Scheduling", "Analytics"],
  },
  {
    icon: "inventory_2",
    name: "Operations Agent",
    desc: "Monitors inventory levels, flags supply chain anomalies, generates purchase orders, and coordinates vendor communications autonomously.",
    tags: ["Inventory", "Supply Chain", "Vendor Comms"],
  },
  {
    icon: "account_balance",
    name: "Finance Agent",
    desc: "Reconciles transactions, flags anomalies, generates financial summaries, and automates invoice processing with audit-trail compliance.",
    tags: ["Reconciliation", "Invoice Processing", "Reporting"],
  },
  {
    icon: "code",
    name: "Dev & QA Agent",
    desc: "Reviews PRs for common bugs, runs regression test suites, generates documentation, and creates JIRA tickets from Slack messages.",
    tags: ["Code Review", "Test Automation", "Ticket Creation"],
  },
];

const HOW_IT_WORKS = [
  {
    num: "01",
    icon: "search",
    title: "Discovery & Workflow Mapping",
    desc: "We spend 2 days mapping your current workflows, identifying the highest-ROI automation opportunities, and defining your agent's scope, triggers, and outputs.",
  },
  {
    num: "02",
    icon: "architecture",
    title: "Agent Blueprint",
    desc: "Our architects design the agent's decision tree, prompt chain, integration points, and fallback logic — before a single line of code is written.",
  },
  {
    num: "03",
    icon: "build",
    title: "Build & Fine-tune",
    desc: "We build the agent using your preferred LLM (GPT-4, Claude, Gemini), connect it to your tools, and fine-tune it on your real business data and tone of voice.",
  },
  {
    num: "04",
    icon: "science",
    title: "Testing & Validation",
    desc: "Rigorous stress-testing across edge cases, adversarial inputs, and peak load scenarios — with your team signing off on accuracy benchmarks.",
  },
  {
    num: "05",
    icon: "rocket_launch",
    title: "Deploy & Monitor",
    desc: "Go live in your production environment with full observability, error logging, and a 30-day hypercare period from our engineering team.",
  },
];

const INTEGRATIONS = [
  { category: "CRM & Sales", tools: ["Salesforce", "HubSpot", "Pipedrive", "Close"] },
  { category: "Communication", tools: ["Slack", "Microsoft Teams", "Email", "WhatsApp"] },
  { category: "Data & Databases", tools: ["PostgreSQL", "MongoDB", "Google Sheets", "Airtable"] },
  { category: "AI Models", tools: ["GPT-4o", "Claude 3.5", "Gemini Pro", "Llama 3"] },
  { category: "Automation", tools: ["n8n", "Make.com", "Zapier", "Custom APIs"] },
  { category: "Support Platforms", tools: ["Zendesk", "Intercom", "Freshdesk", "Linear"] },
];

const STATS = [
  { value: "200+", label: "Agents Deployed" },
  { value: "92%", label: "Avg. Automation Rate" },
  { value: "7 Days", label: "Avg. Time to Deploy" },
  { value: "$2M+", label: "Revenue Recovered for Clients" },
];

const USE_CASES = [
  {
    dept: "Sales",
    icon: "trending_up",
    color: "text-primary",
    bg: "bg-primary/10",
    headline: "Close More, Work Less",
    items: [
      "Qualify 100% of inbound leads in under 60 seconds",
      "Auto-book demos directly into AE calendars",
      "Generate personalised follow-up sequences post-call",
      "Update CRM deal stages without any manual input",
    ],
  },
  {
    dept: "Customer Support",
    icon: "support_agent",
    color: "text-secondary",
    bg: "bg-secondary/10",
    headline: "24/7 Resolution at Scale",
    items: [
      "Resolve 80%+ of tier-1 tickets without human touch",
      "Intelligent escalation to the right team member",
      "Multi-channel: email, chat, SMS, voice",
      "Continuous learning from every resolved ticket",
    ],
  },
  {
    dept: "Operations",
    icon: "settings",
    color: "text-tertiary",
    bg: "bg-tertiary/10",
    headline: "Eliminate Repetitive Back-Office Work",
    items: [
      "Automated document parsing and data extraction",
      "Supplier quote comparison and PO generation",
      "Real-time inventory alerts and reorder triggers",
      "Audit-ready compliance documentation",
    ],
  },
];

const TIERS = [
  {
    name: "Starter Agent",
    subtitle: "Single Workflow",
    badge: null,
    primary: false,
    bg: "bg-surface-container border border-outline-variant/15",
    btnClass: "border border-outline-variant/40 text-on-surface hover:bg-surface-container-high",
    features: [
      "1 custom AI agent",
      "Up to 3 tool integrations",
      "Standard prompt engineering",
      "30-day email support",
      "Monthly performance report",
    ],
  },
  {
    name: "Agency Suite",
    subtitle: "Multi-Agent Stack",
    badge: "Most Popular",
    primary: true,
    bg: "bg-surface-container-highest ring-2 ring-primary",
    btnClass: "bg-primary text-on-primary hover:opacity-90 shadow-lg shadow-primary/20",
    features: [
      "Up to 5 custom AI agents",
      "Unlimited tool integrations",
      "Advanced RAG & memory",
      "Priority Slack support",
      "Quarterly strategy review",
      "Agent performance dashboard",
    ],
  },
  {
    name: "Enterprise",
    subtitle: "Unlimited Scale",
    badge: null,
    primary: false,
    bg: "bg-surface-container border border-outline-variant/15",
    btnClass: "border border-outline-variant/40 text-on-surface hover:bg-surface-container-high",
    features: [
      "Unlimited agents",
      "Custom LLM fine-tuning",
      "On-premise / private cloud option",
      "Dedicated engineering pod",
      "24/7 phone support & SLA",
      "Enterprise security & compliance",
    ],
  },
];

const FAQS = [
  {
    q: "How long does it take to deploy a custom AI agent?",
    a: "Most standalone agents are live within 5–7 business days. Complex multi-agent systems with deep integrations typically take 2–3 weeks. We always agree on a timeline before work begins.",
  },
  {
    q: "Which LLMs do you use to build agents?",
    a: "We are model-agnostic and select the best LLM for your use case. We work with OpenAI GPT-4o, Anthropic Claude, Google Gemini, and open-source models like Llama 3 for on-premise deployments.",
  },
  {
    q: "Can agents integrate with our existing software stack?",
    a: "Yes. We connect agents to any tool that has a REST API or webhook. Common integrations include Salesforce, HubSpot, Zendesk, Slack, Microsoft Teams, Google Workspace, and custom internal databases.",
  },
  {
    q: "What happens if the agent makes a mistake?",
    a: "All agents are built with confidence thresholds and fallback logic — if the agent is uncertain, it routes the task to a human rather than guessing. We also provide full logging so every decision is auditable.",
  },
  {
    q: "Do we own the agent and its code after delivery?",
    a: "Absolutely. You receive full IP ownership, the complete source code, and all model configuration. There are no ongoing licensing fees tied to the agent itself.",
  },
  {
    q: "Can agents handle sensitive or regulated data (HIPAA, GDPR)?",
    a: "Yes. We architect privacy-first pipelines using on-premise models, data masking, and audit logs. Our security service can run alongside any agent deployment to ensure regulatory compliance.",
  },
  {
    q: "What ongoing support do you provide after launch?",
    a: "Every deployment includes a 30-day hypercare period with daily check-ins. After that, you can move to our Managed Maintenance plan for continuous monitoring, retraining, and optimisation.",
  },
];

const SERVICE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Custom AI Agents",
  url: "https://susea.ai/services/agents",
  provider: { "@type": "Organization", name: "Susea.ai", url: "https://susea.ai" },
  description:
    "Custom-built AI agents for calling, support, sales, HR, admin, and marketing — integrated with your tools and live in 7 days.",
  serviceType: "AI Agent Development",
  areaServed: ["US", "GB", "EU", "SG"],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "AI Agent Packages",
    itemListElement: TIERS.map((tier) => ({
      "@type": "Offer",
      name: tier.name,
      description: tier.subtitle,
      itemOffered: {
        "@type": "Service",
        name: tier.name,
        description: tier.features.join(". "),
      },
    })),
  },
};

const FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map(({ q, a }) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: { "@type": "Answer", text: a },
  })),
};

const HOWTO_SCHEMA = buildHowToSchema({
  name: "How to Deploy a Custom AI Agent",
  description:
    "Susea.ai's proven 5-step process for building and deploying custom AI agents — from discovery through production.",
  totalTime: "P7D",
  steps: HOW_IT_WORKS.map((s) => ({ name: s.title, text: s.desc })),
});

const BREADCRUMB_SCHEMA = buildBreadcrumbs([
  { name: "Home", url: "https://susea.ai" },
  { name: "Services", url: "https://susea.ai/services/agents" },
  { name: "Custom AI Agents", url: "https://susea.ai/services/agents" },
]);

export default function AgentsPage() {
  return (
    <>
      <JsonLd data={SERVICE_SCHEMA} />
      <JsonLd data={FAQ_SCHEMA} />
      <JsonLd data={HOWTO_SCHEMA} />
      <JsonLd data={BREADCRUMB_SCHEMA} />

      {/* Hero */}
      <section className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden px-4 md:px-8">
        <div className="absolute inset-0 z-0 opacity-20" aria-hidden>
          <div className="absolute top-1/4 left-1/4 w-64 md:w-96 h-64 md:h-96 signature-gradient blur-[120px] rounded-full" />
          <div className="absolute bottom-1/4 right-1/4 w-64 md:w-96 h-64 md:h-96 bg-primary blur-[120px] rounded-full" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <span className="inline-block px-4 py-1.5 rounded-full bg-surface-container-high text-primary font-bold text-xs tracking-widest uppercase mb-6">
              Custom AI Agents
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-headline font-extrabold tracking-tighter leading-[0.9] mb-6 md:mb-8">
              Agents That Work <br className="hidden sm:block" />While{" "}
              <span className="text-primary">You Sleep.</span>
            </h1>
            <p className="text-on-surface-variant text-lg md:text-xl leading-relaxed max-w-[620px] mb-8 md:mb-10">
              Custom-built AI agents for every department — calling, support, sales, HR, admin, and
              marketing. Fully integrated with your existing stack and live in 7 days.
            </p>
            <div className="flex flex-col sm:flex-row flex-wrap gap-4">
              <Link
                href="/contact"
                className="signature-gradient text-white px-8 py-4 rounded-xl font-headline font-bold text-lg hover:opacity-90 transition-all text-center"
              >
                Deploy Your First Agent →
              </Link>
              <Link
                href="#agent-library"
                className="bg-surface-container-high border border-outline-variant/20 px-8 py-4 rounded-xl font-headline font-bold text-lg hover:bg-surface-container-highest transition-all text-center"
              >
                Browse Agent Library
              </Link>
            </div>
            <p className="text-sm text-on-surface-variant mt-4">
              Need an agent built around your specific industry?{" "}
              <Link href="/services/custom-agents" className="text-primary font-semibold hover:underline">
                See industry-specific builds →
              </Link>
            </p>
          </div>

          {/* Abstract visualization */}
          <div className="relative aspect-square glass-panel rounded-full p-8 md:p-12 flex items-center justify-center max-w-sm mx-auto lg:max-w-none">
            <div className="w-full h-full border border-outline-variant/30 rounded-full flex items-center justify-center relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-24 h-24 md:w-32 md:h-32 signature-gradient rounded-3xl rotate-12 flex items-center justify-center shadow-2xl shadow-primary/20">
                  <span
                    className="material-symbols-outlined text-4xl md:text-5xl text-white"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    bolt
                  </span>
                </div>
              </div>
              {[
                { icon: "call", pos: "absolute top-10 right-10", color: "text-primary" },
                { icon: "support_agent", pos: "absolute bottom-20 left-10", color: "text-secondary" },
                { icon: "trending_up", pos: "absolute top-1/2 -left-8", color: "text-tertiary" },
                { icon: "description", pos: "absolute top-1/2 -right-8", color: "text-primary" },
                { icon: "campaign", pos: "absolute bottom-10 right-16", color: "text-secondary" },
              ].map(({ icon, pos, color }) => (
                <div
                  key={icon}
                  className={`${pos} w-12 h-12 md:w-14 md:h-14 bg-surface-container-highest rounded-xl border border-outline-variant/40 flex items-center justify-center`}
                >
                  <span className={`material-symbols-outlined ${color}`}>{icon}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="py-12 bg-surface-container-low border-y border-outline-variant/10" aria-label="Key statistics">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {STATS.map(({ value, label }) => (
              <div key={label}>
                <div className="text-2xl md:text-4xl font-black text-primary font-headline mb-1">{value}</div>
                <p className="text-xs font-label uppercase tracking-widest text-on-surface-variant/70">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Agent Library */}
      <section id="agent-library" className="bg-surface-container-low py-24 md:py-32 px-4 md:px-8" aria-labelledby="agents-heading">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <span className="text-xs uppercase tracking-widest text-primary font-bold block mb-4">The Library</span>
            <h2 id="agents-heading" className="font-headline text-3xl md:text-5xl font-extrabold tracking-tighter mb-4">
              9 Pre-Architected Agent Types
            </h2>
            <p className="text-on-surface-variant max-w-2xl mx-auto">
              Every agent is 70% pre-built and 100% customised for your specific workflows, data, and tone of voice.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
            {AGENTS.map(({ icon, name, desc, tags }) => (
              <div
                key={name}
                className="p-6 md:p-8 bg-surface-container rounded-xl border border-outline-variant/10 hover:border-primary/20 transition-all group"
              >
                <div className="w-12 h-12 rounded-xl signature-gradient flex items-center justify-center mb-5">
                  <span className="material-symbols-outlined text-white">{icon}</span>
                </div>
                <h3 className="text-lg md:text-xl font-headline font-bold mb-2">{name}</h3>
                <p className="text-on-surface-variant text-sm leading-relaxed mb-4">{desc}</p>
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <span key={tag} className="px-2 py-0.5 rounded-full bg-surface-container-highest text-xs font-mono text-on-surface-variant">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 md:py-32 px-4 md:px-8" aria-labelledby="process-heading">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs uppercase tracking-widest text-primary font-bold block mb-4">The Process</span>
            <h2 id="process-heading" className="font-headline text-3xl md:text-5xl font-extrabold tracking-tighter mb-4">
              From Briefing to Live Agent in 7 Days
            </h2>
            <p className="text-on-surface-variant max-w-xl mx-auto">
              A battle-tested deployment process designed for zero disruption to your existing operations.
            </p>
          </div>
          <div className="relative">
            <div className="hidden md:block absolute top-8 left-0 w-full h-px bg-outline-variant/20" aria-hidden />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-8 relative">
              {HOW_IT_WORKS.map(({ num, icon, title, desc }) => (
                <div key={num} className="flex flex-col gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-surface-container-highest border border-outline-variant/20 flex items-center justify-center relative z-10 mx-auto md:mx-0">
                    <span className="material-symbols-outlined text-primary">{icon}</span>
                  </div>
                  <div>
                    <span className="text-xs font-mono text-primary/60 mb-1 block">{num}</span>
                    <h4 className="font-headline font-bold mb-2">{title}</h4>
                    <p className="text-on-surface-variant text-sm leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases by Department */}
      <section className="py-24 md:py-32 px-4 md:px-8 bg-surface-container-low" aria-labelledby="use-cases-heading">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs uppercase tracking-widest text-primary font-bold block mb-4">ROI by Department</span>
            <h2 id="use-cases-heading" className="font-headline text-3xl md:text-5xl font-extrabold tracking-tighter">
              What Our Agents Actually Do
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {USE_CASES.map(({ dept, icon, color, bg, headline, items }) => (
              <div key={dept} className="p-6 md:p-8 bg-surface-container rounded-xl border border-outline-variant/10">
                <div className={`w-12 h-12 rounded-xl ${bg} flex items-center justify-center mb-5`}>
                  <span className={`material-symbols-outlined ${color}`}>{icon}</span>
                </div>
                <div className="text-xs uppercase tracking-widest text-on-surface-variant/60 font-bold mb-1">{dept}</div>
                <h3 className="font-headline text-xl font-bold mb-4">{headline}</h3>
                <ul className="space-y-2">
                  {items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-on-surface-variant">
                      <span className="material-symbols-outlined text-primary text-base shrink-0 mt-0.5">check_circle</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Integration Ecosystem */}
      <section className="py-24 md:py-32 px-4 md:px-8" aria-labelledby="integrations-heading">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <span className="text-xs uppercase tracking-widest text-primary font-bold block mb-4">Integrations</span>
              <h2 id="integrations-heading" className="font-headline text-3xl md:text-5xl font-extrabold tracking-tighter mb-6">
                Connects to Every Tool You Already Use
              </h2>
              <p className="text-on-surface-variant text-lg leading-relaxed mb-8">
                Our agents don&apos;t replace your tech stack — they supercharge it. We integrate natively
                with 100+ platforms via REST APIs, webhooks, and native SDKs.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 text-primary font-bold hover:gap-4 transition-all"
              >
                See Full Integration List <span className="material-symbols-outlined">arrow_right_alt</span>
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {INTEGRATIONS.map(({ category, tools }) => (
                <div key={category} className="p-5 bg-surface-container rounded-xl border border-outline-variant/10">
                  <p className="text-xs uppercase tracking-widest text-primary font-bold mb-3">{category}</p>
                  <div className="flex flex-wrap gap-2">
                    {tools.map((tool) => (
                      <span key={tool} className="px-2.5 py-1 rounded-lg bg-surface-container-highest text-xs font-mono text-on-surface-variant">
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Tiers */}
      <section className="py-24 md:py-32 px-4 md:px-8 bg-surface-container-low" aria-labelledby="pricing-heading">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs uppercase tracking-widest text-primary font-bold block mb-4">Engagement Models</span>
            <h2 id="pricing-heading" className="font-headline text-3xl md:text-5xl font-extrabold tracking-tighter mb-4">
              Choose Your Agent Package
            </h2>
            <p className="text-on-surface-variant max-w-xl mx-auto">
              All packages include full IP ownership, source code delivery, and a 30-day hypercare period.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {TIERS.map(({ name, subtitle, badge, primary, bg, btnClass, features }) => (
              <div key={name} className={`flex flex-col p-8 md:p-10 rounded-xl ${bg} relative`}>
                {badge && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary text-on-primary text-xs font-bold rounded-full uppercase tracking-widest whitespace-nowrap">
                    {badge}
                  </div>
                )}
                <div className="mb-8">
                  <div className={`text-xs uppercase tracking-widest font-bold mb-2 ${primary ? "text-primary" : "text-on-surface-variant"}`}>
                    {name}
                  </div>
                  <div className="font-headline text-3xl font-black text-on-surface">{subtitle}</div>
                </div>
                <ul className="space-y-3 mb-10 flex-1">
                  {features.map((f) => (
                    <li key={f} className="flex gap-3 text-sm text-on-surface-variant">
                      <span className="material-symbols-outlined text-primary shrink-0 text-base mt-0.5">done</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/contact"
                  className={`w-full py-4 rounded-xl font-headline font-bold text-center transition-all text-sm md:text-base ${btnClass}`}
                >
                  Get a Quote
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Study Teaser */}
      <section className="py-24 md:py-32 px-4 md:px-8 bg-surface" aria-labelledby="case-study-heading">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="glass-panel p-8 md:p-12 rounded-2xl border border-outline-variant/20 relative overflow-hidden">
              <div className="absolute inset-0 signature-gradient opacity-5" aria-hidden />
              <div className="relative z-10">
                <div className="text-xs uppercase tracking-widest text-primary font-bold mb-6">Case Study #12</div>
                <div className="text-5xl md:text-7xl font-headline font-black text-primary mb-2">$1.4M</div>
                <div className="text-on-surface-variant text-sm mb-8">Annual savings from support automation</div>
                <div className="space-y-3">
                  {[
                    "83% ticket deflection rate achieved in week 1",
                    "Support team scaled from 12 to 4 agents",
                    "CSAT score increased from 3.8 to 4.7",
                    "Agent deployed in 6 business days",
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-2 text-sm">
                      <span className="material-symbols-outlined text-primary text-base shrink-0 mt-0.5">check_circle</span>
                      <span className="text-on-surface-variant">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div>
              <span className="text-xs uppercase tracking-widest text-secondary-container font-bold block mb-4">
                Global E-Commerce Platform
              </span>
              <h2 id="case-study-heading" className="font-headline text-3xl md:text-4xl font-bold tracking-tight mb-6">
                How a 200-Person Company Eliminated Their Tier-1 Support Backlog Overnight
              </h2>
              <p className="text-on-surface-variant text-lg leading-relaxed mb-8">
                A rapidly scaling DTC brand was drowning in support tickets. We deployed a custom Support
                Agent trained on their product catalog, return policies, and top 500 ticket categories.
                By day 3, it was resolving tickets faster than any human on the team.
              </p>
              <Link
                href="/case-studies"
                className="inline-flex items-center gap-2 text-primary font-bold hover:gap-4 transition-all"
              >
                Read Full Case Study <span className="material-symbols-outlined">arrow_right_alt</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 md:py-32 px-4 md:px-8">
        <div className="max-w-5xl mx-auto signature-gradient rounded-3xl p-10 md:p-20 text-center relative overflow-hidden shadow-2xl shadow-primary/20">
          <div className="absolute inset-0 bg-black/10" aria-hidden />
          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-black font-headline text-white mb-6 tracking-tighter">
              Ready to deploy your first agent?
            </h2>
            <p className="text-lg md:text-xl text-white/90 mb-10 max-w-2xl mx-auto">
              We&apos;ll scope, build, and deploy your first agent in 7 days or less. No risk, full IP ownership.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-3 bg-white text-black px-8 md:px-10 py-4 md:py-5 rounded-xl text-lg font-black hover:scale-105 transition-all shadow-xl"
              >
                Book a Free Agent Demo
                <span className="material-symbols-outlined">call</span>
              </Link>
              <Link
                href="#agent-library"
                className="inline-flex items-center justify-center gap-2 bg-transparent border-2 border-white/30 text-white px-8 py-4 rounded-xl font-bold hover:bg-white/10 transition-all"
              >
                Browse Library
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <FAQSection faqs={FAQS} title="Custom AI Agent FAQs" />
    </>
  );
}
