"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import clsx from "clsx";
import styles from "./styles.module.css";

// ─── Types ────────────────────────────────────────────────────────────────────

type Screen   = "intro" | "role" | "question" | "email" | "results";
type RoleKey  = "cto" | "smb";
type Category = "process" | "data" | "team" | "budget";

interface QuestionOption {
  l:   string;
  s:   string;
  sc:  0 | 1 | 2;
  sty: "os-ready" | "os-partial" | "os-gap";
}

interface Question {
  cat:      Category;
  catQ:     number;
  catTotal: number;
  text:     string;
  sub:      string;
  opts:     QuestionOption[];
}

interface CategoryConfig {
  label: string;
  icon:  string;
  max:   number;
}

interface PathConfig {
  label:      string;
  totalQ:     number;
  categories: Record<Category, CategoryConfig>;
  questions:  Question[];
}

interface Tier {
  min:   number;
  label: string;
  color: string;
  title: string;
  desc:  string;
}

interface Rec {
  icon:  string;
  color: string;
  title: string;
  desc:  string;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const GRAD = "linear-gradient(135deg,#6BA3E8 0%,#2B5BA8 50%,#E8650A 100%)";
const CIRC = 2 * Math.PI * 90; // r=90 → ≈565.49

const CAT_PILL: Record<Category, string> = {
  process: "text-[#a78bfa] border-[rgba(167,139,250,0.3)] bg-[rgba(167,139,250,0.08)]",
  data:    "text-[#6BA3E8] border-[rgba(107,163,232,0.3)] bg-[rgba(107,163,232,0.08)]",
  team:    "text-[#2dd4a0] border-[rgba(45,212,160,0.3)]  bg-[rgba(45,212,160,0.08)]",
  budget:  "text-[#f5c842] border-[rgba(245,200,66,0.3)]  bg-[rgba(245,200,66,0.08)]",
};

const OPT_BADGE: Record<string, string> = {
  "os-ready":   "bg-[rgba(45,212,160,0.12)] text-[#2dd4a0]",
  "os-partial": "bg-[rgba(245,200,66,0.1)]  text-[#f5c842]",
  "os-gap":     "bg-[rgba(240,82,82,0.1)]   text-[#f05252]",
};

// ─── Data ─────────────────────────────────────────────────────────────────────

const PATHS: Record<RoleKey, PathConfig> = {
  cto: {
    label:  "CTO / COO / Technical Leader",
    totalQ: 20,
    categories: {
      process: { label: "Business Process",      icon: "⚙️", max: 10 },
      data:    { label: "Data & Infrastructure", icon: "🗄️", max: 12 },
      team:    { label: "Team & Talent",          icon: "👥", max: 10 },
      budget:  { label: "Budget & ROI",           icon: "💰", max: 8  },
    },
    questions: [
      // ── Process (5) ──────────────────────────────────────────────
      { cat:"process", catQ:1, catTotal:5,
        text:"How well-documented are your core business and technical processes?",
        sub:"Think: SOPs, runbooks, workflow diagrams — the kind of documentation a new hire could follow.",
        opts:[
          { l:"Fully documented with SOPs and regular reviews",                sc:2, s:"Documented & maintained", sty:"os-ready"   },
          { l:"Partially documented — key flows written, some tribal knowledge",sc:1, s:"Some docs, some gaps",    sty:"os-partial" },
          { l:"Largely ad hoc — most knowledge lives in people's heads",        sc:0, s:"Needs documentation",     sty:"os-gap"     },
        ],
      },
      { cat:"process", catQ:2, catTotal:5,
        text:"Have you formally mapped workflows to identify automation candidates?",
        sub:"E.g. process mining, automation audits, or structured interviews to find repetitive high-volume tasks.",
        opts:[
          { l:"Yes — process mapping completed with automation shortlists",sc:2, s:"Mapped & prioritised", sty:"os-ready"   },
          { l:"General sense of where opportunities are, nothing formal",   sc:1, s:"Informal only",        sty:"os-partial" },
          { l:"No — we haven't approached this systematically yet",         sc:0, s:"Not yet mapped",       sty:"os-gap"     },
        ],
      },
      { cat:"process", catQ:3, catTotal:5,
        text:"How integrated are your existing business systems via APIs?",
        sub:"The more your systems talk to each other, the easier it is to layer AI across them.",
        opts:[
          { l:"Majority of core workflows are API-connected and automated", sc:2, s:"Highly integrated",    sty:"os-ready"   },
          { l:"Mix of API integrations and manual handoffs between systems", sc:1, s:"Partially integrated", sty:"os-partial" },
          { l:"Mostly siloed systems — manual exports and re-entry common",  sc:0, s:"Largely siloed",       sty:"os-gap"     },
        ],
      },
      { cat:"process", catQ:4, catTotal:5,
        text:"Do you have structured processes for capturing unstructured data (emails, PDFs, call transcripts)?",
        sub:"Unstructured data is often where the most value is buried — and where most companies are blind.",
        opts:[
          { l:"Yes — automated ingestion and structuring pipeline in place",sc:2, s:"Structured pipeline", sty:"os-ready"   },
          { l:"Ad hoc — manual extraction for specific use cases only",      sc:1, s:"Ad hoc only",         sty:"os-partial" },
          { l:"No — unstructured data is largely uncaptured",               sc:0, s:"Not captured",         sty:"os-gap"     },
        ],
      },
      { cat:"process", catQ:5, catTotal:5,
        text:"How quickly can your organization deploy and adopt a new process or technology?",
        sub:"Change velocity is a strong predictor of AI project success — slow orgs stall during rollout.",
        opts:[
          { l:"Days to weeks — agile with strong change management",            sc:2, s:"High velocity",  sty:"os-ready"   },
          { l:"1–3 months — moderate friction, usually gets there",             sc:1, s:"Moderate",       sty:"os-partial" },
          { l:"3+ months — significant resistance and bureaucratic bottlenecks", sc:0, s:"Slow adoption", sty:"os-gap"     },
        ],
      },
      // ── Data & Infra (6) ─────────────────────────────────────────
      { cat:"data", catQ:1, catTotal:6,
        text:"How would you describe your current data architecture?",
        sub:"The quality of your data architecture directly determines what AI models you can realistically build.",
        opts:[
          { l:"Centralised data warehouse/lake with clean, documented pipelines", sc:2, s:"Modern architecture",      sty:"os-ready"   },
          { l:"Multiple sources, partially consolidated — some duplication",       sc:1, s:"Partially consolidated",  sty:"os-partial" },
          { l:"Siloed data across disconnected, largely legacy systems",           sc:0, s:"Legacy siloes",            sty:"os-gap"     },
        ],
      },
      { cat:"data", catQ:2, catTotal:6,
        text:"What is the overall quality and cleanliness of your production data?",
        sub:"Garbage in, garbage out. AI amplifies data quality issues — it doesn't fix them.",
        opts:[
          { l:"High quality — regularly audited, deduplicated, well-labelled",        sc:2, s:"High quality",    sty:"os-ready"   },
          { l:"Moderate — functional with known gaps and inconsistencies",             sc:1, s:"Moderate quality",sty:"os-partial" },
          { l:"Poor — significant data quality issues widely acknowledged internally", sc:0, s:"Needs cleanup",   sty:"os-gap"     },
        ],
      },
      { cat:"data", catQ:3, catTotal:6,
        text:"Do you have real-time or near-real-time data pipelines feeding your core systems?",
        sub:"Many high-value AI use cases (fraud detection, recommendations, ops alerts) require low-latency data.",
        opts:[
          { l:"Yes — real-time streaming with event-driven architecture",      sc:2, s:"Real-time ready", sty:"os-ready"   },
          { l:"Batch processing (hourly/daily) — near real-time at best",      sc:1, s:"Batch pipelines", sty:"os-partial" },
          { l:"Manual data exports and imports — no automated pipelines",       sc:0, s:"Manual only",     sty:"os-gap"     },
        ],
      },
      { cat:"data", catQ:4, catTotal:6,
        text:"How mature is your cloud infrastructure?",
        sub:"Cloud maturity determines how quickly you can provision, scale, and iterate on AI systems.",
        opts:[
          { l:"Cloud-native — IaC, containerisation, auto-scaling in place", sc:2, s:"Cloud-native",     sty:"os-ready"   },
          { l:"Partial cloud migration — hybrid on-prem/cloud setup",         sc:1, s:"Hybrid setup",     sty:"os-partial" },
          { l:"Primarily on-premise with minimal cloud adoption",             sc:0, s:"On-premise heavy", sty:"os-gap"     },
        ],
      },
      { cat:"data", catQ:5, catTotal:6,
        text:"Do you have AI or ML models currently in production?",
        sub:"Prior production experience significantly accelerates future deployments.",
        opts:[
          { l:"Yes — multiple models in production with monitoring and retraining", sc:2, s:"AI in production",   sty:"os-ready"   },
          { l:"Experimental or PoC stage — nothing in production yet",              sc:1, s:"Experimental stage", sty:"os-partial" },
          { l:"No AI/ML in production — starting from scratch",                     sc:0, s:"Starting fresh",     sty:"os-gap"     },
        ],
      },
      { cat:"data", catQ:6, catTotal:6,
        text:"How robust is your internal API layer?",
        sub:"AI agents need to call tools and systems. No APIs = manual integration work before anything else.",
        opts:[
          { l:"Comprehensive REST/GraphQL APIs across all core systems", sc:2, s:"Strong API layer", sty:"os-ready"   },
          { l:"Some APIs alongside legacy point-to-point integrations",  sc:1, s:"Partial APIs",     sty:"os-partial" },
          { l:"Limited or no internal APIs — mostly file or manual-based",sc:0, s:"Needs API work",  sty:"os-gap"     },
        ],
      },
      // ── Team (5) ─────────────────────────────────────────────────
      { cat:"team", catQ:1, catTotal:5,
        text:"Does your engineering team have hands-on AI/ML experience?",
        sub:"Internal expertise dramatically reduces dependency on external vendors and speeds up iteration.",
        opts:[
          { l:"Yes — dedicated ML engineers or strong cross-team AI skills", sc:2, s:"Strong AI skills", sty:"os-ready"   },
          { l:"Some familiarity — mostly self-taught, no dedicated AI roles", sc:1, s:"Emerging skills",  sty:"os-partial" },
          { l:"No current AI/ML experience on the engineering team",          sc:0, s:"Gap to close",     sty:"os-gap"     },
        ],
      },
      { cat:"team", catQ:2, catTotal:5,
        text:"How does your leadership team view AI as a business priority right now?",
        sub:"Leadership alignment is the #1 predictor of whether AI projects get the resources and patience they need.",
        opts:[
          { l:"Champion — actively driving AI investment and strategy at board level", sc:2, s:"Strong champion", sty:"os-ready"   },
          { l:"Supportive but cautious — waiting for clear ROI proof",                sc:1, s:"Cautiously open",  sty:"os-partial" },
          { l:"Skeptical — needs significant internal selling",                        sc:0, s:"Needs alignment",  sty:"os-gap"     },
        ],
      },
      { cat:"team", catQ:3, catTotal:5,
        text:"Do you have a named executive sponsor and dedicated budget for AI initiatives?",
        sub:"Projects without a named owner and ring-fenced budget are the first to stall.",
        opts:[
          { l:"Yes — named sponsor with ring-fenced AI budget ($50K+)",      sc:2, s:"Funded & owned", sty:"os-ready"   },
          { l:"Loose allocation — general innovation budget, no clear owner", sc:1, s:"Loosely funded", sty:"os-partial" },
          { l:"No formal ownership and no dedicated budget yet",              sc:0, s:"No owner yet",   sty:"os-gap"     },
        ],
      },
      { cat:"team", catQ:4, catTotal:5,
        text:"How would you rate your organization's change management capability?",
        sub:"AI projects don't fail in the code — they fail in the adoption. Change management is technical risk.",
        opts:[
          { l:"Strong — track record of successful major technology transitions", sc:2, s:"Proven change mgmt",  sty:"os-ready"   },
          { l:"Moderate — change happens but with noticeable friction",           sc:1, s:"Moderate capability", sty:"os-partial" },
          { l:"Weak — previous technology changes caused significant disruption", sc:0, s:"Change is hard here", sty:"os-gap"     },
        ],
      },
      { cat:"team", catQ:5, catTotal:5,
        text:"Do you have data privacy and compliance expertise in-house?",
        sub:"GDPR, HIPAA, AI Act — compliance gaps are the most common cause of delayed or cancelled AI launches.",
        opts:[
          { l:"Yes — dedicated legal/compliance covering AI and data regulations",  sc:2, s:"Compliance covered",   sty:"os-ready"   },
          { l:"Shared responsibility — some external counsel, partially informal",  sc:1, s:"Partial coverage",      sty:"os-partial" },
          { l:"Rely entirely on external counsel — no in-house AI/data expertise",  sc:0, s:"External dependency",   sty:"os-gap"     },
        ],
      },
      // ── Budget (4) ───────────────────────────────────────────────
      { cat:"budget", catQ:1, catTotal:4,
        text:"Do you have a defined AI budget for the next 12 months?",
        sub:"Vague intentions don't become AI systems. A specific budget signals genuine organisational commitment.",
        opts:[
          { l:"Yes — specific AI budget line item ($50K+ allocated)",         sc:2, s:"Budget confirmed", sty:"os-ready"   },
          { l:"General innovation/R&D budget that could be directed to AI",   sc:1, s:"Indirect budget",  sty:"os-partial" },
          { l:"No dedicated budget allocated yet",                            sc:0, s:"No budget yet",    sty:"os-gap"     },
        ],
      },
      { cat:"budget", catQ:2, catTotal:4,
        text:"Have you modelled ROI scenarios for potential AI initiatives?",
        sub:"Concrete ROI models keep projects alive through the 'it's harder than expected' phase.",
        opts:[
          { l:"Yes — detailed models with defined KPIs and baseline metrics", sc:2, s:"ROI modelled",    sty:"os-ready"   },
          { l:"Rough estimates only — no formal analysis",                    sc:1, s:"Rough estimates", sty:"os-partial" },
          { l:"No ROI analysis completed at all",                             sc:0, s:"No model yet",    sty:"os-gap"     },
        ],
      },
      { cat:"budget", catQ:3, catTotal:4,
        text:"What is your expected timeline to see measurable results from AI investment?",
        sub:"Expectations that are misaligned with reality are the leading cause of cancelled AI projects.",
        opts:[
          { l:"3–6 months — focused on quick wins and fast validation",    sc:2, s:"Realistic timeline", sty:"os-ready"   },
          { l:"6–12 months — willing to invest for medium-term returns",   sc:1, s:"Medium horizon",     sty:"os-partial" },
          { l:"12–24 months — treating this as a long-term strategic bet", sc:0, s:"Long horizon",       sty:"os-gap"     },
        ],
      },
      { cat:"budget", catQ:4, catTotal:4,
        text:"Do you have existing enterprise AI vendor relationships or platform agreements?",
        sub:"Existing agreements (Azure AI, AWS Bedrock, Google Cloud AI) speed up procurement and reduce cost.",
        opts:[
          { l:"Yes — established agreements with major AI cloud providers",   sc:2, s:"Vendor ready",   sty:"os-ready"   },
          { l:"Actively evaluating options — no commitments yet",             sc:1, s:"Evaluating",     sty:"os-partial" },
          { l:"Starting from scratch with no vendor conversations initiated", sc:0, s:"No vendors yet", sty:"os-gap"     },
        ],
      },
    ],
  },

  smb: {
    label:  "SMB Owner / Founder",
    totalQ: 16,
    categories: {
      process: { label: "Business Process", icon: "⚙️", max: 8 },
      data:    { label: "Data & Tools",     icon: "🗄️", max: 8 },
      team:    { label: "Team Readiness",   icon: "👥", max: 8 },
      budget:  { label: "Budget & ROI",     icon: "💰", max: 8 },
    },
    questions: [
      // ── Process (4) ──────────────────────────────────────────────
      { cat:"process", catQ:1, catTotal:4,
        text:"How well are your key business processes written down and documented?",
        sub:"AI works best when it automates what's already clear. Undocumented processes = unpredictable AI.",
        opts:[
          { l:"Most processes are clearly written — new staff can follow them", sc:2, s:"Well documented",      sty:"os-ready"   },
          { l:"Some are written down, others rely on experience and habit",      sc:1, s:"Partially documented", sty:"os-partial" },
          { l:"Mostly in people's heads — we rely on whoever knows how",        sc:0, s:"Needs documentation",  sty:"os-gap"     },
        ],
      },
      { cat:"process", catQ:2, catTotal:4,
        text:"Can you clearly identify the 2–3 tasks where your team loses the most time every week?",
        sub:"Knowing your biggest time drains is the first step to knowing where AI creates real ROI.",
        opts:[
          { l:"Yes — I know exactly which tasks and roughly how long they take", sc:2, s:"Clear visibility", sty:"os-ready"   },
          { l:"I have a rough idea but nothing measured precisely",              sc:1, s:"Rough sense only",  sty:"os-partial" },
          { l:"Not really — I haven't mapped this out yet",                     sc:0, s:"Not yet measured",  sty:"os-gap"     },
        ],
      },
      { cat:"process", catQ:3, catTotal:4,
        text:"What tools does your team use to run the business day-to-day?",
        sub:"Businesses using purpose-built software are far easier to add AI into than those relying on email and spreadsheets.",
        opts:[
          { l:"Dedicated software across most areas (CRM, scheduling, accounting, etc.)", sc:2, s:"Good tool stack",  sty:"os-ready"   },
          { l:"Mix of dedicated tools and spreadsheets — inconsistent adoption",           sc:1, s:"Mixed stack",      sty:"os-partial" },
          { l:"Mostly spreadsheets, email, and paper — minimal dedicated software",        sc:0, s:"Basic tools only", sty:"os-gap"     },
        ],
      },
      { cat:"process", catQ:4, catTotal:4,
        text:"Can you track your business performance with actual data and reports?",
        sub:"If you can't measure it now, you won't be able to prove AI is working for you later.",
        opts:[
          { l:"Yes — I have dashboards or reports I review regularly", sc:2, s:"Data-driven",       sty:"os-ready"   },
          { l:"With effort — I can pull numbers but it takes time",     sc:1, s:"Sometimes tracked", sty:"os-partial" },
          { l:"Difficult — I mostly rely on gut feel and experience",   sc:0, s:"Gut-feel based",   sty:"os-gap"     },
        ],
      },
      // ── Data (4) ─────────────────────────────────────────────────
      { cat:"data", catQ:1, catTotal:4,
        text:"How organised is the data your business collects?",
        sub:"Customer records, sales data, operations — does it live in one place or scattered everywhere?",
        opts:[
          { l:"Well-organised — stored consistently in one or two main systems", sc:2, s:"Well organised",      sty:"os-ready"   },
          { l:"Partially organised — some in systems, some in spreadsheets",     sc:1, s:"Partially organised", sty:"os-partial" },
          { l:"Scattered — emails, files, notebooks, different people",          sc:0, s:"Disorganised",        sty:"os-gap"     },
        ],
      },
      { cat:"data", catQ:2, catTotal:4,
        text:"Are your current software tools connected to each other?",
        sub:"E.g. your CRM syncs with email, your invoicing links to your accounting. Connected tools enable AI across your whole workflow.",
        opts:[
          { l:"Yes — most tools share data automatically",                   sc:2, s:"Well integrated", sty:"os-ready"   },
          { l:"A few basic connections — mostly still manual data moving",   sc:1, s:"Some connections",sty:"os-partial" },
          { l:"No — each tool is completely separate and data is re-entered",sc:0, s:"No integration",  sty:"os-gap"     },
        ],
      },
      { cat:"data", catQ:3, catTotal:4,
        text:"How comfortable is your team with learning and adopting new software?",
        sub:"AI tool success depends almost entirely on team adoption — a resistant team will underuse any tool you buy.",
        opts:[
          { l:"Very comfortable — we pick up new tools quickly as a team",   sc:2, s:"Tech-comfortable", sty:"os-ready"   },
          { l:"Mixed — some people adapt quickly, others need a lot of help", sc:1, s:"Mixed comfort",    sty:"os-partial" },
          { l:"It's a challenge — technology adoption takes a long time",    sc:0, s:"Slow adopters",    sty:"os-gap"     },
        ],
      },
      { cat:"data", catQ:4, catTotal:4,
        text:"Is your business data backed up regularly and reliably?",
        sub:"AI tools work on your data. If your data isn't safe, no AI investment is either.",
        opts:[
          { l:"Yes — automated backups with a tested recovery process", sc:2, s:"Properly backed up",  sty:"os-ready"   },
          { l:"Sometimes — not a formal or consistent process",          sc:1, s:"Inconsistent backup", sty:"os-partial" },
          { l:"Not reliably — this is something we know we should fix",  sc:0, s:"Not backed up",       sty:"os-gap"     },
        ],
      },
      // ── Team (4) ─────────────────────────────────────────────────
      { cat:"team", catQ:1, catTotal:4,
        text:"How does your leadership feel about adopting AI in the business?",
        sub:"AI adoption requires a decision-maker willing to champion the change. Without buy-in, tools don't get used.",
        opts:[
          { l:"Excited — I'm actively exploring and want to move fast",     sc:2, s:"Strong buy-in",   sty:"os-ready"   },
          { l:"Open but cautious — I want to see proof before committing",  sc:1, s:"Cautiously open",  sty:"os-partial" },
          { l:"Skeptical — I'll need a very compelling case before acting", sc:0, s:"Needs convincing", sty:"os-gap"     },
        ],
      },
      { cat:"team", catQ:2, catTotal:4,
        text:"Have any of your team members already used AI tools (like ChatGPT) for work?",
        sub:"Teams with any AI exposure adopt new tools 3× faster than those with none.",
        opts:[
          { l:"Yes, regularly — AI is already part of how some of us work", sc:2, s:"Already using AI", sty:"os-ready"   },
          { l:"A few people have tried it casually",                         sc:1, s:"Some exposure",    sty:"os-partial" },
          { l:"No — we haven't really explored AI tools yet",               sc:0, s:"No exposure yet",  sty:"os-gap"     },
        ],
      },
      { cat:"team", catQ:3, catTotal:4,
        text:"Do you have someone on your team who could lead and manage an AI tool rollout?",
        sub:"Every successful AI implementation has an internal champion. It doesn't need to be a technical person.",
        opts:[
          { l:"Yes — I have someone with the time, curiosity, and trust of the team", sc:2, s:"Champion ready",      sty:"os-ready"   },
          { l:"Maybe — with some training and clear direction, someone could step up", sc:1, s:"Potential champion",  sty:"os-partial" },
          { l:"No — we'd need outside help to implement and maintain this",            sc:0, s:"No internal champion",sty:"os-gap"     },
        ],
      },
      { cat:"team", catQ:4, catTotal:4,
        text:"When you've introduced new tools or processes before, how has your team responded?",
        sub:"Past behaviour predicts future adoption. Honest answer here is the most useful.",
        opts:[
          { l:"Well — most people adapted quickly and we saw fast adoption",     sc:2, s:"Strong adoption history", sty:"os-ready"   },
          { l:"Mixed — we got there eventually but with pushback",               sc:1, s:"Slow but gets there",     sty:"os-partial" },
          { l:"Poorly — past changes caused confusion, frustration, or failure", sc:0, s:"Adoption challenges",     sty:"os-gap"     },
        ],
      },
      // ── Budget (4) ───────────────────────────────────────────────
      { cat:"budget", catQ:1, catTotal:4,
        text:"Do you have budget available for AI tools or consulting in the next 6–12 months?",
        sub:"No budget = no implementation. Even low-cost AI pilots need time and money to trial properly.",
        opts:[
          { l:"Yes — I have budget set aside ($5,000+)",                        sc:2, s:"Budget ready",      sty:"os-ready"   },
          { l:"Possibly — if the ROI case is compelling enough to justify it",  sc:1, s:"Conditional budget", sty:"os-partial" },
          { l:"Not currently — budget is very tight right now",                 sc:0, s:"No budget now",      sty:"os-gap"     },
        ],
      },
      { cat:"budget", catQ:2, catTotal:4,
        text:"How clear are you on what 'success' would look like from an AI investment?",
        sub:"The clearer your success criteria, the easier it is to pick the right AI tool and prove ROI.",
        opts:[
          { l:"Very clear — I know the specific metrics I'd want to improve",  sc:2, s:"Clear success criteria", sty:"os-ready"   },
          { l:"Somewhat clear — I have general goals but no specific targets",  sc:1, s:"General goals",           sty:"os-partial" },
          { l:"Not clear — I'm still unsure what AI would actually do for us", sc:0, s:"Unclear goals",           sty:"os-gap"     },
        ],
      },
      { cat:"budget", catQ:3, catTotal:4,
        text:"How urgent is solving your key operational challenges right now?",
        sub:"Urgency drives implementation. If things are 'fine', AI adoption tends to stay on the to-do list forever.",
        opts:[
          { l:"Very urgent — these problems are costing us revenue or customers now", sc:2, s:"High urgency",    sty:"os-ready"   },
          { l:"Moderately — it's a real problem but not a crisis",                    sc:1, s:"Moderate urgency", sty:"os-partial" },
          { l:"Not urgently — things are working well enough for now",               sc:0, s:"Low urgency",      sty:"os-gap"     },
        ],
      },
      { cat:"budget", catQ:4, catTotal:4,
        text:"Have you researched what AI tools or consulting actually costs for businesses like yours?",
        sub:"Without a cost benchmark, budget conversations can't happen meaningfully.",
        opts:[
          { l:"Yes — I have a rough sense of pricing and what's available",        sc:2, s:"Cost awareness",  sty:"os-ready"   },
          { l:"A little — I've seen some figures but haven't done deep research",  sc:1, s:"Some awareness",  sty:"os-partial" },
          { l:"No — I don't have a clear picture of what it costs",               sc:0, s:"No cost picture", sty:"os-gap"     },
        ],
      },
    ],
  },
};

const TIERS: Record<RoleKey, Tier[]> = {
  cto: [
    { min:80, label:"AI-Ready",                color:"#2dd4a0",
      title:"Your Infrastructure Can Support AI Now",
      desc:"Your organisation has the technical foundations, data maturity, and leadership alignment to move fast. The risk now isn't capability — it's focus. Identify your highest-ROI use case and ship a pilot within 90 days. The window to get ahead of competitors who are still 'evaluating' is narrowing." },
    { min:60, label:"Approaching Ready",        color:"#f5c842",
      title:"Strong Foundations — A Few Critical Gaps",
      desc:"You're close. Your data infrastructure or talent layer needs targeted attention before you scale. Two or three specific blockers are preventing a clean deployment. A focused audit can surface exactly where to invest next to unlock your readiness." },
    { min:40, label:"Foundational Work Needed", color:"#f07422",
      title:"Your AI Ambitions Are Ahead of Your Infrastructure",
      desc:"The risk of building on the current foundation is compounding technical debt that's expensive to unwind. Investing 3–6 months in data quality, API connectivity, or team capability now will make every subsequent AI dollar 3× more effective." },
    { min:0,  label:"Not Yet Ready",            color:"#f05252",
      title:"Significant Gaps Across Multiple Dimensions",
      desc:"Jumping into AI implementation at this stage leads to failed deployments, wasted budget, and organisational frustration. The good news: every gap flagged below is fixable. Susea can help you build a realistic 12-month readiness roadmap that sequences the work correctly." },
  ],
  smb: [
    { min:80, label:"AI-Ready",               color:"#2dd4a0",
      title:"You're Better Prepared Than Most SMBs",
      desc:"You have documented processes, organised data, and a team that can adopt new tools — the three ingredients AI needs to actually work. Your next step is identifying the 1–2 workflows where AI delivers the fastest, most measurable ROI. Don't try to automate everything at once — start focused, prove it, then scale." },
    { min:60, label:"Almost There",            color:"#f5c842",
      title:"Close — A Few Specific Gaps to Address First",
      desc:"You're closer than you think. Likely 1–2 specific things — how your data is organised or your team's familiarity with AI tools — are the main gaps between you and a successful rollout. These can be fixed in 4–8 weeks without a large investment." },
    { min:40, label:"Foundational Work First", color:"#f07422",
      title:"The Conditions Aren't Quite Right Yet",
      desc:"AI could genuinely transform your business, but investing in tools right now would likely frustrate your team and underdeliver on results. Focus on the specific gaps flagged below first — most can be addressed cheaply and quickly — and you'll be in a much stronger position in 60–90 days." },
    { min:0,  label:"Not Yet Ready",           color:"#f05252",
      title:"Build the Foundation Before Buying the Technology",
      desc:"AI isn't the priority right now — and that's actually a useful answer. Documenting your processes, organising your data, and getting the right basic software tools in place will make any future AI investment 5× more effective. Susea can give you a clear, low-cost action plan to get there." },
  ],
};

const RECS: Record<RoleKey, Record<Category, Rec>> = {
  cto: {
    process: {
      icon:"⚙️", color:"rgba(167,139,250,.12)",
      title:"Document Before You Automate",
      desc:"Undocumented workflows produce inconsistent training data and unpredictable AI agent behaviour. Dedicate 2 weeks to mapping your top 5 automation candidates before touching any AI tooling.",
    },
    data: {
      icon:"🗄️", color:"rgba(107,163,232,.12)",
      title:"Data Quality Is Your #1 AI Risk Factor",
      desc:"Data quality is the single strongest predictor of AI project success or failure. Run a data audit this quarter — prioritise deduplication, schema consistency, and pipeline reliability before any model work begins.",
    },
    team: {
      icon:"👥", color:"rgba(45,212,160,.12)",
      title:"Hire or Train an Internal AI Champion",
      desc:"Without internal AI advocacy and at least one engineer with hands-on ML experience, adoption will stall post-launch. Consider a fractional AI lead or a structured upskilling programme for your senior engineers.",
    },
    budget: {
      icon:"💰", color:"rgba(245,200,66,.1)",
      title:"Define ROI Metrics Before the First Sprint",
      desc:"An unclear ROI framework leads to scope creep, misaligned stakeholders, and cancelled projects. Define your baseline metrics and success thresholds now — they'll protect the initiative when it gets hard.",
    },
  },
  smb: {
    process: {
      icon:"⚙️", color:"rgba(167,139,250,.12)",
      title:"Write Down Your Top 3 Processes First",
      desc:"Before any AI tool, spend one afternoon documenting your 3 most time-consuming weekly processes. Even a simple step-by-step list in a Google Doc is enough. AI automates what's defined — it can't fix what's still in people's heads.",
    },
    data: {
      icon:"🗄️", color:"rgba(107,163,232,.12)",
      title:"Consolidate Your Data Into One Place",
      desc:"Pick one system (even a well-structured spreadsheet) to be your source of truth for customer or operations data. Consolidating first takes 2–4 weeks and makes every AI tool you try afterwards 3× more effective.",
    },
    team: {
      icon:"👥", color:"rgba(45,212,160,.12)",
      title:"Find Your Internal AI Champion",
      desc:"Identify one person on your team who is curious, tech-comfortable, and respected by others. Give them 2 hours a week to explore AI tools. They don't need to be technical — just willing to experiment and report back.",
    },
    budget: {
      icon:"💰", color:"rgba(245,200,66,.1)",
      title:"Start With Free Tools to Build Internal Confidence",
      desc:"You don't need a big budget to start. Tools like ChatGPT ($0–$20/month), Zapier (free tier), and Make.com can automate real workflows today. Prove ROI on small wins before committing to anything larger.",
    },
  },
};

// ─── Component ────────────────────────────────────────────────────────────────

export default function ScorecardTool() {
  const [screen,      setScreen]      = useState<Screen>("intro");
  const [role,        setRole]        = useState<RoleKey | null>(null);
  const [currentQ,    setCurrentQ]    = useState(0);
  const [answers,     setAnswers]     = useState<(number | null)[]>([]);
  const [emailInput,  setEmailInput]  = useState("");
  const [emailError,  setEmailError]  = useState("");
  const [animKey,     setAnimKey]     = useState(0);
  const [scoreOffset, setScoreOffset] = useState(CIRC);
  const [scoreColor,  setScoreColor]  = useState("#6BA3E8");
  const [barsReady,   setBarsReady]   = useState(false);
  const [score,       setScore]       = useState(0);
  const [catScores,   setCatScores]   = useState<Record<Category, number>>({ process: 0, data: 0, team: 0, budget: 0 });
  const [tier,        setTier]        = useState<Tier | null>(null);

  const pendingAdvance = useRef<ReturnType<typeof setTimeout> | null>(null);

  const accentColor   = role === "smb" ? "#E8650A" : "#6BA3E8";
  const accentDkColor = role === "smb" ? "#b84e08" : "#2B5BA8";
  const totalQ        = role ? PATHS[role].totalQ : 0;
  const answeredCount = answers.filter(a => a !== null).length;

  const progressPct =
    screen === "results"  ? 100 :
    screen === "email"    ? 95  :
    screen === "question" ? Math.round((answeredCount / totalQ) * 100) : 0;

  // Animate results ring + bars after results screen mounts
  useEffect(() => {
    if (screen !== "results" || !tier) return;
    const t1 = setTimeout(() => {
      setScoreOffset(CIRC - (score / 100) * CIRC);
      setScoreColor(tier.color);
    }, 200);
    const t2 = setTimeout(() => setBarsReady(true), 350);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [screen, score, tier]);

  // ── Helpers ───────────────────────────────────────────────────────────────

  function computeScore(): number {
    if (!role) return 0;
    const total = answers.reduce<number>((s, a) => s + (a ?? 0), 0);
    return Math.round((total / (PATHS[role].totalQ * 2)) * 100);
  }

  function computeCatScores(): Record<Category, number> {
    if (!role) return { process: 0, data: 0, team: 0, budget: 0 };
    const path = PATHS[role];
    const sums: Record<Category, number> = { process: 0, data: 0, team: 0, budget: 0 };
    path.questions.forEach((q, i) => { sums[q.cat] += answers[i] ?? 0; });
    return {
      process: Math.round((sums.process / path.categories.process.max) * 100),
      data:    Math.round((sums.data    / path.categories.data.max)    * 100),
      team:    Math.round((sums.team    / path.categories.team.max)    * 100),
      budget:  Math.round((sums.budget  / path.categories.budget.max)  * 100),
    };
  }

  function findTier(s: number, r: RoleKey): Tier {
    return TIERS[r].find(t => s >= t.min) ?? TIERS[r][TIERS[r].length - 1];
  }

  function getWeakCats(): Category[] {
    return (Object.entries(catScores) as [Category, number][])
      .sort(([, a], [, b]) => a - b)
      .slice(0, 3)
      .map(([k]) => k);
  }

  // ── Navigation ────────────────────────────────────────────────────────────

  function handleSelectRole(r: RoleKey) {
    setRole(r);
    setAnswers(new Array(PATHS[r].totalQ).fill(null));
    setCurrentQ(0);
    setAnimKey(k => k + 1);
    setScreen("question");
  }

  function selectAnswer(sc: number) {
    const next = [...answers];
    next[currentQ] = sc;
    setAnswers(next);
    if (pendingAdvance.current) clearTimeout(pendingAdvance.current);
    pendingAdvance.current = setTimeout(() => {
      pendingAdvance.current = null;
      if (currentQ < totalQ - 1) {
        setCurrentQ(q => q + 1);
        setAnimKey(k => k + 1);
      } else {
        setScreen("email");
      }
    }, 420);
  }

  function goNext() {
    if (answers[currentQ] === null) return;
    if (currentQ < totalQ - 1) {
      setCurrentQ(q => q + 1);
      setAnimKey(k => k + 1);
    } else {
      setScreen("email");
    }
  }

  function goBack() {
    if (currentQ > 0) {
      setCurrentQ(q => q - 1);
      setAnimKey(k => k + 1);
    }
  }

  function unlockResults() {
    const val = emailInput.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
      setEmailError("Please enter a valid email address.");
      return;
    }
    setEmailError("");
    fetch("/api/capture-lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: val, role, score: computeScore(), source: "AI_Readiness_Scorecard" }),
    }).catch(console.error);

    const s  = computeScore();
    const cs = computeCatScores();
    const t  = findTier(s, role!);
    setScore(s);
    setCatScores(cs);
    setTier(t);
    setScoreOffset(CIRC);
    setBarsReady(false);
    setScreen("results");
  }

  // ── Derived for current question ─────────────────────────────────────────

  const currentQuestion = role ? PATHS[role].questions[currentQ] : null;
  const catCfg = currentQuestion && role ? PATHS[role].categories[currentQuestion.cat] : null;
  const isLastQ = currentQ === totalQ - 1;

  // Blurred preview score on email gate
  const previewScore = role
    ? Math.round((answers.reduce<number>((s, a) => s + (a ?? 0), 0) / (PATHS[role].totalQ * 2)) * 100)
    : 74;

  // Today's date for results strip
  const today = new Date().toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <>
      {/* Ambient glows */}
      <div className="fixed -top-[300px] -left-[200px] w-[700px] h-[700px] rounded-full pointer-events-none z-0" style={{ background: "radial-gradient(circle,rgba(43,91,168,.14) 0%,transparent 65%)" }} />
      <div className="fixed -bottom-[250px] -right-[150px] w-[600px] h-[600px] rounded-full pointer-events-none z-0" style={{ background: "radial-gradient(circle,rgba(232,101,10,.09) 0%,transparent 65%)" }} />

      {/* Progress bar */}
      <div className="fixed top-0 left-0 right-0 h-[2px] z-[200] bg-[rgba(255,255,255,0.04)]">
        <div
          className="h-full transition-[width] duration-500 ease-in-out"
          style={{ width: `${progressPct}%`, background: GRAD, boxShadow: "0 0 14px rgba(107,163,232,.7)" }}
        />
      </div>

      {/* ═══ INTRO ════════════════════════════════════════════════════ */}
      {screen === "intro" && (
        <div className="min-h-screen flex flex-col items-center justify-center text-center px-6 pt-[110px] pb-20">
          <div className={clsx(styles.fadeUp, "inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.14em] uppercase text-[#6BA3E8] border border-[rgba(107,163,232,0.22)] bg-[rgba(107,163,232,0.06)] px-[18px] py-1.5 rounded-full mb-8")}>
            <span className={clsx(styles.blink, "w-1.5 h-1.5 rounded-full bg-[#E8650A] flex-shrink-0")} />
            Free Assessment · Built by Susea.ai
          </div>

          <h1 className={clsx(styles.fadeUp1, "text-[clamp(38px,6vw,76px)] font-extrabold leading-[1.05] tracking-[-0.035em] mb-[22px]")}>
            Are You Actually<br />
            <span className="signature-text-gradient">Ready for AI?</span>
          </h1>

          <p className={clsx(styles.fadeUp2, "text-lg text-[#8b89a0] max-w-[580px] mx-auto leading-[1.7] mb-[52px]")}>
            A tailored self-assessment for both technical leaders and business owners. Get an honest readiness score across four critical dimensions — in under 4 minutes.
          </p>

          <div className={clsx(styles.fadeUp3, "flex border border-[rgba(255,255,255,0.11)] rounded-[14px] overflow-hidden max-w-[640px] w-full mx-auto mb-[52px]")}>
            {[
              { icon: "⚙️", title: "Business Process",   sub: "Workflows & Automation" },
              { icon: "🗄️", title: "Data & Technology",  sub: "Infrastructure Maturity" },
              { icon: "👥", title: "Team & Talent",       sub: "Skills & Leadership" },
              { icon: "💰", title: "Budget & ROI",        sub: "Investment Clarity" },
            ].map((p, i) => (
              <div key={i} className="flex-1 py-[22px] px-3.5 text-center bg-[#111118] border-r border-[rgba(255,255,255,0.06)] last:border-r-0">
                <span className="block text-[22px] mb-2">{p.icon}</span>
                <span className="block text-[13px] font-bold text-[#e8e6f0] mb-1">{p.title}</span>
                <span className="block font-mono text-[11px] text-[#4a4860] uppercase tracking-[0.04em]">{p.sub}</span>
              </div>
            ))}
          </div>

          <button
            onClick={() => setScreen("role")}
            className={clsx(styles.fadeUp4, "inline-flex items-center gap-2.5 text-white font-bold text-base px-10 py-4 rounded-xl border-none cursor-pointer transition-all hover:opacity-90 hover:-translate-y-0.5 active:translate-y-0")}
            style={{ background: GRAD, boxShadow: "0 8px 32px rgba(43,91,168,0.3)" }}
          >
            Choose Your Path <span className="transition-transform group-hover:translate-x-1">→</span>
          </button>
          <p className={clsx(styles.fadeUp5, "mt-4 text-xs text-[#4a4860]")}>
            Tailored paths for Technical Leaders &amp; SMB Owners · Email-gated results · Free forever
          </p>
        </div>
      )}

      {/* ═══ ROLE SELECTION ══════════════════════════════════════════ */}
      {screen === "role" && (
        <div className="min-h-screen flex flex-col items-center justify-center px-6 pt-[100px] pb-20">
          <div className="w-full max-w-[780px]">
            <div className="text-center mb-12">
              <h2 className="text-[clamp(24px,4vw,40px)] font-extrabold tracking-[-0.025em] mb-3">
                Who Are You Taking<br />This Assessment As?
              </h2>
              <p className="text-base text-[#8b89a0] leading-[1.6]">
                Your path is tailored to your role — different questions, language, and recommendations.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* CTO Card */}
              <div
                onClick={() => handleSelectRole("cto")}
                className="bg-[#111118] border border-[rgba(255,255,255,0.11)] rounded-[18px] p-8 text-left cursor-pointer transition-all hover:-translate-y-1 hover:border-[rgba(107,163,232,0.4)] hover:bg-[rgba(43,91,168,0.06)]"
              >
                <span className="inline-flex items-center gap-1.5 font-mono text-[10px] tracking-[0.1em] uppercase text-[#6BA3E8] border border-[rgba(107,163,232,0.3)] bg-[rgba(107,163,232,0.08)] px-3 py-1 rounded-full mb-5">
                  Technical Leader · 20 Questions
                </span>
                <div className="text-4xl mb-4">🧑‍💻</div>
                <div className="text-[22px] font-extrabold tracking-[-0.02em] mb-2 leading-snug">CTO / COO /<br />Technical Leader</div>
                <p className="text-sm text-[#8b89a0] leading-[1.6] mb-6">
                  For engineering leaders, heads of product, or operations executives evaluating AI investment and infrastructure readiness.
                </p>
                <ul className="flex flex-col gap-2 mb-7 list-none">
                  {["Data architecture & pipeline maturity","API layer, cloud infra & ML readiness","Engineering team AI capability gaps","ROI modelling & vendor strategy"].map((item, i) => (
                    <li key={i} className="flex items-center gap-2.5 text-[13px] text-[#8b89a0]">
                      <span className="w-[18px] h-[18px] rounded-full bg-[rgba(107,163,232,0.15)] text-[#6BA3E8] flex items-center justify-center text-[10px] font-bold flex-shrink-0">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
                <button type="button" className="w-full flex items-center justify-center gap-2 font-bold text-sm py-3 px-5 rounded-[10px] transition-all bg-[rgba(107,163,232,0.15)] text-[#6BA3E8] hover:bg-[rgba(107,163,232,0.25)]">
                  Start CTO Assessment →
                </button>
              </div>

              {/* SMB Card */}
              <div
                onClick={() => handleSelectRole("smb")}
                className="bg-[#111118] border border-[rgba(255,255,255,0.11)] rounded-[18px] p-8 text-left cursor-pointer transition-all hover:-translate-y-1 hover:border-[rgba(232,101,10,0.4)] hover:bg-[rgba(232,101,10,0.05)]"
              >
                <span className="inline-flex items-center gap-1.5 font-mono text-[10px] tracking-[0.1em] uppercase text-[#E8650A] border border-[rgba(232,101,10,0.3)] bg-[rgba(232,101,10,0.08)] px-3 py-1 rounded-full mb-5">
                  Business Owner · 16 Questions
                </span>
                <div className="text-4xl mb-4">🏢</div>
                <div className="text-[22px] font-extrabold tracking-[-0.02em] mb-2 leading-snug">SMB Owner /<br />Founder / Manager</div>
                <p className="text-sm text-[#8b89a0] leading-[1.6] mb-6">
                  For business owners and founders who want to know if AI can actually help their business — and whether they&apos;re ready to implement it right now.
                </p>
                <ul className="flex flex-col gap-2 mb-7 list-none">
                  {["Process documentation & time sinks","Data organization & tool stack","Team openness & change readiness","Budget clarity & ROI expectations"].map((item, i) => (
                    <li key={i} className="flex items-center gap-2.5 text-[13px] text-[#8b89a0]">
                      <span className="w-[18px] h-[18px] rounded-full bg-[rgba(232,101,10,0.12)] text-[#E8650A] flex items-center justify-center text-[10px] font-bold flex-shrink-0">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
                <button type="button" className="w-full flex items-center justify-center gap-2 font-bold text-sm py-3 px-5 rounded-[10px] transition-all bg-[rgba(232,101,10,0.12)] text-[#E8650A] hover:bg-[rgba(232,101,10,0.22)]">
                  Start SMB Assessment →
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ═══ QUESTION ═════════════════════════════════════════════════ */}
      {screen === "question" && currentQuestion && catCfg && (
        <div className="min-h-screen flex flex-col items-center justify-start px-6 pt-[88px] pb-[60px]">
          <div key={animKey} className={clsx(styles.slideIn, "w-full max-w-[680px]")}>
            {/* Category pill */}
            <div className={clsx("inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.12em] uppercase px-3.5 py-1.5 rounded-full border mb-7", CAT_PILL[currentQuestion.cat])}>
              {catCfg.icon} {catCfg.label}
            </div>

            {/* Meta */}
            <div className="font-mono text-[11px] text-[#4a4860] mb-3.5 tracking-[0.04em]">
              Question {currentQ + 1} of {totalQ} &nbsp;·&nbsp; {catCfg.label} · {currentQuestion.catQ} of {currentQuestion.catTotal}
            </div>

            {/* Question */}
            <div className="text-[clamp(20px,3vw,28px)] font-extrabold leading-[1.2] tracking-[-0.025em] text-[#e8e6f0] mb-2.5">
              {currentQuestion.text}
            </div>
            <div className="text-sm text-[#8b89a0] leading-[1.65] mb-8 pl-3.5 border-l-2 border-[rgba(255,255,255,0.11)]">
              {currentQuestion.sub}
            </div>

            {/* Options */}
            <div className="flex flex-col gap-2.5">
              {currentQuestion.opts.map((opt, i) => {
                const isSelected = answers[currentQ] === opt.sc;
                return (
                  <button
                    key={i}
                    type="button"
                    onClick={() => selectAnswer(opt.sc)}
                    className={clsx(
                      "flex items-start gap-3.5 px-5 py-4 border rounded-xl text-left cursor-pointer transition-all",
                      isSelected
                        ? role === "smb"
                          ? "border-[#E8650A] bg-[rgba(232,101,10,0.07)]"
                          : "border-[#6BA3E8] bg-[rgba(107,163,232,0.07)]"
                        : "border-[rgba(255,255,255,0.11)] bg-[#111118] hover:border-[rgba(107,163,232,0.35)] hover:bg-[#16161f] hover:translate-x-[3px]"
                    )}
                  >
                    <div
                      className="w-5 h-5 rounded-full border-2 flex-shrink-0 mt-0.5 flex items-center justify-center transition-all"
                      style={{
                        borderColor: isSelected ? accentColor : "rgba(255,255,255,0.11)",
                        background:  isSelected ? accentColor : "transparent",
                      }}
                    >
                      {isSelected && <span className="text-black text-[11px] font-extrabold leading-none">✓</span>}
                    </div>
                    <div className="flex-1">
                      <span className="block text-[15px] font-semibold text-[#e8e6f0] leading-[1.4]">{opt.l}</span>
                      <span className="block text-[13px] text-[#8b89a0] mt-1 leading-[1.5]">{opt.s}</span>
                    </div>
                    <span className={clsx("font-mono text-[10px] px-2.5 py-1 rounded-full uppercase tracking-[0.04em] flex-shrink-0 self-start mt-0.5", OPT_BADGE[opt.sty])}>
                      {opt.sty === "os-ready" ? "Ready" : opt.sty === "os-partial" ? "Partial" : "Gap"}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Navigation */}
            <div className="flex gap-3 mt-7 items-center justify-between">
              <button
                type="button"
                onClick={goBack}
                className="flex items-center gap-1.5 bg-transparent border border-[rgba(255,255,255,0.11)] text-[#8b89a0] text-sm px-5 py-[11px] rounded-[10px] cursor-pointer transition-all hover:border-[rgba(255,255,255,0.2)] hover:text-[#e8e6f0]"
                style={{ visibility: currentQ === 0 ? "hidden" : "visible" }}
              >
                ← Back
              </button>
              <button
                type="button"
                onClick={goNext}
                disabled={answers[currentQ] === null}
                className={clsx(
                  "flex items-center gap-2 font-bold text-sm px-6 py-[11px] rounded-[10px] cursor-pointer transition-all border",
                  answers[currentQ] !== null
                    ? "text-white border-transparent opacity-100"
                    : "bg-[#16161f] border-[rgba(255,255,255,0.11)] text-[#8b89a0] opacity-40 pointer-events-none"
                )}
                style={answers[currentQ] !== null ? { background: accentDkColor, borderColor: accentColor } : {}}
              >
                {isLastQ ? "See My Score" : "Next"} →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ═══ EMAIL GATE ═══════════════════════════════════════════════ */}
      {screen === "email" && (
        <div className="min-h-screen flex flex-col items-center justify-center text-center px-6 pt-[88px] pb-[60px]">
          <div className="max-w-[500px] w-full mx-auto">
            <div className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.1em] uppercase text-[#2dd4a0] border border-[rgba(45,212,160,0.25)] bg-[rgba(45,212,160,0.07)] px-[18px] py-[7px] rounded-full mb-8">
              <span className={clsx(styles.blink, "w-[7px] h-[7px] rounded-full bg-[#2dd4a0]")} />
              Assessment Complete
            </div>

            <h2 className="text-[clamp(26px,4vw,44px)] font-extrabold tracking-[-0.03em] leading-[1.1] mb-3.5">
              Your Readiness Score<br />
              <span className="signature-text-gradient">Is Calculated</span>
            </h2>
            <p className="text-base text-[#8b89a0] leading-[1.65] mb-9">
              Enter your email to unlock your full AI Readiness Report — including your score breakdown across all four dimensions and personalised next steps.
            </p>

            {/* Blurred score preview */}
            <div className="flex items-center gap-[18px] px-6 py-[22px] bg-[#111118] border border-[rgba(255,255,255,0.11)] rounded-[14px] mb-8">
              <div
                className="text-[54px] font-extrabold tracking-[-0.04em] select-none"
                style={{ filter: "blur(11px)", background: GRAD, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}
              >
                {previewScore}
              </div>
              <div className="text-left">
                <strong className="block text-[15px] font-bold text-[#e8e6f0] mb-1">Your AI Readiness Score</strong>
                <span className="text-[13px] text-[#8b89a0] leading-[1.5]">Unlock your full report to see exactly where you stand and what to do next.</span>
              </div>
            </div>

            {emailError && <p className="font-mono text-xs text-[#f05252] text-left mb-2.5">{emailError}</p>}

            <div className="flex gap-2.5 mb-3.5">
              <input
                type="email"
                placeholder="your@email.com"
                autoComplete="email"
                value={emailInput}
                onChange={e => setEmailInput(e.target.value)}
                onKeyDown={e => e.key === "Enter" && unlockResults()}
                className="flex-1 bg-[#111118] border border-[rgba(255,255,255,0.11)] rounded-[10px] px-[18px] py-3.5 text-[15px] text-[#e8e6f0] outline-none transition-colors placeholder:text-[#4a4860]"
                style={{ borderColor: emailError ? "#f05252" : undefined }}
              />
              <button
                type="button"
                onClick={unlockResults}
                className="text-white font-bold text-[15px] px-6 py-3.5 rounded-[10px] border-none cursor-pointer whitespace-nowrap transition-all hover:opacity-90 hover:-translate-y-px"
                style={{ background: GRAD, boxShadow: "0 4px 20px rgba(43,91,168,.25)" }}
              >
                Unlock Report →
              </button>
            </div>
            <p className="font-mono text-[11px] text-[#4a4860]">🔒 No spam · Unsubscribe anytime · Used only to send your report</p>
          </div>
        </div>
      )}

      {/* ═══ RESULTS ══════════════════════════════════════════════════ */}
      {screen === "results" && tier && role && (
        <div className="min-h-screen flex flex-col items-center px-6 pt-[100px] pb-24">
          <div className="w-full max-w-[780px]">

            {/* Strip */}
            <div className="flex items-center justify-between px-5 py-3.5 bg-[#111118] border border-[rgba(255,255,255,0.06)] rounded-[10px] mb-10 font-mono text-[11px] text-[#8b89a0] tracking-[0.06em] uppercase flex-wrap gap-2">
              <span>AI Readiness Scorecard</span>
              <span style={{ color: accentColor }}>{PATHS[role].label}</span>
              <span>{today}</span>
            </div>

            {/* Score hero */}
            <div className="flex items-center gap-12 mb-12 flex-wrap">
              {/* SVG ring */}
              <div className="relative w-[200px] h-[200px] flex-shrink-0">
                <svg width="200" height="200" viewBox="0 0 200 200" style={{ transform: "rotate(-90deg)" }}>
                  <circle cx="100" cy="100" r="90" fill="none" stroke="#1d1d28" strokeWidth="12" />
                  <circle
                    cx="100" cy="100" r="90" fill="none"
                    stroke={scoreColor}
                    strokeWidth="12"
                    strokeLinecap="round"
                    strokeDasharray={CIRC}
                    strokeDashoffset={scoreOffset}
                    style={{ transition: "stroke-dashoffset 1.5s cubic-bezier(0.4,0,0.2,1), stroke 0.3s ease" }}
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <div className="text-[52px] font-extrabold tracking-[-0.05em] leading-none" style={{ color: scoreColor }}>{score}</div>
                  <div className="font-mono text-xs text-[#8b89a0] mt-1">/ 100</div>
                </div>
              </div>

              {/* Tier text */}
              <div className="flex-1">
                <div
                  className="inline-block font-mono text-[11px] tracking-[0.12em] uppercase px-3.5 py-[5px] rounded-full border mb-4"
                  style={{ color: tier.color, borderColor: tier.color + "44", background: tier.color + "11" }}
                >
                  {tier.label}
                </div>
                <div className="text-[clamp(22px,3.5vw,34px)] font-extrabold tracking-[-0.025em] mb-3 leading-[1.15]">{tier.title}</div>
                <div className="text-[15px] text-[#8b89a0] leading-[1.7]">{tier.desc}</div>
              </div>
            </div>

            {/* Category scores */}
            <div className="mb-7">
              <div className="font-mono text-[11px] tracking-[0.1em] uppercase text-[#8b89a0] mb-[18px] flex items-center gap-3">
                Score by Category
                <span className="flex-1 h-px bg-[rgba(255,255,255,0.06)]" />
              </div>
              <div className="grid gap-3.5" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(170px, 1fr))" }}>
                {(Object.entries(catScores) as [Category, number][]).map(([cat, pct]) => {
                  const cfg   = PATHS[role].categories[cat];
                  const color = pct >= 75 ? "#2dd4a0" : pct >= 50 ? "#f5c842" : "#f05252";
                  return (
                    <div key={cat} className="bg-[#111118] border border-[rgba(255,255,255,0.06)] rounded-xl px-[18px] py-5 text-center">
                      <div className="text-2xl mb-2.5">{cfg.icon}</div>
                      <div className="font-mono text-[10px] text-[#8b89a0] tracking-[0.08em] uppercase mb-3 leading-[1.4]">{cfg.label}</div>
                      <div className="text-[32px] font-extrabold tracking-[-0.03em] leading-none" style={{ color }}>
                        {pct}<span className="text-[18px] text-[#4a4860]">%</span>
                      </div>
                      <div className="mt-2.5 h-1 bg-[#1d1d28] rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full"
                          style={{ width: barsReady ? `${pct}%` : "0%", background: color, transition: "width 1.1s cubic-bezier(0.4,0,0.2,1)" }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Recommendations */}
            <div className="mb-7">
              <div className="font-mono text-[11px] tracking-[0.1em] uppercase text-[#8b89a0] mb-[18px] flex items-center gap-3">
                Your Priority Actions
                <span className="flex-1 h-px bg-[rgba(255,255,255,0.06)]" />
              </div>
              <div>
                {getWeakCats().map(cat => {
                  const rec = RECS[role][cat];
                  return (
                    <div key={cat} className="flex gap-4 py-[18px] border-b border-[rgba(255,255,255,0.06)] last:border-b-0">
                      <div className="w-9 h-9 rounded-[9px] flex-shrink-0 flex items-center justify-center text-base" style={{ background: rec.color }}>
                        {rec.icon}
                      </div>
                      <div>
                        <div className="text-sm font-bold text-[#e8e6f0] mb-1">{rec.title}</div>
                        <div className="text-[13px] text-[#8b89a0] leading-[1.6]">{rec.desc}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* CTA block */}
            <div className="rounded-2xl border border-[rgba(107,163,232,0.2)] p-10 text-center" style={{ background: "linear-gradient(135deg,rgba(43,91,168,.14) 0%,rgba(232,101,10,.09) 100%)" }}>
              <h3 className="text-[clamp(20px,3vw,28px)] font-extrabold tracking-[-0.02em] mb-2.5">Want Expert Eyes on Your Results?</h3>
              <p className="text-[#8b89a0] text-[15px] leading-[1.65] mb-7 max-w-[500px] mx-auto">
                Our AI strategy team reviews your scorecard and walks you through a customised implementation roadmap — free, no obligation, 20 minutes.
              </p>
              <div className="flex gap-3 justify-center flex-wrap">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 text-white font-bold text-[15px] px-7 py-3.5 rounded-[10px] no-underline transition-all hover:opacity-90 hover:-translate-y-0.5"
                  style={{ background: GRAD, boxShadow: "0 4px 20px rgba(43,91,168,.28)" }}
                >
                  Book Free Strategy Call →
                </Link>
                <Link
                  href="/case-studies"
                  className="inline-flex items-center gap-2 bg-transparent text-[#e8e6f0] text-[15px] font-medium px-7 py-3.5 rounded-[10px] border border-[rgba(255,255,255,0.11)] no-underline transition-all hover:bg-[#111118] hover:border-[rgba(255,255,255,0.2)]"
                >
                  See How We Work
                </Link>
              </div>
              <p className="font-mono text-xs text-[#4a4860] mt-4">Free · 20 minutes · Talk directly with an AI engineer · No pitch, just clarity</p>
            </div>

          </div>
        </div>
      )}
    </>
  );
}
