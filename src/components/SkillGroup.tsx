import type { CSSProperties } from "react";

export interface SkillGroupData {
  category: string;
  tone: "steel" | "rose";
  rows: { name: string; years: string }[];
  revealDelay?: number;
}

export default function SkillGroup({ group }: { group: SkillGroupData }) {
  const { category, tone, rows, revealDelay } = group;

  return (
    <div
      className="reveal"
      style={
        revealDelay
          ? ({ "--rd": `${revealDelay}ms` } as CSSProperties)
          : undefined
      }
    >
      <div
        className={`skill-head${tone === "rose" ? " skill-head--rose" : ""}`}
      >
        {category}
      </div>
      {rows.map(({ name, years }) => (
        <div key={name} className="skill-row">
          <span className="skill-name">{name}</span>
          <span className="skill-years">{years}</span>
        </div>
      ))}
    </div>
  );
}
