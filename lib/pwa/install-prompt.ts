/**
 * PWA Install Prompt
 * Gerencia o prompt de instalação do PWA
 */

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

let deferredPrompt: BeforeInstallPromptEvent | null = null;

export function setupInstallPrompt() {
  window.addEventListener('beforeinstallprompt', (e) => {
    // Prevenir o prompt padrão
    e.preventDefault();
    deferredPrompt = e as BeforeInstallPromptEvent;
    
    // Mostrar botão de instalação
    showInstallButton();
  });

  // Quando PWA é instalado
  window.addEventListener('appinstalled', () => {
    console.log('PWA instalado');
    deferredPrompt = null;
    hideInstallButton();
    
    // Track install
    if (typeof window.gtag !== 'undefined') {
      window.gtag('event', 'pwa_installed', {
        method: 'browser',
        platform: navigator.platform
      });
    }
  });
}

export function showInstallButton() {
  const installButton = document.getElementById('pwa-install-button');
  if (installButton) {
    installButton.style.display = 'block';
    installButton.addEventListener('click', handleInstallClick);
  }
}

export function hideInstallButton() {
  const installButton = document.getElementById('pwa-install-button');
  if (installButton) {
    installButton.style.display = 'none';
  }
}

async function handleInstallClick() {
  if (!deferredPrompt) {
    return;
  }

  // Mostrar prompt
  deferredPrompt.prompt();

  // Aguardar escolha do usuário
  const { outcome } = await deferredPrompt.userChoice;
  
  if (outcome === 'accepted') {
    console.log('Usuário aceitou instalação');
    
    // Track
    if (typeof window.gtag !== 'undefined') {
      window.gtag('event', 'pwa_install_accepted');
    }
  } else {
    console.log('Usuário rejeitou instalação');
    
    // Track
    if (typeof window.gtag !== 'undefined') {
      window.gtag('event', 'pwa_install_dismissed');
    }
  }

  deferredPrompt = null;
  hideInstallButton();
}

// Verificar se já está instalado
export function isPWAInstalled(): boolean {
  return (
    window.matchMedia('(display-mode: standalone)').matches ||
    (window.navigator as any).standalone === true ||
    document.referrer.includes('android-app://')
  );
}

