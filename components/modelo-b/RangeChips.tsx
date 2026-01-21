"use client";

import { useState } from "react";

interface RangeChipsProps {
  onSelect: (faixa: { min?: number; max?: number }) => void;
  selected?: { min?: number; max?: number };
}

const ranges = [
  { id: "ate-1m", label: "Até R$ 1M", max: 1000000 },
  { id: "1m-2m", label: "R$ 1M - 2M", min: 1000000, max: 2000000 },
  { id: "2m-4m", label: "R$ 2M - 4M", min: 2000000, max: 4000000 },
  { id: "acima-4m", label: "Acima de R$ 4M", min: 4000000 },
];

export default function RangeChips({ onSelect, selected }: RangeChipsProps) {
  const [activeId, setActiveId] = useState<string | null>(null);

  const handleSelect = (range: typeof ranges[0]) => {
    setActiveId(range.id);
    onSelect({ min: range.min, max: range.max });
  };

  return (
    <div className="range-chips">
      <div className="range-chips-scroll">
        {ranges.map((range) => (
          <button
            key={range.id}
            className={`range-chip ${activeId === range.id ? "active" : ""}`}
            onClick={() => handleSelect(range)}
          >
            {range.label}
          </button>
        ))}
      </div>
    </div>
  );
}

