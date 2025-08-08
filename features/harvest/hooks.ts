import { useQuery, useSuspenseQuery } from '@tanstack/react-query';
import { fetchByArea, fetchBySpecies, fetchLastUpdated } from './api';
import { SPECIES, Species, getCurrentSeasonYear } from './constants';

const keys = {
  root: ['harvest'] as const,
  byArea: (year: number) => [...keys.root, 'area', year] as const,
  bySpecies: (sp: Species, year: number) => [...keys.root, 'species', sp, year] as const,
  lastUpdated: ['harvest', 'lastUpdated'] as const,
};

export function useHarvestByArea(year = getCurrentSeasonYear()) {
  return useQuery({
    queryKey: keys.byArea(year),
    queryFn: () => fetchByArea(year),
  });
}

export function useHarvestBySpecies(species: Species, year = getCurrentSeasonYear()) {
  return useQuery({
    queryKey: keys.bySpecies(species, year),
    queryFn: () => fetchBySpecies(species, year),
    enabled: !!species,
  });
}

export function useLastUpdated() {
  return useQuery({
    queryKey: keys.lastUpdated,
    queryFn: fetchLastUpdated,
  });
}

export { keys as harvestQueryKeys };
