"use client";

import Link from "next/link";

/** Screen-only toolbar on the resume page (hidden when printing). */
export default function ResumeToolbar() {
  return (
    <div className="resume-toolbar no-print">
      <Link href="/" className="resume-back">
        ← BACK TO PORTFOLIO
      </Link>
      <span className="resume-toolbar-label">
        RESUME — ATS-OPTIMIZED · PRINTS TO US LETTER
      </span>
      <button
        type="button"
        className="pill-primary pill-sm resume-print-btn"
        onClick={() => window.print()}
      >
        Print / Save PDF
      </button>
    </div>
  );
}
