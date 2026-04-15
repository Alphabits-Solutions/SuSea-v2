"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import clsx from "clsx";

const NAV_LINKS = [
  { label: "Services", href: "/services/agents" },
  { label: "Industries", href: "/#industries" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "About", href: "/about" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

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
          {NAV_LINKS.map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              className={clsx(
                "transition-colors duration-300",
                isActive(href)
                  ? "text-primary font-semibold border-b-2 border-primary pb-1"
                  : "text-on-surface hover:text-primary"
              )}
            >
              {label}
            </Link>
          ))}
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
        <div className="md:hidden bg-surface-container-low border-t border-outline-variant/10 px-8 py-6 flex flex-col gap-6">
          {NAV_LINKS.map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              onClick={() => setMenuOpen(false)}
              className={clsx(
                "font-headline text-base font-medium",
                isActive(href) ? "text-primary" : "text-on-surface"
              )}
            >
              {label}
            </Link>
          ))}
          <Link
            href="/contact"
            onClick={() => setMenuOpen(false)}
            className="bg-secondary-container text-on-secondary px-6 py-3 rounded-xl font-headline font-bold text-sm text-center"
          >
            Book a Call →
          </Link>
        </div>
      )}
    </header>
  );
}
