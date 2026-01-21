import type { Property } from "@/lib/types";

interface PricingBlockProps {
  pricing: Property["pricing"];
}

export default function PricingBlock({ pricing }: PricingBlockProps) {
  if (!pricing || !pricing.price) {
    return null;
  }

  return (
    <section className="property-pricing">
      <div className="property-pricing-container">
        <h2 className="property-pricing-title">Investimento</h2>
        <div className="property-pricing-value">
          {new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
            minimumFractionDigits: 0,
          }).format(pricing.price)}
        </div>
        {pricing.condoFee && (
          <div className="property-pricing-detail">
            Condomínio:{" "}
            {new Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(pricing.condoFee)}
            /mês
          </div>
        )}
        {pricing.iptuYear && (
          <div className="property-pricing-detail">
            IPTU:{" "}
            {new Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(pricing.iptuYear)}
            /ano
          </div>
        )}
      </div>
    </section>
  );
}

