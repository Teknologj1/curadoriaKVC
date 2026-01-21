"use client";

import Link from "next/link";
import { useState } from "react";
import { MobileMenuSheet } from "@/components/MobileMenuSheet";

export function HeaderMinimal() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40">
      <div
        className="backdrop-blur"
        style={{ background: "rgba(247,246,242,.72)", borderBottom: "1px solid var(--border)" }}
      >
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between gap-4">
          <Link href="/" className="font-semibold tracking-wide">
            KVC Curadoria
          </Link>

          <nav className="hidden md:flex items-center gap-8 text-sm">
            <Link className="opacity-80 hover:opacity-100 transition" href="/">
              Curadoria
            </Link>
            <Link className="opacity-80 hover:opacity-100 transition" href="/finder">
              Busca guiada
            </Link>
            <Link className="opacity-80 hover:opacity-100 transition" href="/salvos">
              Salvos
            </Link>
          </nav>

          <div className="flex items-center gap-2">
            <a
              href="https://wa.me/5561999999999?text=Ol%C3%A1!%20Vim%20pela%20KVC%20Curadoria%20e%20quero%20conversar%20sobre%20op%C3%A7%C3%B5es%20no%20meu%20perfil."
              className="hidden md:inline-flex rounded-full px-4 py-2 text-sm border transition"
              style={{ borderColor: "var(--border)", background: "var(--surface)" }}
            >
              Conversar
            </a>

            <a
              href="https://wa.me/5561999999999?text=Ol%C3%A1!%20Vim%20pela%20KVC%20Curadoria%20e%20quero%20conversar%20sobre%20op%C3%A7%C3%B5es%20no%20meu%20perfil."
              className="md:hidden inline-flex rounded-full px-4 py-2 text-sm border transition"
              style={{ borderColor: "var(--border)", background: "var(--surface)" }}
            >
              Conversar
            </a>

            <button
              className="md:hidden inline-flex rounded-full px-4 py-2 text-sm border transition"
              style={{ borderColor: "var(--border)", background: "var(--surface)" }}
              onClick={() => setOpen(true)}
            >
              Menu
            </button>
          </div>
        </div>
      </div>

      <MobileMenuSheet open={open} onClose={() => setOpen(false)} />
    </header>
  );
}

