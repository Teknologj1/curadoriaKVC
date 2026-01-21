/**
 * InstallBanner - Banner não agressivo de instalação PWA
 * Aparece após engajamento (2ª visita ou após salvar 1 imóvel)
 */

'use client';

import { useState, useEffect } from 'react';
import { isPWAInstalled, setupInstallPrompt } from '@/lib/pwa/install-prompt';

interface InstallBannerProps {
  trigger?: 'visit' | 'favorite' | 'manual';
}

export default function InstallBanner({ trigger = 'visit' }: InstallBannerProps) {
  const [show, setShow] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  useEffect(() => {
    // Verificar se já está instalado
    if (isPWAInstalled()) {
      return;
    }

    // Verificar se é iOS
    const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    setIsIOS(iOS);

    // Setup install prompt
    setupInstallPrompt();

    // Verificar trigger
    if (trigger === 'visit') {
      const visitCount = parseInt(localStorage.getItem('visit_count') || '0');
      const newCount = visitCount + 1;
      localStorage.setItem('visit_count', newCount.toString());

      if (newCount >= 2) {
        setShow(true);
      }
    } else if (trigger === 'favorite') {
      const favoriteCount = parseInt(localStorage.getItem('favorite_count') || '0');
      if (favoriteCount >= 1) {
        setShow(true);
      }
    }

    // Listener para beforeinstallprompt
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    });
  }, [trigger]);

  async function handleInstall() {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      
      if (outcome === 'accepted') {
        setShow(false);
        localStorage.setItem('pwa_install_dismissed', 'true');
      }
    }
  }

  function handleDismiss() {
    setShow(false);
    localStorage.setItem('pwa_install_dismissed', 'true');
  }

  if (!show || isPWAInstalled()) {
    return null;
  }

  return (
    <div className="install-banner">
      <div className="install-banner-content">
        <div className="install-banner-icon">📱</div>
        <div className="install-banner-text">
          <h3>Instalar KVC Curadoria</h3>
          <p>Acesso rápido e experiência offline</p>
        </div>
        <div className="install-banner-actions">
          {isIOS ? (
            <a href="#ios-install" className="install-button">
              Como instalar
            </a>
          ) : (
            <button onClick={handleInstall} className="install-button">
              Instalar
            </button>
          )}
          <button onClick={handleDismiss} className="dismiss-button">
            ✕
          </button>
        </div>
      </div>
    </div>
  );
}

