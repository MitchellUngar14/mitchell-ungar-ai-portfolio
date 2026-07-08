export interface ExperienceEntry {
  date: string;
  tag?: string;
  tagTone?: "rose" | "steel";
  company: string;
  companyUrl: string;
  /** Muted note after the company name, e.g. "— cedhcanada.ca" */
  note?: string;
  client?: string;
  clientUrl?: string;
  role: string;
  bullets: string[];
  /** Dot color for the bullet markers */
  bulletTone: "rose" | "steel";
  last?: boolean;
}

export default function ExperienceRow({ entry }: { entry: ExperienceEntry }) {
  const {
    date,
    tag,
    tagTone,
    company,
    companyUrl,
    note,
    client,
    clientUrl,
    role,
    bullets,
    bulletTone,
    last,
  } = entry;

  return (
    <div className={`xp-row reveal${last ? " xp-row--last" : ""}`}>
      <div className="xp-left">
        <div className="xp-date">{date}</div>
        {tag && (
          <div className={`xp-tag xp-tag--${tagTone ?? "steel"}`}>{tag}</div>
        )}
      </div>
      <div className="xp-right">
        <div className="xp-company">
          <a href={companyUrl} target="_blank" rel="noopener noreferrer">
            {company}
          </a>
          {client && (
            <span className="xp-client">
              {" "}
              /{" "}
              <a href={clientUrl} target="_blank" rel="noopener noreferrer">
                {client}
              </a>
            </span>
          )}
          {note && <span className="xp-note"> {note}</span>}
        </div>
        <div className="xp-role">{role}</div>
        <div className="xp-bullets">
          {bullets.map((b) => (
            <div
              key={b}
              className={`xp-bullet${bulletTone === "rose" ? " xp-bullet--rose" : ""}`}
            >
              {b}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
