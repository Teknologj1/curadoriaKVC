"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

type Media = { url: string; alt: string; width: number; height: number };

export function PropertyGallery({ media }: { media: Media[] }) {
  const items = useMemo(() => media.filter(Boolean), [media]);
  const [idx, setIdx] = useState(0);

  const current = items[idx];

  function prev() {
    setIdx((v) => (v - 1 + items.length) % items.length);
  }
  function next() {
    setIdx((v) => (v + 1) % items.length);
  }

  return (
    <div className="rounded-[22px] overflow-hidden border" style={{ borderColor: "var(--border)" }}>
      <div className="relative aspect-[16/10] md:aspect-[16/9]" style={{ background: "var(--surface2)" }}>
        <Image
          src={current.url}
          alt={current.alt}
          fill
          className="object-cover"
          priority
          sizes="(max-width: 768px) 100vw, 70vw"
        />

        {items.length > 1 && (
          <>
            <button
              onClick={prev}
              aria-label="Anterior"
              className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full px-3 py-2 text-sm border transition"
              style={{ borderColor: "var(--border)", background: "rgba(247,246,242,.75)" }}
            >
              ‹
            </button>
            <button
              onClick={next}
              aria-label="Próximo"
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full px-3 py-2 text-sm border transition"
              style={{ borderColor: "var(--border)", background: "rgba(247,246,242,.75)" }}
            >
              ›
            </button>
          </>
        )}

        {items.length > 1 && (
          <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2">
            {items.map((_, i) => (
              <button
                key={i}
                onClick={() => setIdx(i)}
                aria-label={`Imagem ${i + 1}`}
                className="h-1.5 rounded-full transition"
                style={{
                  width: i === idx ? 22 : 10,
                  background: i === idx ? "rgba(30,35,40,.55)" : "rgba(30,35,40,.22)",
                }}
              />
            ))}
          </div>
        )}
      </div>

      {items.length > 1 && (
        <div className="p-3 flex gap-2 overflow-x-auto no-scrollbar" style={{ background: "var(--surface2)" }}>
          {items.slice(0, 10).map((m, i) => (
            <button
              key={m.url + i}
              onClick={() => setIdx(i)}
              className="relative w-20 h-14 rounded-xl overflow-hidden border shrink-0"
              style={{ borderColor: i === idx ? "rgba(30,35,40,.25)" : "var(--border)" }}
            >
              <Image src={m.url} alt={m.alt} fill className="object-cover" sizes="80px" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
