interface ForWhomListProps {
  items: string[];
}

export default function ForWhomList({ items }: ForWhomListProps) {
  return (
    <section className="property-for-whom">
      <div className="property-for-whom-container">
        <h2 className="property-for-whom-title">Para quem este imóvel é</h2>
        <ul className="property-for-whom-list">
          {items.map((item, index) => (
            <li key={index} className="property-for-whom-item">
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

