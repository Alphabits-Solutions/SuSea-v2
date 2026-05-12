# Susea.ai — Blog Content Plan

**Last updated:** 2026-05-12
**Total published:** 24 | **Planned:** 12 | **Pipeline total:** 36

---

## How to Use This File

1. Pick an unchecked post from the **Upcoming Posts** table.
2. Write and publish the MDX file following the **Blog Writing Requirements** below.
3. Check the box, fill in the **Date Published** column, and move the row to the **Published Archive** table.
4. Update the counts and `Last updated` date at the top of this file.

---

## Blog Writing Requirements

### 1. File Location & Naming

```
susea-nextjs/content/blog/<slug>.mdx
```

- Slug must be lowercase kebab-case matching the `slug` frontmatter field exactly.
- Filename and slug must match — `cicd-for-llm-apps.mdx` → `slug: "cicd-for-llm-apps"`.

---

### 2. Required Frontmatter

Every post **must** include all of the following fields:

```yaml
---
title: "Full Title in Title Case"
slug: "kebab-case-slug"
date: "YYYY-MM-DD"              # Publication date, past dates for staggered release
category: "engineering"         # See Category Options below
author: "Full Name"             # Must match an author on the About page
authorRole: "Role Title"        # Must match the author's actual role
excerpt: "1–2 sentence teaser visible on blog listing cards. Keep under 160 chars."
featured: false                 # Only ONE post may be featured: true at a time
keywords:                       # 4–6 target keywords — drives per-post JSON-LD
  - "primary keyword phrase"
  - "secondary keyword phrase"
  - "tertiary keyword phrase"
faq:                            # Minimum 2 Q&A pairs — injected as FAQPage schema
  - q: "Question users type into Google?"
    a: "Direct, complete answer in 2–4 sentences."
  - q: "Another high-intent question?"
    a: "Answer."
---
```

**Optional frontmatter:**
```yaml
description: "Custom meta description (overrides excerpt for SEO if provided)."
readTime: "8 min"              # Auto-calculated if omitted — omit unless correcting
```

---

### 3. Category Options

| Value | Use for |
|---|---|
| `engineering` | Technical implementation, architecture, code-level topics |
| `strategy` | Business decisions, frameworks, ROI, leadership |
| `security` | AI security, compliance, guardrails, privacy |
| `ethics` | Bias, responsibility, sustainability, fairness |
| `operations` | Supply chain, logistics, process automation |

> The blog listing page filters by these exact lowercase strings. Do not invent new categories.

---

### 4. Author Roster

| Name | Role | Cluster Fit |
|---|---|---|
| David Chen | Chief Architect | Engineering posts |
| Marcus Thorne | Managing Partner | Strategy posts |
| Sarah Jenkins | Ops Strategy | Strategy / Operations posts |
| Dr. Elara Vance | (Research) | Engineering / Ethics posts |
| Elena Vance | Head of Design | Ethics posts |

Rotate authors — avoid publishing two consecutive posts by the same author.

---

### 5. Content Structure

Every post must follow this section order:

1. **Opening hook** (1–2 paragraphs, no heading) — state the problem or tension, no fluff.
2. **H2 sections** (3–6 sections) — one clear idea per section. Use `##`.
3. **H3 subsections** (optional) — use `###` for sub-points within an H2.
4. **Closing paragraph + CTA** — end with an internal link to a relevant service page or resource. No separate "Conclusion" heading.

**Do not use:**
- Bullet-point-only sections (write prose)
- Generic introductions that could apply to any post
- More than one `#` H1 (the title already provides it)

---

### 6. Word Count Targets

| Category | Target |
|---|---|
| Engineering deep-dive | 1,400–1,800 words |
| Strategy / framework | 1,100–1,400 words |
| AEO / definition post | 900–1,200 words |
| Industry-specific | 1,000–1,300 words |

---

### 7. SEO Rules

- **Primary keyword in the title** — exact or near-exact match.
- **Primary keyword in the first 100 words** — natural placement, not forced.
- **Minimum 2 internal links** per post — link to a service page (`/services/`) or resource (`/resources/`) relevant to the topic.
- **No external links** to competitor domains.
- **FAQ section** — the `faq` frontmatter array renders as `FAQPage` JSON-LD automatically. Target questions that appear in Google's "People also ask" box for your primary keyword.
- **Excerpt ≤ 160 characters** — it doubles as the meta description on blog post pages.

---

### 8. Internal Linking Reference

When writing about these topics, link to these pages:

| Topic | Link destination |
|---|---|
| Broken / failing agents | `/services/fix-agent` |
| Building custom agents | `/services/agents` or `/services/custom-agents` |
| Industry-specific builds | `/services/custom-agents` |
| AI strategy / readiness | `/services/consulting` |
| Security / compliance | `/services/security` |
| Code quality / rescue | `/services/vibe-code-rescue` |
| Agent health / diagnostics | `/resources/ai-agent-diagnostic` |
| Case studies / proof | `/case-studies` |
| Getting started | `/contact` |

---

## Keyword Clusters

### Cluster A — Recovery Market (Fix / Repair)
> Targets users whose deployed agents are already failing.

`fixing broken AI agents` · `AI agent troubleshooting` · `repairing autonomous agents` · `AI hallucination fix` · `debugging agentic workflows` · `AI agent reliability` · `optimizing LLM agents` · `fixing AI loops` · `enterprise AI support` · `AI agent monitoring` · `prompt injection AI`

### Cluster B — Development Market (Build / Create)
> Targets high-intent leads looking for professional agent implementation.

`custom autonomous AI agents` · `multi-agent system orchestration` · `enterprise AI agent services` · `AI automation for [Industry]` · `AI agent guardrails` · `scalable AI agents` · `production-ready AI` · `B2B AI agent development` · `AI agent evaluation` · `AI agent for customer service`

### AEO — Answer Engine Targets
> Definition and "what is" queries; captures Perplexity, ChatGPT, and Google SGE traffic.

`what is an agentic loop` · `ReAct agent` · `chain-of-thought AI agent` · `AI agent reasoning patterns` · `what is RAG in AI agents`

---

## Upcoming Posts Checklist

> Check the box when published. Fill Date Published. Move row to Published Archive.

| Done | # | Title | Slug | Cluster | Primary Keyword | Suggested Author | Date Published |
|------|---|-------|------|---------|-----------------|------------------|----------------|
| [ ] | 1 | How to Debug an AI Agent: A Step-by-Step Trace Analysis | `debug-ai-agent-trace-analysis` | A | AI agent debugging | David Chen | |
| [ ] | 2 | AI Agent Monitoring in Production: What to Log and Why | `ai-agent-monitoring-production` | A | AI agent monitoring | David Chen | |
| [ ] | 3 | Prompt Injection in AI Agents: Risks, Examples, and Defences | `prompt-injection-ai-agents` | A | prompt injection AI agents | David Chen | |
| [ ] | 4 | Why Your RAG Pipeline Is Lying to Your Agent | `rag-pipeline-errors-ai-agents` | A | RAG troubleshooting | Dr. Elara Vance | |
| [ ] | 5 | The True Cost of a Broken AI Agent: A Business Impact Framework | `cost-of-broken-ai-agent` | A | AI agent reliability cost | Sarah Jenkins | |
| [ ] | 6 | Multi-Agent Orchestration: Patterns That Work in Production | `multi-agent-orchestration-patterns` | B | multi-agent system orchestration | David Chen | |
| [ ] | 7 | How to Build an AI Agent for Customer Service: Architecture Guide | `ai-agent-customer-service-architecture` | B | AI agent for customer service | Marcus Thorne | |
| [ ] | 8 | AI Agents for Real Estate: Automating Lead Qualification End-to-End | `ai-agents-real-estate-lead-qualification` | B | AI automation for real estate | Sarah Jenkins | |
| [ ] | 9 | AI Agents for Fintech: Compliance Monitoring Without the Headcount | `ai-agents-fintech-compliance-monitoring` | B | AI automation for fintech | Sarah Jenkins | |
| [ ] | 10 | How to Evaluate an AI Agent Before You Deploy It | `how-to-evaluate-ai-agent` | B | AI agent evaluation framework | Dr. Elara Vance | |
| [ ] | 11 | What Is an Agentic Loop? Causes, Consequences, and Fixes | `what-is-agentic-loop` | AEO | agentic loop | David Chen | |
| [ ] | 12 | ReAct, CoT, and Tool Use: The Reasoning Patterns Behind AI Agents | `react-cot-tool-use-ai-agent-reasoning` | AEO | ReAct agent | Marcus Thorne | |

**Suggested 2-week publishing cadence:**

| Fortnight | Posts |
|---|---|
| 1 (May 18 – May 31) | #1, #6 |
| 2 (Jun 1 – Jun 14) | #2, #7 |
| 3 (Jun 15 – Jun 28) | #3, #11 |
| 4 (Jun 29 – Jul 12) | #4, #8 |
| 5 (Jul 13 – Jul 26) | #5, #9 |
| 6 (Jul 27 – Aug 9) | #10, #12 |

---

## Published Archive

| # | Title | Slug | Category | Author | Date Published |
|---|-------|------|----------|--------|----------------|
| — | The 5 Reasons Your AI Agent Fails in Production | `agent-failure-production` | engineering | David Chen | 2026-04-07 |
| — | Beyond the Prompt: Why Reliability Requires Guardrails | `beyond-prompt-reliability-guardrails` | strategy | Marcus Thorne | 2026-04-21 |
| — | Agentic Workflows vs. Linear Automation | `agentic-workflows-vs-linear-automation` | strategy | Sarah Jenkins | 2026-05-05 |
| — | The Future of Agentic Workflows | `future-of-agentic-workflows` | strategy | Marcus Thorne | 2024-05-20 |
| — | Optimizing Inference Costs in High-Traffic Environments | `optimizing-inference-costs` | engineering | Dr. Elara Vance | 2024-10-24 |
| — | Beyond the LLM: Architecting Durable AI Infrastructure | `beyond-the-llm` | strategy | Marcus Thorne | 2024-11-15 |
| — | The CEO's Guide to AI Sovereignty | `ceo-guide-ai-sovereignty` | strategy | Sarah Jenkins | 2024-12-01 |
| — | CI/CD for LLM Apps: Testing the Untestable | `cicd-for-llm-apps` | engineering | David Chen | 2024-04-10 |
| — | Scaling RAG on AWS: A Reference Architecture | `scaling-rag-on-aws` | engineering | Dr. Elara Vance | 2024-03-25 |
| — | Generative AI Security Guardrails | `generative-ai-security-guardrails` | security | David Chen | 2024-06-05 |
| — | Data Privacy in Agentic Systems | `data-privacy-agentic-systems` | security | David Chen | 2024-02-18 |
| — | AI Governance: From Policy to Code | `ai-governance-policy-to-code` | strategy | Sarah Jenkins | 2024-01-30 |
| — | AI Readiness ROI Frameworks | `ai-readiness-roi-frameworks` | strategy | Sarah Jenkins | 2024-05-01 |
| — | The Chief AI Officer: A New Mandate for Growth | `chief-ai-officer` | strategy | Marcus Thorne | 2024-09-10 |
| — | Bias Mitigation in Hiring Agents | `bias-mitigation-hiring-agents` | ethics | Elena Vance | 2024-03-05 |
| — | The Environmental Cost of Large Models | `environmental-cost-large-models` | ethics | Elena Vance | 2023-12-01 |
| — | Efficient Fine-Tuning with LoRA | `efficient-fine-tuning-lora` | engineering | Dr. Elara Vance | 2024-01-15 |
| — | Scaling Neural Networks for SMBs | `scaling-neural-networks-smbs` | engineering | Dr. Elara Vance | 2024-06-28 |
| — | Low-Code AI Model Training: A New Paradigm | `low-code-ai-model-training` | engineering | David Chen | 2024-07-15 |
| — | Serverless Inference: Pros and Cons | `serverless-inference-pros-cons` | engineering | Dr. Elara Vance | 2023-12-20 |
| — | Edge AI: Processing at the Source | `edge-ai-processing-at-source` | engineering | David Chen | 2023-11-15 |
| — | Explainable AI for Finance | `explainable-ai-finance` | strategy | Marcus Thorne | 2023-10-15 |
| — | Winning the Talent War in AI | `winning-talent-war-ai` | strategy | Sarah Jenkins | 2023-11-01 |
| — | Algorithmic Transparency in Modern Supply Chains | `algorithmic-transparency-supply-chains` | operations | Sarah Jenkins | 2024-08-22 |

---

## Maintenance Instructions

> **Every time a new blog post is written and published, the person writing it (or Claude) must:**
>
> 1. Check the box in the **Upcoming Posts Checklist** table for that post.
> 2. Fill in the **Date Published** column with the ISO date (`YYYY-MM-DD`).
> 3. Copy the completed row into the **Published Archive** table at the bottom.
> 4. Update the **Total published** and **Last updated** counters at the very top of this file.
> 5. If the post was marked `featured: true` in its frontmatter, ensure no other post in the archive also has `featured: true` — only one post may hold the featured slot at a time.
>
> **If a new post is added to the plan** (not yet in the checklist), add it to the **Upcoming Posts Checklist** with a new sequential number and update the **Pipeline total** counter at the top.
