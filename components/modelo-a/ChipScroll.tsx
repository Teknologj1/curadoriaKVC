"use client";

import { useState, useEffect } from "react";
import { Trilha } from "@/lib/types";

interface Chip {
  id: Trilha;
  label: string;
  description: string;
}

const trilhas: Chip[] = [
  {
    id: "morar_bem",
    label: "Morar bem",
    description: "Conforto, localização e rotina inteligente",
  },
  {
    id: "investir",
    label: "Investir",
    description: "Liquidez, valorização e risco controlado",
  },
  {
    id: "segunda_moradia",
    label: "Segunda moradia",
    description: "Faz sentido hoje e amanhã",
  },
];

interface ChipScrollProps {
  onTrilhaChange?: (trilha: Trilha | null) => void;
}

export function ChipScroll({ onTrilhaChange }: ChipScrollProps) {
  const [activeId, setActiveId] = useState<Trilha | null>(null);

  useEffect(() => {
    onTrilhaChange?.(activeId);
  }, [activeId, onTrilhaChange]);

  const handleChipClick = (id: Trilha) => {
    setActiveId(activeId === id ? null : id);
  };

  return (
    <div className="w-full">
      <div className="flex items-center gap-4 mb-6">
        <div className="h-px flex-1" style={{ background: "var(--border)" }} />
        <h3 className="text-sm uppercase tracking-wider font-light" style={{ color: "var(--muted)" }}>Filtrar por trilha</h3>
        <div className="h-px flex-1" style={{ background: "var(--border)" }} />
      </div>
      
      <div className="flex flex-wrap gap-3 md:gap-4">
        {trilhas.map((trilha) => {
          const isActive = activeId === trilha.id;
          return (
            <button
              key={trilha.id}
              onClick={() => handleChipClick(trilha.id)}
              className="group relative px-6 py-4 rounded-2xl border transition-all duration-300"
              style={{
                borderColor: isActive ? "var(--accent)" : "var(--border)",
                background: isActive ? "color-mix(in srgb, var(--accent) 12%, transparent)" : "var(--surface)",
                color: isActive ? "var(--accent)" : "var(--text)",
                boxShadow: isActive ? "var(--shadow)" : "none",
              }}
            >
              <div className="flex flex-col items-start gap-1">
                <span className="font-semibold text-sm md:text-base transition-colors">
                  {trilha.label}
                </span>
                <span className="text-xs transition-opacity" style={{ color: "var(--muted)" }}>
                  {trilha.description}
                </span>
              </div>
              
              {/* Indicador ativo */}
              {isActive && (
                <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full animate-pulse" style={{ background: "var(--accent)" }} />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

