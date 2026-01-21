"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Property } from "@/lib/types";
import { getAllProperties } from "@/lib/data";

export default function AdminPage() {
  const router = useRouter();
  const [properties, setProperties] = useState<Property[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Verificar autenticação
    const user = localStorage.getItem("admin");
    if (!user) {
      router.push("/login?admin=true");
      return;
    }
    setIsAuthenticated(true);
    setProperties(getAllProperties());
  }, [router]);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen">
      <div className="border-b" style={{ borderColor: "var(--border)", background: "var(--surface)" }}>
        <div className="mx-auto max-w-7xl px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-serif font-light">Admin - KVC Curadoria</h1>
            <button
              onClick={() => {
                localStorage.removeItem("admin");
                router.push("/login");
              }}
              className="text-sm px-4 py-2 rounded-lg border transition-all"
              style={{ borderColor: "var(--border)", background: "var(--surface)" }}
            >
              Sair
            </button>
          </div>
        </div>
      </div>

      <main className="mx-auto max-w-7xl px-6 py-8">
        <div className="mb-8">
          <h2 className="text-xl font-light mb-2">Gerenciar Imóveis</h2>
          <p className="text-sm" style={{ color: "var(--muted)" }}>
            {properties.length} imóveis cadastrados
          </p>
        </div>

        <div className="space-y-4">
          {properties.map((property) => (
            <div
              key={property.id}
              className="p-6 rounded-lg border transition-all"
              style={{ borderColor: "var(--border)", background: "var(--surface)" }}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h3 className="font-medium mb-1">{property.editorial.title}</h3>
                  <p className="text-sm mb-2" style={{ color: "var(--muted)" }}>
                    {property.editorial.headline}
                  </p>
                  <div className="flex gap-4 text-xs" style={{ color: "var(--muted)" }}>
                    <span>{property.location.neighborhood}</span>
                    <span>•</span>
                    <span>{property.specs.bedrooms}q</span>
                    <span>•</span>
                    <span>{property.specs.parkingSpots}v</span>
                    {property.pricing?.price && (
                      <>
                        <span>•</span>
                        <span>R$ {property.pricing.price.toLocaleString("pt-BR")}</span>
                      </>
                    )}
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    className="px-4 py-2 text-sm rounded-lg border transition-all"
                    style={{ borderColor: "var(--border)", background: "var(--surface)" }}
                  >
                    Editar
                  </button>
                  <button className="px-4 py-2 text-sm rounded-lg border border-red-500/20 text-red-600 hover:bg-red-50 transition-all">
                    Excluir
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 p-8 rounded-lg border-2 border-dashed text-center" style={{ borderColor: "var(--border)" }}>
          <p className="text-sm mb-4" style={{ color: "var(--muted)" }}>
            Para adicionar novos imóveis, edite o arquivo{" "}
            <code className="px-2 py-1 rounded text-xs" style={{ background: "var(--surface)" }}>
              data/properties.json
            </code>
          </p>
          <p className="text-xs" style={{ color: "var(--muted)" }}>
            Em produção, esta interface será conectada a um CMS ou banco de dados.
          </p>
        </div>
      </main>
    </div>
  );
}
