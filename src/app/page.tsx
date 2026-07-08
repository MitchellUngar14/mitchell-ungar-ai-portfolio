"use client";

import { useEffect, useState, type CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import IntroAnimation from "@/components/IntroAnimation";
import RailNav from "@/components/RailNav";
import TopBar from "@/components/TopBar";
import ExperienceRow, { type ExperienceEntry } from "@/components/ExperienceRow";
import ProjectCard, { type Project } from "@/components/ProjectCard";
import SkillGroup, { type SkillGroupData } from "@/components/SkillGroup";

/* ──────────────────────────────────────────────
   Data
   ────────────────────────────────────────────── */

const SECTION_IDS = ["about", "experience", "work", "skills", "contact"];

const STATS: {
  value: string;
  suffix?: string;
  tone: "steel" | "rose";
  label: string;
}[] = [
  { value: "13", suffix: "+", tone: "steel", label: "Years shipping" },
  { value: "9", tone: "steel", label: "Direct reports" },
  { value: "$100K", suffix: "+", tone: "rose", label: "Costs saved" },
  { value: "4", tone: "rose", label: "Enterprise clients" },
];

const EXPERIENCE: ExperienceEntry[] = [
  {
    date: "2025 — NOW",
    tag: "FREELANCE",
    tagTone: "rose",
    company: "cEDH Canada",
    companyUrl: "https://cedhcanada.ca",
    note: "— cedhcanada.ca",
    role: "Sole Full Stack Developer — design, build & maintain",
    bulletTone: "rose",
    bullets: [
      "Built a production tournament platform solo, working directly with the business owner: Stripe ticketing, Swiss-pod tournaments with live round timers, decklist tracking, season leaderboards & metagame analytics",
      "Engineered a pluggable scoring engine (five ranking systems incl. Elo & Hareruya) and 4-player Swiss pairing handling byes, drops & re-pairing",
      "Delivered multi-tenant store league mini-sites with per-store branding, Stripe subscriptions, judge roles & audit logging",
      "Run CI/CD on GitHub Actions → Vercel previews with a Vitest 80% coverage gate and sharded Playwright E2E suites",
    ],
  },
  {
    date: "2024 — NOW",
    tag: "CONTRACT",
    tagTone: "rose",
    company: "Levio",
    companyUrl: "https://levio.ca/",
    client: "Liberty Mutual",
    clientUrl: "https://www.libertymutual.com/",
    role: "Principal Software Engineer",
    bulletTone: "steel",
    bullets: [
      "Designing and migrating rating systems from Ratabase to Earnix",
      "Setting up Windows servers for internal Web UI applications",
      "Coordinating with multiple vendors to ensure product stability",
    ],
  },
  {
    date: "2023 — NOW",
    tag: "LEADERSHIP",
    tagTone: "steel",
    company: "Levio",
    companyUrl: "https://levio.ca/",
    role: "Manager — team of 9",
    bulletTone: "rose",
    bullets: [
      "Managing a team of 9 across QA, Development, and Business Analysis",
      "Building career roadmaps to help team members reach their potential",
      "Conducting performance evaluations and making strategic staffing decisions",
    ],
  },
  {
    date: "2022 — 2024",
    tag: "CONTRACT",
    tagTone: "rose",
    company: "Levio",
    companyUrl: "https://levio.ca/",
    client: "AAA · CSAA",
    clientUrl: "https://www.ace.aaa.com/insurance.html",
    role: "Senior Full Stack Developer",
    bulletTone: "steel",
    bullets: [
      "Built AAA's new Motorcycle/Auto product alongside their development team",
      "Owned the report microservice using AWS Lambda, API Gateway & DynamoDB",
      "Designed AWS architecture and trained teams on business & technical practices",
    ],
  },
  {
    date: "2015 — 2022",
    company: "Benefits By Design",
    companyUrl: "https://www.bbd.ca/",
    note: "— Kingston, ON",
    role: "Senior Java Developer",
    bulletTone: "steel",
    last: true,
    bullets: [
      "Saved $100K+ in premium costs by modernizing legacy code",
      "Led MS SQL Server → PostgreSQL migration, reducing server costs",
      "Built multilingual reporting, enabling operations in Quebec",
      "Trained student developers into independent professionals",
      "Led multiple projects including outsourced developer teams",
    ],
  },
];

const PROJECTS: Project[] = [
  {
    title: "DeckTutor",
    description:
      "Magic: The Gathering deck analysis — mana curve analysis, combo detection, and Moxfield import/export.",
    stack: "NEXT.JS · TYPESCRIPT · DRIZZLE · POSTGRESQL · FASTAPI",
    liveUrl: "https://decktutor.vercel.app/",
    codeUrl: "https://github.com/MitchellUngar14/DeckTutor",
  },
  {
    title: "MythWeaver",
    description:
      "D&D companion — character management, dice roller, combat tracker, AI Dungeon Master, real-time sessions.",
    stack: "NEXT.JS · TYPESCRIPT · DRIZZLE · TAILWIND",
    liveUrl: "https://mythweavers.vercel.app/",
    codeUrl: "https://github.com/MitchellUngar14/MythWeaver",
    revealDelay: 70,
  },
  {
    title: "Whiteboard",
    description:
      "Digital whiteboard with task cards, sticky notes, drag-and-drop, and offline PWA support.",
    stack: "REACT 19 · VITE · INDEXEDDB · PWA",
    liveUrl: "https://muwhiteboard.vercel.app/",
    codeUrl: "https://github.com/MitchellUngar14/Whiteboard",
  },
  {
    title: "Legion Branch 560",
    description:
      "Community hub for Royal Canadian Legion Branch 560 — events, member info, menu, PWA install.",
    stack: "REACT · VITE · VERCEL · PWA",
    liveUrl: "https://legion560.vercel.app/",
    codeUrl: "https://github.com/MitchellUngar14/Legion",
    revealDelay: 70,
  },
  {
    title: "Bad Advice For Free",
    description:
      "Q&A platform with a tiered role system — ask, answer, and moderate content.",
    stack: "NEXT.JS · PRISMA · POSTGRESQL",
    liveUrl: "https://bad-advice-for-free.vercel.app/",
    codeUrl: "https://github.com/MitchellUngar14/BadAdviceForFree",
    revealDelay: 140,
  },
  {
    title: "Apogee Insurance",
    description: "Microserviced insurance platform with a working demo.",
    stack: "NEXT.JS · DRIZZLE · MICROSERVICES",
    demo: "DEMO: admin@example.com / password123",
    liveUrl: "https://apogee-insurance.vercel.app/",
    codeUrl: "https://github.com/MitchellUngar14/apogee-insurance",
    revealDelay: 210,
  },
];

const SKILLS: SkillGroupData[] = [
  {
    category: "LANGUAGES & FRAMEWORKS",
    tone: "steel",
    rows: [
      { name: "Java EE / Spring", years: "12+ YRS" },
      { name: "React / TypeScript", years: "5 YRS" },
      { name: "Next.js", years: "2 YRS" },
      { name: "Tailwind CSS", years: "2 YRS" },
    ],
  },
  {
    category: "CLOUD & DEVOPS",
    tone: "steel",
    revealDelay: 70,
    rows: [
      { name: "AWS (Lambda, DynamoDB, Gateway)", years: "3 YRS" },
      { name: "CI/CD (Jenkins, GH Actions)", years: "11 YRS" },
      { name: "Vercel (Previews, Prod)", years: "2 YRS" },
      { name: "Git / GitHub", years: "11+ YRS" },
    ],
  },
  {
    category: "BACKEND & DATA",
    tone: "steel",
    revealDelay: 140,
    rows: [
      { name: "PostgreSQL", years: "4 YRS" },
      { name: "MS SQL Server", years: "7 YRS" },
      { name: "Apache Kafka", years: "4 YRS" },
      { name: "Oracle SQL", years: "3 YRS" },
      { name: "Drizzle ORM", years: "2 YRS" },
      { name: "Stripe (Checkout, Webhooks)", years: "1 YR" },
      { name: "Auth.js / NextAuth", years: "1 YR" },
    ],
  },
  {
    category: "AI & TOOLING",
    tone: "rose",
    rows: [
      { name: "Prompt Engineering", years: "2 YRS" },
      { name: "Claude Code / Gemini CLI", years: "2 YRS" },
      { name: "RAG Pipelines (ChromaDB)", years: "1 YR" },
      { name: "Ollama (Local LLMs)", years: "1 YR" },
    ],
  },
  {
    category: "METHODOLOGIES & TESTING",
    tone: "steel",
    revealDelay: 70,
    rows: [
      { name: "Agile / Scrum / SAFe", years: "11 YRS" },
      { name: "Test-Driven Development", years: "7 YRS" },
      { name: "Microservices", years: "3 YRS" },
      { name: "Playwright / Vitest E2E", years: "1 YR" },
      { name: "Cypress", years: "1 YR" },
    ],
  },
  {
    category: "LEADERSHIP",
    tone: "rose",
    revealDelay: 140,
    rows: [
      { name: "Team Management", years: "3 YRS" },
      { name: "Developer Training", years: "7 YRS" },
      { name: "Project Leadership", years: "12+ YRS" },
    ],
  },
];

const EDUCATION: {
  school: string;
  program: React.ReactNode;
  date: string;
  tone: "steel" | "rose";
  revealDelay?: number;
}[] = [
  {
    school: "St. Lawrence College",
    program: "Computer Programmer Analyst — Advanced Diploma",
    date: "KINGSTON, ON · APRIL 2016",
    tone: "steel",
  },
  {
    school: "University of Alberta",
    program: (
      <>
        Software Architecture —{" "}
        <a
          href="https://www.coursera.org/account/accomplishments/verify/5949IR2PHXGM"
          target="_blank"
          rel="noopener noreferrer"
        >
          Certification ↗
        </a>
      </>
    ),
    date: "DECEMBER 2024",
    tone: "steel",
    revealDelay: 70,
  },
  {
    school: "Udemy",
    program: (
      <>
        Complete Guide to Software Architecture —{" "}
        <a
          href="https://www.udemy.com/certificate/UC-d01d89bc-2ef2-41c1-acb9-04b0c25f9860/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Certification ↗
        </a>
      </>
    ),
    date: "DECEMBER 2024",
    tone: "rose",
    revealDelay: 140,
  },
  {
    school: "Scrum Alliance",
    program: "Certified Scrum Developer (CSD)",
    date: "MAY 2022",
    tone: "rose",
    revealDelay: 210,
  },
];

const d = (ms: number) => ({ "--rd": `${ms}ms` }) as CSSProperties;

/* ──────────────────────────────────────────────
   Page
   ────────────────────────────────────────────── */

export default function Home() {
  const [introDone, setIntroDone] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  // One scroll listener drives both the top-bar state and the rail scroll-spy
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      let current = "";
      for (const id of SECTION_IDS) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 220) current = id;
      }
      setActiveSection(current);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll reveal — observation begins ~250ms after the intro exits
  useEffect(() => {
    if (!introDone) return;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduced) {
      document
        .querySelectorAll(".reveal")
        .forEach((el) => el.classList.add("in-view"));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
    );
    const timer = window.setTimeout(() => {
      document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    }, 250);
    return () => {
      window.clearTimeout(timer);
      observer.disconnect();
    };
  }, [introDone]);

  return (
    <>
      <IntroAnimation onComplete={() => setIntroDone(true)} />

      <div className="atmosphere" />
      <div className="grain" />

      <RailNav activeSection={activeSection} />

      <div className="main" id="top">
        <TopBar scrolled={scrolled} />

        {/* ══ Hero ══ */}
        <section className="hero">
          <div className="hero-kicker reveal">
            <span className="dot dot-steel" />
            <span style={{ color: "#8fb3cc" }}>Engineering</span>
            <span style={{ color: "#4a5f72" }}>×</span>
            <span className="dot dot-rose" />
            <span style={{ color: "#d4949b" }}>Leadership</span>
          </div>
          <h1 className="hero-title reveal" style={d(90)}>
            Mitchell
            <br />
            Ungar<span className="accent-period">.</span>
          </h1>
          <p className="hero-lede reveal" style={d(180)}>
            Principal engineer &amp; manager — 13+ years shipping{" "}
            <span className="hl-steel">enterprise systems</span>, leading{" "}
            <span className="hl-rose">teams of nine</span>, and putting{" "}
            <span className="hl-steel">AI tooling</span> to real work in
            insurance and fintech.
          </p>
          <div className="hero-meta reveal" style={d(260)}>
            KINGSTON, ON — OPEN TO CONSULTING &amp; TECHNICAL LEADERSHIP
          </div>
          <div className="hero-ctas reveal" style={d(340)}>
            <Link href="/resume" className="pill-primary pill-lg">
              View Resume ↓
            </Link>
            <a href="#work" className="btn-ghost">
              Explore Work →
            </a>
          </div>
        </section>

        {/* ══ Duality strip ══ */}
        <div className="duality reveal">
          <div className="duality-row">
            <span className="duality-label" style={{ color: "#6f92aa" }}>
              SYSTEMS
            </span>
            <div className="duality-bar" />
            <span className="duality-label" style={{ color: "#d4949b" }}>
              PEOPLE
            </span>
          </div>
        </div>

        {/* ══ Stats ══ */}
        <div className="stats reveal" style={d(80)}>
          {STATS.map(({ value, suffix, tone, label }) => (
            <div
              key={label}
              className={`stat${tone === "rose" ? " stat--rose" : ""}`}
            >
              <div className="stat-value">
                {value}
                {suffix && (
                  <span className={`stat-suffix-${tone}`}>{suffix}</span>
                )}
              </div>
              <div className="stat-label">{label}</div>
            </div>
          ))}
        </div>

        {/* ══ 01 About ══ */}
        <section id="about" className="section">
          <div className="section-head reveal" style={{ marginBottom: 34 }}>
            <span className="section-index">01</span>
            <h2 className="section-title">About</h2>
            <div className="section-rule" />
          </div>
          <div className="about-grid">
            <p className="about-p reveal">
              I spent 8 years at{" "}
              <span className="em-text">Benefits By Design</span> building a
              strong technical foundation in Java, Spring, databases, and
              CI/CD. My subsequent tenure at{" "}
              <span className="em-text">Levio</span> expanded that into React,
              TypeScript, AWS microservices, and AI tooling while giving me
              experience managing teams of developers and QA professionals.
            </p>
            <p className="about-p reveal" style={d(100)}>
              I thrive in challenging, project-based environments and believe{" "}
              <span className="em-steel">rigorous testing</span> and{" "}
              <span className="em-rose">strong standards</span> are the
              foundation of every great product. I&apos;m dedicated to
              continuous growth through hands-on experience and ongoing
              education.
            </p>
          </div>
        </section>

        {/* ══ 02 Experience ══ */}
        <section id="experience" className="section section--experience">
          <div className="section-head reveal" style={{ marginBottom: 10 }}>
            <span className="section-index">02</span>
            <h2 className="section-title">Experience</h2>
            <div className="section-rule" />
            <span className="section-meta">2015 — 2026</span>
          </div>
          {EXPERIENCE.map((entry) => (
            <ExperienceRow key={`${entry.company}-${entry.date}`} entry={entry} />
          ))}
        </section>

        {/* ══ 03 Selected Work ══ */}
        <section id="work" className="section">
          <div className="section-head reveal" style={{ marginBottom: 30 }}>
            <span className="section-index">03</span>
            <h2 className="section-title">Selected Work</h2>
            <div className="section-rule" />
            <span className="section-meta">7 PROJECTS / ALL LIVE</span>
          </div>

          {/* Featured — cEDH Canada */}
          <div className="featured reveal">
            <div className="featured-shot">
              <Image
                src="/cedh-canada.png"
                alt="cEDH Canada — About page screenshot"
                fill
                sizes="(max-width: 820px) 100vw, 50vw"
                style={{ objectFit: "cover" }}
              />
            </div>
            <div className="featured-body">
              <div>
                <span className="featured-badge">
                  FEATURED · FREELANCE · SOLO BUILD
                </span>
              </div>
              <div className="featured-titlerow">
                <div className="featured-title">cEDH Canada</div>
                <a
                  href="https://cedhcanada.ca"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="featured-link"
                >
                  CEDHCANADA.CA ↗
                </a>
              </div>
              <p className="featured-desc">
                Production tournament platform for Canada&apos;s competitive
                Commander community — Stripe ticketing, Swiss-pod tournament
                management with live round timers, decklist tracking, season
                leaderboards, and branded store league mini-sites. Designed and
                built end-to-end as the sole developer.
              </p>
              <div className="featured-points">
                <div className="featured-point">
                  Pluggable scoring engine — five ranking systems behind one
                  interface
                </div>
                <div className="featured-point">
                  4-player Swiss pod pairing with byes, drops &amp; phantom
                  losses
                </div>
                <div className="featured-point">
                  Multi-tenant league mini-sites with per-store theming &amp;
                  subscriptions
                </div>
              </div>
              <div className="featured-stack">
                NEXT.JS 16 · REACT 19 · TAILWIND V4 · POSTGRESQL · DRIZZLE ·
                STRIPE · AUTH.JS · PLAYWRIGHT
              </div>
            </div>
          </div>

          <div className="work-grid">
            {PROJECTS.map((project) => (
              <ProjectCard key={project.title} project={project} />
            ))}
          </div>
        </section>

        {/* ══ 04 Skills & Education ══ */}
        <section id="skills" className="section">
          <div className="section-head reveal" style={{ marginBottom: 30 }}>
            <span className="section-index">04</span>
            <h2 className="section-title">Skills</h2>
            <div className="section-rule" />
          </div>
          <div className="skills-grid">
            {SKILLS.map((group) => (
              <SkillGroup key={group.category} group={group} />
            ))}
          </div>

          <div className="edu-head reveal">
            <span className="section-index">04.B</span>
            <h3 className="edu-title">Education &amp; Certifications</h3>
            <div className="section-rule" />
          </div>
          <div className="edu-grid">
            {EDUCATION.map(({ school, program, date, tone, revealDelay }) => (
              <div
                key={school}
                className={`edu-item reveal${tone === "rose" ? " edu-item--rose" : ""}`}
                style={revealDelay ? d(revealDelay) : undefined}
              >
                <div className="edu-school">{school}</div>
                <div className="edu-program">{program}</div>
                <div className="edu-date">{date}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ══ 05 Contact ══ */}
        <section id="contact" className="section section--contact">
          <div className="section-head reveal">
            <span className="section-index">05</span>
            <h2 className="section-title">Contact</h2>
            <div className="section-rule" />
          </div>
          <div className="contact-grid">
            <div className="reveal">
              <div className="contact-title">
                Let&apos;s talk<span className="accent-period">.</span>
              </div>
              <p className="contact-sub">
                Whether you&apos;re looking for a consultant, a technical
                leader, or just want to connect — I&apos;d love to hear from
                you.
              </p>
            </div>
            <div className="contact-links reveal" style={d(100)}>
              <a href="mailto:mitchell.ungar@gmail.com" className="contact-row">
                <span className="contact-label">EMAIL</span>
                <span className="contact-value">
                  mitchell.ungar@gmail.com ↗
                </span>
              </a>
              <a
                href="https://www.linkedin.com/in/mitchell-ungar-552879168/"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-row"
              >
                <span className="contact-label">LINKEDIN</span>
                <span className="contact-value">Mitchell Ungar ↗</span>
              </a>
              <a
                href="https://github.com/MitchellUngar14"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-row"
              >
                <span className="contact-label">GITHUB</span>
                <span className="contact-value">MitchellUngar14 ↗</span>
              </a>
            </div>
          </div>
        </section>

        {/* ══ Footer ══ */}
        <footer className="footer">
          <span className="footer-copy">© 2026 MITCHELL UNGAR</span>
          <div className="footer-ornament">
            <span className="footer-dot" style={{ background: "#6f92aa" }} />
            <span className="footer-line" />
            <span className="footer-dot" style={{ background: "#c4727a" }} />
          </div>
          <a href="#top" className="footer-top">
            BACK TO TOP ↑
          </a>
        </footer>
      </div>
    </>
  );
}
