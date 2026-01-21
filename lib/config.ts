/**
 * CONFIG - CUradoria KVC
 * Feature flags e configuração A/B
 */

// ============================================
// TYPES
// ============================================

export interface SiteConfig {
  site: {
    defaultMode: 'A' | 'B';
    modes: {
      A: {
        theme: 'dark-lux';
        showPriceOnCards: boolean;
        showPriceOnPropertyPage: boolean;
        requireAttentionPoints: boolean;
        enableAudioNote: boolean;
        enableWizard: boolean;
      };
      B: {
        theme: 'light-clean';
        showPriceOnCards: boolean;
        showPriceOnPropertyPage: boolean;
        requireAttentionPoints: boolean;
        enableAudioNote: boolean;
        enableWizard: boolean;
      };
    };
    cta: {
      primary: 'whatsapp' | 'schedule';
      whatsappStickyMobile: boolean;
      whatsappPreFill: {
        A: string;
        B: string;
      };
    };
  };
}

// ============================================
// CONFIG DEFAULT
// ============================================

export const defaultConfig: SiteConfig = {
  site: {
    defaultMode: 'A',
    modes: {
      A: {
        theme: 'dark-lux',
        showPriceOnCards: false,
        showPriceOnPropertyPage: true,
        requireAttentionPoints: true,
        enableAudioNote: true,
        enableWizard: false
      },
      B: {
        theme: 'light-clean',
        showPriceOnCards: true,
        showPriceOnPropertyPage: true,
        requireAttentionPoints: false,
        enableAudioNote: false,
        enableWizard: true
      }
    },
    cta: {
      primary: 'whatsapp',
      whatsappStickyMobile: true,
      whatsappPreFill: {
        A: 'Olá! Vi sua curadoria e quero conversar sobre opções no meu perfil. Meu objetivo é: ',
        B: 'Olá! Fiz a busca por perfil e quero ajuda para escolher as melhores opções. Meu perfil é: '
      }
    }
  }
};

// ============================================
// FUNCTIONS
// ============================================

/**
 * Obtém configuração do site
 * Pode ser de variável de ambiente, CMS ou arquivo
 */
export function getSiteConfig(): SiteConfig {
  // Em produção, pode vir de:
  // - Variável de ambiente
  // - CMS (Sanity/Strapi)
  // - Arquivo JSON
  
  if (typeof window !== 'undefined') {
    // Client-side: pode ler de window.__CONFIG__ ou fetch
    const config = (window as any).__SITE_CONFIG__;
    if (config) return config;
  }
  
  // Fallback para default
  return defaultConfig;
}

/**
 * Obtém flags do modo específico
 */
export function getModeFlags(mode: 'A' | 'B'): SiteConfig['site']['modes']['A'] | SiteConfig['site']['modes']['B'] {
  const config = getSiteConfig();
  return config.site.modes[mode];
}

/**
 * Detecta modo atual (por rota, subdomínio, etc.)
 */
export function detectCurrentMode(): 'A' | 'B' {
  if (typeof window === 'undefined') {
    return getSiteConfig().site.defaultMode;
  }
  
  // Opção 1: Por rota
  const path = window.location.pathname;
  if (path.startsWith('/a') || path.startsWith('/curadoria')) {
    return 'A';
  }
  if (path.startsWith('/b') || path.startsWith('/finder')) {
    return 'B';
  }
  
  // Opção 2: Por subdomínio
  const hostname = window.location.hostname;
  if (hostname.startsWith('lux.')) {
    return 'A';
  }
  if (hostname.startsWith('finder.')) {
    return 'B';
  }
  
  // Fallback
  return getSiteConfig().site.defaultMode;
}

/**
 * Obtém tema atual
 */
export function getCurrentTheme(): 'dark-lux' | 'light-clean' {
  const mode = detectCurrentMode();
  const flags = getModeFlags(mode);
  return flags.theme;
}

/**
 * Verifica se deve mostrar preço no card
 */
export function shouldShowPriceOnCard(mode?: 'A' | 'B'): boolean {
  const currentMode = mode || detectCurrentMode();
  const flags = getModeFlags(currentMode);
  return flags.showPriceOnCards;
}

/**
 * Verifica se deve mostrar preço na página
 */
export function shouldShowPriceOnPage(mode?: 'A' | 'B'): boolean {
  const currentMode = mode || detectCurrentMode();
  const flags = getModeFlags(currentMode);
  return flags.showPriceOnPropertyPage;
}

/**
 * Verifica se requer attentionPoints
 */
export function requiresAttentionPoints(mode?: 'A' | 'B'): boolean {
  const currentMode = mode || detectCurrentMode();
  const flags = getModeFlags(currentMode);
  return flags.requireAttentionPoints;
}

/**
 * Verifica se áudio está habilitado
 */
export function isAudioNoteEnabled(mode?: 'A' | 'B'): boolean {
  const currentMode = mode || detectCurrentMode();
  const flags = getModeFlags(currentMode);
  return flags.enableAudioNote;
}

/**
 * Verifica se wizard está habilitado
 */
export function isWizardEnabled(mode?: 'A' | 'B'): boolean {
  const currentMode = mode || detectCurrentMode();
  const flags = getModeFlags(currentMode);
  return flags.enableWizard;
}

/**
 * Obtém mensagem WhatsApp pré-preenchida
 */
export function getWhatsAppPreFill(mode?: 'A' | 'B'): string {
  const currentMode = mode || detectCurrentMode();
  const config = getSiteConfig();
  return config.site.cta.whatsappPreFill[currentMode];
}

/**
 * Verifica se CTA sticky mobile está habilitado
 */
export function isStickyCTAEnabled(): boolean {
  const config = getSiteConfig();
  return config.site.cta.whatsappStickyMobile;
}

