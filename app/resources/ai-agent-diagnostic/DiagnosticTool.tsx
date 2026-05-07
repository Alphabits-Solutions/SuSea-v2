"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import clsx from "clsx";
import s from "./styles.module.css";

/* ─── Data ─── */

interface Option {
  label: string;
  sub: string;
  score: 0 | 1 | 2;
  risk: "low" | "med" | "high";
  riskLabel: string;
}

interface Question {
  category: string;
  categoryClass: string;
  categoryIcon: string;
  text: string;
  subtext: string;
  options: Option[];
}

const QUESTIONS: Question[] = [
  { category:"Hallucinations & Accuracy", categoryClass:"hallucinations", categoryIcon:"🧠",
    text:"Has your AI agent ever returned confidently wrong or fabricated information?",
    subtext:"Known as hallucinations — the model invents facts, citations, API responses, or decisions it presents as true.",
    options:[
      {label:"Yes, this happens regularly",         sub:"Users or logic downstream consume bad outputs", score:2,risk:"high",riskLabel:"High Risk"},
      {label:"Occasionally, in certain edge cases", sub:"We've caught it a few times",                  score:1,risk:"med", riskLabel:"Moderate"},
      {label:"Rarely or never — actively monitored",sub:"We have output validation in place",            score:0,risk:"low", riskLabel:"Healthy"},
    ]},
  { category:"Hallucinations & Accuracy", categoryClass:"hallucinations", categoryIcon:"🧠",
    text:"Do you validate or verify AI outputs before they're used in critical workflows?",
    subtext:"E.g. schema validation, confidence scoring, human-in-the-loop review, or automated output checking.",
    options:[
      {label:"Yes — automated checks on all critical outputs",sub:"Validation is part of our pipeline",          score:0,risk:"low", riskLabel:"Healthy"},
      {label:"Sometimes, we review manually",               sub:"Inconsistent or only for high-stakes paths",   score:1,risk:"med", riskLabel:"Moderate"},
      {label:"No — AI outputs are used directly",           sub:"No validation layer in place",                  score:2,risk:"high",riskLabel:"High Risk"},
    ]},
  { category:"Hallucinations & Accuracy", categoryClass:"hallucinations", categoryIcon:"🧠",
    text:"Does your agent have guardrails to refuse or flag requests outside its intended scope?",
    subtext:"Guardrails prevent your agent from attempting tasks it's not designed for, reducing error and misuse.",
    options:[
      {label:"Yes — well-defined system prompt guardrails",sub:"Out-of-scope requests handled gracefully",  score:0,risk:"low", riskLabel:"Healthy"},
      {label:"Basic ones — but they could be stronger",    sub:"Some scope limitation, not comprehensive", score:1,risk:"med", riskLabel:"Moderate"},
      {label:"No guardrails set up",                       sub:"Agent attempts anything it receives",       score:2,risk:"high",riskLabel:"High Risk"},
    ]},
  { category:"Hallucinations & Accuracy", categoryClass:"hallucinations", categoryIcon:"🧠",
    text:"Have you systematically tested your agent with edge-case or adversarial inputs?",
    subtext:"E.g. empty inputs, extremely long inputs, contradictory instructions, or inputs designed to break logic.",
    options:[
      {label:"Yes — adversarial testing is part of our QA",sub:"Documented test cases with expected outputs",   score:0,risk:"low", riskLabel:"Healthy"},
      {label:"A few informal tests only",                  sub:"We've poked at it but nothing systematic",      score:1,risk:"med", riskLabel:"Moderate"},
      {label:"No — we haven't tested this",                sub:"Only tested happy-path scenarios",               score:2,risk:"high",riskLabel:"High Risk"},
    ]},
  { category:"Loop & Orchestration Errors", categoryClass:"loops", categoryIcon:"🔁",
    text:"Has your agent ever gotten stuck in a repetitive loop — calling the same tool or step without completing?",
    subtext:"Infinite loops are one of the top causes of runaway API costs and agent unavailability.",
    options:[
      {label:"Yes — this has happened",                  sub:"The agent looped until it hit a timeout or cost limit", score:2,risk:"high",riskLabel:"High Risk"},
      {label:"Once or twice — we patched it manually",   sub:"Happened but we addressed it reactively",              score:1,risk:"med", riskLabel:"Moderate"},
      {label:"Never — we have loop prevention built in", sub:"Max iteration limits and exit conditions defined",      score:0,risk:"low", riskLabel:"Healthy"},
    ]},
  { category:"Loop & Orchestration Errors", categoryClass:"loops", categoryIcon:"🔁",
    text:"Do all of your agent's loops and retry mechanisms have a defined maximum iteration limit?",
    subtext:"Without hard limits, a single misbehaving request can loop thousands of times, consuming tokens and crashing your system.",
    options:[
      {label:"Yes — hard limits on all loops and retries",sub:"max_iterations / max_retries explicitly set",     score:0,risk:"low", riskLabel:"Healthy"},
      {label:"Some do, some don't",                       sub:"Limits exist in parts of the codebase",           score:1,risk:"med", riskLabel:"Moderate"},
      {label:"No limits set anywhere",                    sub:"Loops run until the model decides to stop",       score:2,risk:"high",riskLabel:"High Risk"},
    ]},
  { category:"Loop & Orchestration Errors", categoryClass:"loops", categoryIcon:"🔁",
    text:"When a tool call or external API dependency fails, does your agent handle the error gracefully?",
    subtext:"E.g. returning a user-friendly message, logging the failure, and trying a fallback — instead of crashing.",
    options:[
      {label:"Yes — full try/catch and fallback logic",      sub:"Every tool call has error handling",               score:0,risk:"low", riskLabel:"Healthy"},
      {label:"Partial — some paths have it, some don't",    sub:"Inconsistent error handling across the agent",    score:1,risk:"med", riskLabel:"Moderate"},
      {label:"No — tool failures tend to crash the agent",  sub:"Unhandled exceptions are common",                  score:2,risk:"high",riskLabel:"High Risk"},
    ]},
  { category:"Loop & Orchestration Errors", categoryClass:"loops", categoryIcon:"🔁",
    text:"Can your agent detect when it's uncertain and hand off to a human or a fallback system?",
    subtext:"A good agent knows its own limits. When confidence is low, it should escalate — not guess.",
    options:[
      {label:"Yes — escalation logic is built in",     sub:"Uncertainty triggers a handoff or human review", score:0,risk:"low", riskLabel:"Healthy"},
      {label:"Not formally, but we monitor it",        sub:"We catch failures after the fact",               score:1,risk:"med", riskLabel:"Moderate"},
      {label:"No handoff mechanism exists",            sub:"Agent guesses through uncertainty silently",     score:2,risk:"high",riskLabel:"High Risk"},
    ]},
  { category:"Token Usage & Cost Control", categoryClass:"tokens", categoryIcon:"💸",
    text:"Have you experienced unexpected API cost spikes or runaway bills from your AI agent?",
    subtext:"Uncontrolled agents can consume thousands of dollars in tokens from a single misbehaving session.",
    options:[
      {label:"Yes — we've had unexpected cost spikes",sub:"Bills surprised us at least once",                    score:2,risk:"high",riskLabel:"High Risk"},
      {label:"Minor spikes occasionally",             sub:"Nothing catastrophic but costs fluctuate",            score:1,risk:"med", riskLabel:"Moderate"},
      {label:"No — costs are stable and monitored",   sub:"Budget alerts and cost dashboards in place",          score:0,risk:"low", riskLabel:"Healthy"},
    ]},
  { category:"Token Usage & Cost Control", categoryClass:"tokens", categoryIcon:"💸",
    text:"Do you actively monitor token usage and API costs in real time or near-real time?",
    subtext:"Knowing your cost-per-request lets you catch runaway usage before it becomes a crisis.",
    options:[
      {label:"Yes — dashboards and alerts are configured",sub:"We see cost anomalies within minutes",      score:0,risk:"low", riskLabel:"Healthy"},
      {label:"We check manually from time to time",       sub:"Monthly or weekly review only",            score:1,risk:"med", riskLabel:"Moderate"},
      {label:"No monitoring in place",                    sub:"We rely on the monthly invoice to know costs",score:2,risk:"high",riskLabel:"High Risk"},
    ]},
  { category:"Token Usage & Cost Control", categoryClass:"tokens", categoryIcon:"💸",
    text:"Have your system prompts grown bloated with redundant, outdated, or unnecessary context?",
    subtext:"AI-generated prompts frequently bloat over time — every extra token costs money on every single call.",
    options:[
      {label:"No — prompts are lean and regularly audited",  sub:"We review and trim prompts periodically",      score:0,risk:"low", riskLabel:"Healthy"},
      {label:"Possibly — we haven't reviewed in a while",   sub:"Prompts have grown but we haven't audited",    score:1,risk:"med", riskLabel:"Moderate"},
      {label:"Yes — prompts have definitely bloated",       sub:"Old instructions and redundant context remain", score:2,risk:"high",riskLabel:"High Risk"},
    ]},
  { category:"Security & Data Safety", categoryClass:"security", categoryIcon:"🔒",
    text:"Could a malicious user manipulate your agent's behavior through crafted inputs (prompt injection)?",
    subtext:"Prompt injection is when a user tricks your agent into ignoring its instructions or leaking data.",
    options:[
      {label:"Very likely — no injection protection",  sub:"Agent follows user instructions without validation",  score:2,risk:"high",riskLabel:"High Risk"},
      {label:"Possibly — partial protection only",     sub:"Some safeguards but not comprehensive",              score:1,risk:"med", riskLabel:"Moderate"},
      {label:"No — injection protection is in place",  sub:"Input sanitization and system prompt hardening done",score:0,risk:"low", riskLabel:"Healthy"},
    ]},
  { category:"Security & Data Safety", categoryClass:"security", categoryIcon:"🔒",
    text:"Does your agent have access to more tools, databases, or APIs than it strictly needs?",
    subtext:"Over-permissioned agents amplify the damage of any compromise or hallucination.",
    options:[
      {label:"Yes — access is broader than needed",     sub:"Agent can access more systems than its task requires",score:2,risk:"high",riskLabel:"High Risk"},
      {label:"Somewhat — access could be tightened",   sub:"Some unnecessary permissions exist",                  score:1,risk:"med", riskLabel:"Moderate"},
      {label:"No — least-privilege principle applied",  sub:"Agent only accesses what its task strictly requires", score:0,risk:"low", riskLabel:"Healthy"},
    ]},
  { category:"Security & Data Safety", categoryClass:"security", categoryIcon:"🔒",
    text:"Is sensitive user data sent to external LLM APIs without anonymization or masking?",
    subtext:"PII, health data, financial records, or credentials sent raw to external APIs creates serious compliance risk.",
    options:[
      {label:"Yes — raw sensitive data is sent",          sub:"No anonymization layer before external API calls",score:2,risk:"high",riskLabel:"High Risk"},
      {label:"Sometimes, depending on the query",         sub:"Inconsistent data handling",                      score:1,risk:"med", riskLabel:"Moderate"},
      {label:"No — data is anonymized or processed securely",sub:"PII stripped or encrypted before API calls",  score:0,risk:"low", riskLabel:"Healthy"},
    ]},
  { category:"Security & Data Safety", categoryClass:"security", categoryIcon:"🔒",
    text:"Do you have rate limiting on your agent's endpoints to prevent abuse or runaway usage?",
    subtext:"Without rate limits, a single bad actor can exhaust your API quota and run up thousands in charges.",
    options:[
      {label:"Yes — rate limiting enforced at API level",sub:"Per-user and global limits configured",          score:0,risk:"low", riskLabel:"Healthy"},
      {label:"Basic limits — could be stronger",         sub:"Some throttling but not comprehensive",          score:1,risk:"med", riskLabel:"Moderate"},
      {label:"No rate limiting in place",                sub:"Endpoints are open to unlimited requests",       score:2,risk:"high",riskLabel:"High Risk"},
    ]},
  { category:"Security & Data Safety", categoryClass:"security", categoryIcon:"🔒",
    text:"Are your API keys, database credentials, and secrets properly secured — not hardcoded in the codebase?",
    subtext:"Hardcoded secrets in source code are the #1 cause of credential leaks, especially in AI-generated code.",
    options:[
      {label:"Yes — all secrets in env variables or a secret manager",sub:"No credentials in source code",    score:0,risk:"low", riskLabel:"Healthy"},
      {label:"Mostly — but some may be hardcoded",                   sub:"We've moved most but not all",     score:1,risk:"med", riskLabel:"Moderate"},
      {label:"Secrets are in the codebase",                          sub:"API keys hardcoded in files or configs",score:2,risk:"high",riskLabel:"High Risk"},
    ]},
  { category:"Scalability & Performance", categoryClass:"scalability", categoryIcon:"📈",
    text:"Has your agent slowed significantly or failed when multiple users accessed it simultaneously?",
    subtext:"Concurrency issues are invisible in testing but catastrophic at launch.",
    options:[
      {label:"Yes — it degrades or fails under load",     sub:"Performance issues observed with concurrent users", score:2,risk:"high",riskLabel:"High Risk"},
      {label:"Some slowdowns — nothing catastrophic",     sub:"We've noticed it but it hasn't broken",             score:1,risk:"med", riskLabel:"Moderate"},
      {label:"No — load tested and performing well",      sub:"Concurrency scenarios tested and stable",           score:0,risk:"low", riskLabel:"Healthy"},
    ]},
  { category:"Scalability & Performance", categoryClass:"scalability", categoryIcon:"📈",
    text:"Do you have fallback logic if your primary LLM API (e.g. OpenAI, Anthropic) becomes unavailable?",
    subtext:"Major LLM providers experience outages. Without fallbacks, your entire product goes down with them.",
    options:[
      {label:"Yes — fallback model or queue in place",   sub:"Graceful degradation or backup provider configured",score:0,risk:"low", riskLabel:"Healthy"},
      {label:"No fallback, but outages are rare so far", sub:"We depend entirely on one provider",               score:1,risk:"med", riskLabel:"Moderate"},
      {label:"No fallback — agent simply fails",         sub:"Zero contingency for provider downtime",            score:2,risk:"high",riskLabel:"High Risk"},
    ]},
  { category:"Observability & Monitoring", categoryClass:"observability", categoryIcon:"👁️",
    text:"Do you have logging and tracing in place so you can diagnose agent failures after they happen?",
    subtext:"Without logs, debugging a production failure is nearly impossible.",
    options:[
      {label:"Yes — structured logs and trace IDs on all runs",sub:"Full observability stack in place",          score:0,risk:"low", riskLabel:"Healthy"},
      {label:"Basic logging only — minimal detail",           sub:"Some logs exist but hard to debug from",     score:1,risk:"med", riskLabel:"Moderate"},
      {label:"No logging or tracing at all",                  sub:"Failures are a black box",                    score:2,risk:"high",riskLabel:"High Risk"},
    ]},
  { category:"Observability & Monitoring", categoryClass:"observability", categoryIcon:"👁️",
    text:"Do you receive automatic alerts when your agent's error rate or response latency spikes?",
    subtext:"Proactive alerting means you find out about problems before your users do.",
    options:[
      {label:"Yes — alerts configured for errors and latency",sub:"We know within minutes of any degradation",  score:0,risk:"low", riskLabel:"Healthy"},
      {label:"No alerts — we find out from user complaints",  sub:"Reactive, not proactive monitoring",         score:1,risk:"med", riskLabel:"Moderate"},
      {label:"No monitoring whatsoever",                      sub:"No visibility into agent health at all",      score:2,risk:"high",riskLabel:"High Risk"},
    ]},
];

const CATEGORIES: Record<string, { icon: string; color: string; max: number }> = {
  "Hallucinations & Accuracy":    { icon:"🧠", color:"#a78bfa", max:8 },
  "Loop & Orchestration Errors":  { icon:"🔁", color:"#f5c842", max:8 },
  "Token Usage & Cost Control":   { icon:"💸", color:"#f07422", max:6 },
  "Security & Data Safety":       { icon:"🔒", color:"#f05252", max:10 },
  "Scalability & Performance":    { icon:"📈", color:"#6BA3E8", max:4 },
  "Observability & Monitoring":   { icon:"👁️", color:"#2dd4a0", max:4 },
};

const VERDICTS = [
  { min:85, label:"✅ Production Ready",      color:"#2dd4a0", summary:"Your AI agent is well-architected with strong foundations. A few areas could still be hardened — but you're in the top tier of AI deployments we see." },
  { min:65, label:"⚠️ Needs Attention",       color:"#f5c842", summary:"Your agent has a working core, but several gaps could cause real issues under production load or with adversarial users. Address these before scaling." },
  { min:40, label:"🔴 At Risk",               color:"#f07422", summary:"Multiple critical failure points detected. These issues are likely already causing user-facing problems or silent errors. Immediate review recommended." },
  { min:0,  label:"🚨 Critical Failure Risk", color:"#f05252", summary:"Your AI agent has severe architectural issues that will cause production failures, security vulnerabilities, or runaway costs. This needs expert attention now." },
];

const RISK_STYLES = {
  high: {
    card:      "border-white/10 hover:border-[#f05252]/40 hover:bg-[#f0525210]",
    selected:  "border-[#f05252] bg-[#f0525210]",
    indicator: "#f05252",
    badge:     "bg-[#f0525226] text-[#f05252]",
  },
  med: {
    card:      "border-white/10 hover:border-[#f5c842]/40 hover:bg-[#f5c84210]",
    selected:  "border-[#f5c842] bg-[#f5c84210]",
    indicator: "#f5c842",
    badge:     "bg-[#f5c84220] text-[#f5c842]",
  },
  low: {
    card:      "border-white/10 hover:border-[#2dd4a0]/40 hover:bg-[#2dd4a010]",
    selected:  "border-[#2dd4a0] bg-[#2dd4a010]",
    indicator: "#2dd4a0",
    badge:     "bg-[#2dd4a020] text-[#2dd4a0]",
  },
};

const CAT_STYLES: Record<string, string> = {
  hallucinations: "text-[#a78bfa] border-[#a78bfa40] bg-[#a78bfa10]",
  loops:          "text-[#f5c842] border-[#f5c84240] bg-[#f5c84210]",
  tokens:         "text-[#f07422] border-[#f0742240] bg-[#f0742210]",
  security:       "text-[#f05252] border-[#f0525240] bg-[#f0525210]",
  scalability:    "text-[#6BA3E8] border-[#6BA3E840] bg-[#6BA3E810]",
  observability:  "text-[#2dd4a0] border-[#2dd4a040] bg-[#2dd4a010]",
};

type Screen = "intro" | "question" | "email" | "results";

/* ─── Component ─── */

export default function DiagnosticTool() {
  const [screen, setScreen]         = useState<Screen>("intro");
  const [currentQ, setCurrentQ]     = useState(0);
  const [answers, setAnswers]       = useState<(number | null)[]>(Array(QUESTIONS.length).fill(null));
  const [emailInput, setEmailInput] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [animKey, setAnimKey]       = useState(0);

  // Results animation state
  const [scoreOffset, setScoreOffset] = useState(502);
  const [scoreColor,  setScoreColor]  = useState("#e6e4ef");
  const [barsReady,   setBarsReady]   = useState(false);

  const progress =
    screen === "intro" ? 0 :
    screen === "email" ? 95 :
    screen === "results" ? 100 :
    (answers.filter(a => a !== null).length / QUESTIONS.length) * 100;

  useEffect(() => {
    if (screen === "results") {
      setBarsReady(false);
      const score   = calcScore();
      const verdict = VERDICTS.find(v => score >= v.min)!;
      const offset  = 502 - (score / 100) * 502;
      const t1 = setTimeout(() => { setScoreOffset(offset); setScoreColor(verdict.color); }, 200);
      const t2 = setTimeout(() => setBarsReady(true), 500);
      return () => { clearTimeout(t1); clearTimeout(t2); };
    }
  }, [screen]); // eslint-disable-line react-hooks/exhaustive-deps

  function selectAnswer(qIndex: number, score: number) {
    const next = [...answers];
    next[qIndex] = score;
    setAnswers(next);
    setTimeout(() => advance(next), 450);
  }

  function advance(ans: (number | null)[]) {
    if (currentQ < QUESTIONS.length - 1) {
      setCurrentQ(q => q + 1);
      setAnimKey(k => k + 1);
    } else {
      setScreen("email");
    }
  }

  function goBack() {
    if (currentQ > 0) { setCurrentQ(q => q - 1); setAnimKey(k => k + 1); }
  }

  function unlockResults() {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.trim())) {
      setEmailError(true);
      return;
    }
    setEmailError(false);
    fetch("/api/capture-lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: emailInput.trim(), score: calcScore(), source: "AI_Agent_Diagnostic" }),
    }).catch(console.error);
    setScreen("results");
  }

  function calcScore() {
    const risk = answers.reduce<number>((sum, a) => sum + (a ?? 0), 0);
    return Math.round((1 - risk / (QUESTIONS.length * 2)) * 100);
  }

  function calcCategoryScores() {
    const sums: Record<string, number> = {};
    for (const k of Object.keys(CATEGORIES)) sums[k] = 0;
    QUESTIONS.forEach((q, i) => { sums[q.category] += (answers[i] ?? 0); });
    const result: Record<string, number> = {};
    for (const [k, cfg] of Object.entries(CATEGORIES)) {
      result[k] = Math.round((1 - sums[k] / cfg.max) * 100);
    }
    return result;
  }

  function getFlaggedIssues() {
    return QUESTIONS
      .map((q, i) => ({ q, score: answers[i] ?? 0 }))
      .filter(({ score }) => score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 8);
  }

  const q       = QUESTIONS[currentQ];
  const score   = screen === "results" ? calcScore() : 0;
  const verdict = VERDICTS.find(v => score >= v.min) ?? VERDICTS[VERDICTS.length - 1];
  const catScores   = screen === "results" ? calcCategoryScores() : {};
  const issues  = screen === "results" ? getFlaggedIssues() : [];

  return (
    <div className="min-h-screen bg-[#0a0a0d] text-[#e6e4ef] relative overflow-x-hidden">
      {/* Ambient glows */}
      <div className="pointer-events-none fixed top-0 left-0 w-[500px] h-[500px] rounded-full"
           style={{ background:"radial-gradient(circle,rgba(43,91,168,0.18) 0%,transparent 70%)" }} />
      <div className="pointer-events-none fixed bottom-0 right-0 w-[400px] h-[400px] rounded-full"
           style={{ background:"radial-gradient(circle,rgba(232,101,10,0.12) 0%,transparent 70%)" }} />

      {/* Progress bar */}
      <div className="fixed top-0 left-0 right-0 h-0.5 z-[200] bg-white/5">
        <div className="h-full transition-all duration-500"
             style={{ width:`${progress}%`, background:"linear-gradient(to right,#6BA3E8,#2B5BA8,#E8650A)", boxShadow:"0 0 12px rgba(107,163,232,0.6)" }} />
      </div>

      {/* ── INTRO ── */}
      {screen === "intro" && (
        <section className="flex flex-col items-center justify-center min-h-screen text-center px-6 pt-20 pb-16">
          <div className={clsx("inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] uppercase tracking-[0.15em] mb-8 border", "text-[#6BA3E8] border-[#6BA3E840] bg-[#6BA3E810]", s.fadeUp)}>
            <span className={clsx("w-1.5 h-1.5 rounded-full bg-[#E8650A]", s.pulse)} />
            Free Diagnostic Tool — By Susea.ai
          </div>
          <h1 className={clsx("font-headline font-extrabold tracking-tighter leading-[1.05] mb-5", s.fadeUp1)}
              style={{ fontSize:"clamp(36px,6vw,72px)" }}>
            Is Your AI Agent<br />
            <span style={{ background:"linear-gradient(135deg,#6BA3E8 0%,#2B5BA8 50%,#E8650A 100%)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text" }}>
              Production-Ready?
            </span>
          </h1>
          <p className={clsx("text-[#8a8899] text-lg max-w-[560px] leading-relaxed mb-10", s.fadeUp2)}>
            Answer 20 targeted questions and get an instant health score across the 6 most critical failure categories in any AI stack.
          </p>

          {/* Stats */}
          <div className={clsx("flex max-w-[560px] w-full border border-white/10 rounded-xl overflow-hidden mb-10", s.fadeUp3)}>
            {[["20","Questions"],["6","Categories"],["3 Min","To Complete"],["Free","Always"]].map(([num, lbl]) => (
              <div key={lbl} className="flex-1 py-5 px-4 text-center bg-[#111116] border-r border-white/6 last:border-r-0">
                <span className="block text-2xl font-extrabold font-headline mb-1"
                      style={{ background:"linear-gradient(135deg,#6BA3E8 0%,#2B5BA8 50%,#E8650A 100%)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text" }}>
                  {num}
                </span>
                <span className="text-[11px] text-[#44424f] uppercase tracking-[0.05em] font-mono">{lbl}</span>
              </div>
            ))}
          </div>

          {/* Category pills */}
          <div className={clsx("flex flex-wrap gap-2 justify-center mb-10", s.fadeUp4)}>
            {["🧠 Hallucinations","🔁 Loop Errors","💸 Token Usage","🔒 Security","📈 Scalability","👁️ Observability"].map(pill => (
              <span key={pill} className="px-3 py-1 rounded-full border border-white/10 bg-[#111116] text-[#8a8899] text-[11px] uppercase tracking-[0.06em] font-mono">
                {pill}
              </span>
            ))}
          </div>

          <button
            onClick={() => { setScreen("question"); setCurrentQ(0); setAnimKey(k => k + 1); }}
            className={clsx("inline-flex items-center gap-2 px-9 py-4 rounded-xl font-headline font-bold text-base text-white transition-all hover:opacity-90 hover:-translate-y-0.5 active:translate-y-0", s.fadeUp5)}
            style={{ background:"linear-gradient(135deg,#6BA3E8 0%,#2B5BA8 50%,#E8650A 100%)", boxShadow:"0 8px 32px rgba(43,91,168,0.3)" }}
          >
            Start Free Diagnosis <span>→</span>
          </button>
          <p className={clsx("mt-4 text-sm text-[#44424f]", s.fadeUp6)}>
            No signup needed to start · Takes ~3 minutes · Results sent by email
          </p>
        </section>
      )}

      {/* ── QUESTION ── */}
      {screen === "question" && (
        <section className="flex flex-col items-center min-h-screen pt-24 pb-16 px-6">
          <div key={animKey} className={clsx("w-full max-w-[680px]", s.slideIn)}>
            {/* Category pill */}
            <div className={clsx("inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] uppercase tracking-[0.12em] border mb-6", CAT_STYLES[q.categoryClass])}>
              {q.categoryIcon} {q.category}
            </div>

            <p className="text-[#44424f] text-xs font-mono mb-3 tracking-[0.05em]">
              Question {currentQ + 1} of {QUESTIONS.length}
            </p>
            <h2 className="font-headline font-bold text-2xl md:text-3xl tracking-tight leading-snug mb-3">
              {q.text}
            </h2>
            {q.subtext && (
              <p className="text-sm text-[#8a8899] leading-relaxed mb-8 pl-3 border-l-2 border-white/10">
                {q.subtext}
              </p>
            )}

            {/* Options */}
            <div className="flex flex-col gap-3">
              {q.options.map((opt, i) => {
                const rs = RISK_STYLES[opt.risk];
                const selected = answers[currentQ] === opt.score;
                return (
                  <button
                    key={i}
                    onClick={() => selectAnswer(currentQ, opt.score)}
                    className={clsx(
                      "flex items-start gap-4 p-4 rounded-xl border text-left transition-all hover:translate-x-1",
                      selected ? rs.selected : clsx("bg-[#111116]", rs.card)
                    )}
                  >
                    <span className="w-5 h-5 rounded-full border-2 flex-shrink-0 mt-0.5 flex items-center justify-center transition-all"
                          style={ selected ? { borderColor:rs.indicator, background:rs.indicator } : { borderColor:"rgba(255,255,255,0.13)" } }>
                      {selected && <span className="text-black text-[10px] font-black">✓</span>}
                    </span>
                    <div className="flex-1">
                      <span className="block text-sm font-medium text-[#e6e4ef] leading-snug">{opt.label}</span>
                      <span className="block text-xs text-[#8a8899] mt-1">{opt.sub}</span>
                    </div>
                    <span className={clsx("text-[10px] px-2 py-0.5 rounded-full uppercase tracking-[0.05em] font-mono flex-shrink-0 mt-0.5", rs.badge)}>
                      {opt.riskLabel}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Nav */}
            <div className="flex items-center justify-between mt-7">
              <button onClick={goBack}
                      className="flex items-center gap-1.5 px-5 py-3 rounded-xl border border-white/10 text-[#8a8899] text-sm hover:text-[#e6e4ef] hover:border-white/20 transition-all"
                      style={{ visibility: currentQ === 0 ? "hidden" : "visible" }}>
                ← Back
              </button>
              <button
                onClick={() => advance(answers)}
                disabled={answers[currentQ] === null}
                className={clsx(
                  "flex items-center gap-2 px-6 py-3 rounded-xl font-headline font-semibold text-sm transition-all",
                  answers[currentQ] !== null
                    ? "text-white hover:brightness-110"
                    : "opacity-40 cursor-not-allowed bg-[#18181f] border border-white/10 text-[#8a8899]"
                )}
                style={answers[currentQ] !== null ? { background:"#2B5BA8", borderColor:"#6BA3E8", border:"1px solid" } : {}}
              >
                {currentQ === QUESTIONS.length - 1 ? "See My Results" : "Next Question"} →
              </button>
            </div>
          </div>
        </section>
      )}

      {/* ── EMAIL GATE ── */}
      {screen === "email" && (
        <section className="flex flex-col items-center justify-center min-h-screen text-center px-6 pt-20">
          <div className="max-w-[480px] w-full">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-[12px] uppercase tracking-[0.1em] border border-[#2dd4a040] bg-[#2dd4a010] text-[#2dd4a0] mb-8">
              <span className={clsx("w-2 h-2 rounded-full bg-[#2dd4a0]", s.pulse)} />
              Scan Complete — 20/20
            </div>
            <h2 className="font-headline font-extrabold tracking-tighter leading-tight mb-4"
                style={{ fontSize:"clamp(28px,4vw,44px)" }}>
              Your Results Are<br />
              <span style={{ background:"linear-gradient(135deg,#6BA3E8 0%,#2B5BA8 50%,#E8650A 100%)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text" }}>
                Ready to Unlock
              </span>
            </h2>
            <p className="text-[#8a8899] text-base leading-relaxed mb-8">
              Your AI Agent Health Score has been calculated across all 6 categories. Enter your email to see your full diagnostic report.
            </p>

            {/* Blurred score teaser */}
            <div className="flex items-center gap-4 p-5 rounded-xl bg-[#111116] border border-white/10 mb-8">
              <span className="text-5xl font-extrabold font-headline select-none"
                    style={{ filter:"blur(10px)", background:"linear-gradient(135deg,#6BA3E8 0%,#2B5BA8 50%,#E8650A 100%)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text" }}>
                ??
              </span>
              <div className="text-left">
                <strong className="block text-sm font-bold text-[#e6e4ef] mb-1">Your AI Health Score</strong>
                <span className="text-xs text-[#8a8899]">Enter your email to reveal your score and see every issue flagged.</span>
              </div>
            </div>

            {emailError && (
              <p className="text-[#f05252] text-xs font-mono text-left mb-2">Please enter a valid email address.</p>
            )}
            <div className="flex gap-2 mb-3">
              <input
                type="email"
                value={emailInput}
                onChange={e => { setEmailInput(e.target.value); setEmailError(false); }}
                onKeyDown={e => e.key === "Enter" && unlockResults()}
                placeholder="your@email.com"
                className="flex-1 bg-[#111116] border border-white/10 rounded-xl px-4 py-3.5 text-sm text-[#e6e4ef] placeholder:text-[#44424f] outline-none focus:border-[#6BA3E8] transition-colors"
              />
              <button
                onClick={unlockResults}
                className="px-6 py-3.5 rounded-xl font-headline font-bold text-sm text-white whitespace-nowrap transition-all hover:opacity-90 hover:-translate-y-0.5"
                style={{ background:"linear-gradient(135deg,#6BA3E8 0%,#2B5BA8 50%,#E8650A 100%)", boxShadow:"0 4px 20px rgba(43,91,168,0.25)" }}
              >
                Unlock Results →
              </button>
            </div>
            <p className="text-xs text-[#44424f] font-mono">🔒 No spam. Ever. Unsubscribe in one click.</p>
          </div>
        </section>
      )}

      {/* ── RESULTS ── */}
      {screen === "results" && (
        <section className="flex flex-col items-center min-h-screen pt-24 pb-20 px-6">
          <div className="w-full max-w-[760px]">

            {/* Score circle */}
            <div className="text-center mb-12">
              <span className="block text-[11px] uppercase tracking-[0.15em] text-[#8a8899] font-mono mb-6">
                AI Agent Diagnostic Report — Susea.ai
              </span>
              <div className="relative w-44 h-44 mx-auto mb-6">
                <svg className="w-44 h-44" style={{ transform:"rotate(-90deg)" }} viewBox="0 0 180 180">
                  <circle cx="90" cy="90" r="80" fill="none" stroke="#18181f" strokeWidth="10" />
                  <circle cx="90" cy="90" r="80" fill="none" strokeWidth="10" strokeLinecap="round"
                          style={{ strokeDasharray:502, strokeDashoffset:scoreOffset, stroke:scoreColor, transition:"stroke-dashoffset 1.4s cubic-bezier(0.4,0,0.2,1)" }} />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-4xl font-extrabold font-headline leading-none" style={{ color:scoreColor }}>{score}</span>
                  <span className="text-[11px] text-[#8a8899] font-mono mt-1">/ 100</span>
                </div>
              </div>
              <h2 className="text-2xl font-headline font-extrabold mb-2" style={{ color:scoreColor }}>{verdict.label}</h2>
              <p className="text-[#8a8899] text-sm leading-relaxed max-w-[500px] mx-auto">{verdict.summary}</p>
            </div>

            {/* Category bars */}
            <div className="bg-[#111116] border border-white/10 rounded-2xl p-7 mb-7">
              <h3 className="text-sm font-headline font-bold mb-5 flex items-center gap-3 after:flex-1 after:h-px after:bg-white/6 after:content-['']">
                Category Breakdown
              </h3>
              <div className="space-y-3.5">
                {Object.entries(catScores).map(([cat, pct]) => {
                  const cfg   = CATEGORIES[cat];
                  const color = pct >= 75 ? "#2dd4a0" : pct >= 50 ? "#f5c842" : "#f05252";
                  return (
                    <div key={cat} className="flex items-center gap-4">
                      <span className="font-mono text-[11px] uppercase text-[#8a8899] min-w-[140px]">
                        {cfg.icon} {cat.split(" ").slice(0,2).join(" ")}
                      </span>
                      <div className="flex-1 h-2 bg-[#18181f] rounded-full overflow-hidden border border-white/6">
                        <div className="h-full rounded-full transition-all duration-1000 ease-out"
                             style={{ width: barsReady ? `${pct}%` : "0%", background:color }} />
                      </div>
                      <span className="font-mono text-xs min-w-[36px] text-right" style={{ color }}>{pct}%</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Flagged issues */}
            <div className="bg-[#111116] border border-white/10 rounded-2xl p-7 mb-7">
              <h3 className="text-sm font-headline font-bold mb-4 flex items-center gap-3 after:flex-1 after:h-px after:bg-white/6 after:content-['']">
                Flagged Issues
              </h3>
              {issues.length === 0 ? (
                <p className="text-[#2dd4a0] text-sm py-2">🎉 No critical issues detected. Your agent is well-configured!</p>
              ) : (
                <div className="divide-y divide-white/6">
                  {issues.map(({ q: iq, score: sc }, i) => (
                    <div key={i} className="flex gap-3 py-3.5 first:pt-0 last:pb-0">
                      <div className={clsx("w-8 h-8 rounded-lg flex items-center justify-center text-sm flex-shrink-0", sc===2?"bg-[#f0525220]":"bg-[#f5c84218]")}>
                        {sc===2?"🔴":"🟡"}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-headline font-bold text-[#e6e4ef] mb-0.5">{iq.category}</p>
                        <p className="text-xs text-[#8a8899] leading-snug">{iq.text}</p>
                      </div>
                      <span className={clsx("text-[10px] px-2 py-0.5 rounded-full uppercase font-mono self-start mt-0.5", sc===2?"bg-[#f0525226] text-[#f05252]":"bg-[#f5c84220] text-[#f5c842]")}>
                        {sc===2?"Critical":"Warning"}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* CTA */}
            <div className="rounded-2xl p-9 text-center" style={{ background:"linear-gradient(135deg,rgba(43,91,168,0.15) 0%,rgba(232,101,10,0.10) 100%)", border:"1px solid rgba(107,163,232,0.25)" }}>
              <h3 className="font-headline font-extrabold text-2xl tracking-tight mb-2">Get These Issues Fixed — Free Audit</h3>
              <p className="text-[#8a8899] text-sm leading-relaxed mb-6 max-w-[480px] mx-auto">
                Our engineers have reviewed 200+ AI agent deployments. Book a free 15-minute call and we&apos;ll walk through your specific failure points. No pitch, just fixes.
              </p>
              <div className="flex gap-3 justify-center flex-wrap">
                <Link href="/contact"
                      className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-headline font-bold text-sm text-white transition-all hover:opacity-90"
                      style={{ background:"linear-gradient(135deg,#6BA3E8 0%,#2B5BA8 50%,#E8650A 100%)", boxShadow:"0 4px 20px rgba(43,91,168,0.25)" }}>
                  Book Free AI Audit →
                </Link>
                <Link href="/case-studies"
                      className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm border border-white/10 text-[#e6e4ef] hover:bg-[#111116] transition-all">
                  See Our Work
                </Link>
              </div>
              <p className="mt-4 text-xs text-[#44424f] font-mono">Free · 15 minutes · No commitment · Talk to a real engineer</p>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
