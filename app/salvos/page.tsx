import Link from "next/link";
import { HeaderMinimal } from "@/components/HeaderMinimal";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getAllProperties } from "@/lib/data";
import { PropertyCard } from "@/components/PropertyCard";

export default async function SavedPage() {
  const supabase = createSupabaseServerClient();
  const { data: userData } = await supabase.auth.getUser();
  if (!userData.user) return null;

  const { data: favs } = await supabase
    .from("favorites")
    .select("property_slug, created_at")
    .order("created_at", { ascending: false });

  const all = getAllProperties();
  const saved = (favs || [])
    .map((f) => all.find((p) => p.slug === f.property_slug))
    .filter(Boolean);

  return (
    <div className="min-h-screen" style={{ background: "var(--bg)", color: "var(--text)" }}>
      <HeaderMinimal />

      <main className="mx-auto max-w-6xl px-4 py-10">
        <div className="mb-8 flex items-end justify-between gap-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-serif font-light mb-2">Imóveis salvos</h1>
            <p className="text-base" style={{ color: "var(--muted)" }}>
              {saved.length > 0
                ? `${saved.length} ${saved.length === 1 ? "imóvel salvo" : "imóveis salvos"}`
                : "Seus imóveis favoritos aparecerão aqui"}
            </p>
          </div>
          <Link
            href="/finder"
            className="rounded-full px-4 py-2 text-sm border transition"
            style={{ borderColor: "var(--border)", background: "var(--surface2)" }}
          >
            Fazer busca guiada
          </Link>
        </div>

        {saved.length === 0 ? (
          <div className="rounded-3xl border p-8 text-center" style={{ borderColor: "var(--border)", background: "var(--surface)", boxShadow: "var(--shadow)" }}>
            <h2 className="text-lg font-semibold">Nenhum imóvel salvo ainda</h2>
            <p className="mt-2" style={{ color: "var(--muted)" }}>
              Comece explorando nossa curadoria e salve os imóveis que mais chamam sua atenção.
            </p>
            <div className="mt-6">
              <Link
                href="/"
                className="rounded-full px-5 py-3 text-sm border transition"
                style={{ borderColor: "var(--border)", background: "var(--surface2)" }}
              >
                Explorar curadoria
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {saved.map((item) => (
              <div key={item!.id}>
                <PropertyCard item={item!} showPrice={false} />
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
