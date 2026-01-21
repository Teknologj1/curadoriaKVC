"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { HeaderMinimal } from "@/components/HeaderMinimal";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const router = useRouter();
  const [next, setNext] = useState("/");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [msg, setMsg] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setNext(params.get("next") || "/");
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMsg(null);

    const supabase = createSupabaseBrowserClient();
    const fn = mode === "login" ? supabase.auth.signInWithPassword : supabase.auth.signUp;
    const { error } = await fn({ email, password });

    if (error) {
      setMsg(error.message);
      return;
    }
    router.replace(next);
  }

  return (
    <div className="min-h-screen" style={{ background: "var(--bg)", color: "var(--text)" }}>
      <HeaderMinimal />

      <main className="mx-auto max-w-md px-4 py-20">
        <div className="space-y-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-serif font-light mb-3">Entrar</h1>
            <p className="text-lg" style={{ color: "var(--muted)" }}>
              Acesse sua conta para salvar imóveis e montar sua curadoria.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-light mb-2" style={{ color: "var(--muted)" }}>
                E-mail
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border placeholder-black/40 focus:outline-none transition-all"
                style={{ borderColor: "var(--border)", background: "var(--surface)", color: "var(--text)" }}
                placeholder="seu@email.com"
                autoComplete="email"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-light mb-2" style={{ color: "var(--muted)" }}>
                Senha
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border placeholder-black/40 focus:outline-none transition-all"
                style={{ borderColor: "var(--border)", background: "var(--surface)", color: "var(--text)" }}
                placeholder="••••••••"
                autoComplete={mode === "login" ? "current-password" : "new-password"}
                required
              />
            </div>

            <button
              type="submit"
              className="w-full px-6 py-4 rounded-lg font-medium transition-all duration-300"
              style={{ background: "var(--accent)", color: "var(--accentText)" }}
            >
              {mode === "login" ? "Entrar" : "Criar conta"}
            </button>

            <button
              type="button"
              className="w-full px-6 py-4 rounded-lg border transition-all duration-300"
              style={{ borderColor: "var(--border)", background: "var(--surface)" }}
              onClick={() => setMode(mode === "login" ? "signup" : "login")}
            >
              {mode === "login" ? "Criar conta" : "Já tenho conta"}
            </button>

            {msg && <p className="text-sm" style={{ color: "var(--muted)" }}>{msg}</p>}
          </form>
        </div>
      </main>
    </div>
  );
}
