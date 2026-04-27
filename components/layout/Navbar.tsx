"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import clsx from "clsx";

const SERVICES_GROUPS = [
  {
    group: "Intelligence & Strategy",
    items: [
      { label: "Custom AI Agents", href: "/services/agents" },
      { label: "AI Readiness & Strategy", href: "/services/consulting" },
    ],
  },
  {
    group: "Engineering & Rescue",
    items: [
      { label: "4-Week Rapid MVP", href: "/services/rapid-mvp" },
      { label: "AI Code Rescue", href: "/services/vibe-code-rescue" },
      { label: "Agent Optimization", href: "/services/fix-agent" },
    ],
  },
  {
    group: "Enterprise Infrastructure",
    items: [
      { label: "Dedicated Engineering", href: "/services/hire" },
      { label: "Security & Compliance", href: "/services/security" },
      { label: "Managed Maintenance", href: "/services/maintenance" },
    ],
  },
];

const RESOURCES_GROUPS = [
  {
    group: "Free Resources",
    items: [{ label: "Free AI Tools", href: "/resources/free-tools" }],
  },
  {
    group: "Playbooks",
    items: [{ label: "AI Playbooks", href: "/resources/playbooks" }],
  },
];

const LANGUAGES = [
  { code: "en", label: "English" },
  { code: "es", label: "Español" },
  { code: "fr", label: "Français" },
  { code: "de", label: "Deutsch" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);
  const [mobileResourcesOpen, setMobileResourcesOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [activeLang, setActiveLang] = useState("en");

  const isServiceActive = () =>
    SERVICES_GROUPS.some((g) => g.items.some((item) => pathname === item.href));

  const isResourceActive = () =>
    RESOURCES_GROUPS.some((g) => g.items.some((item) => pathname === item.href));

  const isActive = (href: string) => {
    if (href.startsWith("/#")) return false;
    return pathname === href || pathname.startsWith(href + "/");
  };

  return (
    <header className="fixed top-0 w-full z-50 bg-surface/40 backdrop-blur-xl dark:bg-[#131315]/40 shadow-2xl shadow-[#e4e2e4]/5">
      <nav
        className="flex justify-between items-center px-8 py-4 max-w-7xl mx-auto"
        aria-label="Main navigation"
      >
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src="https://lh3.googleusercontent.com/aida/ADBb0ug0OFxIZ_kjpOZBQ1oZIRZsL_Bb5yKPAtQitY6-RG6SJbJJ2G6sMLY6oLBmnvbwbkmktyFzX4c88vNmOFEWJDk7lYg33Z-y-FRFtnVQnCc6bSv8FpIs3ffbi8wHTMSVHynI8C4xU6cVQH-H52gU9Nn-mJDGNZCpmlIf5RfnjK8WnQrW_bPsRd4QGuCY4dCgf7oPBhsCFylVCXpc-WXGdWuFZUOFhEyfCEqV9fe5MN5lwo_x4i_20DLzUQ86ZLeYf0lPa3zhkEmtjQo"
            alt="Susea.ai"
            width={120}
            height={32}
            className="h-8 w-auto"
            priority
          />
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8 font-headline text-base font-medium tracking-tight">
          {/* Services dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setServicesOpen(true)}
            onMouseLeave={() => setServicesOpen(false)}
          >
            <button
              className={clsx(
                "flex items-center gap-1 transition-colors duration-300",
                isServiceActive()
                  ? "text-primary font-semibold border-b-2 border-primary pb-1"
                  : "text-on-surface hover:text-primary"
              )}
              aria-expanded={servicesOpen}
              aria-haspopup="true"
            >
              Services
              <span
                className={clsx(
                  "material-symbols-outlined text-base transition-transform duration-200",
                  servicesOpen ? "rotate-180" : ""
                )}
              >
                expand_more
              </span>
            </button>

            {/* Dropdown panel — pt-3 bridges the gap so mouse never leaves the hover zone */}
            {servicesOpen && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3 w-[580px]">
                <div className="bg-surface-container-low border border-outline-variant/15 rounded-2xl shadow-2xl shadow-black/40 p-6">
                  <div className="grid grid-cols-3 gap-6">
                    {SERVICES_GROUPS.map(({ group, items }) => (
                      <div key={group}>
                        <p className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant font-bold mb-3 px-2">
                          {group}
                        </p>
                        <ul className="space-y-1">
                          {items.map(({ label, href }) => (
                            <li key={href}>
                              <Link
                                href={href}
                                onClick={() => setServicesOpen(false)}
                                className={clsx(
                                  "block px-2 py-2 rounded-lg text-sm font-medium transition-colors duration-150",
                                  pathname === href
                                    ? "text-primary bg-primary/10"
                                    : "text-on-surface hover:text-primary hover:bg-surface-container"
                                )}
                              >
                                {label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Case Studies */}
          <Link
            href="/case-studies"
            className={clsx(
              "transition-colors duration-300",
              isActive("/case-studies")
                ? "text-primary font-semibold border-b-2 border-primary pb-1"
                : "text-on-surface hover:text-primary"
            )}
          >
            Case Studies
          </Link>

          {/* Resources dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setResourcesOpen(true)}
            onMouseLeave={() => setResourcesOpen(false)}
          >
            <button
              className={clsx(
                "flex items-center gap-1 transition-colors duration-300",
                isResourceActive()
                  ? "text-primary font-semibold border-b-2 border-primary pb-1"
                  : "text-on-surface hover:text-primary"
              )}
              aria-expanded={resourcesOpen}
              aria-haspopup="true"
            >
              Resources
              <span
                className={clsx(
                  "material-symbols-outlined text-base transition-transform duration-200",
                  resourcesOpen ? "rotate-180" : ""
                )}
              >
                expand_more
              </span>
            </button>

            {resourcesOpen && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3 w-[320px]">
                <div className="bg-surface-container-low border border-outline-variant/15 rounded-2xl shadow-2xl shadow-black/40 p-6">
                  <div className="grid grid-cols-2 gap-6">
                    {RESOURCES_GROUPS.map(({ group, items }) => (
                      <div key={group}>
                        <p className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant font-bold mb-3 px-2">
                          {group}
                        </p>
                        <ul className="space-y-1">
                          {items.map(({ label, href }) => (
                            <li key={href}>
                              <Link
                                href={href}
                                onClick={() => setResourcesOpen(false)}
                                className={clsx(
                                  "block px-2 py-2 rounded-lg text-sm font-medium transition-colors duration-150",
                                  pathname === href
                                    ? "text-primary bg-primary/10"
                                    : "text-on-surface hover:text-primary hover:bg-surface-container"
                                )}
                              >
                                {label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* About */}
          <Link
            href="/about"
            className={clsx(
              "transition-colors duration-300",
              isActive("/about")
                ? "text-primary font-semibold border-b-2 border-primary pb-1"
                : "text-on-surface hover:text-primary"
            )}
          >
            About
          </Link>
        </div>

        {/* Language selector */}
        <div
          className="relative hidden md:block"
          onMouseEnter={() => setLangOpen(true)}
          onMouseLeave={() => setLangOpen(false)}
        >
          <button
            className="flex items-center gap-1 text-on-surface-variant hover:text-primary transition-colors text-sm font-medium"
            aria-label="Select language"
            aria-expanded={langOpen}
          >
            <span className="material-symbols-outlined text-base">language</span>
            <span className="uppercase font-mono text-xs">{activeLang}</span>
            <span className={clsx("material-symbols-outlined text-xs transition-transform duration-200", langOpen ? "rotate-180" : "")}>
              expand_more
            </span>
          </button>
          {langOpen && (
            <div className="absolute top-full right-0 pt-2 w-36">
              <div className="bg-surface-container-low border border-outline-variant/15 rounded-xl shadow-2xl shadow-black/40 py-2">
                {LANGUAGES.map(({ code, label }) => (
                  <button
                    key={code}
                    onClick={() => { setActiveLang(code); setLangOpen(false); }}
                    className={clsx(
                      "w-full text-left px-4 py-2 text-sm transition-colors",
                      activeLang === code
                        ? "text-primary font-semibold"
                        : "text-on-surface hover:text-primary hover:bg-surface-container"
                    )}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* CTA */}
        <Link
          href="/contact"
          className="hidden md:inline-flex bg-secondary-container text-on-secondary px-6 py-2.5 rounded-xl font-headline font-bold text-sm hover:opacity-80 transition-all duration-300 active:scale-95"
        >
          Book a Call →
        </Link>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-on-surface p-2"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Toggle menu"
        >
          <span className="material-symbols-outlined">
            {menuOpen ? "close" : "menu"}
          </span>
        </button>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-surface-container-low border-t border-outline-variant/10 px-8 py-6 flex flex-col gap-4">
          {/* Services accordion */}
          <button
            onClick={() => setMobileServicesOpen((prev) => !prev)}
            className={clsx(
              "flex items-center justify-between font-headline text-base font-medium w-full",
              isServiceActive() ? "text-primary" : "text-on-surface"
            )}
          >
            Services
            <span
              className={clsx(
                "material-symbols-outlined text-base transition-transform duration-200",
                mobileServicesOpen ? "rotate-180" : ""
              )}
            >
              expand_more
            </span>
          </button>

          {mobileServicesOpen && (
            <div className="pl-4 flex flex-col gap-5">
              {SERVICES_GROUPS.map(({ group, items }) => (
                <div key={group}>
                  <p className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant font-bold mb-2">
                    {group}
                  </p>
                  <ul className="space-y-1">
                    {items.map(({ label, href }) => (
                      <li key={href}>
                        <Link
                          href={href}
                          onClick={() => setMenuOpen(false)}
                          className={clsx(
                            "block py-1.5 text-sm font-medium",
                            pathname === href ? "text-primary" : "text-on-surface-variant"
                          )}
                        >
                          {label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}

          {/* Resources accordion */}
          <button
            onClick={() => setMobileResourcesOpen((prev) => !prev)}
            className={clsx(
              "flex items-center justify-between font-headline text-base font-medium w-full",
              isResourceActive() ? "text-primary" : "text-on-surface"
            )}
          >
            Resources
            <span
              className={clsx(
                "material-symbols-outlined text-base transition-transform duration-200",
                mobileResourcesOpen ? "rotate-180" : ""
              )}
            >
              expand_more
            </span>
          </button>

          {mobileResourcesOpen && (
            <div className="pl-4 flex flex-col gap-5">
              {RESOURCES_GROUPS.map(({ group, items }) => (
                <div key={group}>
                  <p className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant font-bold mb-2">
                    {group}
                  </p>
                  <ul className="space-y-1">
                    {items.map(({ label, href }) => (
                      <li key={href}>
                        <Link
                          href={href}
                          onClick={() => setMenuOpen(false)}
                          className={clsx(
                            "block py-1.5 text-sm font-medium",
                            pathname === href ? "text-primary" : "text-on-surface-variant"
                          )}
                        >
                          {label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}

          {/* Case Studies & About */}
          <Link
            href="/case-studies"
            onClick={() => setMenuOpen(false)}
            className={clsx(
              "font-headline text-base font-medium",
              isActive("/case-studies") ? "text-primary" : "text-on-surface"
            )}
          >
            Case Studies
          </Link>
          <Link
            href="/about"
            onClick={() => setMenuOpen(false)}
            className={clsx(
              "font-headline text-base font-medium",
              isActive("/about") ? "text-primary" : "text-on-surface"
            )}
          >
            About
          </Link>

          <Link
            href="/contact"
            onClick={() => setMenuOpen(false)}
            className="bg-secondary-container text-on-secondary px-6 py-3 rounded-xl font-headline font-bold text-sm text-center mt-2"
          >
            Book a Call →
          </Link>
        </div>
      )}
    </header>
  );
}
