"use client";

import Link from "next/link";
import { useEffect } from "react";

export function MobileMenuSheet({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 md:hidden">
      <button
        aria-label="Fechar"
        onClick={onClose}
        className="absolute inset-0"
        style={{ background: "rgba(0,0,0,.22)" }}
      />

      <div
        className="absolute left-0 right-0 bottom-0 rounded-t-[28px] border p-5"
        style={{ background: "var(--bg)", borderColor: "var(--border)", boxShadow: "var(--shadow)" }}
      >
        <div className="mx-auto w-12 h-1.5 rounded-full" style={{ background: "rgba(30,35,40,.18)" }} />

        <div className="mt-5 space-y-3">
          <Link
            onClick={onClose}
            href="/"
            className="block rounded-2xl px-4 py-4 border"
            style={{ borderColor: "var(--border)", background: "var(--surface)" }}
          >
            <div className="font-semibold">Curadoria</div>
            <div className="text-sm" style={{ color: "var(--muted)" }}>
              Escolhas curadas com contexto
            </div>
          </Link>

          <Link
            onClick={onClose}
            href="/finder"
            className="block rounded-2xl px-4 py-4 border"
            style={{ borderColor: "var(--border)", background: "var(--surface)" }}
          >
            <div className="font-semibold">Busca guiada</div>
            <div className="text-sm" style={{ color: "var(--muted)" }}>
              Refine por perfil sem ruido
            </div>
          </Link>

          <Link
            onClick={onClose}
            href="/salvos"
            className="block rounded-2xl px-4 py-4 border"
            style={{ borderColor: "var(--border)", background: "var(--surface)" }}
          >
            <div className="font-semibold">Salvos</div>
            <div className="text-sm" style={{ color: "var(--muted)" }}>
              Seu shortlist por perfil
            </div>
          </Link>

          <a
            onClick={onClose}
            href="https://wa.me/5561999999999?text=Ol%C3%A1!%20Vim%20pela%20KVC%20Curadoria%20e%20quero%20conversar%20sobre%20op%C3%A7%C3%B5es%20no%20meu%20perfil."
            className="block rounded-2xl px-4 py-4 text-center font-semibold"
            style={{ background: "var(--accent)", color: "var(--accentText)" }}
          >
            Conversar agora
          </a>
        </div>

        <div className="h-3" />
      </div>
    </div>
  );
}
