"use client";

import { getWhatsAppLink } from "@/lib/utils/whatsapp";

export default function AssistedDecisionCTA() {
  const whatsappLink = getWhatsAppLink({ model: "B", type: "help" });

  return (
    <section className="assisted-decision-cta">
      <div className="assisted-decision-container">
        <h2 className="assisted-decision-title">
          Não encontrou o que procura?
        </h2>
        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="assisted-decision-button"
        >
          Quero ajuda para decidir
        </a>
      </div>
    </section>
  );
}

