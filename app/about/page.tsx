import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import { buildMetadata, ORGANIZATION_SCHEMA } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: "About Us",
  description:
    "Built by builders for builders. Susea.ai architects digital infrastructure that empowers visionaries to scale without limits. Learn our story, mission, and team.",
  path: "/about",
});

const VALUES = [
  {
    icon: "architecture",
    title: "Architectural First",
    desc: "We don't patch; we build foundations that withstand the weight of future scale.",
  },
  {
    icon: "precision_manufacturing",
    title: "Precision Engineering",
    desc: "Every detail is intentional. We prioritize clean, maintainable, and efficient logic.",
  },
  {
    icon: "group_work",
    title: "Radical Collaboration",
    desc: "We act as an extension of your team, sharing knowledge at every milestone.",
  },
  {
    icon: "visibility",
    title: "Visible Integrity",
    desc: "Transparent processes and honest communication form the core of our trust.",
  },
];

const TEAM = [
  {
    name: "Marcus Thorne",
    role: "Managing Partner",
    bio: "Ex-AWS Solution Architect with a passion for high-concurrency systems.",
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuBCoiZ4w6GsWLQ5z2NPjK8TFIGeP82WFIoGXFcLI6x1btqdESvEIc54RYY3EmvqrhQugLGh1QpjiMCyTe8r000mAiu6e2DAgAebbZUN7VJbBPEMjzF0jLkTMqAf306AMHvI3tY8dGQI-QRuVJ5fHHcNuHg-oJE9uduubJbI0QawV45TYJ4xKGSV_Xv0c5kaJUkM9uhWL9-kvLD0H0eYIFQFTtgyT5p9UMqxNeih3P2XdJIb6dzMlun9l2FqWWEfKvoUpr4rUstrv_jP",
  },
  {
    name: "Elena Vance",
    role: "Head of Design",
    bio: "Editorial designer turned product strategist. Obsessed with functional minimalism.",
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCUe7GQ_slxBpF3XQc4A-Isypd4sR4ZQdQ4iE27vmQYmuDBvuUIsuybEUvo76nhBv_cEPWBn4N5BkUVAplJRT7AL8-yCF82nL-_84yACf0zP1TeQdAZHmflQQywBvoReyXPWcNYSnpYOnWh68GdFnmBVouO7E6dWJ_zmTievfNUAKf70yw5NKDw-Vho_A_OXD59p0ipGOTkb5cdpTVL3DXSuu9Og1KZ-uoUYCsOC4HuYYR7w7J2KNas9EUO7bH4tp7BdN-lfhW8dy9W",
  },
  {
    name: "David Chen",
    role: "Chief Architect",
    bio: "The person behind our core proprietary infrastructure. System integrity specialist.",
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCPuDr4FzcjvcCPc6IVEAPHNtBZXqxsmdt7z2_34kLUlEwbXpnvvjBak0rFAfuZf2QZKLMVgsTtQvWQZRWAJ9ox7gTYFtyyU56Nquz16G2w46vHYaG0WL_zyEEzirxBJDVk2EEQMciA3nSaTMDBAtP5J8UmMD_veHHhBbJmasnYFUpViJAvIrYk55r9mKQt0mg8REnjSzy493BTAHxtqyK3S9dwJPX8z8mRCSKJ8YUz4efcnDQJfEy9zcLpqLczoEZQXAbaQwJE5QH8",
  },
  {
    name: "Sarah Jenkins",
    role: "Ops Strategy",
    bio: "Bridging the gap between engineering complexity and business outcomes.",
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuC5E8EQVdUWieATimj5mq1L7M_B0Yyyxo-_xPYWp8Oj8Ce-Vp3xFr4S7xAGJ0Z-fW7fIaM_XSvXbN8TVdy04VQcykzrWbn02sFQPMznMZ1xu6exqWk28sifrYItYOh01NLu4_z7BKrWXRWEi4kZ2-azxNLaNuldpnj8u_YwmrpEQEeI9y1iN-ndKrkAEYv2VgDyt5m7PhWlN0qnrXq9lP6Sb2saZXqk6E7zDJzYF3mazsb68VyGEw-whjVR_CuCJFYa8bkRYeSzsT3_",
  },
];

const ABOUT_PAGE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: "About Susea.ai",
  url: "https://susea.ai/about",
  description:
    "Built by builders for builders. Learn about Susea.ai's story, mission, values, and team.",
  mainEntity: ORGANIZATION_SCHEMA,
};

export default function AboutPage() {
  return (
    <>
      <JsonLd data={ABOUT_PAGE_SCHEMA} />

      {/* Hero */}
      <section className="relative min-h-[819px] flex items-center justify-center px-8 overflow-hidden pt-24">
        <div className="absolute inset-0 z-0" aria-hidden>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[120px]" />
          <div className="absolute top-1/4 right-0 w-[400px] h-[400px] bg-secondary-container/5 rounded-full blur-[100px]" />
        </div>
        <div className="relative z-10 max-w-5xl text-center">
          <span className="inline-block px-4 py-1 mb-6 rounded-full border border-outline-variant/30 text-xs font-mono uppercase tracking-[0.2em] text-primary">
            Our Genesis
          </span>
          <h1 className="text-6xl md:text-8xl font-headline font-extrabold tracking-tighter mb-8 leading-[0.9]">
            Built by Builders.
            <br />
            <span className="signature-gradient" style={{ WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              For Builders.
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-on-surface-variant max-w-2xl mx-auto font-light leading-relaxed">
            We architect the digital infrastructure that empowers visionaries to
            scale without limits.
          </p>
        </div>
      </section>

      {/* Founder Story */}
      <section className="py-32 px-8 bg-surface-container-low">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-20 items-center">
            <div className="space-y-8">
              <h2 className="text-4xl md:text-5xl font-headline font-bold tracking-tight">
                The Problem We Started to Solve
              </h2>
              <div className="space-y-6 text-on-surface-variant text-lg leading-relaxed font-body">
                <p>
                  For a decade, our founders sat in the same rooms as CTOs and
                  Lead Architects struggling with &ldquo;Frankenstein
                  Stacks&rdquo;—systems built under pressure that became their
                  own worst enemies.
                </p>
                <p>
                  We saw that the gap wasn&apos;t a lack of tools, but a lack
                  of{" "}
                  <span className="text-on-surface font-semibold">
                    architectural integrity
                  </span>
                  . We started Susea.ai to move beyond mere implementation and
                  return to the craft of building from first principles.
                </p>
              </div>
              <blockquote className="pt-6 border-l-2 border-secondary-container pl-6 italic text-on-surface/80">
                &ldquo;Innovation isn&apos;t adding more; it&apos;s refining
                what matters until the architecture becomes invisible.&rdquo;
              </blockquote>
            </div>
            <div className="relative group">
              <div className="aspect-[4/5] rounded-xl overflow-hidden bg-surface-container">
                <Image
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDtIi4Lr0ADdsZYjQki0jcZeEDMWJe_3PA23Wztghmtq6RmBcqZIWQr3BypkAt36m-OF7hcw0pDennnmP4_8WlUR-N-GLbWYeqW3uzbBBwyHubXhYjq7WFqcdAXYZ6Lpl9_2LDLPhrn-cLajfDRH950osqF1hAUrc_87PXjbuJyT75onx6GShjHtWpiQB0O9CbkKZleC7_Tc1cUAdmqxuohTZQqQTTPDLHFvszL3Kczdraqp5wp_bGE6YJkJPvYzGe32pDJVXfNTtlQ"
                  alt="Susea.ai office environment"
                  fill
                  className="object-cover grayscale opacity-60 group-hover:opacity-100 transition-all duration-700"
                />
              </div>
              <div className="absolute -bottom-10 -left-10 glass-panel p-8 rounded-xl border border-outline-variant/10 hidden md:block">
                <div className="text-4xl font-headline font-bold text-primary mb-1">10+</div>
                <div className="text-xs uppercase tracking-widest font-label text-on-surface-variant">
                  Years in Engineering
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="py-32 px-8" aria-labelledby="values-heading">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20 text-center">
            <h2 id="values-heading" className="text-4xl font-headline font-bold mb-4">
              Mission &amp; Values
            </h2>
            <p className="text-on-surface-variant max-w-xl mx-auto">
              Our guiding principles aren&apos;t just posters on a wall; they
              are the benchmarks for every line of code we ship.
            </p>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            {VALUES.map(({ icon, title, desc }) => (
              <div
                key={title}
                className="p-8 rounded-xl bg-surface-container border border-outline-variant/5 hover:border-primary/20 transition-all duration-300"
              >
                <span className="material-symbols-outlined text-4xl text-primary mb-6 block">
                  {icon}
                </span>
                <h3 className="text-xl font-headline font-bold mb-3">{title}</h3>
                <p className="text-on-surface-variant text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What's in a Name */}
      <section className="py-32 px-8 bg-surface-container-low">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-16">
            <div className="w-full md:w-1/2 flex justify-center">
              <div className="relative w-72 h-72">
                <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full" aria-hidden />
                <svg className="relative z-10 w-full h-full text-primary opacity-80" viewBox="0 0 100 100" aria-label="Nautilus spiral logo symbol">
                  <path
                    d="M50 0 C22.4 0 0 22.4 0 50 C0 77.6 22.4 100 50 100 C77.6 100 100 77.6 100 50 C100 22.4 77.6 0 50 0 M50 90 C27.9 90 10 72.1 10 50 C10 27.9 27.9 10 50 10 C72.1 10 90 27.9 90 50 C90 72.1 72.1 90 50 90 M50 20 C33.4 20 20 33.4 20 50 C20 66.6 33.4 80 50 80 C66.6 80 80 66.6 80 50 C80 33.4 66.6 20 50 20 M50 70 C39 70 30 61 30 50 C30 39 39 30 50 30 C61 30 70 39 70 50 C70 61 61 70 50 70 M50 40 C44.5 40 40 44.5 40 50 C40 55.5 44.5 60 50 60 C55.5 60 60 55.5 60 50 C60 44.5 55.5 40 50 40"
                    fill="currentColor"
                  />
                </svg>
              </div>
            </div>
            <div className="w-full md:w-1/2 space-y-6">
              <h2 className="text-4xl font-headline font-bold tracking-tight">
                What&apos;s in a Name?
              </h2>
              <p className="text-on-surface-variant text-lg font-body leading-relaxed">
                <span className="text-on-surface font-semibold">Susea</span> is
                inspired by the mathematical perfection of the Nautilus —
                specifically the logarithmic spiral. In nature, this form
                represents growth without changing shape.
              </p>
              <p className="text-on-surface-variant text-lg font-body leading-relaxed">
                For us, it symbolizes{" "}
                <span className="text-primary italic">Elegant Scalability</span>
                . Our logo and our name serve as constant reminders that the
                best solutions maintain their core integrity regardless of how
                large they grow.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-32 px-8" aria-labelledby="team-heading">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20">
            <h2 id="team-heading" className="text-4xl font-headline font-bold mb-4">
              The Team
            </h2>
            <p className="text-on-surface-variant">
              A collective of specialists obsessing over the details.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-12 gap-y-16">
            {TEAM.map(({ name, role, bio, src }) => (
              <div key={name} className="group">
                <div className="aspect-square bg-surface-container rounded-xl overflow-hidden mb-6 relative">
                  <Image
                    src={src}
                    alt={`Portrait of ${name}`}
                    fill
                    className="object-cover grayscale transition-all duration-500 group-hover:grayscale-0"
                  />
                </div>
                <h3 className="font-headline font-bold text-lg mb-1">{name}</h3>
                <p className="text-primary text-xs uppercase tracking-widest font-label mb-3">
                  {role}
                </p>
                <p className="text-on-surface-variant text-sm line-clamp-2">{bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Global Presence */}
      <section className="py-32 px-8 bg-surface-container-low">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-8">
            <div>
              <h2 className="text-4xl font-headline font-bold mb-4">Global Presence</h2>
              <p className="text-on-surface-variant max-w-md">
                While we are remote-first by design, our roots and partnerships
                span three continents.
              </p>
            </div>
            <div className="flex gap-8 text-sm font-label uppercase tracking-widest text-primary">
              <span>San Francisco</span>
              <span>London</span>
              <span>Singapore</span>
            </div>
          </div>
          <div className="relative w-full aspect-[21/9] bg-surface-container-lowest rounded-xl overflow-hidden border border-outline-variant/10">
            {/* Dot grid overlay */}
            <div
              className="absolute inset-0 z-10 opacity-20 pointer-events-none"
              style={{
                backgroundImage: "radial-gradient(circle at 2px 2px, #abc7ff 1px, transparent 0)",
                backgroundSize: "24px 24px",
              }}
              aria-hidden
            />
            {/* World map image — fills the full container */}
            <Image
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBcYz4MfqqRWnpb3H8p97OwaKUiIRIR59QVIbnnlARnDeTpudF7DFyIfvQHFDSQSSJRd-_58c7UGGqecgZ1gfgSrq9rYj_8EwfyaK_Llc_WaMdvRxyk7INLCRuqoiC4FL5tW2DO2zvgG-RB1BdfIussHtifMXp2ldGdygo331NFRUT5ZkWM49Zhvpxo3o6jQtQeVllm4q8LPniiAKWVyXcLOh6O3eaQj8ZfAHYpTc9A3red7xj72rljLtuEgtD8qFyr2G2HIS_pBvxC"
              alt="Abstract world map showing global office locations"
              fill
              className="object-cover opacity-30"
            />
            {/* Office markers — z-20 so they sit above the image and dot grid */}
            <div className="absolute inset-0 z-20">
              {/* San Francisco */}
              <div className="absolute top-[38%] left-[18%] flex flex-col items-center gap-1">
                <div className="w-3 h-3 bg-primary rounded-full animate-pulse shadow-[0_0_12px_#abc7ff]" />
                <span className="text-primary text-[10px] font-mono uppercase tracking-widest hidden md:block">SF</span>
              </div>
              {/* London */}
              <div className="absolute top-[32%] left-[47%] flex flex-col items-center gap-1">
                <div className="w-3 h-3 bg-primary rounded-full animate-pulse shadow-[0_0_12px_#abc7ff]" style={{ animationDelay: "0.4s" }} />
                <span className="text-primary text-[10px] font-mono uppercase tracking-widest hidden md:block">LDN</span>
              </div>
              {/* Singapore */}
              <div className="absolute top-[58%] left-[74%] flex flex-col items-center gap-1">
                <div className="w-3 h-3 bg-primary rounded-full animate-pulse shadow-[0_0_12px_#abc7ff]" style={{ animationDelay: "0.8s" }} />
                <span className="text-primary text-[10px] font-mono uppercase tracking-widest hidden md:block">SGP</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-40 px-8 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-headline font-extrabold tracking-tighter mb-8 leading-tight">
            Ready to build the
            <br />
            next era?
          </h2>
          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            <Link
              href="/contact"
              className="cta-gradient text-on-primary px-10 py-5 rounded-xl font-headline font-bold text-lg hover:scale-105 transition-transform"
            >
              Initiate Strategy
            </Link>
            <Link
              href="/case-studies"
              className="px-10 py-5 rounded-xl border border-outline-variant font-headline font-bold text-lg hover:bg-surface-container transition-colors"
            >
              View Engineering Specs
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
