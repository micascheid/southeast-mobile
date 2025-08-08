import type { Species } from './constants';

export type Metrics = {
  avgWeight: number | null;
  avgPrice: number | null;
  numbers: number | null;
};

export type AreaMetricsMap = Partial<Record<Species, Metrics>>;

export type AreaCard = {
  id: string;
  name: string;
  openDate: string; // ISO
  closeDate: string; // ISO
  species: AreaMetricsMap;
};

export type SpeciesCard = {
  id: string; // fishery id
  name: string;
  openDate: string; // ISO
  closeDate: string; // ISO
  metrics: Metrics;
  species: Species;
};

export type LastUpdated = string; // ISO timestamp
