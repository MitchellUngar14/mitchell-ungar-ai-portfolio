import type { Metadata } from "next";
import ResumeToolbar from "@/components/ResumeToolbar";
import SheetScaler from "@/components/SheetScaler";

export const metadata: Metadata = {
  title: "Mitchell Ungar — Resume",
  description:
    "ATS-optimized resume for Mitchell Ungar — Principal Software Engineer, Engineering Manager, and Consultant. Prints to US Letter.",
};

/*
 * ATS constraints intentionally preserved: single column, no tables/columns
 * for content, standard section names, plain-text URLs, real <ul> bullets —
 * prints to a selectable-text PDF.
 */

const JOBS = [
  {
    title: "Freelance Full Stack Developer",
    org: "— cEDH Canada (cedhcanada.ca)",
    date: "2025 — Present",
    bullets: [
      "Sole developer — designed, built, and maintain a production full-stack tournament platform (Next.js 16, React 19, TypeScript, PostgreSQL/Drizzle ORM, Tailwind CSS v4) serving Canada's competitive Commander community, working directly with the business owner — event ticketing, Swiss tournament management with live round timers, decklist tracking, season leaderboards, and metagame analytics.",
      "Engineered a pluggable tournament scoring engine supporting five ranking systems (including Elo and Japanese/Hareruya) behind a common interface, plus a 4-player Swiss pod-pairing algorithm handling odd remainders, byes, drops, and re-pairing.",
      "Implemented end-to-end payments — cart → Stripe Checkout → webhook-driven order fulfillment — with tax configuration, subscription tiers, and payout report exports.",
      "Delivered multi-tenant store \"league\" mini-sites with per-store branding via CSS custom properties, role-based authentication (Auth.js v5) enforced in middleware, judge/co-organizer permissions, audit logging, and web push notifications.",
      "Established CI/CD on GitHub Actions → Vercel with per-branch preview deployments, Vitest unit tests behind an enforced 80% coverage gate, and four timing-balanced Playwright end-to-end shards.",
    ],
  },
  {
    title: "Principal Software Engineer",
    org: "— Levio, contract with Liberty Mutual",
    date: "April 2024 — Present",
    bullets: [
      "Lead the design and migration of enterprise insurance rating systems from Ratabase to Earnix, partnering with client architecture and development teams.",
      "Provisioned and configured Windows Server environments to host internal web UI applications.",
      "Coordinate multiple vendors and support client needs to ensure product stability and continuity of service.",
    ],
  },
  {
    title: "Engineering Manager",
    org: "— Levio",
    date: "April 2023 — Present",
    bullets: [
      "Manage a cross-functional team of 9 spanning QA engineers, software developers, and business analysts.",
      "Build individualized career roadmaps and coaching plans that develop team members toward their full potential.",
      "Conduct performance evaluations, adjust compensation, and make strategic staffing decisions — including terminations when necessary.",
    ],
  },
  {
    title: "Senior Full Stack Developer Consultant",
    org: "— Levio, contract with AAA / CSAA",
    date: "April 2022 — April 2024",
    bullets: [
      "Built AAA's new Motorcycle/Auto insurance product hand-in-hand with client development teams using React, TypeScript, and Java microservices.",
      "Owned the reporting microservice end-to-end; designed and built its AWS architecture with Lambda, API Gateway, DynamoDB, CloudWatch, and CloudFormation.",
      "Accelerated onboarding by training incoming teams on code flow and configuration-driven development; built productivity tooling including Postman collections and custom Bash scripts.",
      "Trained new QA staff in business practices and technical skills such as data mocking and request/response analysis.",
    ],
  },
  {
    title: "Senior Java Developer",
    org: "— Benefits By Design, Kingston, ON",
    date: "May 2015 — March 2022",
    bullets: [
      "Saved $100,000+ in premium costs by modernizing legacy code with newer, better engineering practices.",
      "Led the database migration from Microsoft SQL Server 2008 to PostgreSQL, eliminating server licensing fees.",
      "Converted all reporting from JReport to Jaspersoft within a Spring-supported framework, reducing costs and modernizing the reporting stack.",
      "Built multilingual reporting support, enabling company operations in Quebec.",
      "Delivered project goals within timeframe, scope, and budget while exceeding expected quality; designed development team standards and promoted engineering best practices.",
      "Led multiple projects including outsourced developer teams; collaborated with outside companies to build quality products and services.",
      "Trained two student developers into independent professionals; interviewed developer candidates to provide technical insight to non-developer managers.",
    ],
  },
];

const TECH_SKILLS = [
  {
    label: "Languages & Frameworks",
    text: "Java EE — Spring MVC, Spring Boot, Spring Data; monolith & microservice architectures (12+ yrs) · React / TypeScript (5 yrs) · Next.js (2 yrs) · Tailwind CSS. Personal projects include a D&D companion app, digital whiteboard, MTG deck analyzer, and community hub built with React 19, Next.js, and TypeScript.",
  },
  {
    label: "Cloud & Infrastructure",
    text: "AWS — Lambda, API Gateway, DynamoDB, CloudWatch, CloudFormation (3 yrs) · Vercel — branch preview & production deployments · Windows Server setup for internal web applications (1 yr) · Apache Kafka (4 yrs)",
  },
  {
    label: "AI & Emerging Tech",
    text: "Prompt engineering (2 yrs) · Claude Code CLI & Gemini CLI (2 yrs) · GitHub Copilot in IDE (2 yrs) · RAG pipeline development with ChromaDB vector database (1 yr) · Local LLM hosting and inference with Ollama (1 yr)",
  },
  {
    label: "Integrations & Payments",
    text: "Stripe (Checkout, webhooks, subscriptions) · Auth.js / NextAuth v5 · Zod validation · Resend transactional email · Web Push · Scryfall & Moxfield APIs · ExcelJS report exports",
  },
  {
    label: "Databases & Migration",
    text: "PostgreSQL (4 yrs) · Microsoft SQL Server (7 yrs) · Oracle SQL (3 yrs) · Flyway (5 yrs) · Liquibase (2 yrs)",
  },
  {
    label: "Testing & Quality",
    text: "Test-Driven Development (7 yrs) · 10 yrs of testing across Mockito, JUnit 4/5, Jest, Mocha, Selenium, and Citrus · Cypress (1 yr) · WireMock dynamic & static API mocking (2 yrs) · Vitest + Testing Library with enforced coverage gates · Playwright E2E with sharded CI runs",
  },
  {
    label: "CI/CD & Tooling",
    text: "Jenkins (11 yrs) · GitHub Actions (2 yrs) · Bamboo (1 yr) · Git / GitHub (11+ yrs) · Maven (9+ yrs) · Gradle (1 yr) · JIRA (10+ yrs) · Bitbucket (2 yrs) · Swagger / OpenAPI (2 yrs)",
  },
  {
    label: "Reporting",
    text: "Jaspersoft (4 yrs) · JReport (4 yrs)",
  },
  {
    label: "Methodologies & Leadership",
    text: "Agile (11 yrs) · SAFe (2 yrs) · Kanban (2 yrs) · Engineering management (3 yrs) · Developer training (7 yrs) · Project leadership (12+ yrs)",
  },
];

export default function ResumePage() {
  return (
    <div className="resume-page">
      <ResumeToolbar />
      <SheetScaler>
        <div className="resume-sheet">
          {/* ══ Header ══ */}
          <div className="r-header">
            <div>
              <h1 className="r-name">Mitchell Ungar</h1>
              <div className="r-titleline">
                Principal Software Engineer · Engineering Manager · Consultant
              </div>
            </div>
            <div className="r-contact">
              <div>Kingston, Ontario, Canada</div>
              <div>
                <a href="mailto:mitchell.ungar@gmail.com">
                  mitchell.ungar@gmail.com
                </a>{" "}
                ·{" "}
                <a
                  href="https://mitchellungar.vercel.app"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  mitchellungar.vercel.app
                </a>
              </div>
              <div>
                <a
                  href="https://www.linkedin.com/in/mitchell-ungar-552879168/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  linkedin.com/in/mitchell-ungar-552879168
                </a>{" "}
                ·{" "}
                <a
                  href="https://github.com/MitchellUngar14"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  github.com/MitchellUngar14
                </a>
              </div>
            </div>
          </div>

          {/* ══ Summary ══ */}
          <h2 className="r-h2">Summary</h2>
          <p className="r-summary">
            Principal Software Engineer and Engineering Manager with 13+ years
            of experience designing, building, and modernizing enterprise
            software across insurance, employee benefits, and fintech. Deep
            foundation in Java, Spring, SQL, and CI/CD automation built over 8
            years at Benefits By Design; expanded at Levio into cloud-native
            AWS microservices, React/TypeScript front ends, and AI-assisted
            software development (RAG pipelines, LLM tooling, prompt
            engineering) while consulting for major North American insurers
            including Liberty Mutual and AAA/CSAA. Proven engineering
            leadership: managing a cross-functional team of 9, saving $100K+
            through legacy system modernization, and delivering quality through
            test-driven development, rigorous standards, and continuous
            improvement.
          </p>

          {/* ══ Core competencies (ATS keyword block) ══ */}
          <h2 className="r-h2 r-h2--competencies">Core Competencies</h2>
          <p className="r-keywords">
            Software Architecture · Microservices Architecture · Cloud
            Computing (AWS) · Full-Stack Development · Java · Spring Boot ·
            React · TypeScript · Next.js · REST APIs · SQL &amp; Database
            Migration · CI/CD Automation · DevOps · Test-Driven Development
            (TDD) · Agile · Scrum · SAFe · Generative AI · LLM Integration ·
            RAG Pipelines · Prompt Engineering · Engineering Management · Team
            Leadership · Mentoring &amp; Training · Performance Management ·
            Vendor &amp; Stakeholder Management · Legacy System Modernization ·
            Payments Integration (Stripe) · Multi-Tenant SaaS Architecture ·
            End-to-End Testing (Playwright, Cypress) · Apache Kafka
          </p>

          {/* ══ Experience ══ */}
          <h2 className="r-h2 r-h2--experience">Professional Experience</h2>
          {JOBS.map(({ title, org, date, bullets }, i) => (
            <div key={title} className={`r-job${i === 0 ? " r-job--first" : ""}`}>
              <div className="r-job-head">
                <div className="r-job-title">
                  {title} <span className="r-job-org">{org}</span>
                </div>
                <div className="r-job-date">{date}</div>
              </div>
              <ul className="r-bullets">
                {bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </div>
          ))}

          {/* ══ Technical skills ══ */}
          <h2 className="r-h2">Technical Skills</h2>
          <div className="r-skills">
            {TECH_SKILLS.map(({ label, text }) => (
              <div key={label}>
                <span className="r-skill-label">{label}:</span> {text}
              </div>
            ))}
          </div>

          {/* ══ Education ══ */}
          <h2 className="r-h2">Education &amp; Certifications</h2>
          <div className="r-edu">
            <div className="r-edu-row">
              <span>
                <span className="r-edu-school">St. Lawrence College</span>,
                Kingston, ON — Advanced Diploma, Computer Programmer Analyst
              </span>
              <span className="r-edu-date">April 2016</span>
            </div>
            <div className="r-edu-row">
              <span>
                <span className="r-edu-school">University of Alberta</span> —
                Software Architecture,{" "}
                <a
                  href="https://www.coursera.org/account/accomplishments/verify/5949IR2PHXGM"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Certification
                </a>
              </span>
              <span className="r-edu-date">December 2024</span>
            </div>
            <div className="r-edu-row">
              <span>
                <span className="r-edu-school">Udemy</span> — The Complete
                Guide to Becoming a Software Architect,{" "}
                <a
                  href="https://www.udemy.com/certificate/UC-d01d89bc-2ef2-41c1-acb9-04b0c25f9860/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Certification
                </a>
              </span>
              <span className="r-edu-date">December 2024</span>
            </div>
            <div className="r-edu-row">
              <span>
                <span className="r-edu-school">Scrum Alliance</span> —
                Certified Scrum Developer (CSD)
              </span>
              <span className="r-edu-date">May 2022</span>
            </div>
          </div>
        </div>
      </SheetScaler>
    </div>
  );
}
