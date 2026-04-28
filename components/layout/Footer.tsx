import Link from "next/link";
import Image from "next/image";

const SERVICES = [
  { label: "AI Agents", href: "/services/agents" },
  { label: "AI Consulting", href: "/services/consulting" },
  { label: "Rapid MVP", href: "/services/rapid-mvp" },
  { label: "Fix Agent", href: "/services/fix-agent" },
  { label: "Security", href: "/services/security" },
];

const COMPANY = [
  { label: "About Us", href: "/about" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

const LEGAL = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms of Service", href: "/terms-of-service" },
  { label: "Security", href: "/services/security" },
];

const TRUST_LOGOS = [
  { name: "Balaji Flexipack",  src: "/images/logos/balaji-flexipack.webp" },
  { name: "Sole Cookware",     src: "/images/logos/sole-cookware.webp" },
  { name: "Valiant Products",  src: "/images/logos/valiant-products.png" },
  { name: "eliora",            src: "/images/logos/eliora.webp" },
  { name: "SourceMate",        src: "/images/logos/sourcemate.png" },
  { name: "BrainMate",         src: "/images/logos/brainmate.png" },
];

export default function Footer() {
  return (
    <footer className="bg-[#1b1b1d] w-full rounded-t-[0.75rem]">
      {/* Client trust strip — appears on every page via footer */}
      <div className="max-w-7xl mx-auto px-12 pt-12 pb-8 border-b border-outline-variant/10">
        <p className="text-[#e4e2e4]/30 text-[10px] uppercase tracking-widest font-headline font-bold mb-5">
          Trusted by
        </p>
        <div className="flex flex-wrap gap-8 items-center">
          {TRUST_LOGOS.map(({ name, src }) => (
            <div key={name} className="opacity-40 hover:opacity-80 transition-opacity">
              <Image
                src={src}
                alt={name}
                width={100}
                height={28}
                className="h-7 w-auto object-contain"
                style={{ filter: "brightness(0) invert(1)" }}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-12 px-12 py-20 max-w-7xl mx-auto">
        {/* Brand */}
        <div className="col-span-2 md:col-span-1">
          <Link href="/" className="inline-block mb-6">
            <Image
              src="/images/horizontal.png"
              alt="Susea.ai"
              width={140}
              height={36}
              className="h-9 w-auto"
            />
          </Link>
          <p className="text-[#e4e2e4]/60 font-headline text-sm leading-relaxed max-w-xs">
            Precision engineering for the intelligent enterprise. Building the
            future of business operations.
          </p>
          <div className="flex gap-4 mt-6">
            <a
              href="https://linkedin.com/company/suseaai"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-primary hover:opacity-80 transition-opacity"
            >
              <span className="material-symbols-outlined">public</span>
            </a>
            <a
              href="https://twitter.com/suseaai"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter/X"
              className="text-primary hover:opacity-80 transition-opacity"
            >
              <span className="material-symbols-outlined">hub</span>
            </a>
            <a
              href="https://github.com/suseaai"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="text-primary hover:opacity-80 transition-opacity"
            >
              <span className="material-symbols-outlined">terminal</span>
            </a>
          </div>
        </div>

        {/* Services */}
        <div>
          <h4 className="font-headline text-sm uppercase tracking-widest text-primary mb-6">
            Services
          </h4>
          <ul className="space-y-4">
            {SERVICES.map(({ label, href }) => (
              <li key={label}>
                <Link
                  href={href}
                  className="text-[#e4e2e4]/60 hover:text-[#ed6910] hover:translate-x-1 transition-all inline-block text-sm"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Company */}
        <div>
          <h4 className="font-headline text-sm uppercase tracking-widest text-primary mb-6">
            Company
          </h4>
          <ul className="space-y-4">
            {COMPANY.map(({ label, href }) => (
              <li key={label}>
                <Link
                  href={href}
                  className="text-[#e4e2e4]/60 hover:text-[#ed6910] hover:translate-x-1 transition-all inline-block text-sm"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h4 className="font-headline text-sm uppercase tracking-widest text-primary mb-6">
            Legal
          </h4>
          <ul className="space-y-4">
            {LEGAL.map(({ label, href }) => (
              <li key={label}>
                <Link
                  href={href}
                  className="text-[#e4e2e4]/60 hover:text-[#ed6910] hover:translate-x-1 transition-all inline-block text-sm"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="max-w-7xl mx-auto px-12 pb-12 pt-8 border-t border-outline-variant/10 flex flex-col md:flex-row justify-between items-center gap-4">
        <span className="text-[#e4e2e4]/40 text-xs font-label uppercase tracking-widest">
          © {new Date().getFullYear()} Susea.ai. All rights reserved.
        </span>
        <div className="flex gap-6">
          <a
            href="https://linkedin.com/company/suseaai"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#e4e2e4]/40 text-xs hover:text-primary transition-colors uppercase tracking-widest"
          >
            LinkedIn
          </a>
          <a
            href="https://twitter.com/suseaai"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#e4e2e4]/40 text-xs hover:text-primary transition-colors uppercase tracking-widest"
          >
            Twitter (X)
          </a>
          <a
            href="https://github.com/suseaai"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#e4e2e4]/40 text-xs hover:text-primary transition-colors uppercase tracking-widest"
          >
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}
