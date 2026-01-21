import Link from "next/link";
import Image from "next/image";
import type { Property } from "@/lib/types";
import { SaveButton } from "@/components/SaveButton";

export function FinderCard({ item }: { item: Property }) {
  const price = item.pricing?.price;

  return (
    <article
      className="rounded-[28px] overflow-hidden border"
      style={{ borderColor: "var(--border)", background: "var(--surface)", boxShadow: "var(--shadow)" }}
    >
      <Link href={`/imovel/${item.slug}`} className="block">
        <div className="relative aspect-[4/5]">
          <Image
            src={item.media.coverImage.url}
            alt={item.media.coverImage.alt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
          <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/55 to-transparent">
            <div className="text-sm text-white/90">
              {item.location.neighborhood} • {item.specs.bedrooms ?? "-"}q • {item.specs.parkingSpots ?? "-"}v
            </div>
          </div>
        </div>
      </Link>

      <div className="p-5">
        <div className="text-base font-semibold leading-snug line-clamp-2">
          {item.editorial.headline}
        </div>

        <div className="mt-2 text-sm" style={{ color: "var(--muted)" }}>
          {item.editorial.summary}
        </div>

        <div className="mt-4 flex items-center justify-between gap-3">
          <div className="text-sm font-semibold">
            {typeof price === "number" ? `R$ ${price.toLocaleString("pt-BR")}` : "Preço sob consulta"}
          </div>

          <SaveButton slug={item.slug} />
        </div>
      </div>
    </article>
  );
}
