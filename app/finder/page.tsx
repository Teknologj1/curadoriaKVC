"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { HeaderMinimal } from "@/components/HeaderMinimal";
import { ProfileWizard } from "@/components/ProfileWizard";
import { getAllProperties } from "@/lib/data";
import { filterByProfile } from "@/lib/filters";
import type { ProfileFit } from "@/lib/types";
import { FinderCard } from "@/components/FinderCard";

export default function FinderPage() {
  const all = useMemo(() => getAllProperties(), []);
  const [profile, setProfile] = useState<ProfileFit | undefined>(undefined);

  const list = useMemo(() => filterByProfile(all, profile), [all, profile]);

  return (
    <div className="min-h-screen" style={{ background: "var(--bg)", color: "var(--text)" }}>
      <HeaderMinimal />

      <main className="mx-auto max-w-6xl px-4 py-10 space-y-8">
        <section
          className="rounded-[28px] border p-6 md:p-10"
          style={{ background: "var(--surface)", borderColor: "var(--border)", boxShadow: "var(--shadow)" }}
        >
          <p className="text-xs tracking-wide uppercase" style={{ color: "var(--muted)" }}>
            Busca guiada
          </p>
          <h1 className="mt-3 text-3xl md:text-5xl font-semibold leading-tight">
            Encontre opções que combinam com seu perfil.
          </h1>
          <p className="mt-4 max-w-2xl" style={{ color: "var(--muted)" }}>
            Um fluxo curto para reduzir ruído e chegar em escolhas que fazem sentido. Sem busca aberta e sem filtros confusos.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/"
              className="rounded-full px-5 py-3 text-sm border transition"
              style={{ borderColor: "var(--border)", background: "var(--surface2)" }}
            >
              Voltar para Curadoria
            </Link>

            <a
              href="https://wa.me/5561999999999?text=Ol%C3%A1!%20Fiz%20a%20busca%20guiada%20e%20quero%20ajuda%20para%20selecionar%20as%20melhores%20op%C3%A7%C3%B5es%20para%20o%20meu%20perfil."
              className="rounded-full px-5 py-3 text-sm font-semibold transition"
              style={{ background: "var(--accent)", color: "var(--accentText)" }}
            >
              Conversar agora
            </a>
          </div>
        </section>

        <ProfileWizard onSelect={setProfile} />

        <section>
          <div className="flex items-end justify-between gap-6">
            <div>
              <h2 className="text-lg md:text-xl font-semibold">Opções</h2>
              <p className="mt-2 text-sm" style={{ color: "var(--muted)" }}>
                {profile ? "Lista refinada para o perfil selecionado." : "Selecione um perfil para refinar a seleção."}
              </p>
            </div>

            {profile && (
              <button
                onClick={() => setProfile(undefined)}
                className="text-sm underline underline-offset-4 opacity-80 hover:opacity-100 transition"
              >
                limpar
              </button>
            )}
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            {list.map((p) => (
              <FinderCard key={p.id} item={p} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
