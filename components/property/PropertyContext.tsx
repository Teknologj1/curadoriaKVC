interface PropertyContextProps {
  title: string;
  summary: string;
}

export default function PropertyContext({
  title,
  summary,
}: PropertyContextProps) {
  return (
    <section className="property-context">
      <div className="property-context-container">
        <h1 className="property-context-title">{title}</h1>
        <p className="property-context-summary">{summary}</p>
      </div>
    </section>
  );
}

