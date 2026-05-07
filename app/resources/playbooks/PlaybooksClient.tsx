"use client";

import { useState } from "react";
import Link from "next/link";

const GRAD = "linear-gradient(135deg,#6BA3E8 0%,#2B5BA8 50%,#E8650A 100%)";

const PLAYBOOKS = [
  {
    icon: "help_outline",
    tag: "Agency Selection",
    title: "7 Questions to Ask Before Hiring an AI Agency",
    desc: "The exact questions that separate serious AI agencies from expensive experiments — before you sign a contract.",
  },
  {
    icon: "rocket_launch",
    tag: "Engineering",
    title: "From Vibe Code to Production",
    desc: "How to take AI-generated code and turn it into a battle-hardened, production-ready application without starting over.",
  },
  {
    icon: "warning",
    tag: "Strategy",
    title: "The $200K AI Mistake Report",
    desc: "Real case studies of expensive AI implementation failures — and the exact decision points where things went wrong.",
  },
  {
    icon: "calendar_month",
    tag: "Delivery",
    title: "The 4-Week AI MVP Playbook",
    desc: "Our proven week-by-week process for shipping a working AI MVP — from discovery to deployment in 28 days.",
  },
];

type CardState = "idle" | "form" | "sent";

export default function PlaybooksClient() {
  const n = PLAYBOOKS.length;
  const [cardStates, setCardStates] = useState<CardState[]>(Array(n).fill("idle"));
  const [emails,     setEmails]     = useState<string[]>(Array(n).fill(""));
  const [errors,     setErrors]     = useState<string[]>(Array(n).fill(""));
  const [notifyEmail,     setNotifyEmail]     = useState("");
  const [notifySubmitted, setNotifySubmitted] = useState(false);
  const [notifyError,     setNotifyError]     = useState("");

  function openForm(i: number) {
    setCardStates(prev => prev.map((s, j) => j === i ? "form" : s === "form" ? "idle" : s));
  }

  function closeForm(i: number) {
    setCardStates(prev => prev.map((s, j) => j === i ? "idle" : s));
    setErrors(prev => prev.map((e, j) => j === i ? "" : e));
  }

  function updateEmail(i: number, val: string) {
    setEmails(prev => prev.map((e, j) => j === i ? val : e));
    if (errors[i]) setErrors(prev => prev.map((e, j) => j === i ? "" : e));
  }

  function submit(i: number) {
    const email = emails[i].trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setErrors(prev => prev.map((e, j) => j === i ? "Please enter a valid email address." : e));
      return;
    }
    fetch("/api/capture-lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, playbook: PLAYBOOKS[i].title, source: "Playbooks" }),
    }).catch(console.error);
    setCardStates(prev => prev.map((s, j) => j === i ? "sent" : s));
  }

  function submitNotify() {
    const email = notifyEmail.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setNotifyError("Please enter a valid email address.");
      return;
    }
    setNotifyError("");
    fetch("/api/capture-lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, source: "Playbooks_Notify" }),
    }).catch(console.error);
    setNotifySubmitted(true);
  }

  return (
    <div className="pt-32 pb-24 px-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="space-y-6 mb-16 text-center">
        <span className="inline-block px-3 py-1 rounded-full border border-outline-variant/30 text-primary font-mono text-xs uppercase tracking-widest">
          Playbooks
        </span>
        <h1 className="text-5xl md:text-7xl font-headline font-extrabold tracking-tighter text-on-surface">
          AI <span className="signature-text-gradient">Playbooks</span>
        </h1>
        <p className="text-xl text-on-surface-variant leading-relaxed max-w-2xl mx-auto">
          Opinionated, step-by-step guides for rolling out AI in your organisation — distilled from 200+
          enterprise deployments across six industries. Enter your email and we&apos;ll send any playbook
          straight to your inbox.
        </p>
      </div>

      {/* Playbook cards */}
      <div className="grid md:grid-cols-2 gap-6 mb-20">
        {PLAYBOOKS.map(({ icon, tag, title, desc }, i) => {
          const state = cardStates[i];
          return (
            <div
              key={title}
              className="group glass-panel p-8 rounded-xl border border-outline-variant/15 relative overflow-hidden flex flex-col transition-colors hover:border-primary/30"
            >
              <div className="absolute inset-0 signature-gradient opacity-0 group-hover:opacity-5 transition-opacity pointer-events-none" />
              <div className="relative z-10 flex flex-col flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <span
                    className="material-symbols-outlined text-primary text-3xl"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    {icon}
                  </span>
                  <span className="px-2 py-1 bg-primary/10 text-primary text-[10px] font-bold uppercase rounded-full">
                    {tag}
                  </span>
                </div>
                <h3 className="font-headline font-bold text-on-surface text-lg mb-2 leading-snug group-hover:text-primary transition-colors">
                  {title}
                </h3>
                <p className="text-on-surface-variant text-sm leading-relaxed flex-1 mb-5">{desc}</p>

                {state === "idle" && (
                  <button
                    type="button"
                    onClick={() => openForm(i)}
                    className="flex items-center justify-between w-full"
                  >
                    <div className="flex items-center gap-2 text-secondary-container text-sm font-headline font-bold">
                      <span className="material-symbols-outlined text-base">mail</span>
                      Send to My Inbox
                    </div>
                    <span className="material-symbols-outlined text-on-surface-variant group-hover:translate-x-1 transition-transform">
                      arrow_forward
                    </span>
                  </button>
                )}

                {state === "form" && (
                  <div>
                    <p className="text-xs text-on-surface-variant mb-3 leading-relaxed">
                      Enter your work email — we&apos;ll send this playbook straight to your inbox. No spam, ever.
                    </p>
                    {errors[i] && (
                      <p className="text-xs text-red-400 font-mono mb-2">{errors[i]}</p>
                    )}
                    <div className="flex gap-2 mb-2">
                      <input
                        type="email"
                        placeholder="you@company.com"
                        autoFocus
                        value={emails[i]}
                        onChange={e => updateEmail(i, e.target.value)}
                        onKeyDown={e => e.key === "Enter" && submit(i)}
                        className="flex-1 bg-surface-container-high border border-outline-variant/30 rounded-lg px-3 py-2.5 text-sm text-on-surface placeholder:text-on-surface-variant/40 outline-none focus:border-primary transition-colors"
                        style={{ borderColor: errors[i] ? "#f05252" : undefined }}
                      />
                      <button
                        type="button"
                        onClick={() => submit(i)}
                        className="text-white px-4 py-2.5 rounded-lg font-headline font-bold text-sm hover:opacity-90 transition-opacity whitespace-nowrap"
                        style={{ background: GRAD }}
                      >
                        Send →
                      </button>
                    </div>
                    <button
                      type="button"
                      onClick={() => closeForm(i)}
                      className="text-xs text-on-surface-variant/50 hover:text-on-surface-variant transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                )}

                {state === "sent" && (
                  <div className="flex items-start gap-3 p-3.5 rounded-xl bg-primary/5 border border-primary/20">
                    <span className="text-lg flex-shrink-0 mt-0.5">📬</span>
                    <div>
                      <div className="text-sm font-bold text-on-surface">Playbook on its way!</div>
                      <div className="text-xs text-on-surface-variant mt-0.5 leading-relaxed">
                        Sent to <span className="font-medium">{emails[i].trim()}</span>. Check your spam folder if it doesn&apos;t arrive within a few minutes.
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* More coming section */}
      <div className="bg-surface-container rounded-2xl p-10 md:p-16 border border-outline-variant/10 text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full signature-gradient opacity-5 blur-[80px] pointer-events-none" />
        <div className="relative z-10 max-w-xl mx-auto space-y-6">
          <h2 className="text-3xl font-headline font-bold text-on-surface tracking-tighter">
            More playbooks coming
          </h2>
          <p className="text-on-surface-variant">
            We&apos;re writing playbooks for HIPAA-safe AI, compliance-first FinTech, and scaling AI ops. Get
            notified when they drop.
          </p>
          {notifySubmitted ? (
            <div className="flex items-center justify-center gap-3 p-4 rounded-xl bg-primary/5 border border-primary/20">
              <span className="text-lg">✅</span>
              <span className="text-sm font-medium text-on-surface">
                You&apos;re on the list — we&apos;ll email you when new playbooks drop.
              </span>
            </div>
          ) : (
            <>
              {notifyError && (
                <p className="text-xs text-red-400 font-mono -mt-2">{notifyError}</p>
              )}
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="email"
                  placeholder="you@company.ai"
                  value={notifyEmail}
                  onChange={e => { setNotifyEmail(e.target.value); setNotifyError(""); }}
                  onKeyDown={e => e.key === "Enter" && submitNotify()}
                  className="flex-1 bg-transparent border-b border-outline-variant focus:border-primary text-on-surface py-3 px-0 placeholder:text-outline/40 outline-none transition-colors"
                />
                <button
                  type="button"
                  onClick={submitNotify}
                  className="bg-secondary-container text-on-secondary px-8 py-3 rounded-xl font-headline font-bold hover:opacity-90 transition-opacity"
                >
                  Notify me
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Fallback CTA */}
      <div className="mt-12 text-center">
        <p className="text-on-surface-variant mb-4">Want a custom playbook for your organisation?</p>
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 text-primary font-headline font-bold hover:opacity-70 transition-opacity"
        >
          Talk to us
          <span className="material-symbols-outlined">arrow_forward</span>
        </Link>
      </div>
    </div>
  );
}
