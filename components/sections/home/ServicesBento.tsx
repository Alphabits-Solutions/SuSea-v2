import Link from "next/link";

const SERVICES = [
  {
    icon: "bolt",
    title: "Pre-Built AI Agents",
    desc: "Plug-and-play intelligence for customer support, lead qualification, and document processing that integrate with your existing CRM.",
    href: "/services/agents",
    span: "md:col-span-8",
    large: true,
  },
  {
    icon: "psychology",
    title: "AI Consulting",
    desc: "Strategic readiness assessments to identify high-ROI AI opportunities in your workflow.",
    href: "/services/consulting",
    span: "md:col-span-4",
  },
  {
    icon: "rocket_launch",
    title: "Build MVP",
    desc: "Go from idea to market-ready product in exactly 4 weeks. Web, mobile, and SaaS expertise.",
    href: "/services/rapid-mvp",
    span: "md:col-span-4",
  },
  {
    icon: "health_metrics",
    title: "AI Code Rescue",
    desc: "Fixing broken integrations and optimizing inefficient AI pipelines for peak performance.",
    href: "/services/fix-agent",
    span: "md:col-span-4",
  },
  {
    icon: "security",
    title: "Security",
    desc: "Enterprise-grade compliance and data privacy layers for all AI implementations.",
    href: "/services/security",
    span: "md:col-span-4",
  },
];

export default function ServicesBento() {
  return (
    <section className="bg-surface py-32" aria-labelledby="services-heading">
      <div className="max-w-7xl mx-auto px-8">
        <div className="mb-20">
          <h2
            id="services-heading"
            className="font-headline text-4xl md:text-5xl font-extrabold tracking-tighter mb-4"
          >
            Everything Your Business Needs <br />
            to Win with AI
          </h2>
          <p className="text-lg text-on-surface-variant max-w-[620px]">
            One partner. Every capability. We take you from legacy systems to
            intelligence-first operations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {SERVICES.map(({ icon, title, desc, href, span, large }) => (
            <Link
              key={title}
              href={href}
              className={`${span} bg-surface-container p-10 rounded-xl relative overflow-hidden group hover:bg-surface-container-high transition-all duration-300`}
            >
              {large && (
                <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity" aria-hidden>
                  <span className="material-symbols-outlined text-9xl">smart_toy</span>
                </div>
              )}
              <div className="w-12 h-12 rounded-lg signature-gradient flex items-center justify-center mb-6">
                <span className="material-symbols-outlined text-white">{icon}</span>
              </div>
              <h3 className="text-2xl font-headline font-bold mb-4">{title}</h3>
              <p className="text-on-surface-variant max-w-md">{desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
