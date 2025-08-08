export function formatDateISOToShort(dateISO: string): string {
  if (!dateISO) return '—';
  const date = new Date(dateISO);
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
  }).format(date);
}

export function formatWeightLbs(value: number | null): string {
  if (value == null) return '0.0 lb';
  return `${value.toFixed(1)} lb`;
}

export function formatUSD(value: number | null): string {
  if (value == null) value = 0;
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2 }).format(value);
}

export function formatQty(value: number | null): string {
  const n = value ?? 0;
  return new Intl.NumberFormat('en-US').format(n);
}
