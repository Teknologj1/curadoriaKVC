/**
 * SCHEMA VALIDATION - CUradoria KVC
 * Validações de schema e regras de negócio
 */

import { Property, PropertyEditorial, ModelVariant } from './TYPES';

// ============================================
// VALIDAÇÕES DE CONTEÚDO
// ============================================

/**
 * Valida headline (máx. 90 caracteres)
 */
export function validateHeadline(headline: string): {
    valid: boolean;
    error?: string;
} {
    if (headline.length > 90) {
        return {
            valid: false,
            error: `Headline excede 90 caracteres: ${headline.length}`
        };
    }
    return { valid: true };
}

/**
 * Valida summary (máx. 240 caracteres)
 */
export function validateSummary(summary: string): {
    valid: boolean;
    error?: string;
} {
    if (summary.length > 240) {
        return {
            valid: false,
            error: `Summary excede 240 caracteres: ${summary.length}`
        };
    }
    return { valid: true };
}

/**
 * Valida attentionPoints (obrigatório Modelo A)
 */
export function validateAttentionPoints(
    attentionPoints: string[],
    model: ModelVariant
): {
    valid: boolean;
    error?: string;
} {
    if (model === 'A' && attentionPoints.length === 0) {
        return {
            valid: false,
            error: 'Modelo A requer pelo menos 1 ponto de atenção (transparência = confiança)'
        };
    }
    return { valid: true };
}

/**
 * Validação completa do imóvel
 */
export function validateProperty(
    property: Property,
    model: ModelVariant
): {
    valid: boolean;
    errors: string[];
    warnings: string[];
} {
    const errors: string[] = [];
    const warnings: string[] = [];

    // Validações obrigatórias
    const headlineValidation = validateHeadline(property.editorial.headline);
    if (!headlineValidation.valid) {
        errors.push(headlineValidation.error!);
    }

    const summaryValidation = validateSummary(property.editorial.summary);
    if (!summaryValidation.valid) {
        errors.push(summaryValidation.error!);
    }

    const attentionValidation = validateAttentionPoints(
        property.editorial.attentionPoints,
        model
    );
    if (!attentionValidation.valid) {
        errors.push(attentionValidation.error!);
    }

    // Warnings (não bloqueiam)
    if (!property.editorial.audioUrl && model === 'A') {
        warnings.push('Áudio do corretor recomendado para Modelo A');
    }

    if (property.pricing.price === null && model === 'B') {
        warnings.push('Preço recomendado para Modelo B (eficiente)');
    }

    if (property.media.gallery.length < 3) {
        warnings.push('Mínimo 3 imagens recomendado para galeria');
    }

    return {
        valid: errors.length === 0,
        errors,
        warnings
    };
}

// ============================================
// HELPERS DE FORMATAÇÃO
// ============================================

/**
 * Formata preço em BRL
 */
export function formatPrice(price: number | null): string {
    if (price === null) return 'Sob consulta';
    
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(price);
}

/**
 * Formata preço mensal (condomínio, IPTU)
 */
export function formatMonthlyPrice(price: number | null): string {
    if (price === null) return '—';
    
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        minimumFractionDigits: 0
    }).format(price);
}

/**
 * Trunca headline para garantir 2 linhas máximo
 */
export function truncateHeadline(headline: string, maxLength: number = 90): string {
    if (headline.length <= maxLength) return headline;
    return headline.substring(0, maxLength - 3) + '...';
}

/**
 * Gera mensagem padrão quando attentionPoints está vazio
 */
export function getDefaultAttentionMessage(model: ModelVariant): string {
    if (model === 'A') {
        return 'Pontos de atenção serão discutidos na conversa/visita.';
    }
    return '';
}

// ============================================
// FILTROS E BUSCA
// ============================================

/**
 * Filtra propriedades por trilha (Modelo A)
 */
export function filterByTrilha(
    properties: Property[],
    trilha: string | null
): Property[] {
    if (!trilha) return properties;
    
    return properties.filter(property =>
        property.editorial.trilhas.includes(trilha as any)
    );
}

/**
 * Filtra propriedades por query do wizard (Modelo B)
 */
export function filterByQuery(
    properties: Property[],
    query: {
        profile?: string;
        faixa?: { min?: number; max?: number };
        tipo?: string;
    }
): Property[] {
    return properties.filter(property => {
        // Perfil
        if (query.profile && !property.editorial.profileFit.includes(query.profile as any)) {
            return false;
        }
        
        // Tipo
        if (query.tipo && property.specs.propertyType !== query.tipo) {
            return false;
        }
        
        // Faixa de preço
        if (query.faixa && property.pricing.price !== null) {
            const price = property.pricing.price;
            if (query.faixa.min && price < query.faixa.min) return false;
            if (query.faixa.max && price > query.faixa.max) return false;
        }
        
        return true;
    });
}

// ============================================
// FLAGS DE RENDERIZAÇÃO
// ============================================

/**
 * Gera flags de renderização baseado no modelo
 */
export function getRenderFlags(model: ModelVariant): {
    showPriceInCard: boolean;
    showPriceInPage: boolean;
    showAttentionPoints: boolean;
    maxHeadlineLines: number;
} {
    if (model === 'A') {
        return {
            showPriceInCard: false, // Estratégia consultiva
            showPriceInPage: true,  // Ou false se 100% consultivo
            showAttentionPoints: true, // Sempre no Modelo A
            maxHeadlineLines: 2
        };
    } else {
        return {
            showPriceInCard: true,  // Eficiência
            showPriceInPage: true,
            showAttentionPoints: false, // No card, sim na página
            maxHeadlineLines: 2
        };
    }
}

