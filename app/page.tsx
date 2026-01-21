import Image from "next/image";
import Link from "next/link";
import { HeaderMinimal } from "@/components/HeaderMinimal";
import { CTASticky } from "@/components/CTASticky";
import { Footer } from "@/components/Footer";
import { ChipScroll } from "@/components/ChipScroll";
import { getAllProperties } from "@/lib/data";
import { filterByTrilha } from "@/lib/filters";
import { Trilha } from "@/lib/types";

type HomeProps = {
  searchParams?: {
    trilha?: Trilha;
  };
};

export default function Home({ searchParams }: HomeProps) {
  const all = getAllProperties();
  const byTag = all.filter((p) => (p.editorial.tags || []).includes("escolhas_da_semana"));
  const picks = (byTag.length ? byTag : all)
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    .slice(0, 3);
  const feed = filterByTrilha(all, searchParams?.trilha);

  return (
    <div className="min-h-screen">
      <HeaderMinimal />

      {/* HERO */}
      <section className="relative">
        <div className="absolute inset-0 -z-10">
          <Image
            src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=2000&h=1200&fit=crop"
            alt="Residência de alto padrão em destaque"
            fill
            className="object-cover opacity-40"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#F7F6F2]/80 via-[#F7F6F2]/60 to-transparent" />
        </div>

        <div className="mx-auto max-w-6xl px-4 pt-14 pb-10 md:pt-20 md:pb-16">
          <div className="max-w-3xl">
            <p className="text-xs md:text-sm tracking-[0.2em] uppercase" style={{ color: "var(--muted)" }}>
              KVC Curadoria
            </p>
            <h1 className="mt-4 text-3xl md:text-6xl font-serif font-light leading-tight">
              Escolher um imóvel é decidir como você vai viver.
            </h1>
            <p className="mt-4 text-base md:text-lg max-w-2xl" style={{ color: "var(--muted)" }}>
              KVC Curadoria — imóveis de alto padrão no Lago Sul, Brasília-DF, com as melhores escolhas e alto critério.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="https://wa.me/5561999999999?text=Ol%C3%A1!%20Vim%20pela%20KVC%20Curadoria%20e%20quero%20conversar%20sobre%20op%C3%A7%C3%B5es%20no%20meu%20perfil."
                className="rounded-full px-5 py-3 text-sm font-semibold"
                style={{ background: "var(--accent)", color: "var(--accentText)" }}
              >
                Conversar com a curadoria
              </a>
              <Link
                href="/finder"
                className="rounded-full px-5 py-3 text-sm border transition"
                style={{ borderColor: "var(--border)", background: "var(--surface)" }}
              >
                Fazer busca guiada
              </Link>
              <Link
                href="#escolhas"
                className="rounded-full px-5 py-3 text-sm border transition"
                style={{ borderColor: "var(--border)", color: "var(--text)" }}
              >
                Ver escolhas da semana
              </Link>
            </div>

            <div className="mt-8">
              <p className="text-sm" style={{ color: "var(--muted)" }}>Trilhas</p>
              <div className="mt-2">
                <ChipScroll />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ESCOLHAS DA SEMANA */}
      <section id="escolhas" className="mx-auto max-w-6xl px-4 pt-10">
        <div className="flex items-end justify-between gap-6">
          <div>
            <h2 className="text-xl md:text-2xl font-semibold">Escolhas da semana</h2>
            <p className="mt-2 text-sm max-w-2xl" style={{ color: "var(--muted)" }}>
              Seleção curta para facilitar decisão. Cada item tem contexto e ponto de atenção.
            </p>
          </div>
          <Link
            className="hidden md:inline text-sm opacity-90 hover:opacity-100 transition"
            href="/finder"
            style={{ color: "var(--muted)" }}
          >
            Prefiro fazer a busca guiada →
          </Link>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          {picks.map((p) => (
            <Link
              key={p.id}
              href={`/imovel/${p.slug}`}
              className="group rounded-3xl overflow-hidden border transition"
              style={{ borderColor: "var(--border)", background: "var(--surface)", boxShadow: "var(--shadow)" }}
            >
              <div className="relative aspect-[4/5]">
                <Image
                  src={p.media.coverImage.url}
                  alt={p.media.coverImage.alt}
                  fill
                  className="object-cover group-hover:scale-[1.02] transition"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/70 to-transparent text-white">
                  <div className="text-sm text-white/90">
                    {p.location.neighborhood} • {p.specs.bedrooms ?? "-"}q • {p.specs.parkingSpots ?? "-"}v
                  </div>
                  <div className="mt-2 font-semibold leading-snug line-clamp-2">
                    {p.editorial.headline}
                  </div>
                  <div className="mt-3 text-sm text-white/90 underline underline-offset-4">
                    Ver por quê →
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* FEED EDITORIAL */}
      <section className="mx-auto max-w-6xl px-4 py-12">
        <div className="flex items-end justify-between gap-6">
          <div>
            <h3 className="text-lg md:text-xl font-semibold">Curadoria</h3>
            <p className="mt-2 text-sm" style={{ color: "var(--muted)" }}>
              Menos imóveis. Mais clareza.
            </p>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          {feed.map((p) => (
            <Link
              key={p.id}
              href={`/imovel/${p.slug}`}
              className="rounded-3xl border transition p-5"
              style={{ borderColor: "var(--border)", background: "var(--surface)", boxShadow: "var(--shadow)" }}
            >
              <div className="text-sm" style={{ color: "var(--muted)" }}>
                {p.location.neighborhood} • {p.specs.bedrooms ?? "-"}q • {p.specs.parkingSpots ?? "-"}v
              </div>
              <div className="mt-2 text-lg font-semibold leading-snug">
                {p.editorial.title}
              </div>
              <div className="mt-2 text-sm line-clamp-2" style={{ color: "var(--muted)" }}>
                {p.editorial.summary}
              </div>
              <div className="mt-4 text-sm underline underline-offset-4" style={{ color: "var(--muted)" }}>
                Ver por quê →
              </div>
            </Link>
          ))}
        </div>
      </section>

      <Footer mode="A" />
      <CTASticky />
      <div className="h-20 md:hidden" />
    </div>
  );
}
