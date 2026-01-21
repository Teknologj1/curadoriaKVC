"use client";

import { getWhatsAppLink } from "@/lib/utils/whatsapp";

export default function FinalCTA() {
  const whatsappLink = getWhatsAppLink({ model: "A" });

  return (
    <section className="final-cta">
      <div className="final-cta-container">
        <h2 className="final-cta-headline">
          Decisão boa é decisão tranquila.
        </h2>
        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="final-cta-button"
        >
          Agendar uma conversa
        </a>
      </div>
    </section>
  );
}

