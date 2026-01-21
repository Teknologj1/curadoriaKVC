import Link from "next/link";
import { HeaderMinimal } from "@/components/HeaderMinimal";
import { getPropertyBySlug } from "@/lib/data";
import { SaveButton } from "@/components/SaveButton";
import { PropertyGallery } from "@/components/PropertyGallery";

export default function PropertyPage({ params }: { params: { slug: string } }) {
  const item = getPropertyBySlug(params.slug);
  if (!item) return <div className="p-10">Imóvel não encontrado.</div>;

  const price = item.pricing?.price;

  return (
    <div className="min-h-screen" style={{ background: "var(--bg)", color: "var(--text)" }}>
      <HeaderMinimal />

      <main className="mx-auto max-w-6xl px-4 py-8 space-y-8">
        <section
          className="rounded-[28px] overflow-hidden border"
          style={{ borderColor: "var(--border)", background: "var(--surface)", boxShadow: "var(--shadow)" }}
        >
          <div className="p-4 md:p-6 flex items-center justify-between gap-3">
            <Link
              href="/"
              className="rounded-full px-4 py-2 text-sm border transition"
              style={{ borderColor: "var(--border)", background: "var(--surface2)" }}
            >
              Voltar
            </Link>

            <div className="flex items-center gap-2">
              <a
                href={`https://wa.me/5561999999999?text=${encodeURIComponent(
                  `Olá! Quero conversar sobre este imóvel da KVC Curadoria: ${item.editorial.title}`
                )}`}
                className="rounded-full px-4 py-2 text-sm border transition"
                style={{ borderColor: "var(--border)", background: "var(--surface2)" }}
              >
                Conversar
              </a>

              <SaveButton slug={item.slug} />
            </div>
          </div>

          <div className="px-4 md:px-6 pb-4 md:pb-6">
            <div className="relative">
              <PropertyGallery media={[item.media.coverImage, ...item.media.gallery]} />
            </div>

            <div className="mt-6">
              <p className="text-sm" style={{ color: "var(--muted)" }}>
                {item.location.neighborhood} • {item.location.city}/{item.location.state}
              </p>

              <h1 className="mt-2 text-2xl md:text-4xl font-semibold leading-tight max-w-4xl">
                {item.editorial.title}
              </h1>

              <p className="mt-3 text-base md:text-lg max-w-4xl" style={{ color: "var(--muted)" }}>
                {item.editorial.summary}
              </p>

              {typeof price === "number" && (
                <p className="mt-4 text-sm" style={{ color: "var(--muted)" }}>
                  Valor:{" "}
                  <span className="font-semibold" style={{ color: "var(--text)" }}>
                    R$ {price.toLocaleString("pt-BR")}
                  </span>
                </p>
              )}
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div
            className="rounded-[28px] border p-6 md:col-span-2"
            style={{ borderColor: "var(--border)", background: "var(--surface)", boxShadow: "var(--shadow)" }}
          >
            <h2 className="text-lg font-semibold">Para quem este imóvel é</h2>
            <ul className="mt-4 list-disc pl-5 space-y-2" style={{ color: "var(--muted)" }}>
              {item.editorial.forWhom.map((t, i) => (
                <li key={i} style={{ color: "var(--muted)" }}>
                  {t}
                </li>
              ))}
            </ul>
          </div>

          <div
            className="rounded-[28px] border p-6"
            style={{ borderColor: "var(--border)", background: "var(--surface)", boxShadow: "var(--shadow)" }}
          >
            <h2 className="text-lg font-semibold">Ficha rápida</h2>
            <div className="mt-4 text-sm space-y-2" style={{ color: "var(--muted)" }}>
              <div>Área: {item.specs.areaM2 ?? "-"} m²</div>
              <div>Quartos: {item.specs.bedrooms ?? "-"}</div>
              <div>Suítes: {item.specs.suites ?? "-"}</div>
              <div>Vagas: {item.specs.parkingSpots ?? "-"}</div>
              <div>Andar: {item.specs.floor ?? "-"}</div>
              <div>Sol: {item.specs.sunPosition ?? "-"}</div>
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div
            className="rounded-[28px] border p-6"
            style={{ borderColor: "var(--border)", background: "var(--surface)", boxShadow: "var(--shadow)" }}
          >
            <h2 className="text-lg font-semibold">Pontos fortes</h2>
            <ul className="mt-4 list-disc pl-5 space-y-2" style={{ color: "var(--muted)" }}>
              {item.editorial.strengths.map((t, i) => (
                <li key={i}>{t}</li>
              ))}
            </ul>
          </div>

          <div
            className="rounded-[28px] border p-6"
            style={{
              borderColor: "rgba(201,162,77,.35)",
              background: "rgba(201,162,77,.12)",
              boxShadow: "var(--shadow)",
            }}
          >
            <h2 className="text-lg font-semibold">Pontos de atenção</h2>
            <ul className="mt-4 list-disc pl-5 space-y-2">
              {item.editorial.attentionPoints.map((t, i) => (
                <li key={i} style={{ color: "rgba(17,17,19,.88)" }}>
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section
          className="rounded-[28px] border p-6 md:p-8"
          style={{ borderColor: "var(--border)", background: "var(--surface)", boxShadow: "var(--shadow)" }}
        >
          <h3 className="text-xl md:text-2xl font-semibold">Quer validar se faz sentido para o seu perfil?</h3>
          <p className="mt-3 max-w-2xl" style={{ color: "var(--muted)" }}>
            Eu te ajudo a cruzar contexto, pontos de atenção e a melhor decisão com segurança.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={`https://wa.me/5561999999999?text=${encodeURIComponent(
                `Olá! Quero validar este imóvel no meu perfil: ${item.editorial.title}`
              )}`}
              className="rounded-full px-5 py-3 text-sm font-semibold transition"
              style={{ background: "var(--accent)", color: "var(--accentText)", boxShadow: "var(--shadow)" }}
            >
              Conversar agora
            </a>

            <Link
              href="/finder"
              className="rounded-full px-5 py-3 text-sm border transition"
              style={{ borderColor: "var(--border)", background: "var(--surface2)" }}
            >
              Fazer busca guiada
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
