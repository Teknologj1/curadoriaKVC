/**
 * CMS Queries
 * Funções para buscar dados do CMS
 */

import type { Property, SearchQuery } from "@/lib/types";

// Mock data - Substituir por chamada real ao CMS
const mockProperties: Property[] = [
  {
    id: "p_1029",
    slug: "apto-luz-silencio-bueno-1029",
    status: "active",
    updatedAt: "2025-12-16T12:00:00-03:00",
    createdAt: "2025-12-01T10:00:00-03:00",
    editorial: {
      title: "Apartamento com luz natural e rotina silenciosa",
      headline: "Silêncio, luz natural e liquidez futura em um bairro consolidado.",
      summary:
        "Uma escolha para quem busca morar bem hoje sem comprometer decisões futuras. Combina conforto, localização e um perfil de valorização consistente no médio prazo.",
      tags: ["luz natural", "bairro consolidado", "planta funcional"],
      profileFit: ["family", "investor"],
      trilhas: ["morar_bem", "investir"],
      forWhom: [
        "Famílias que valorizam rotina e localização",
        "Compradores que pensam em revenda futura",
      ],
      strengths: [
        "Planta bem resolvida",
        "Incidência de luz natural",
        "Localização madura e segura",
      ],
      attentionPoints: [
        "Vaga de garagem com manobra mais justa; vale validar pessoalmente.",
      ],
      audioUrl: null,
    },
    media: {
      coverImage: {
        url: "/images/imovel-1.jpg",
        alt: "Sala ampla com iluminação natural",
        width: 1200,
        height: 1500,
      },
      gallery: [
        {
          url: "/images/imovel-1-1.jpg",
          alt: "Fachada",
          width: 1600,
          height: 900,
        },
        {
          url: "/images/imovel-1-2.jpg",
          alt: "Cozinha",
          width: 1200,
          height: 1500,
        },
      ],
    },
    location: {
      city: "Goiânia",
      state: "GO",
      neighborhood: "Setor Bueno",
      addressPublic: null,
      lat: null,
      lng: null,
    },
    specs: {
      propertyType: "apartment",
      areaM2: 98,
      bedrooms: 3,
      suites: 1,
      bathrooms: 3,
      parkingSpots: 2,
      floor: "Alto",
      sunPosition: "Manhã",
      facing: null,
      buildingAgeYears: 8,
    },
    pricing: {
      price: 980000,
      condoFee: 780,
      iptuYear: 2200,
      currency: "BRL",
    },
    compliance: {
      creci: "GO-00000",
      availabilityNote: "Disponibilidade sujeita a alteração.",
      disclaimer:
        "Conteúdo informativo. Confirmações na visita e documentação.",
    },
    cta: {
      whatsappNumber: "5561999999999",
      whatsappMessageTemplate:
        "Olá! Vi o imóvel {title} e quero conversar sobre opções no meu perfil. Meu objetivo é: ",
      primaryAction: "whatsapp",
    },
  },
];

/**
 * Buscar propriedades com filtros
 */
export async function getProperties(
  filters?: SearchQuery
): Promise<Property[]> {
  // TODO: Substituir por chamada real ao CMS
  // const response = await fetch('/api/properties', {
  //   method: 'POST',
  //   body: JSON.stringify(filters)
  // });
  // return response.json();

  let properties = [...mockProperties];

  // Aplicar filtros
  if (filters?.trilha) {
    properties = properties.filter((p) =>
      p.editorial.trilhas.includes(filters.trilha as any)
    );
  }

  if (filters?.profile) {
    properties = properties.filter((p) =>
      p.editorial.profileFit.includes(filters.profile as any)
    );
  }

  if (filters?.tipo) {
    properties = properties.filter(
      (p) => p.specs.propertyType === filters.tipo
    );
  }

  if (filters?.faixa) {
    properties = properties.filter((p) => {
      if (!p.pricing?.price) return false;
      const price = p.pricing.price;
      if (filters.faixa?.min && price < filters.faixa.min) return false;
      if (filters.faixa?.max && price > filters.faixa.max) return false;
      return true;
    });
  }

  return properties;
}

/**
 * Buscar propriedade por slug
 */
export async function getPropertyBySlug(
  slug: string
): Promise<Property | null> {
  // TODO: Substituir por chamada real ao CMS
  // const response = await fetch(`/api/properties/${slug}`);
  // return response.json();

  const property = mockProperties.find((p) => p.slug === slug);
  return property || null;
}

