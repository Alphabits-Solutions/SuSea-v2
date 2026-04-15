const STEPS = [
  {
    number: "01",
    title: "Discover",
    desc: "We deep-dive into your ops to find the exact bottlenecks where AI can save time and money.",
  },
  {
    number: "02",
    title: "Design",
    desc: "Custom architecting the LLM workflows and infrastructure needed for your specific use case.",
  },
  {
    number: "03",
    title: "Build & Deploy",
    desc: "Rapid engineering and seamless integration into your current tech stack with zero downtime.",
  },
  {
    number: "04",
    title: "Improve",
    desc: "Continuous monitoring and feedback loops to ensure your AI gets smarter with every interaction.",
  },
];

export default function HowItWorks() {
  return (
    <section
      className="bg-surface-container-low py-32"
      aria-labelledby="how-it-works-heading"
    >
      <div className="max-w-7xl mx-auto px-8">
        <h2
          id="how-it-works-heading"
          className="font-headline text-4xl md:text-5xl font-extrabold tracking-tighter mb-24 text-center"
        >
          How We Work
        </h2>

        <div className="relative">
          {/* Connecting line */}
          <div
            className="absolute top-1/2 left-0 w-full h-px bg-outline-variant/20 hidden lg:block -translate-y-12"
            aria-hidden
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {STEPS.map(({ number, title, desc }) => (
              <div key={number} className="relative z-10">
                <div className="signature-text-gradient font-headline font-black text-6xl mb-6">
                  {number}
                </div>
                <h4 className="text-xl font-headline font-bold mb-3">{title}</h4>
                <p className="text-on-surface-variant">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
