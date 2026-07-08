"use client";

const NAV_ITEMS = [
  { id: "about", num: "01" },
  { id: "experience", num: "02" },
  { id: "work", num: "03" },
  { id: "skills", num: "04" },
  { id: "contact", num: "05" },
];

/** Fixed left rail on desktop; becomes a bottom bar ≤820px (see globals.css). */
export default function RailNav({ activeSection }: { activeSection: string }) {
  return (
    <div className="rail">
      <a id="rail-logo" className="rail-logo" href="#top">
        MU
      </a>
      <div className="rail-nums">
        {NAV_ITEMS.map(({ id, num }) => (
          <a
            key={id}
            href={`#${id}`}
            className={`rail-num${activeSection === id ? " active" : ""}`}
            aria-label={id}
          >
            {num}
          </a>
        ))}
      </div>
      <div className="rail-loc">Kingston · ON · 2026</div>
    </div>
  );
}
