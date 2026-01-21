"use client";

import { useState } from "react";
import { ProfileFit } from "@/lib/types";

const profiles: { key: ProfileFit; label: string }[] = [
  { key: "family", label: "Família" },
  { key: "investor", label: "Investidor" },
  { key: "first_buy", label: "Primeira compra" },
  { key: "luxury", label: "Alto padrão" },
];

export function ProfileWizard({ onSelect }: { onSelect: (p: ProfileFit) => void }) {
  const [selected, setSelected] = useState<ProfileFit | null>(null);

  return (
    <div className="rounded-3xl border p-5" style={{ borderColor: "var(--border)", background: "var(--surface)" }}>
      <h2 className="text-lg font-semibold">Qual é o seu perfil?</h2>
      <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3">
        {profiles.map((p) => (
          <button
            key={p.key}
            onClick={() => {
              setSelected(p.key);
              onSelect(p.key);
            }}
            className="rounded-2xl px-4 py-3 border transition"
            style={{
              borderColor: "var(--border)",
              background: selected === p.key ? "color-mix(in srgb, var(--text) 4%, transparent)" : "transparent",
            }}
          >
            {p.label}
          </button>
        ))}
      </div>
    </div>
  );
}

