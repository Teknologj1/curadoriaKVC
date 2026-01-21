import { ProfileFit, Property, Trilha } from "./types";

export function filterByTrilha(list: Property[], trilha?: Trilha) {
  if (!trilha) return list;
  return list.filter(p => p.editorial.trilhas.includes(trilha));
}

export function filterByProfile(list: Property[], profile?: ProfileFit) {
  if (!profile) return list;
  return list.filter(p => p.editorial.profileFit.includes(profile));
}

