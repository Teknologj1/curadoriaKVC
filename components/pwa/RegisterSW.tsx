"use client";

import { useEffect } from "react";

export function RegisterSW() {
  useEffect(() => {
    // O next-pwa já registra automaticamente, mas podemos adicionar logs
    if (typeof window !== "undefined" && "serviceWorker" in navigator) {
      // Verificar se já está registrado
      navigator.serviceWorker.getRegistrations().then((registrations) => {
        if (registrations.length > 0) {
          console.log("[PWA] Service Worker já registrado");
        } else {
          console.log("[PWA] Aguardando registro automático do next-pwa");
        }
      });

      // Listener para atualizações
      navigator.serviceWorker.addEventListener("controllerchange", () => {
        console.log("[PWA] Novo Service Worker ativo");
        // Opcional: recarregar página
        // window.location.reload();
      });
    }
  }, []);

  return null; // Componente invisível
}

