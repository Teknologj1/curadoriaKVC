"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { getProperties } from "@/lib/cms/queries";
import type { Property, Trilha } from "@/lib/types";

export default function CuratedFeed() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTrilha, setActiveTrilha] = useState<Trilha | null>(null);

  useEffect(() => {
    loadProperties();
  }, [activeTrilha]);

  async function loadProperties() {
    try {
      const data = await getProperties({
        trilha: activeTrilha || undefined,
      });
      setProperties(data);
    } catch (error) {
      console.error("Erro ao carregar propriedades:", error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return <div className="curated-feed-loading">Carregando curadoria...</div>;
  }

  return (
    <section className="curated-feed">
      <div className="curated-feed-container">
        {properties.map((property) => (
          <Link
            key={property.id}
            href={`/imovel/${property.slug}?model=A`}
            className="curated-card"
          >
            <div className="curated-card-image-wrapper">
              <Image
                src={property.media.coverImage.url}
                alt={property.media.coverImage.alt}
                fill
                className="curated-card-image"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority={properties.indexOf(property) < 2}
              />
              <div className="curated-card-overlay" />
            </div>
            <div className="curated-card-content">
              <h2 className="curated-card-headline">
                {property.editorial.headline}
              </h2>
              <span className="curated-card-cta">
                Por que este imóvel →
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

