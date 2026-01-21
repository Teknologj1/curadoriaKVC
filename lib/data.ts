import propertiesRaw from "@/data/properties.json";
import { Property } from "./types";

export function getAllProperties(): Property[] {
  return (propertiesRaw as Property[]).filter(p => p.status === "active");
}

export function getPropertyBySlug(slug: string): Property | undefined {
  return getAllProperties().find(p => p.slug === slug);
}

