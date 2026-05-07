"use client";

import { useState } from "react";
import Link from "next/link";
import clsx from "clsx";
import styles from "./styles.module.css";

type RoleKey = "cto" | "smb" | "ent" | "other";

const GRAD = "linear-gradient(135deg,#6BA3E8 0%,#2B5BA8 50%,#E8650A 100%)";

const ROLES: { key: RoleKey; icon: string; label: string; sub: string }[] = [
  { key: "cto",   icon: "🧑‍💻", label: "CTO / COO",   sub: "Technical leader"   },
  { key: "smb",   icon: "🏢",   label: "SMB Owner",   sub: "Business founder"   },
  { key: "ent",   icon: "🏗️",  label: "Enterprise",  sub: "Corp. leadership"   },
  { key: "other", icon: "👤",   label: "Other",       sub: "Consultant / other" },
];

const PAGES = [
  { num: "PAGE 1",      title: "Cover & Client Summary",        desc: "Branded cover with overall score, tier badge, and key meta at a glance." },
  { num: "PAGE 2",      title: "Table of Contents",             desc: "Structured navigation across all 14 sections with page references." },
  { num: "PAGE 3",      title: "Executive Summary",             desc: "5 key findings, strategic recommendation, and COO-level action brief." },
  { num: "PAGE 4",      title: "Client Overview & Methodology", desc: "Company profile, tech stack snapshot, and how the assessment was conducted." },
  { num: "PAGE 5",      title: "Overall Readiness Score",       desc: "Scored 0–100 across 4 tiers with full category breakdown and score bars." },
  { num: "PAGES 6–9",   title: "4 Dimension Deep Dives",        desc: "Findings, identified gaps, and prioritised recommendations per dimension." },
  { num: "PAGE 10",     title: "AI Use Case Matrix",            desc: "6 use cases scored by Impact, Feasibility, Timeline, and Priority tier." },
  { num: "PAGE 11",     title: "Implementation Roadmap",        desc: "3-phase plan: Foundation Sprint (0–30 days), Quick Wins (30–90 days), Scale (90+ days)." },
  { num: "PAGE 12",     title: "Investment Estimate",           desc: "Starter / Growth / Enterprise tiers with 12-month ROI projections per use case." },
  { num: "PAGES 13–14", title: "Next Steps & Back Cover",       desc: "Week-by-week action plan and Susea.ai services overview." },
];

const INSIDE_LIST = [
  "Executive summary with overall readiness score (0–100)",
  "Deep-dive findings across Business Process, Data & Tech, Team, and Budget",
  "AI Use Case Prioritisation Matrix with 6 evaluated use cases",
  "3-phase implementation roadmap with day-by-day tasks",
  "Investment estimate table with Starter, Growth, and Enterprise tiers",
  "Real ROI calculations — time saved, cost reduced, payback period",
];


export default function ReportForm() {
  const [fname,     setFname]     = useState("");
  const [lname,     setLname]     = useState("");
  const [email,     setEmail]     = useState("");
  const [company,   setCompany]   = useState("");
  const [role,      setRole]      = useState<RoleKey | null>(null);
  const [consent,   setConsent]   = useState(false);
  const [error,     setError]     = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit() {
    const trimmed = email.trim();
    const valid   = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed);
    if (!fname.trim() || !trimmed || !valid || !role) {
      setError(
        !valid && trimmed ? "Please enter a valid email address." :
        !role             ? "Please select your role."            :
                            "Please fill in your name and work email."
      );
      return;
    }
    setError("");
    fetch("/api/capture-lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fname, lname, email: trimmed, company, role, source: "AI_Readiness_Report" }),
    }).catch(console.error);
    setSubmitted(true);
  }

  return (
    <main>
      {/* Ambient glows */}
      <div className="fixed -top-[200px] -left-[150px] w-[600px] h-[600px] rounded-full pointer-events-none z-0" style={{ background: "radial-gradient(circle,rgba(43,91,168,.17) 0%,transparent 65%)" }} />
      <div className="fixed -bottom-[200px] -right-[100px] w-[500px] h-[500px] rounded-full pointer-events-none z-0" style={{ background: "radial-gradient(circle,rgba(232,101,10,.11) 0%,transparent 65%)" }} />

      {/* ── HERO ──────────────────────────────────────────────────────── */}
      <section className="min-h-screen flex items-center justify-center px-6 pt-[100px] pb-[60px] relative">
        <div className="max-w-[1100px] w-full grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-[60px] items-center">

          {/* LEFT */}
          <div>
            <div className={clsx(styles.fadeUp, "inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.14em] uppercase text-[#6BA3E8] border border-[rgba(107,163,232,0.22)] bg-[rgba(107,163,232,0.06)] px-4 py-1.5 rounded-full mb-7")}>
              <span className={clsx(styles.blink, "w-1.5 h-1.5 rounded-full bg-[#E8650A] flex-shrink-0")} />
              Free Consulting Deliverable — 14-Page Report
            </div>

            <h1 className={clsx(styles.fadeUp, "text-[clamp(36px,5vw,66px)] font-extrabold leading-[1.05] tracking-[-0.03em] mb-[22px]")}>
              The AI Readiness<br />
              <span className="signature-text-gradient">Report Template</span>
            </h1>

            <p className={clsx(styles.fadeUp1, "text-[17px] text-[#8b89a0] leading-[1.7] mb-9 max-w-[560px]")}>
              A real consulting deliverable — used by Susea.ai&apos;s strategy team — showing enterprises and SMBs exactly what a professional AI readiness assessment looks like. Download free, use as a benchmark, or share with your leadership team.
            </p>

            <div className={clsx(styles.fadeUp2, "flex gap-2.5 flex-wrap mb-9")}>
              <span className="text-xs font-semibold px-3.5 py-1.5 rounded-full border text-[#6BA3E8] border-[rgba(107,163,232,0.3)] bg-[rgba(107,163,232,0.08)]">🧑‍💻 CTOs &amp; COOs</span>
              <span className="text-xs font-semibold px-3.5 py-1.5 rounded-full border text-[#E8650A] border-[rgba(232,101,10,0.3)] bg-[rgba(232,101,10,0.08)]">🏢 SMB Owners</span>
              <span className="text-xs font-semibold px-3.5 py-1.5 rounded-full border text-[#2dd4a0] border-[rgba(45,212,160,0.3)] bg-[rgba(45,212,160,0.08)]">🏗️ Enterprise Leaders</span>
            </div>

            <div className={clsx(styles.fadeUp3, "flex border border-[rgba(255,255,255,0.11)] rounded-xl overflow-hidden mb-9")}>
              {[{ n: "14", l: "Pages" }, { n: "4", l: "Dimensions" }, { n: "30+", l: "Findings" }, { n: "Free", l: "Always" }].map((s, i) => (
                <div key={i} className="flex-1 px-3.5 py-4 text-center bg-[#111118] border-r border-[rgba(255,255,255,0.06)] last:border-r-0">
                  <span className="block text-2xl font-extrabold" style={{ background: GRAD, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>{s.n}</span>
                  <span className="block font-mono text-[10px] text-[#4a4860] uppercase tracking-[0.05em] mt-1">{s.l}</span>
                </div>
              ))}
            </div>

            <ul className={clsx(styles.fadeUp4, "flex flex-col gap-2 list-none")}>
              {INSIDE_LIST.map((item, i) => (
                <li key={i} className="flex gap-2.5 items-start text-sm text-[#8b89a0]">
                  <span className="text-[#2dd4a0] font-bold text-xs flex-shrink-0 mt-0.5">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* RIGHT: FORM CARD */}
          <div className={clsx(styles.fadeUp1, "bg-[#111118] border border-[rgba(255,255,255,0.11)] rounded-[18px] p-8 relative overflow-hidden")}>
            <div className="absolute top-0 left-0 right-0 h-[3px]" style={{ background: GRAD }} />

            {/* Report preview */}
            <div className="bg-[#16161f] border border-[rgba(255,255,255,0.06)] rounded-xl p-5 mb-7">
              <div className="flex gap-4 items-start">
                <div className="w-[72px] h-24 rounded-md border border-[rgba(255,255,255,0.11)] flex flex-col items-center justify-end p-2 flex-shrink-0 relative overflow-hidden" style={{ background: "linear-gradient(145deg,#12112A,#1A1A28)" }}>
                  <div className="absolute -top-5 -left-5 w-20 h-20 rounded-full" style={{ background: "radial-gradient(circle,rgba(43,91,168,0.3),transparent 70%)" }} />
                  <span className="text-[8px] font-extrabold text-[#6BA3E8] relative z-10">Susea.ai</span>
                  <div className="w-9 h-0.5 bg-[#E8650A] rounded my-1 relative z-10" />
                  <div className="text-[5px] text-[rgba(255,255,255,0.4)] text-center leading-[1.4] relative z-10">AI READINESS<br />REPORT</div>
                </div>
                <div>
                  <div className="text-[13.5px] font-bold text-[#e8e6f0] mb-1 leading-snug">AI Readiness Report<br />— BrightPath Logistics</div>
                  <div className="text-[11.5px] text-[#8b89a0] leading-relaxed mb-2.5">Sample consulting deliverable. Fictional client. All data is illustrative.</div>
                  <div className="flex gap-1.5 flex-wrap">
                    <span className="font-mono text-[9px] px-2 py-0.5 rounded-full uppercase tracking-wide bg-[rgba(107,163,232,0.1)] text-[#6BA3E8]">14 Pages</span>
                    <span className="font-mono text-[9px] px-2 py-0.5 rounded-full uppercase tracking-wide bg-[rgba(45,212,160,0.1)] text-[#2dd4a0]">PDF</span>
                    <span className="font-mono text-[9px] px-2 py-0.5 rounded-full uppercase tracking-wide bg-[rgba(232,101,10,0.1)] text-[#E8650A]">Free</span>
                  </div>
                </div>
              </div>
            </div>

            {submitted ? (
              /* SUCCESS STATE */
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-[rgba(45,212,160,0.12)] border-2 border-[rgba(45,212,160,0.3)] flex items-center justify-center text-3xl mx-auto mb-5">📬</div>
                <div className="text-xl font-extrabold tracking-tight mb-2">Report On Its Way!</div>
                <p className="text-sm text-[#8b89a0] leading-relaxed mb-4">
                  Thanks {fname || "there"}! Your 14-page AI Readiness Report is heading to{" "}
                  <strong className="text-[#e8e6f0]">{email.trim()}</strong>. Check your inbox — and your spam folder if you don&apos;t see it in a few minutes.
                </p>
                <div className="flex items-start gap-3 p-4 rounded-[11px] bg-[rgba(45,212,160,0.06)] border border-[rgba(45,212,160,0.18)] text-left mb-6">
                  <span className="text-base flex-shrink-0 mt-0.5">✅</span>
                  <p className="text-xs text-[#8b89a0] leading-relaxed">
                    Your report includes your AI readiness score, use case matrix, 3-phase implementation roadmap, and ROI estimates across all 14 pages.
                  </p>
                </div>
                <p className="text-[13px] text-[#8b89a0] leading-relaxed mb-4">
                  While you&apos;re here — want a free 20-minute call to review your organisation&apos;s actual AI readiness?
                </p>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 bg-[#16161f] text-[#e8e6f0] text-sm font-semibold px-6 py-3 rounded-[10px] border border-[rgba(255,255,255,0.11)] no-underline transition-all hover:border-[rgba(107,163,232,0.4)] mb-4"
                >
                  Book Free Strategy Call →
                </Link>
                <div className="flex items-center justify-center gap-2 flex-wrap mt-4">
                  <span className="text-[11px] text-[#4a4860] font-mono uppercase tracking-wider">Share:</span>
                  <a href="https://www.linkedin.com/sharing/share-offsite/?url=https://susea.ai/resources/ai-readiness-report" target="_blank" rel="noopener noreferrer" className="text-xs font-semibold px-4 py-2 rounded-lg border border-[rgba(255,255,255,0.11)] bg-[#16161f] text-[#8b89a0] no-underline transition-all hover:border-[rgba(255,255,255,0.2)] hover:text-[#e8e6f0]">LinkedIn</a>
                  <a href="https://twitter.com/intent/tweet?text=Just%20downloaded%20a%20free%20AI%20Readiness%20Report%20from%20%40suseaai.%20Get%20it%20free%3A%20susea.ai%2Fresources%2Fai-readiness-report" target="_blank" rel="noopener noreferrer" className="text-xs font-semibold px-4 py-2 rounded-lg border border-[rgba(255,255,255,0.11)] bg-[#16161f] text-[#8b89a0] no-underline transition-all hover:border-[rgba(255,255,255,0.2)] hover:text-[#e8e6f0]">Twitter / X</a>
                </div>
              </div>
            ) : (
              /* FORM STATE */
              <>
                <div className="text-[17px] font-extrabold tracking-tight mb-1.5">Download Free Report</div>
                <p className="text-[13px] text-[#8b89a0] leading-relaxed mb-5">Enter your details to get instant access. No spam — ever.</p>

                <div className="grid grid-cols-2 gap-2.5 mb-3">
                  <div>
                    <label className="block text-xs font-semibold text-[#8b89a0] mb-1.5">First Name</label>
                    <input type="text" placeholder="Alex" value={fname} onChange={e => setFname(e.target.value)} className="w-full bg-[#16161f] border border-[rgba(255,255,255,0.11)] rounded-[10px] px-4 py-3 text-sm text-[#e8e6f0] outline-none transition-colors focus:border-[#6BA3E8] placeholder:text-[#4a4860]" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#8b89a0] mb-1.5">Last Name</label>
                    <input type="text" placeholder="Johnson" value={lname} onChange={e => setLname(e.target.value)} className="w-full bg-[#16161f] border border-[rgba(255,255,255,0.11)] rounded-[10px] px-4 py-3 text-sm text-[#e8e6f0] outline-none transition-colors focus:border-[#6BA3E8] placeholder:text-[#4a4860]" />
                  </div>
                </div>

                <div className="mb-3">
                  <label className="block text-xs font-semibold text-[#8b89a0] mb-1.5">Work Email</label>
                  <input type="email" placeholder="alex@company.com" value={email} onChange={e => setEmail(e.target.value)} className="w-full bg-[#16161f] border border-[rgba(255,255,255,0.11)] rounded-[10px] px-4 py-3 text-sm text-[#e8e6f0] outline-none transition-colors focus:border-[#6BA3E8] placeholder:text-[#4a4860]" />
                </div>

                <div className="mb-3">
                  <label className="block text-xs font-semibold text-[#8b89a0] mb-1.5">Company Name</label>
                  <input type="text" placeholder="Acme Corp" value={company} onChange={e => setCompany(e.target.value)} className="w-full bg-[#16161f] border border-[rgba(255,255,255,0.11)] rounded-[10px] px-4 py-3 text-sm text-[#e8e6f0] outline-none transition-colors focus:border-[#6BA3E8] placeholder:text-[#4a4860]" />
                </div>

                <div className="mb-4">
                  <label className="block text-xs font-semibold text-[#8b89a0] mb-2.5">Your Role</label>
                  <div className="grid grid-cols-2 gap-2">
                    {ROLES.map(r => (
                      <button
                        key={r.key}
                        type="button"
                        onClick={() => setRole(r.key)}
                        className={clsx(
                          "p-2.5 border rounded-lg cursor-pointer transition-all text-center",
                          role === r.key
                            ? "border-[#6BA3E8] bg-[rgba(107,163,232,0.08)]"
                            : "border-[rgba(255,255,255,0.11)] bg-[#16161f] hover:border-[rgba(107,163,232,0.3)] hover:bg-[#1d1d28]"
                        )}
                      >
                        <span className="text-lg block mb-1">{r.icon}</span>
                        <div className="text-[11.5px] font-semibold text-[#e8e6f0]">{r.label}</div>
                        <div className="text-[10px] text-[#8b89a0] mt-0.5">{r.sub}</div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2.5 items-start mb-4 cursor-pointer" onClick={() => setConsent(c => !c)}>
                  <div className={clsx("w-4 h-4 border rounded flex-shrink-0 mt-0.5 flex items-center justify-center transition-all", consent ? "bg-[#6BA3E8] border-[#6BA3E8]" : "bg-[#16161f] border-[rgba(255,255,255,0.11)]")}>
                    {consent && <span className="text-black text-[10px] font-bold leading-none">✓</span>}
                  </div>
                  <span className="text-[11.5px] text-[#8b89a0] leading-[1.55] select-none">
                    I agree to receive occasional AI strategy insights from Susea.ai. No spam. Unsubscribe anytime.
                  </span>
                </div>

                {error && <p className="font-mono text-[11px] text-[#f05252] mb-3">{error}</p>}

                <button type="button" onClick={handleSubmit} className="w-full text-white font-bold text-[15px] py-[15px] rounded-[11px] border-none cursor-pointer flex items-center justify-center gap-2 tracking-[-0.01em] transition-all hover:opacity-90 hover:-translate-y-0.5 active:translate-y-0" style={{ background: GRAD, boxShadow: "0 6px 24px rgba(43,91,168,0.3)" }}>
                  Send My Free Report →
                </button>
                <p className="font-mono text-[11px] text-[#4a4860] text-center mt-3">🔒 No spam · Unsubscribe anytime · 14-page PDF · Sent to your inbox</p>
              </>
            )}
          </div>
        </div>
      </section>

      {/* ── WHAT'S INSIDE ─────────────────────────────────────────────── */}
      <section className="py-20 px-6">
        <div className="max-w-[1100px] mx-auto">
          <div className="font-mono text-[11px] tracking-[0.14em] uppercase text-[#E8650A] flex items-center gap-2.5 mb-4">
            <span className="inline-block w-5 h-px bg-[#E8650A]" />
            What&apos;s Inside
          </div>
          <h2 className="text-[clamp(28px,4vw,44px)] font-extrabold tracking-[-0.025em] mb-3 leading-[1.15]">
            14 Pages of Real<br /><span className="signature-text-gradient">Consulting Deliverable</span>
          </h2>
          <p className="text-base text-[#8b89a0] max-w-[600px] leading-[1.7] mb-12">
            This is the actual format Susea.ai delivers to clients after a readiness assessment. Every section, framework, and recommendation you see is drawn from our real-world advisory work.
          </p>
          <div className="grid gap-4" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))" }}>
            {PAGES.map((p, i) => (
              <div key={i} className="bg-[#111118] border border-[rgba(255,255,255,0.06)] rounded-xl px-5 py-[22px] transition-colors hover:border-[rgba(255,255,255,0.11)]">
                <div className="font-mono text-[11px] text-[#4a4860] mb-2.5 tracking-[0.06em]">{p.num}</div>
                <div className="text-sm font-bold text-[#e8e6f0] mb-1.5 leading-snug">{p.title}</div>
                <div className="text-[12.5px] text-[#8b89a0] leading-[1.55]">{p.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SOCIAL PROOF ──────────────────────────────────────────────── */}
      <section className="py-[60px] px-6 border-t border-b border-[rgba(255,255,255,0.06)]">
        <div className="max-w-[1100px] mx-auto flex flex-wrap items-center justify-between gap-8">
          {[
            { n: "200+",    l: "AI systems reviewed"  },
            { n: "40+",     l: "Deployments rescued"   },
            { n: "4 wks",   l: "Average MVP delivery"  },
            { n: "USA & EU",l: "Operating regions"     },
            { n: "99.9%",   l: "Uptime maintained"     },
          ].map((s, i) => (
            <div key={i} className="text-center">
              <div className="text-4xl font-extrabold" style={{ background: GRAD, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>{s.n}</div>
              <div className="font-mono text-xs text-[#8b89a0] uppercase tracking-[0.06em] mt-1">{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── BOTTOM CTA ────────────────────────────────────────────────── */}
      <section className="py-24 px-6 text-center">
        <div className="max-w-[680px] mx-auto">
          <h2 className="text-[clamp(28px,4vw,48px)] font-extrabold tracking-[-0.025em] mb-4 leading-tight">
            Want a Real Readiness<br /><span className="signature-text-gradient">Report for Your Business?</span>
          </h2>
          <p className="text-base text-[#8b89a0] leading-[1.7] mb-9">
            The sample report shows what&apos;s possible. Book a free 20-minute strategy call and our team will walk through your organisation&apos;s actual AI readiness — no charge, no commitment.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2.5 text-white font-bold text-base px-10 py-4 rounded-xl no-underline transition-all hover:opacity-90 hover:-translate-y-0.5"
            style={{ background: GRAD, boxShadow: "0 8px 32px rgba(43,91,168,0.3)" }}
          >
            Book Free Strategy Call →
          </Link>
          <p className="mt-4 font-mono text-xs text-[#4a4860]">Free · 20 minutes · Real engineer · No pitch</p>
        </div>
      </section>
    </main>
  );
}
