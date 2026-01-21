"use client";

import { useState } from "react";
import { Property } from "@/lib/types";

export function SpecsAccordion({ item }: { item: Property }) {
  const [open, setOpen] = useState(false);

  const specs = [
    { label: "Área", value: item.specs.areaM2 ? `${item.specs.areaM2} m²` : "-" },
    { label: "Quartos", value: item.specs.bedrooms ?? "-" },
    { label: "Suítes", value: item.specs.suites ?? "-" },
    { label: "Banheiros", value: item.specs.bathrooms ?? "-" },
    { label: "Vagas", value: item.specs.parkingSpots ?? "-" },
    { label: "Andar", value: item.specs.floor ?? "-" },
    { label: "Posição do sol", value: item.specs.sunPosition ?? "-" },
    { label: "Tipo", value: item.specs.propertyType === "apartment" ? "Apartamento" : item.specs.propertyType === "house" ? "Casa" : "Comercial" },
  ];

  const pricing = item.pricing;
  const hasPricing = pricing?.price || pricing?.condoFee || pricing?.iptuYear;

  return (
    <div
      className="rounded-3xl border overflow-hidden transition-all duration-300"
      style={{ borderColor: "var(--border)", background: "var(--surface)", boxShadow: "var(--shadow)" }}
    >
      <button
        className="w-full flex justify-between items-center p-5 transition-colors duration-200"
        style={{ background: "var(--surface)" }}
        onClick={() => setOpen(!open)}
      >
        <span className="font-serif text-lg font-light">Ficha técnica</span>
        <div
          className="w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-300"
          style={{
            borderColor: open ? "var(--accent)" : "var(--border)",
            background: open ? "color-mix(in srgb, var(--accent) 20%, transparent)" : "var(--surface)",
          }}
        >
          <svg
            className={`w-4 h-4 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </button>
      
      <div className={`
        overflow-hidden transition-all duration-500 ease-in-out
        ${open ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"}
      `}>
        <div className="px-5 pb-5 space-y-4">
          {/* Especificações */}
          <div className="grid grid-cols-2 gap-4 pt-2">
            {specs.map((spec, index) => (
              <div key={index} className="border-b pb-2" style={{ borderColor: "var(--border)" }}>
                <div className="text-xs mb-1" style={{ color: "var(--muted)" }}>{spec.label}</div>
                <div className="text-sm font-medium">{spec.value}</div>
              </div>
            ))}
          </div>

          {/* Preços */}
          {hasPricing && (
            <div className="pt-4 border-t" style={{ borderColor: "var(--border)" }}>
              <h4 className="text-sm font-semibold mb-3" style={{ color: "var(--accent)" }}>Valores</h4>
              <div className="space-y-2">
                {pricing.price && (
                  <div className="flex justify-between items-center">
                    <span className="text-sm" style={{ color: "var(--muted)" }}>Preço</span>
                    <span className="text-lg font-semibold" style={{ color: "var(--accent)" }}>
                      R$ {pricing.price.toLocaleString("pt-BR")}
                    </span>
                  </div>
                )}
                {pricing.condoFee && (
                  <div className="flex justify-between items-center">
                    <span className="text-sm" style={{ color: "var(--muted)" }}>Condomínio</span>
                    <span className="text-sm">R$ {pricing.condoFee.toLocaleString("pt-BR")}/mês</span>
                  </div>
                )}
                {pricing.iptuYear && (
                  <div className="flex justify-between items-center">
                    <span className="text-sm" style={{ color: "var(--muted)" }}>IPTU</span>
                    <span className="text-sm">R$ {pricing.iptuYear.toLocaleString("pt-BR")}/ano</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

