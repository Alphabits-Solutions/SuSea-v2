"use client";

import { useState, FormEvent } from "react";

interface FormState {
  name: string;
  email: string;
  company: string;
  country: string;
  industry: string;
  service: string;
  message: string;
  referral: string;
}

const INITIAL: FormState = {
  name: "",
  email: "",
  company: "",
  country: "",
  industry: "",
  service: "AI Strategy Consultation",
  message: "",
  referral: "",
};

export default function ContactForm() {
  const [form, setForm] = useState<FormState>(INITIAL);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Failed");
      setStatus("success");
      setForm(INITIAL);
    } catch {
      setStatus("error");
    }
  };

  const inputClass =
    "w-full bg-transparent border-b border-outline-variant/30 py-3 focus:outline-none focus:border-primary transition-colors text-on-surface placeholder:text-outline/40";

  return (
    <div className="bg-surface-container-low p-8 rounded-xl border border-outline-variant/10">
      {status === "success" ? (
        <div className="text-center py-16 space-y-4">
          <span className="material-symbols-outlined text-6xl text-primary">check_circle</span>
          <h3 className="text-2xl font-headline font-bold">Message Sent!</h3>
          <p className="text-on-surface-variant">
            We&apos;ll get back to you within 1 business day.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-8" noValidate>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label htmlFor="name" className="block text-xs font-mono uppercase tracking-widest text-outline">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                placeholder="John Doe"
                value={form.name}
                onChange={handleChange}
                className={inputClass}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="block text-xs font-mono uppercase tracking-widest text-outline">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="john@acme.com"
                value={form.email}
                onChange={handleChange}
                className={inputClass}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label htmlFor="company" className="block text-xs font-mono uppercase tracking-widest text-outline">
                Company
              </label>
              <input
                id="company"
                name="company"
                type="text"
                placeholder="Acme Inc."
                value={form.company}
                onChange={handleChange}
                className={inputClass}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="country" className="block text-xs font-mono uppercase tracking-widest text-outline">
                Country
              </label>
              <input
                id="country"
                name="country"
                type="text"
                placeholder="United States"
                value={form.country}
                onChange={handleChange}
                className={inputClass}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label htmlFor="industry" className="block text-xs font-mono uppercase tracking-widest text-outline">
                Industry
              </label>
              <input
                id="industry"
                name="industry"
                type="text"
                placeholder="Fintech"
                value={form.industry}
                onChange={handleChange}
                className={inputClass}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="service" className="block text-xs font-mono uppercase tracking-widest text-outline">
                Service needed
              </label>
              <select
                id="service"
                name="service"
                value={form.service}
                onChange={handleChange}
                className={`${inputClass} appearance-none`}
              >
                <option className="bg-surface">AI Strategy Consultation</option>
                <option className="bg-surface">Custom LLM Development</option>
                <option className="bg-surface">Automation Workflow</option>
                <option className="bg-surface">AI Code Rescue</option>
                <option className="bg-surface">Security Review</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="message" className="block text-xs font-mono uppercase tracking-widest text-outline">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={4}
              placeholder="Tell us about your challenge..."
              value={form.message}
              onChange={handleChange}
              className={`${inputClass} resize-none`}
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="referral" className="block text-xs font-mono uppercase tracking-widest text-outline">
              How did you hear about us?
            </label>
            <input
              id="referral"
              name="referral"
              type="text"
              placeholder="LinkedIn, Referral, etc."
              value={form.referral}
              onChange={handleChange}
              className={inputClass}
            />
          </div>

          {status === "error" && (
            <p className="text-error text-sm">Something went wrong. Please try again.</p>
          )}

          <button
            type="submit"
            disabled={status === "loading"}
            className="w-full signature-gradient text-white font-headline font-bold py-5 rounded-xl text-lg hover:shadow-xl hover:shadow-secondary/20 transition-all active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {status === "loading" ? "Sending…" : "Send Message →"}
          </button>
        </form>
      )}
    </div>
  );
}
