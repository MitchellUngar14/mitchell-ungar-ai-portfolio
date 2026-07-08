"use client";

import Link from "next/link";

const LINKS = [
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#work", label: "Work" },
  { href: "#skills", label: "Skills" },
  { href: "#contact", label: "Contact" },
];

/** Sticky top bar — transparent at top, glassy after 40px of scroll. */
export default function TopBar({ scrolled }: { scrolled: boolean }) {
  return (
    <div className={`topbar${scrolled ? " scrolled" : ""}`}>
      <span className="topbar-crumb">Portfolio — 2026</span>
      <div className="topbar-nav">
        {LINKS.map(({ href, label }) => (
          <a key={href} href={href} className="topbar-link">
            {label}
          </a>
        ))}
        <Link href="/resume" className="pill-primary pill-sm">
          Resume ↓
        </Link>
      </div>
    </div>
  );
}
