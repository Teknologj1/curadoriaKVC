import Link from "next/link";
import Image from "next/image";
import { Property } from "@/lib/types";
import { SaveButton } from "./SaveButton";

export function PropertyCard({ item, showPrice }: { item: Property; showPrice: boolean }) {
  const price = item.pricing?.price;

  return (
    <article
      className="group rounded-3xl overflow-hidden border transition-all duration-500"
      style={{ borderColor: "var(--border)", background: "var(--surface)", boxShadow: "var(--shadow)" }}
    >
      <Link href={`/imovel/${item.slug}`} className="block">
        <div className="relative aspect-[4/5] overflow-hidden">
          <Image
            src={item.media.coverImage.url}
            alt={item.media.coverImage.alt}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
            sizes="(max-width: 768px) 100vw, 33vw"
            priority={false}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-90 transition-opacity duration-500" />
        </div>
      </Link>

      <div className="p-5 md:p-6 space-y-3">
        <div className="text-sm" style={{ color: "var(--muted)" }}>
          {item.location.neighborhood} • {item.specs.bedrooms ?? "-"}q • {item.specs.parkingSpots ?? "-"}v
        </div>
        <Link href={`/imovel/${item.slug}`} className="block">
          <h3 className="text-lg md:text-xl font-serif font-light leading-[1.3] line-clamp-2 transition-colors duration-500">
            {item.editorial.headline}
          </h3>
        </Link>
        {showPrice && typeof price === "number" && (
          <p className="text-base font-light" style={{ color: "var(--accent)" }}>
            R$ {price.toLocaleString("pt-BR")}
          </p>
        )}
        <div className="flex items-center justify-between">
          <Link
            href={`/imovel/${item.slug}`}
            className="text-sm opacity-80 hover:opacity-100 transition underline underline-offset-4"
          >
            Ver por quê →
          </Link>
          <SaveButton slug={item.slug} />
        </div>
      </div>
    </article>
  );
}

