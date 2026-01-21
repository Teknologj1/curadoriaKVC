export type ProfileFit = "family" | "investor" | "first_buy" | "luxury";
export type Trilha = "morar_bem" | "investir" | "segunda_moradia";
export type PropertyType = "apartment" | "house" | "commercial";
export type Status = "active" | "reserved" | "sold";

export type Property = {
  id: string;
  slug: string;
  status: Status;
  createdAt: string;
  updatedAt: string;

  editorial: {
    title: string;
    headline: string;
    summary: string;
    tags: string[];
    profileFit: ProfileFit[];
    trilhas: Trilha[];
    forWhom: string[];
    strengths: string[];
    attentionPoints: string[];
    audioUrl?: string | null;
  };

  media: {
    coverImage: { url: string; alt: string; width: number; height: number };
    gallery: { url: string; alt: string; width: number; height: number }[];
  };

  location: {
    city: string;
    state: string;
    neighborhood: string;
    addressPublic?: string | null;
    lat?: number | null;
    lng?: number | null;
  };

  specs: {
    propertyType: PropertyType;
    areaM2?: number | null;
    bedrooms?: number | null;
    suites?: number | null;
    bathrooms?: number | null;
    parkingSpots?: number | null;
    floor?: string | null;
    sunPosition?: string | null;
    facing?: string | null;
    buildingAgeYears?: number | null;
  };

  pricing?: {
    price?: number | null;
    condoFee?: number | null;
    iptuYear?: number | null;
    currency?: "BRL";
  };

  compliance?: {
    creci?: string;
    availabilityNote?: string;
    disclaimer?: string;
  };

  cta?: {
    whatsappNumber?: string;
    whatsappMessageTemplate?: string;
    primaryAction?: "whatsapp" | "form" | "phone";
  };
};

export type SearchQuery = {
  trilha?: Trilha;
  profile?: ProfileFit;
  tipo?: PropertyType;
  faixa?: {
    min?: number;
    max?: number;
  };
};
