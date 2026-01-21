/**
 * WhatsApp Utils
 * Gera links do WhatsApp com mensagens pré-preenchidas
 */

import { getSiteConfig } from "@/lib/config";

interface WhatsAppContext {
  model: "A" | "B";
  type?: "general" | "property" | "help";
  propertyTitle?: string;
}

export function getWhatsAppLink(context: WhatsAppContext): string {
  const config = getSiteConfig();
  const phone = process.env.NEXT_PUBLIC_WHATSAPP || "5511999999999";

  let message = "";

  if (context.model === "A") {
    if (context.type === "property" && context.propertyTitle) {
      message = `Olá! Tenho interesse no imóvel: ${context.propertyTitle}. Podemos conversar?`;
    } else {
      message = config.site.cta.whatsappPreFill.A;
    }
  } else {
    if (context.type === "help") {
      message = config.site.cta.whatsappPreFill.B;
    } else if (context.type === "property" && context.propertyTitle) {
      message = `Olá! Vi este imóvel na busca e quero entender se faz sentido para meu perfil. Podemos conversar?`;
    } else {
      message = config.site.cta.whatsappPreFill.B;
    }
  }

  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

