"use client";

import { getWhatsAppLink } from "@/lib/utils/whatsapp";
import type { Property } from "@/lib/types";

interface InlineCTAProps {
  property: Property;
  model: "A" | "B";
}

export default function InlineCTA({ property, model }: InlineCTAProps) {
  const whatsappLink = getWhatsAppLink({
    model,
    type: "property",
    propertyTitle: property.editorial.title,
  });

  return (
    <section className="property-inline-cta">
      <div className="property-inline-cta-container">
        <p className="property-inline-cta-text">
          Se fizer sentido para você, a gente conversa.
        </p>
        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="property-inline-cta-button"
        >
          Falar comigo no WhatsApp
        </a>
      </div>
    </section>
  );
}

