"use client";

import { useState } from "react";

type IndustryKey = "healthcare" | "finance" | "retail" | "manufacturing" | "education" | "trades";

interface Industry {
  icon: string;
  visualIcon: string;
  title: string;
  desc: string;
  cta: string;
}

const INDUSTRIES: Record<IndustryKey, Industry> = {
  healthcare: {
    icon: "health_and_safety",
    visualIcon: "health_and_safety",
    title: "Reducing Administrative Burnout in Clinical Environments",
    desc: "We deploy autonomous scheduling agents and AI transcription services that reduce paperwork by 40%. Focus on patients while our systems handle the data.",
    cta: "View Healthcare Case Study",
  },
  finance: {
    icon: "payments",
    visualIcon: "payments",
    title: "Securing High-Stakes Transactions",
    desc: "Implement AI-driven fraud detection and automated compliance reporting that scales with your volume.",
    cta: "View Finance Case Study",
  },
  retail: {
    icon: "shopping_cart",
    visualIcon: "shopping_cart",
    title: "Personalizing the Path to Purchase",
    desc: "Deploy intelligent recommendation engines and 24/7 customer support agents that increase conversion by 31%.",
    cta: "View Retail Case Study",
  },
  manufacturing: {
    icon: "factory",
    visualIcon: "factory",
    title: "Predicting Maintenance, Preventing Downtime",
    desc: "Our AI agents monitor sensor data in real-time to predict equipment failure before it happens.",
    cta: "View Manufacturing Case Study",
  },
  education: {
    icon: "school",
    visualIcon: "school",
    title: "Scaling Personalised Learning at Every Level",
    desc: "Adaptive AI tutors and automated grading systems that free educators to focus on what matters: teaching.",
    cta: "View Education Case Study",
  },
  trades: {
    icon: "construction",
    visualIcon: "construction",
    title: "Automating Estimates, Scheduling, and Compliance",
    desc: "From quote generation to job scheduling, our agents streamline the full trade services workflow end-to-end.",
    cta: "View Trades Case Study",
  },
};

const TABS = Object.keys(INDUSTRIES) as IndustryKey[];

export default function IndustriesSection() {
  const [active, setActive] = useState<IndustryKey>("healthcare");
  const industry = INDUSTRIES[active];

  return (
    <section
      className="bg-[#F7F7F5] py-32 overflow-hidden"
      aria-labelledby="industries-heading"
    >
      <div className="max-w-7xl mx-auto px-8">
        <h2
          id="industries-heading"
          className="font-headline text-4xl md:text-5xl font-extrabold tracking-tighter text-inverse-on-surface mb-16"
        >
          We Speak Your Industry&apos;s Language
        </h2>

        {/* Tab bar */}
        <div className="flex gap-4 mb-16 overflow-x-auto no-scrollbar pb-4">
          {TABS.map((key) => (
            <button
              key={key}
              onClick={() => setActive(key)}
              className={`px-8 py-3 font-headline font-medium rounded-full capitalize transition-colors whitespace-nowrap ${
                active === key
                  ? "bg-inverse-surface text-surface font-bold shadow-lg"
                  : "border border-outline-variant/30 text-inverse-on-surface hover:bg-surface-container-low"
              }`}
            >
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="p-12 bg-white rounded-xl shadow-xl border border-outline-variant/5">
            <span
              className="material-symbols-outlined text-secondary-container text-5xl mb-6 block"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              {industry.icon}
            </span>
            <h3 className="text-3xl font-headline font-extrabold text-inverse-on-surface mb-6">
              {industry.title}
            </h3>
            <p className="text-inverse-on-surface/70 text-lg mb-8 leading-relaxed">
              {industry.desc}
            </p>
            <button className="text-secondary-container font-headline font-bold flex items-center gap-2 hover:gap-4 transition-all">
              {industry.cta}{" "}
              <span className="material-symbols-outlined">arrow_forward</span>
            </button>
          </div>

          <div className="hidden lg:block">
            <div className="aspect-square signature-gradient rounded-xl opacity-20 relative flex items-center justify-center overflow-hidden">
              <span
                className="material-symbols-outlined text-[200px] text-primary"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                {industry.visualIcon}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
