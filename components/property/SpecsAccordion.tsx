"use client";

import { useState } from "react";
import type { Property } from "@/lib/types";

interface SpecsAccordionProps {
  specs: Property["specs"];
  pricing?: Property["pricing"];
}

export default function SpecsAccordion({
  specs,
  pricing,
}: SpecsAccordionProps) {
  const [isOpen, setIsOpen] = useState(false);

  const specsList = [
    { label: "Área", value: specs.areaM2 ? `${specs.areaM2}m²` : "—" },
    {
      label: "Quartos",
      value: specs.bedrooms ? `${specs.bedrooms}` : "—",
    },
    {
      label: "Suítes",
      value: specs.suites ? `${specs.suites}` : "—",
    },
    {
      label: "Banheiros",
      value: specs.bathrooms ? `${specs.bathrooms}` : "—",
    },
    {
      label: "Vagas",
      value: specs.parkingSpots ? `${specs.parkingSpots}` : "—",
    },
    { label: "Andar", value: specs.floor || "—" },
    { label: "Posição solar", value: specs.sunPosition || "—" },
  ];

  if (pricing) {
    specsList.push(
      {
        label: "Condomínio",
        value: pricing.condoFee
          ? new Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(pricing.condoFee)
          : "—",
      },
      {
        label: "IPTU",
        value: pricing.iptuYear
          ? new Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(pricing.iptuYear)
          : "—",
      }
    );
  }

  return (
    <section className="property-specs">
      <div className="property-specs-container">
        <button
          className="property-specs-toggle"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
        >
          <h2 className="property-specs-title">Ficha técnica</h2>
          <span className="property-specs-icon">{isOpen ? "−" : "+"}</span>
        </button>
        {isOpen && (
          <div className="property-specs-content">
            <div className="property-specs-grid">
              {specsList.map((spec, index) => (
                <div key={index} className="property-spec-item">
                  <span className="spec-label">{spec.label}</span>
                  <span className="spec-value">{spec.value}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

