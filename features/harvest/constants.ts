export const SPECIES = [
  "Sockeye",
  "Chinook",
  "Chinook Jack",
  "Chum",
  "Coho",
  "Pink",
] as const;

export type Species = typeof SPECIES[number];

export function getCurrentSeasonYear(): number {
  return new Date().getFullYear();
}
