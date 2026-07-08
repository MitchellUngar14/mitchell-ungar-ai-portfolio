import type { CSSProperties } from "react";

export interface Project {
  title: string;
  description: string;
  stack: string;
  liveUrl: string;
  codeUrl: string;
  /** Optional demo-credentials line shown above the stack */
  demo?: string;
  revealDelay?: number;
}

export default function ProjectCard({ project }: { project: Project }) {
  const { title, description, stack, liveUrl, codeUrl, demo, revealDelay } =
    project;

  return (
    <div
      className="proj-card reveal"
      style={
        revealDelay
          ? ({ "--rd": `${revealDelay}ms` } as CSSProperties)
          : undefined
      }
    >
      <div className="proj-head">
        <div className="proj-title">{title}</div>
        <div className="proj-links">
          <a
            href={liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="proj-link proj-link--live"
          >
            LIVE ↗
          </a>
          <a
            href={codeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="proj-link proj-link--code"
          >
            CODE ↗
          </a>
        </div>
      </div>
      <p className="proj-desc">{description}</p>
      {demo && <div className="proj-demo">{demo}</div>}
      <div className="proj-stack">{stack}</div>
    </div>
  );
}
