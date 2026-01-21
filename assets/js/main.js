// ============================================
// FUNÇÕES GLOBAIS E COMPONENTES REUTILIZÁVEIS
// ============================================

// FAQ Accordion
document.addEventListener('DOMContentLoaded', function() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        if (question) {
            question.addEventListener('click', () => {
                const isActive = item.classList.contains('active');
                
                // Fecha todos os outros
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                    }
                });
                
                // Toggle do item atual
                item.classList.toggle('active', !isActive);
            });
        }
    });
});

// Property Specs Collapsible
document.addEventListener('DOMContentLoaded', function() {
    const specsToggles = document.querySelectorAll('.property-specs-toggle');
    
    specsToggles.forEach(toggle => {
        toggle.addEventListener('click', () => {
            const specs = toggle.closest('.property-specs');
            if (specs) {
                specs.classList.toggle('active');
            }
        });
    });
});

// Smooth Scroll para links âncora
document.addEventListener('DOMContentLoaded', function() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href.length > 1) {
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
});

// Header scroll effect (opcional - adiciona sombra ao rolar)
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (header) {
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
        } else {
            header.style.boxShadow = 'none';
        }
    }
});

// ============================================
// WHATSAPP MESSAGES (PRÉ-PREENCHIDAS)
// ============================================

/**
 * Gera link do WhatsApp com mensagem pré-preenchida contextualizada
 * @param {Object} context - Contexto da ação
 * @returns {string} URL do WhatsApp
 */
function getWhatsAppLink(context) {
    const phone = '5511999999999'; // Substituir por variável de ambiente
    const model = context.model || (document.body.classList.contains('modelo-a') ? 'A' : 'B');
    
    let message = '';
    
    // Modelo A - Luxo Editorial
    if (model === 'A') {
        if (context.type === 'property' && context.propertyTitle) {
            // Página do imóvel
            message = `Olá! Tenho interesse no imóvel: ${context.propertyTitle}. Podemos conversar?`;
        } else if (context.type === 'card') {
            // Card "Por que este imóvel"
            message = 'Olá! Gostaria de entender melhor por que este imóvel faz sentido. Podemos conversar?';
        } else {
            // CTA geral (sticky, final)
            message = 'Olá! Vi sua curadoria e quero conversar sobre opções no meu perfil. Posso te explicar meu objetivo?';
        }
    }
    
    // Modelo B - Finder
    else if (model === 'B') {
        if (context.type === 'help') {
            // "Quero ajuda para decidir"
            message = 'Olá! Fiz a busca por perfil e quero ajuda para escolher as melhores opções.';
        } else if (context.type === 'property' && context.propertyTitle) {
            // Página do imóvel (vinda do finder)
            message = `Olá! Vi este imóvel na busca e quero entender se faz sentido para meu perfil. Podemos conversar?`;
        } else if (context.type === 'result' && context.propertyTitle) {
            // Card de resultado
            message = `Olá! Vi os resultados da busca e quero saber mais sobre: ${context.propertyTitle}.`;
        } else {
            // CTA geral
            message = 'Olá! Fiz a busca por perfil e quero ajuda para escolher as melhores opções.';
        }
    }
    
    // Fallback
    if (!message) {
        message = 'Olá! Gostaria de saber mais sobre suas opções de imóveis.';
    }
    
    return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

// Função auxiliar para atualizar links WhatsApp existentes
document.addEventListener('DOMContentLoaded', function() {
    // Atualiza CTAs com data attributes
    const whatsappLinks = document.querySelectorAll('a[href*="wa.me"], a[data-whatsapp]');
    
    whatsappLinks.forEach(link => {
        const context = {
            model: link.dataset.model || (document.body.classList.contains('modelo-a') ? 'A' : 'B'),
            type: link.dataset.type || 'general',
            propertyTitle: link.dataset.propertyTitle || null
        };
        
        if (link.dataset.whatsapp !== 'false') {
            link.href = getWhatsAppLink(context);
        }
    });
});

