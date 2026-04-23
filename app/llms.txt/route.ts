import { getAllPosts } from "@/lib/mdx";

const BASE_URL = "https://susea.ai";

export async function GET() {
  const posts = await getAllPosts();

  const blogLinks = posts
    .map((p) => `- [${p.title}](${BASE_URL}/blog/${p.slug}): ${p.excerpt}`)
    .join("\n");

  const body = `# Susea.ai

> Enterprise AI agency specialising in custom AI agents, AI consulting, rapid MVP development, and AI security. Serving enterprises across USA, UK, and Europe. We build, fix, and optimise AI systems that run autonomously — so your business moves faster with fewer people.

## Services

- [Custom AI Agents](${BASE_URL}/services/agents): Custom-built AI agents for calling, support, sales, HR, admin, and marketing — live in 7 days. Powered by GPT-4, Claude, and Gemini.
- [AI Consulting & Readiness](${BASE_URL}/services/consulting): Strategic AI readiness audits and 12-month engineering roadmaps for enterprises wanting to adopt AI without wasted spend.
- [Rapid MVP Development](${BASE_URL}/services/rapid-mvp): Full-stack Web, Mobile, and SaaS MVPs shipped in 4 weeks. Next.js, React Native, Postgres, Stripe — production-ready.
- [Fix AI Agents](${BASE_URL}/services/fix-agent): Diagnose and rehabilitate broken AI agents, failed prompt chains, hallucinating LLM integrations, and slow RAG pipelines.
- [Vibe Code Rescue](${BASE_URL}/services/vibe-code-rescue): Transform AI-generated (ChatGPT/Copilot/Cursor) prototype codebases into secure, scalable, maintainable production software.
- [AI Security & Compliance](${BASE_URL}/services/security): Enterprise security audits, AI guardrails, penetration testing, and compliance certification (SOC2, HIPAA, GDPR, PCI DSS).
- [Hire Dedicated Resources](${BASE_URL}/services/hire): Pre-vetted senior AI engineers, backend architects, and full-stack developers ready to integrate in 72 hours.
- [Managed Maintenance](${BASE_URL}/services/maintenance): Year-round managed maintenance covering security patching, performance monitoring, cloud tuning, and architectural reviews.

## Tools

- [Automation Savings Calculator](${BASE_URL}/automation-calculator): Free interactive tool that calculates your business's potential automation savings across 200+ workflows and generates a personalized AI implementation roadmap.

## Case Studies

- [Case Studies](${BASE_URL}/case-studies): Real AI agent deployments and consulting outcomes across healthcare, fintech, real estate, legal, and SaaS — with verified metrics.

## Blog

${blogLinks}

## Company

- [About Susea.ai](${BASE_URL}/about): Founded by ex-AWS architects and product strategists. Remote-first agency with presence in San Francisco, London, and Singapore. Built by builders, for builders.
- [Contact](${BASE_URL}/contact): Book a free strategy session or send a message. No hard sell — just an honest conversation about what you need.

## Optional

- [Sitemap](${BASE_URL}/sitemap.xml)
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400, stale-while-revalidate=3600",
    },
  });
}
