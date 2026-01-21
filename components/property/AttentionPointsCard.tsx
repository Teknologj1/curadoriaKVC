import { getDefaultAttentionMessage } from "@/lib/utils/attention";

interface AttentionPointsCardProps {
  points: string[];
  model: "A" | "B";
}

export default function AttentionPointsCard({
  points,
  model,
}: AttentionPointsCardProps) {
  const displayPoints =
    points.length > 0 ? points : [getDefaultAttentionMessage(model)];

  return (
    <section className="property-attention">
      <div className="property-attention-container">
        <h2 className="property-attention-title">Pontos de atenção</h2>
        <div className="property-attention-card">
          {displayPoints.map((point, index) => (
            <p key={index} className="property-attention-point">
              {point}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}

