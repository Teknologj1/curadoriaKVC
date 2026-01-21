/**
 * Attention Points Utils
 */

export function getDefaultAttentionMessage(model: "A" | "B"): string {
  if (model === "A") {
    return "Pontos de atenção serão discutidos na conversa/visita.";
  }
  return "";
}

