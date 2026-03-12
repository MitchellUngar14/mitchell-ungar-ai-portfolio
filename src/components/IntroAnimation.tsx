"use client";

import { useState, useEffect, useRef } from "react";

interface IntroAnimationProps {
  onComplete: () => void;
}

export default function IntroAnimation({ onComplete }: IntroAnimationProps) {
  const [phase, setPhase] = useState<"playing" | "exiting" | "done">(
    "playing"
  );
  const hasTriggeredExit = useRef(false);
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  });

  const exit = () => {
    if (hasTriggeredExit.current) return;
    hasTriggeredExit.current = true;
    setPhase("exiting");
    setTimeout(() => {
      setPhase("done");
      onCompleteRef.current();
    }, 900);
  };

  useEffect(() => {
    // Respect reduced-motion preference
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setPhase("done");
      onCompleteRef.current();
      return;
    }

    // Auto-exit after full animation sequence
    const timer = setTimeout(exit, 3600);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Skip on any keypress
  useEffect(() => {
    const handleKey = () => exit();
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (phase === "done") return null;

  return (
    <div
      className={`intro-overlay${phase === "exiting" ? " intro-exiting" : ""}`}
      onClick={exit}
      role="presentation"
      aria-hidden="true"
    >
      {/* Film grain texture */}
      <div className="intro-grain" />

      {/* Subtle ambient light */}
      <div className="intro-ambient" />

      {/* Letter animation */}
      <div className="intro-center">
        <svg
          className="mu-svg"
          viewBox="0 0 680 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* M — cold blue (technology) */}
          <path
            className="letter-path letter-m"
            d="M 20,190 L 20,15 L 170,145 L 320,15 L 320,190"
            stroke="#8fb3cc"
            strokeWidth="6"
            strokeLinecap="square"
            strokeLinejoin="miter"
          />
          {/* U — warm rose (urgency) */}
          <path
            className="letter-path letter-u"
            d="M 380,15 L 380,125 C 380,185 430,195 520,195 C 610,195 660,185 660,125 L 660,15"
            stroke="#c4727a"
            strokeWidth="6"
            strokeLinecap="square"
            strokeLinejoin="miter"
          />
        </svg>

        {/* Decorative line */}
        <div className="intro-line" />
      </div>

      {/* Skip hint */}
      <p className="intro-hint">click anywhere to skip</p>
    </div>
  );
}
