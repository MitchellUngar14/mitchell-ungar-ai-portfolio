"use client";

import { useEffect, useRef } from "react";

/** Scales the Letter-width resume sheet down to fit narrow screens. */
export default function SheetScaler({
  children,
}: {
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fitSheet = () => {
      const el = ref.current;
      if (!el) return;
      const w = window.innerWidth;
      el.style.zoom = w < 900 ? String(Math.max(0.4, (w - 16) / 868)) : "";
    };
    window.addEventListener("resize", fitSheet);
    fitSheet();
    return () => window.removeEventListener("resize", fitSheet);
  }, []);

  return (
    <div ref={ref} className="resume-scaler">
      {children}
    </div>
  );
}
