"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { getProperties } from "@/lib/cms/queries";
import { SaveButton } from "@/components/pwa/SaveButton";
import type { Property } from "@/lib/types";

export default function ResultsList() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProperties();
  }, []);

  async function loadProperties() {
    try {
      const data = await getProperties();
      setProperties(data);
    } catch (error) {
      console.error("Erro ao carregar propriedades:", error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return <div className="results-loading">Carregando resultados...</div>;
  }

  return (
    <section className="results-section">
      <div className="results-container">
        <div className="results-header">
          <h2 className="results-title">
            {properties.length} imóvel{properties.length !== 1 ? "is" : ""}{" "}
            encontrado{properties.length !== 1 ? "s" : ""}
          </h2>
        </div>

        <div className="results-grid">
          {properties.map((property) => (
            <div key={property.id} className="result-card">
              <Link href={`/imovel/${property.slug}?model=B`}>
                <div className="result-card-image-wrapper">
                  <Image
                    src={property.media.coverImage.url}
                    alt={property.media.coverImage.alt}
                    fill
                    className="result-card-image"
                    sizes="(max-width: 768px) 100vw, 33vw"
                    loading="lazy"
                  />
                </div>
                <div className="result-card-content">
                  <h3 className="result-card-headline">
                    {property.editorial.headline}
                  </h3>
                  <div className="result-card-info">
                    <span>{property.specs.bedrooms} quartos</span>
                    {property.specs.suites && property.specs.suites > 0 && (
                      <span>{property.specs.suites} suítes</span>
                    )}
                    {property.specs.areaM2 && (
                      <span>{property.specs.areaM2}m²</span>
                    )}
                    <span>{property.location.neighborhood}</span>
                  </div>
                  {property.pricing?.price && (
                    <div className="result-card-price">
                      {new Intl.NumberFormat("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                        minimumFractionDigits: 0,
                      }).format(property.pricing.price)}
                    </div>
                  )}
                </div>
              </Link>
              <div className="result-card-actions">
                <Link
                  href={`/imovel/${property.slug}?model=B`}
                  className="result-action-button primary"
                >
                  Ver imóvel
                </Link>
                <a
                  href={`https://wa.me/5511999999999?text=${encodeURIComponent(
                    `Olá! Vi os resultados da busca e quero saber mais sobre: ${property.editorial.headline}.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="result-action-button secondary"
                >
                  WhatsApp
                </a>
                <SaveButton
                  id={property.id}
                  slug={property.slug}
                  title={property.editorial.title}
                  headline={property.editorial.headline}
                  coverUrl={property.media.coverImage.url}
                  variant="icon"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

