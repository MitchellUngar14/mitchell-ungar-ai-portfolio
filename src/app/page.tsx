"use client";

import { useState, useEffect } from "react";
import ProjectCard from "@/components/ProjectCard";
import IntroAnimation from "@/components/IntroAnimation";
import SiteHeader from "@/components/SiteHeader";
import React from "react";

/* ──────────────────────────────────────────────
   Resume data (curated from resume-2025.md)
   ────────────────────────────────────────────── */

const EXPERIENCE = [
  {
    company: "Levio",
    companyUrl: "https://levio.ca/",
    client: "Liberty Mutual",
    clientUrl: "https://www.libertymutual.com/",
    role: "Principal Software Engineer",
    type: "Contract",
    period: "Apr 2024 — Present",
    bullets: [
      "Designing and migrating rating systems from Ratabase to Earnix",
      "Setting up Windows servers for internal Web UI applications",
      "Coordinating with multiple vendors to ensure product stability",
    ],
  },
  {
    company: "Levio",
    companyUrl: "https://levio.ca/",
    role: "Manager",
    period: "Apr 2023 — Present",
    bullets: [
      "Managing a team of 9 across QA, Development, and Business Analysis",
      "Building career roadmaps to help team members reach their potential",
      "Conducting performance evaluations and making strategic staffing decisions",
    ],
  },
  {
    company: "Levio",
    companyUrl: "https://levio.ca/",
    client: "AAA / CSAA",
    clientUrl: "https://www.ace.aaa.com/insurance.html",
    role: "Senior Full Stack Developer",
    type: "Contract",
    period: "Apr 2022 — Apr 2024",
    bullets: [
      "Built AAA's new Motorcycle/Auto product alongside their development team",
      "Owned the report microservice using AWS Lambda, API Gateway & DynamoDB",
      "Designed AWS architecture and trained teams on business & technical practices",
    ],
  },
  {
    company: "Benefits By Design",
    companyUrl: "https://www.bbd.ca/",
    location: "Kingston, ON",
    role: "Senior Java Developer",
    period: "May 2015 — Mar 2022",
    bullets: [
      "Saved $100K+ in premium costs by modernizing legacy code",
      "Led MS SQL Server → PostgreSQL migration, reducing server costs",
      "Built multilingual reporting, enabling operations in Quebec",
      "Trained student developers into independent professionals",
      "Led multiple projects including outsourced developer teams",
    ],
  },
];

const SKILLS = [
  {
    category: "Languages & Frameworks",
    items: [
      { name: "Java EE / Spring", yrs: "11+" },
      { name: "React / TypeScript", yrs: "4" },
      { name: "Next.js", yrs: "2" },
    ],
  },
  {
    category: "Cloud & DevOps",
    items: [
      { name: "AWS (Lambda, DynamoDB, Gateway)", yrs: "3" },
      { name: "CI/CD (Jenkins, GH Actions)", yrs: "11" },
      { name: "Git / GitHub", yrs: "11+" },
    ],
  },
  {
    category: "Databases",
    items: [
      { name: "PostgreSQL", yrs: "4" },
      { name: "MS SQL Server", yrs: "6" },
      { name: "Oracle SQL", yrs: "3" },
    ],
  },
  {
    category: "AI & Tooling",
    items: [
      { name: "Prompt Engineering", yrs: "2" },
      { name: "Claude Code / Gemini CLI", yrs: "2" },
      { name: "RAG Pipelines (ChromaDB)", yrs: "1" },
      { name: "Ollama (Local LLMs)", yrs: "1" },
      { name: "Swagger API", yrs: "2" },
    ],
  },
  {
    category: "Methodologies",
    items: [
      { name: "Agile / Scrum / SAFe", yrs: "11" },
      { name: "Test-Driven Development", yrs: "7" },
      { name: "Microservices", yrs: "3" },
    ],
  },
  {
    category: "Leadership",
    items: [
      { name: "Team Management", yrs: "3" },
      { name: "Developer Training", yrs: "7" },
      { name: "Project Leadership", yrs: "11+" },
    ],
  },
];

const EDUCATION = [
  {
    school: "St. Lawrence College",
    location: "Kingston, ON",
    program: "Computer Programmer Analyst",
    credential: "Advanced Diploma",
    date: "April 2016",
  },
  {
    school: "University of Alberta",
    program: "Software Architecture",
    credential: "Certification",
    date: "December 2024",
    url: "https://www.coursera.org/account/accomplishments/verify/5949IR2PHXGM",
  },
  {
    school: "Udemy",
    program: "Complete Guide to Software Architecture",
    credential: "Certification",
    date: "December 2024",
    url: "https://www.udemy.com/certificate/UC-d01d89bc-2ef2-41c1-acb9-04b0c25f9860/",
  },
  {
    school: "Scrum Alliance",
    program: "Certified Scrum Developer",
    credential: "CSD",
    date: "May 2022",
  },
];

// TODO: Replace with real testimonials
const TESTIMONIALS = [
  {
    quote:
      "Mitchell transformed our team's development practices. His ability to bridge technical architecture with business needs made him invaluable to our motorcycle product launch.",
    name: "Sarah Chen",
    title: "Director of Engineering",
    company: "AAA / CSAA",
  },
  {
    quote:
      "One of the most dependable engineers I've worked with. Mitchell took ownership of our microservice architecture and delivered ahead of schedule, every time.",
    name: "David Marchand",
    title: "VP of Technology",
    company: "Benefits By Design",
  },
  {
    quote:
      "Mitchell doesn't just manage — he mentors. Under his leadership our team's velocity doubled and morale went through the roof.",
    name: "Priya Kapoor",
    title: "Senior QA Lead",
    company: "Levio",
  },
];

/* ──────────────────────────────────────────────
   Component
   ────────────────────────────────────────────── */

export default function Home() {
  const [introComplete, setIntroComplete] = useState(false);

  // Scroll-reveal observer — starts after intro finishes
  useEffect(() => {
    if (!introComplete) return;

    const timer = setTimeout(() => {
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

      document
        .querySelectorAll(".scroll-reveal")
        .forEach((el) => observer.observe(el));

      // cleanup stored for unmount
      (window as unknown as Record<string, IntersectionObserver>).__scrollObs =
        observer;
    }, 400);

    return () => {
      clearTimeout(timer);
      const obs = (window as unknown as Record<string, IntersectionObserver>)
        .__scrollObs;
      obs?.disconnect();
    };
  }, [introComplete]);

  const d = (ms: number) =>
    ({ "--reveal-delay": `${ms}ms` }) as React.CSSProperties;

  return (
    <>
      {!introComplete && (
        <IntroAnimation onComplete={() => setIntroComplete(true)} />
      )}

      <div
        className={`min-h-screen site-content${introComplete ? " revealed" : ""}`}
      >
        <SiteHeader />

        <main>
          {/* ── Hero ── */}
          <section id="hero" className="hero text-center pt-36 pb-24 px-5">
            <p className="hero-label scroll-reveal">Engineering &amp; Leadership Portfolio</p>
            <h1 className="hero-title mt-4 scroll-reveal" style={d(100)}>
              Mitchell Ungar
            </h1>
            <div className="hero-divider mt-6 scroll-reveal" style={d(200)} />
            <p className="hero-desc mt-6 scroll-reveal" style={d(300)}>
              Principal Software Engineer, Manager &amp; Consultant with 12+
              years building enterprise systems, leading teams, and driving
              results across insurance, fintech, and AI.
            </p>
            <a
              href="/resume-2025.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary mt-10 scroll-reveal"
              style={d(400)}
            >
              View Resume ↓
            </a>
          </section>

          {/* ── About ── */}
          <section id="about" className="page-section">
            <div className="max-w-4xl mx-auto px-5">
              <h2 className="section-heading scroll-reveal mb-10">About</h2>
              <p className="about-text scroll-reveal" style={d(100)}>
                I spent 8 years at Benefits&nbsp;By&nbsp;Design building a
                strong technical foundation in Java, Spring, databases, and
                CI/CD. My subsequent tenure at Levio expanded that into React,
                TypeScript, AWS microservices, and AI tooling while giving me
                experience managing teams of developers and QA professionals.
              </p>
              <p className="about-text mt-4 scroll-reveal" style={d(180)}>
                I thrive in challenging, project-based environments and believe
                rigorous testing and strong standards are the foundation of every
                great product. I&apos;m dedicated to continuous growth through
                hands-on experience and ongoing education.
              </p>
              <div className="stats-row mt-10 scroll-reveal" style={d(260)}>
                <div className="stat-item">
                  <div className="stat-value">12+</div>
                  <div className="stat-label">Years</div>
                </div>
                <div className="stat-item">
                  <div className="stat-value">9</div>
                  <div className="stat-label">Team Managed</div>
                </div>
                <div className="stat-item">
                  <div className="stat-value">$100K+</div>
                  <div className="stat-label">Costs Saved</div>
                </div>
                <div className="stat-item">
                  <div className="stat-value">4</div>
                  <div className="stat-label">Enterprise Clients</div>
                </div>
              </div>
            </div>
          </section>

          {/* ── Experience ── */}
          <section id="experience" className="page-section">
            <div className="max-w-4xl mx-auto px-5">
              <h2 className="section-heading scroll-reveal mb-14">
                Experience
              </h2>
              <div className="timeline">
                {EXPERIENCE.map((job, i) => (
                  <div
                    key={i}
                    className="timeline-entry scroll-reveal"
                    style={d(i * 140)}
                  >
                    <div className="timeline-dot" />
                    <div className="timeline-card">
                      <div className="timeline-card-header">
                        <div>
                          <div className="timeline-company">
                            {job.companyUrl ? (
                              <a
                                href={job.companyUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="timeline-company-link"
                              >
                                {job.company}
                              </a>
                            ) : (
                              job.company
                            )}
                            {job.client && (
                              <span className="timeline-client">
                                {" "}
                                /{" "}
                                {job.clientUrl ? (
                                  <a
                                    href={job.clientUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="timeline-client-link"
                                  >
                                    {job.client}
                                  </a>
                                ) : (
                                  job.client
                                )}
                              </span>
                            )}
                          </div>
                          <div className="timeline-role">
                            {job.role}
                            {job.type && (
                              <span className="timeline-type">{job.type}</span>
                            )}
                          </div>
                        </div>
                        <div className="timeline-date">{job.period}</div>
                      </div>
                      <ul className="timeline-bullets">
                        {job.bullets.map((b, j) => (
                          <li key={j}>{b}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ── Skills ── */}
          <section id="skills" className="page-section">
            <div className="max-w-5xl mx-auto px-5">
              <h2 className="section-heading scroll-reveal mb-12">Skills</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {SKILLS.map((cat, i) => (
                  <div
                    key={i}
                    className="skill-card scroll-reveal"
                    style={d(i * 80)}
                  >
                    <h3 className="skill-card-title">{cat.category}</h3>
                    <div className="skill-list">
                      {cat.items.map((s, j) => (
                        <div key={j} className="skill-item">
                          <span className="skill-name">{s.name}</span>
                          <span className="skill-years">{s.yrs} yrs</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ── Projects ── */}
          <section id="projects" className="page-section">
            <div className="max-w-6xl mx-auto px-5">
              <h2 className="section-heading scroll-reveal mb-12">Projects</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="scroll-reveal" style={d(0)}>
                  <ProjectCard
                    title="Legion Branch 560"
                    description="A community hub for Royal Canadian Legion Branch 560 with events calendar, member info, restaurant menu, and PWA install support."
                    techStack={["React", "Vite", "Vercel", "PWA"]}
                    liveSiteUrl="https://legion560.vercel.app/"
                    sourceCodeUrl="https://github.com/MitchellUngar14/Legion"
                  />
                </div>
                <div className="scroll-reveal" style={d(80)}>
                  <ProjectCard
                    title="DeckTutor"
                    description="A Magic: The Gathering deck analysis tool with mana curve analysis, combo detection, and Moxfield import/export."
                    techStack={[
                      "Next.js",
                      "TypeScript",
                      "Drizzle ORM",
                      "PostgreSQL",
                      "FastAPI",
                      "Tailwind CSS",
                    ]}
                    liveSiteUrl="https://decktutor.vercel.app/"
                    sourceCodeUrl="https://github.com/MitchellUngar14/DeckTutor"
                  />
                </div>
                <div className="scroll-reveal" style={d(160)}>
                  <ProjectCard
                    title="Whiteboard"
                    description="An interactive digital whiteboard with task cards, sticky notes, drag-and-drop, rich text editing, and offline PWA support."
                    techStack={["React 19", "Vite", "IndexedDB", "PWA"]}
                    liveSiteUrl="https://muwhiteboard.vercel.app/"
                    sourceCodeUrl="https://github.com/MitchellUngar14/Whiteboard"
                  />
                </div>
                <div className="scroll-reveal" style={d(0)}>
                  <ProjectCard
                    title="MythWeaver"
                    description="A D&D companion app with character management, dice roller, combat tracker, AI Dungeon Master, and real-time sessions."
                    techStack={[
                      "Next.js",
                      "TypeScript",
                      "Drizzle ORM",
                      "Tailwind CSS",
                    ]}
                    liveSiteUrl="https://mythweavers.vercel.app/"
                    sourceCodeUrl="https://github.com/MitchellUngar14/MythWeaver"
                  />
                </div>
                <div className="scroll-reveal" style={d(80)}>
                  <ProjectCard
                    title="Bad Advice For Free"
                    description="A Q&A platform with a tiered role system - ask questions, submit answers, and moderate content."
                    techStack={[
                      "Next.js",
                      "React",
                      "Prisma",
                      "PostgreSQL",
                      "Tailwind CSS",
                    ]}
                    liveSiteUrl="https://bad-advice-for-free.vercel.app/"
                    sourceCodeUrl="https://github.com/MitchellUngar14/BadAdviceForFree"
                  />
                </div>
                <div className="scroll-reveal" style={d(160)}>
                  <ProjectCard
                    title="Apogee Insurance"
                    description={
                      <>
                        A microserviced insurance platform built with modern web
                        technologies.
                        <br />
                        <br />
                        Demo: <strong>admin@example.com</strong> /{" "}
                        <strong>password123</strong>
                      </>
                    }
                    techStack={[
                      "Next.js",
                      "React",
                      "Drizzle ORM",
                      "PostgreSQL",
                      "Tailwind CSS",
                      "Microservice",
                    ]}
                    liveSiteUrl="https://apogee-insurance.vercel.app/"
                    sourceCodeUrl="https://github.com/MitchellUngar14/apogee-insurance"
                  />
                </div>
                <div className="scroll-reveal" style={d(0)}>
                  <ProjectCard
                    title="The Tribunal"
                    description="An AI-powered application for collaborative decision-making."
                    techStack={["Next.js", "Vercel", "OpenAI API"]}
                    liveSiteUrl="https://the-tribunal-app.vercel.app/"
                    sourceCodeUrl="https://github.com/MitchellUngar14/the-tribunal-app"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* ── Education ── */}
          <section id="education" className="page-section">
            <div className="max-w-4xl mx-auto px-5">
              <h2 className="section-heading scroll-reveal mb-12">
                Education &amp; Certifications
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {EDUCATION.map((edu, i) => (
                  <div
                    key={i}
                    className="edu-card scroll-reveal"
                    style={d(i * 100)}
                  >
                    <div className="edu-school">{edu.school}</div>
                    {edu.location && (
                      <div className="edu-location">{edu.location}</div>
                    )}
                    <div className="edu-program">{edu.program}</div>
                    <div className="edu-meta">
                      <span className="edu-credential">
                        {edu.url ? (
                          <a
                            href={edu.url}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {edu.credential} ↗
                          </a>
                        ) : (
                          edu.credential
                        )}
                      </span>
                      <span className="edu-date">{edu.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
          {/* ── Testimonials ── */}
          <section id="testimonials" className="page-section">
            <div className="max-w-4xl mx-auto px-5">
              <h2 className="section-heading scroll-reveal mb-12">
                Testimonials
              </h2>
              <div className="testimonial-grid">
                {TESTIMONIALS.map((t, i) => (
                  <blockquote
                    key={i}
                    className="testimonial-card scroll-reveal"
                    style={d(i * 120)}
                  >
                    <div className="testimonial-quote">&ldquo;{t.quote}&rdquo;</div>
                    <div className="testimonial-author">
                      <div className="testimonial-name">{t.name}</div>
                      <div className="testimonial-role">
                        {t.title}, {t.company}
                      </div>
                    </div>
                  </blockquote>
                ))}
              </div>
            </div>
          </section>

          {/* ── Contact ── */}
          <section id="contact" className="page-section pb-28">
            <div className="max-w-3xl mx-auto px-5">
              <h2 className="section-heading scroll-reveal mb-6">
                Get In Touch
              </h2>
              <p className="contact-subtitle scroll-reveal" style={d(80)}>
                Whether you&apos;re looking for a consultant, a technical leader,
                or just want to connect &mdash; I&apos;d love to hear from you.
              </p>
              <div className="contact-cards scroll-reveal" style={d(160)}>
                <a
                  href="mailto:mitchell.ungar@gmail.com"
                  className="contact-card"
                >
                  <span className="contact-card-icon">✉</span>
                  <span className="contact-card-label">Email</span>
                  <span className="contact-card-value">mitchell.ungar@gmail.com</span>
                </a>
                <a
                  href="https://www.linkedin.com/in/mitchell-ungar-552879168/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-card"
                >
                  <span className="contact-card-icon">in</span>
                  <span className="contact-card-label">LinkedIn</span>
                  <span className="contact-card-value">Mitchell Ungar</span>
                </a>
                <a
                  href="https://github.com/MitchellUngar14"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-card"
                >
                  <span className="contact-card-icon">⌥</span>
                  <span className="contact-card-label">GitHub</span>
                  <span className="contact-card-value">MitchellUngar14</span>
                </a>
              </div>
            </div>
          </section>
        </main>

        {/* ── Footer ── */}
        <footer className="site-footer text-center py-12">
          <p style={{ color: "var(--text-muted)", fontSize: "0.82rem" }}>
            &copy; 2025 Mitchell Ungar
          </p>
        </footer>
      </div>

    </>
  );
}
