"use client";

import { useState, useEffect, useCallback } from "react";

const NAV_ITEMS = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Education", href: "#education" },
  { label: "Contact", href: "#contact" },
];

export default function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);

      let currentId = "";
      for (const item of NAV_ITEMS) {
        const id = item.href.slice(1);
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 200) {
          currentId = id;
        }
      }
      setActive(currentId);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const handleNavClick = useCallback(() => {
    setMenuOpen(false);
  }, []);

  return (
    <header
      className={`site-header${scrolled ? " header-scrolled" : ""}${menuOpen ? " menu-open" : ""}`}
    >
      <nav className="header-nav">
        <a href="#hero" className="header-logo">
          MU
        </a>

        {/* Desktop links */}
        <div className="header-links">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`header-link${active === item.href.slice(1) ? " active" : ""}`}
            >
              {item.label}
            </a>
          ))}
        </div>

        {/* Hamburger toggle */}
        <button
          className={`hamburger${menuOpen ? " hamburger-active" : ""}`}
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
        >
          <span className="hamburger-line" />
          <span className="hamburger-line" />
          <span className="hamburger-line" />
        </button>
      </nav>

      {/* Mobile overlay */}
      <div className={`mobile-nav${menuOpen ? " mobile-nav-open" : ""}`}>
        <div className="mobile-nav-inner">
          {NAV_ITEMS.map((item, i) => (
            <a
              key={item.href}
              href={item.href}
              className={`mobile-nav-link${active === item.href.slice(1) ? " active" : ""}`}
              style={{ "--mobile-link-delay": `${80 + i * 60}ms` } as React.CSSProperties}
              onClick={handleNavClick}
            >
              <span className="mobile-nav-index">0{i + 1}</span>
              {item.label}
            </a>
          ))}
        </div>
        <div className="mobile-nav-footer">
          <div className="mobile-nav-line" />
        </div>
      </div>
    </header>
  );
}
