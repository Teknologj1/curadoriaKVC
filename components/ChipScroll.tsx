"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

type Trilha = "morar_bem" | "investir" | "segunda_moradia";

const trilhas: { key: Trilha; label: string }[] = [
  { key: "morar_bem", label: "Morar bem" },
  { key: "investir", label: "Investir" },
  { key: "segunda_moradia", label: "2ª moradia" },
];

export function ChipScroll() {
  const sp = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const active = (sp.get("trilha") as Trilha | null) ?? null;

  function setTrilha(t: Trilha | null) {
    const params = new URLSearchParams(sp.toString());
    if (!t) {
      params.delete("trilha");
    } else {
      params.set("trilha", t);
    }
    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
  }

  return (
    <div className="flex gap-2 overflow-x-auto no-scrollbar py-1">
      <button
        onClick={() => setTrilha(null)}
        className="shrink-0 rounded-full px-4 py-2 text-sm border transition"
        style={{
          borderColor: "var(--border)",
          background: active === null ? "rgba(18,18,20,.04)" : "var(--surface)",
        }}
      >
        Todas
      </button>

      {trilhas.map((t) => (
        <button
          key={t.key}
          onClick={() => setTrilha(t.key)}
          className="shrink-0 rounded-full px-4 py-2 text-sm border transition"
          style={{
            borderColor: "var(--border)",
            background: active === t.key ? "rgba(18,18,20,.04)" : "var(--surface)",
          }}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}
