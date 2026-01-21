"use client";

import { useEffect, useState } from "react";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [show, setShow] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // Verificar se já está instalado
    const installed = 
      window.matchMedia("(display-mode: standalone)").matches ||
      (window.navigator as any).standalone === true ||
      document.referrer.includes("android-app://");
    
    setIsInstalled(installed);

    // Verificar se é iOS
    const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    setIsIOS(iOS);

    // Verificar triggers de engajamento
    const visitCount = parseInt(localStorage.getItem("visit_count") || "0");
    const favoriteCount = parseInt(localStorage.getItem("favorite_count") || "0");
    const wizardCompleted = localStorage.getItem("wizard_completed") === "true";
    const dismissed = localStorage.getItem("install_dismissed") === "true";

    // Mostrar apenas se:
    // - Não está instalado
    // - Não foi dispensado
    // - E (2ª visita OU salvou 1 favorito OU completou wizard)
    if (
      !installed &&
      !dismissed &&
      (visitCount >= 2 || favoriteCount >= 1 || wizardCompleted)
    ) {
      setShow(true);
    }

    // Listener para beforeinstallprompt (Android/Chrome)
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    };
  }, []);

  async function handleInstall() {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      
      if (outcome === "accepted") {
        setShow(false);
        localStorage.setItem("install_dismissed", "true");
        
        // Track
        if (typeof (window as any).gtag !== "undefined") {
          (window as any).gtag("event", "pwa_install_accepted");
        }
      } else {
        localStorage.setItem("install_dismissed", "true");
        
        // Track
        if (typeof (window as any).gtag !== "undefined") {
          (window as any).gtag("event", "pwa_install_dismissed");
        }
      }
      
      setDeferredPrompt(null);
    }
  }

  function handleDismiss() {
    setShow(false);
    localStorage.setItem("install_dismissed", "true");
  }

  if (!show || isInstalled) {
    return null;
  }

  return (
    <div className="install-prompt">
      <div className="install-prompt-content">
        <div className="install-prompt-icon">📱</div>
        <div className="install-prompt-text">
          <h3>Instalar KVC Curadoria</h3>
          <p>Acesso rápido e experiência offline</p>
        </div>
        <div className="install-prompt-actions">
          {isIOS ? (
            <details className="ios-install-details">
              <summary className="install-button">Como instalar</summary>
              <div className="ios-install-steps">
                <ol>
                  <li>Toque no botão de compartilhar (□↑)</li>
                  <li>Role até "Adicionar à Tela de Início"</li>
                  <li>Toque em "Adicionar"</li>
                </ol>
              </div>
            </details>
          ) : (
            <button onClick={handleInstall} className="install-button">
              Instalar
            </button>
          )}
          <button onClick={handleDismiss} className="dismiss-button" aria-label="Fechar">
            ✕
          </button>
        </div>
      </div>
    </div>
  );
}

