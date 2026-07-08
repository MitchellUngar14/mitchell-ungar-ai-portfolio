"use client";

import { useEffect, useRef, useState } from "react";

const SEEN_KEY = "mu-intro-seen";

/**
 * Full-viewport intro: the MU monogram strokes draw in, then the monogram
 * "docks" into the rail logo (FLIP flight computed at exit time so it works
 * for both the desktop rail and the mobile bottom bar).
 */
export default function IntroAnimation({
  onComplete,
}: {
  onComplete: () => void;
}) {
  const [done, setDone] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const monogramRef = useRef<SVGSVGElement>(null);
  const exitedRef = useRef(false);
  const finishTimerRef = useRef<number | undefined>(undefined);
  const autoExitRef = useRef<number | undefined>(undefined);
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  });

  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const seen = sessionStorage.getItem(SEEN_KEY) === "1";

    const finishIntro = () => {
      sessionStorage.setItem(SEEN_KEY, "1");
      setDone(true);
      onCompleteRef.current();
    };

    const exitIntro = () => {
      if (exitedRef.current) return;
      exitedRef.current = true;
      window.clearTimeout(autoExitRef.current);

      const overlay = overlayRef.current;
      const monogram = monogramRef.current;
      const logo = document.getElementById("rail-logo");

      overlay?.classList.add("exiting");

      if (monogram && logo) {
        const mr = monogram.getBoundingClientRect();
        const lr = logo.getBoundingClientRect();
        const scale = (lr.width * 1.6) / mr.width;
        const dx = lr.left + lr.width / 2 - (mr.left + mr.width / 2);
        const dy = lr.top + lr.height / 2 - (mr.top + mr.height / 2);
        monogram.style.transition =
          "transform 0.85s cubic-bezier(0.65, 0.05, 0.25, 1), opacity 0.5s ease 0.45s";
        monogram.style.transform = `translate(${dx}px, ${dy}px) scale(${scale})`;
        monogram.style.opacity = "0";
        logo.style.animation =
          "railLogoIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.55s both";
      } else if (monogram) {
        monogram.style.transition = "opacity 0.6s ease";
        monogram.style.opacity = "0";
      }

      finishTimerRef.current = window.setTimeout(finishIntro, 950);
    };

    if (reduced || seen) {
      exitedRef.current = true;
      finishTimerRef.current = window.setTimeout(finishIntro, 50);
      return () => window.clearTimeout(finishTimerRef.current);
    }

    autoExitRef.current = window.setTimeout(exitIntro, 3400);
    const onKey = () => exitIntro();
    window.addEventListener("keydown", onKey);
    const overlay = overlayRef.current;
    overlay?.addEventListener("click", exitIntro);

    return () => {
      window.clearTimeout(autoExitRef.current);
      window.clearTimeout(finishTimerRef.current);
      window.removeEventListener("keydown", onKey);
      overlay?.removeEventListener("click", exitIntro);
    };
  }, []);

  if (done) return null;

  return (
    <div ref={overlayRef} className="intro-overlay" aria-hidden="true">
      <div className="intro-grain" />
      <div className="intro-ambient" />
      <div className="intro-center">
        <svg
          ref={monogramRef}
          className="intro-monogram"
          viewBox="0 0 680 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            className="intro-path intro-path-m"
            d="M 20,190 L 20,15 L 170,145 L 320,15 L 320,190"
          />
          <path
            className="intro-path intro-path-u"
            d="M 380,15 L 380,125 C 380,185 430,195 520,195 C 610,195 660,185 660,125 L 660,15"
          />
        </svg>
        <div className="intro-line" />
        <div className="intro-caption">
          <span style={{ color: "#8fb3cc" }}>Engineering</span>
          <span style={{ color: "#4a5f72" }}>×</span>
          <span style={{ color: "#d4949b" }}>Leadership</span>
        </div>
      </div>
      <p className="intro-hint">click to skip</p>
    </div>
  );
}
