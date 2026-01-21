interface StrengthsListProps {
  strengths: string[];
}

export default function StrengthsList({ strengths }: StrengthsListProps) {
  return (
    <section className="property-strengths">
      <div className="property-strengths-container">
        <h2 className="property-strengths-title">Pontos fortes</h2>
        <ul className="property-strengths-list">
          {strengths.map((strength, index) => (
            <li key={index} className="property-strengths-item">
              <span className="strength-checkmark">✓</span>
              {strength}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

