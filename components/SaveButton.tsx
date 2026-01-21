"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function SaveButton({ slug }: { slug: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      const r = await fetch("/api/favorites", { method: "GET" });
      if (r.status === 401) return;
      if (!r.ok) return;
      const data: { property_slug: string }[] = await r.json();
      setSaved(data.some((x) => x.property_slug === slug));
    })();
  }, [slug]);

  async function toggle() {
    if (loading) return;
    setLoading(true);

    try {
      if (!saved) {
        const r = await fetch("/api/favorites", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ property_slug: slug }),
        });

        if (r.status === 401) {
          router.push(`/login?next=${encodeURIComponent(pathname)}`);
          return;
        }
        if (r.ok) setSaved(true);
        return;
      }

      const r = await fetch(`/api/favorites/${encodeURIComponent(slug)}`, { method: "DELETE" });
      if (r.status === 401) {
        router.push(`/login?next=${encodeURIComponent(pathname)}`);
        return;
      }
      if (r.ok) setSaved(false);
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={toggle}
      className="rounded-full px-4 py-2 text-sm border transition"
      style={{ borderColor: "var(--border)", background: "var(--surface)", color: "var(--text)" }}
      aria-label="Salvar imóvel"
      title={saved ? "Remover dos salvos" : "Salvar"}
      disabled={loading}
    >
      {saved ? "Salvo" : "Salvar"}
    </button>
  );
}

