import { supabase } from '@/lib/supabase';
import { SPECIES, Species, getCurrentSeasonYear } from './constants';
import type { AreaCard, Metrics, SpeciesCard, LastUpdated } from './types';

function toMetrics(row: any): Metrics {
  return {
    avgWeight: row.avg_weight ?? null,
    avgPrice: row.avg_price ?? null,
    numbers: row.numbers ?? null,
  };
}

export async function fetchLastUpdated(): Promise<LastUpdated> {
  const { data, error } = await supabase
    .from('fisheries')
    .select('last_updated_at')
    .order('last_updated_at', { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error) throw error;
  return data?.last_updated_at ?? new Date(0).toISOString();
}

export async function fetchByArea(seasonYear = getCurrentSeasonYear()): Promise<AreaCard[]> {
  const { data, error } = await supabase
    .from('landings')
    .select('id, fishery_id, season_year, opening_date, closing_date, species, avg_weight, avg_price, numbers, fisheries!inner(id, name)')
    .eq('season_year', seasonYear)
    .order('fisheries(name)');

  if (error) throw error;

  const byFishery = new Map<string, AreaCard>();

  for (const row of data as any[]) {
    const fisheryId: string = row.fisheries.id;
    const name: string = row.fisheries.name;
    const speciesName: Species = row.species;

    const existing = byFishery.get(fisheryId);
    const metrics = toMetrics(row);

    if (!existing) {
      byFishery.set(fisheryId, {
        id: fisheryId,
        name,
        openDate: row.opening_date,
        closeDate: row.closing_date,
        species: { [speciesName]: metrics },
      });
    } else {
      existing.species[speciesName] = metrics;
      // Keep earliest opening and latest closing for display (but you said to show provided; rows are same season, so we keep first)
      if (row.opening_date < existing.openDate) existing.openDate = row.opening_date;
      if (row.closing_date > existing.closeDate) existing.closeDate = row.closing_date;
    }
  }

  // Ensure stable alphabetical order by name
  return Array.from(byFishery.values()).sort((a, b) => a.name.localeCompare(b.name));
}

export async function fetchBySpecies(species: Species, seasonYear = getCurrentSeasonYear()): Promise<SpeciesCard[]> {
  const { data, error } = await supabase
    .from('landings')
    .select('id, fishery_id, season_year, opening_date, closing_date, species, avg_weight, avg_price, numbers, fisheries!inner(id, name)')
    .eq('season_year', seasonYear)
    .eq('species', species)
    .order('fisheries(name)');

  if (error) throw error;

  return (data as any[]).map((row) => ({
    id: row.fisheries.id,
    name: row.fisheries.name,
    openDate: row.opening_date,
    closeDate: row.closing_date,
    metrics: toMetrics(row),
    species,
  }));
}
