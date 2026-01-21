/**
 * Service Worker Registration
 * Registra o Service Worker para PWA
 */

export function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('/sw.js', {
          scope: '/'
        })
        .then((registration) => {
          console.log('[SW] Registrado com sucesso:', registration.scope);

          // Verificar atualizações periodicamente
          setInterval(() => {
            registration.update();
          }, 60000); // A cada 1 minuto

          // Notificar quando nova versão disponível
          registration.addEventListener('updatefound', () => {
            const newWorker = registration.installing;
            if (newWorker) {
              newWorker.addEventListener('statechange', () => {
                if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                  // Nova versão disponível
                  console.log('[SW] Nova versão disponível');
                  // Opcional: mostrar notificação ao usuário
                  if (confirm('Nova versão disponível! Deseja atualizar?')) {
                    newWorker.postMessage({ type: 'SKIP_WAITING' });
                    window.location.reload();
                  }
                }
              });
            }
          });
        })
        .catch((error) => {
          console.error('[SW] Falhou ao registrar:', error);
        });
    });
  } else {
    console.warn('[SW] Service Worker não suportado neste navegador');
  }
}

// Auto-registro em produção
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'production') {
  registerServiceWorker();
}

// Verificar se está instalado como PWA
export function isPWAInstalled(): boolean {
  return (
    window.matchMedia('(display-mode: standalone)').matches ||
    (window.navigator as any).standalone === true ||
    document.referrer.includes('android-app://')
  );
}

// Detectar se está online
export function isOnline(): boolean {
  return navigator.onLine;
}

// Listener para mudanças de conexão
export function setupOnlineListener(callback: (online: boolean) => void) {
  window.addEventListener('online', () => callback(true));
  window.addEventListener('offline', () => callback(false));
}

