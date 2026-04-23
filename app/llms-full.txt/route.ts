import { getAllPosts, getPostBySlug } from "@/lib/mdx";

const BASE_URL = "https://susea.ai";

const SERVICES = [
  {
    name: "Custom AI Agents",
    url: `${BASE_URL}/services/agents`,
    description: `Susea.ai builds custom AI agents for every business department — calling, customer support, sales, HR, admin, and marketing. Each agent is fully custom-engineered (not a template), integrated with your existing tools (Salesforce, HubSpot, Zendesk, Slack, etc.), and live in 7 business days. We work with GPT-4o, Anthropic Claude, Google Gemini, and open-source Llama 3 for on-premise deployments.

Process: (1) Discovery & Workflow Mapping — 2-day deep dive identifying highest-ROI automation opportunities. (2) Agent Blueprint — architects design the decision tree, prompt chain, and fallback logic. (3) Build & Fine-tune — agent built on your preferred LLM, connected to your tools, fine-tuned on your data. (4) Testing & Validation — stress-tested across edge cases and adversarial inputs. (5) Deploy & Monitor — go live with full observability and 30-day hypercare.

Pricing tiers: Starter Agent (1 agent, up to 3 integrations), Agency Suite (up to 5 agents, unlimited integrations, RAG & memory), Enterprise (unlimited agents, custom LLM fine-tuning, on-premise option).

Key stats: 200+ agents deployed, 92% average automation rate, 7 days average time to deploy, $2M+ revenue recovered for clients.`,
  },
  {
    name: "AI Consulting & Readiness",
    url: `${BASE_URL}/services/consulting`,
    description: `Strategic AI readiness assessments that eliminate technical debt and strategic misalignment before a single line of code is written. Susea.ai conducts a comprehensive 2-week audit of your data infrastructure, tech stack, team capabilities, compliance posture, and competitive landscape — delivering a 40+ page report with a prioritised 12-month AI roadmap and ROI projections.

Process: (1) Discovery Intensive — 48-hour deep dive into your technical stack and business goals. (2) Data Forensic Audit — validation of data cleanliness, accessibility, and structural health. (3) Risk/Reward Mapping — prioritising high-impact use cases against implementation complexity. (4) Final Blueprint — a 12-month engineering roadmap with precise cost projections.

Six pillars assessed: Data Integrity, Compliance & Privacy, Infrastructure Stack, Talent Gap Analysis, Market Positioning, Scalability Velocity.

Common problems solved: Data swamps (fragmented uncleaned data causing hallucinations), ROI blindness (deploying AI without business alignment), Shadow AI Risk (corporate data leaking into public LLMs), Technical Debt Injection (standard SaaS templates failing under AI load).`,
  },
  {
    name: "Rapid MVP Development",
    url: `${BASE_URL}/services/rapid-mvp`,
    description: `Production-ready Web, Mobile, and SaaS MVPs shipped in 4 weeks. Full source code and IP ownership on day 1 — no licensing fees, no vendor lock-in. Default tech stack: Next.js (React), TypeScript, PostgreSQL, Stripe, AWS/Vercel. React Native for mobile. Django/FastAPI for ML-heavy backends.

What's included: Auth & Security (JWT/OAuth), Data Infrastructure (optimised schemas with caching), Analytics Integration, CI/CD Pipeline. Two 60-minute syncs per week (Monday planning, Friday review) — all day-to-day decisions handled by Susea.ai engineering.

Timeline: Week 1 — Discovery & Blueprint. Week 2 — Design & Prototypes. Weeks 3-4 — Core Development & QA/Deployment. Post-MVP: 2-week sprint retainers available for scaling.`,
  },
  {
    name: "Fix AI Agents",
    url: `${BASE_URL}/services/fix-agent`,
    description: `Precision engineering to diagnose and rehabilitate failing AI infrastructure. Problems fixed: Prompt chain failures (context-window overflow, latency spikes), RAG retrieval errors (wrong facts, hallucinations), security vulnerabilities (prompt injection, data leakage between agent handoffs), performance issues (token usage reduced by up to 40% while maintaining output quality), monitoring gaps (no observability into agent decisions).

Diagnostic process: (1) Log Audit — reviewing execution logs to identify failure nodes. (2) Context Trace — mapping information flow across prompts. (3) Prompt Stress — testing boundary cases for edge-case failures. (4) Architecture Rebuild — deploying optimised logic and reconnections. (5) QA & Handover — final validation and staff training.`,
  },
  {
    name: "Vibe Code Rescue",
    url: `${BASE_URL}/services/vibe-code-rescue`,
    description: `Transformation service for AI-generated codebases (built with ChatGPT, GitHub Copilot, Cursor, Bolt, v0, or similar tools) that need production-readiness. Common problems: Apps that crash under concurrent users, security vulnerabilities (CORS, CSRF, SQL injection missed by AI), hallucinated dependencies (outdated or non-existent npm packages), architecture issues (flat-file structure not suitable for scale).

Rescue audit: (1) Deep Static Analysis — automated scanning for security vulnerabilities and architectural inconsistencies. (2) Human Intelligence Review — senior engineers manually review core business logic. (3) Risk Assessment Report — "Production Blockers" vs. "Nice to Refactor" breakdown. (4) Execution & Rescue — rapid refactoring sprints to stabilise the codebase.`,
  },
  {
    name: "AI Security & Compliance",
    url: `${BASE_URL}/services/security`,
    description: `Enterprise-grade AI security services covering API security, application penetration testing, cloud defense (zero-trust for AWS/Azure/GCP), vCISO strategy, threat intelligence, and 24/7 incident response (1-hour acknowledgement SLA, 4-hour containment protocol).

Compliance frameworks supported: SOC2 Type II, ISO 27001, HIPAA, GDPR, PCI DSS, CCPA.

AI-specific risks addressed: Prompt injection vulnerabilities, data leakage through LLM APIs, model inversion attacks, shadow AI usage (corporate data entering public LLM training pipelines), governance policy implementation.

Track record: 0 compromised clients under Susea Managed Defense. Industry stats context: 43% of cyber attacks target small-to-mid-market entities; average breach cost $4.4M; 277 days average to identify and contain a breach.`,
  },
];

const CASE_STUDIES = [
  { title: "Lead Qualification Pipeline", industry: "Real Estate", metric: "+40% Qualified Meetings", desc: "Automated lead vetting and classification for a national brokerage using AI agents." },
  { title: "Autonomous Patient Triage", industry: "Healthcare", metric: "73% No-show reduction", desc: "AI-driven patient triage system deployed for a healthcare provider." },
  { title: "AI Strategy for Legacy Pipelines", industry: "Fintech Scale-up", metric: "24% Accuracy Increase + $210k/yr saved", desc: "Optimised legacy data architecture for LLM readiness, enabling faster model deployment." },
  { title: "Enterprise Voice Agents", industry: "Professional Services", metric: "65% OPEX Reduction", desc: "Human-like voice agents handling high-volume inbound queries across 12 timezones." },
  { title: "API Hardening & Testing", industry: "Fintech Security", metric: "99.9% Threat Reduction", desc: "Full API security audit and hardening for a fintech platform." },
  { title: "Contract Analysis Engine", industry: "Legal", metric: "90% Faster Review Cycle", desc: "AI contract review system reducing legal review time dramatically." },
  { title: "Enterprise AI Governance", industry: "Global 2000", metric: "100% Regional Compliance", desc: "AI governance framework for a Fortune 500 company across multiple jurisdictions." },
  { title: "HIPAA Privacy Layer", industry: "Healthcare Diagnostic", metric: "Audit ready in 3 weeks", desc: "End-to-end HIPAA compliance layer for a healthcare diagnostics company." },
];

export async function GET() {
  const posts = await getAllPosts();

  const blogSections = await Promise.all(
    posts.slice(0, 10).map(async (post) => {
      const full = await getPostBySlug(post.slug);
      const preview = full?.rawContent?.slice(0, 800) ?? post.excerpt;
      return `### [${post.title}](${BASE_URL}/blog/${post.slug})

**Author:** ${post.author} (${post.authorRole}) | **Category:** ${post.category} | **Read time:** ${post.readTime}

${preview}${preview.length >= 800 ? "…" : ""}

---`;
    })
  );

  const servicesSections = SERVICES.map(
    (s) => `### [${s.name}](${s.url})\n\n${s.description}\n\n---`
  ).join("\n\n");

  const caseStudiesSection = CASE_STUDIES.map(
    (cs) => `- **${cs.title}** (${cs.industry}): ${cs.metric}. ${cs.desc}`
  ).join("\n");

  const body = `# Susea.ai — Full Content Index

> Enterprise AI agency specialising in custom AI agents, AI consulting, rapid MVP development, and AI security. Founded by ex-AWS architects and product strategists. Remote-first with presence in San Francisco, London, and Singapore.

**Contact:** hello@susea.ai | [susea.ai](${BASE_URL})

**Social:** [LinkedIn](https://linkedin.com/company/suseaai) | [Twitter/X](https://twitter.com/suseaai) | [GitHub](https://github.com/suseaai)

---

## About Susea.ai

Susea.ai is an enterprise AI agency founded to solve a problem our founders saw repeatedly: CTOs and Lead Architects struggling with "Frankenstein Stacks" — systems built under pressure that became their own worst enemies. The gap wasn't a lack of tools, but a lack of architectural integrity.

The name "Susea" is inspired by the logarithmic spiral of the Nautilus — a mathematical form representing growth without changing shape. It symbolises Elegant Scalability: solutions that maintain their core integrity regardless of how large they grow.

**Team:**
- Marcus Thorne — Managing Partner. Ex-AWS Solution Architect, high-concurrency systems.
- Elena Vance — Head of Design. Editorial designer turned product strategist.
- David Chen — Chief Architect. Core proprietary infrastructure, system integrity.
- Sarah Jenkins — Ops Strategy. Engineering complexity to business outcomes.

**Values:** Architectural First, Precision Engineering, Radical Collaboration, Visible Integrity.

**Track record:** 200+ AI agents deployed, clients across 4 continents, $2M+ revenue recovered.

---

## Services

${servicesSections}

## Case Studies

${caseStudiesSection}

---

## Blog (Latest ${Math.min(posts.length, 10)} posts)

${blogSections.join("\n\n")}

---

## Frequently Asked Questions

**Q: How long does it take to deploy a custom AI agent?**
A: Most standalone agents are live within 5–7 business days. Complex multi-agent systems with deep integrations typically take 2–3 weeks. Timeline agreed before work begins.

**Q: Which LLMs do you build agents with?**
A: Model-agnostic — GPT-4o, Anthropic Claude, Google Gemini, and open-source Llama 3 for on-premise. Best LLM selected per use case.

**Q: Do you work with international clients?**
A: Yes. Susea.ai operates globally with a follow-the-sun engineering support model across 4 continents.

**Q: What is your pricing model?**
A: Fixed-fee engagements or monthly recurring strategic partnerships. No hourly billing — aligned on outcomes. Quick wins from $3K; enterprise AI agent deployments $50K+.

**Q: Who retains IP ownership of built agents/software?**
A: You do. Full IP ownership, complete source code, all model configuration — no ongoing licensing fees.

**Q: What compliance frameworks do you support?**
A: SOC2 Type II, ISO 27001, HIPAA, GDPR, PCI DSS, CCPA.
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, stale-while-revalidate=900",
    },
  });
}
