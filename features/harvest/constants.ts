export const SPECIES = [
  "Chinook",
  "Chinook Jack",
  "Chum",
  "Coho",
  "Pink",
  "Sockeye",
] as const;

export type Species = typeof SPECIES[number];

export function getCurrentSeasonYear(): number {
  return new Date().getFullYear();
}
