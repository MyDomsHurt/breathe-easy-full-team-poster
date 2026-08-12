/**
 * Load poster data contract from /data/poster.json
 */
export async function loadPosterData(url = "data/poster.json") {
  const res = await fetch(url, { cache: "no-cache" });
  if (!res.ok) {
    throw new Error(`Failed to load ${url}: ${res.status}`);
  }
  return res.json();
}

export function formatInt(n) {
  return new Intl.NumberFormat("en-US").format(Math.round(Number(n) || 0));
}

export function formatDelta(pct) {
  const n = Number(pct) || 0;
  const sign = n > 0 ? "↑" : n < 0 ? "↓" : "";
  return `${sign} ${Math.abs(n)}%`;
}

export function formatMetricValue(metric) {
  const base = formatInt(metric.value);
  if (metric.unit === "%") return `${base}%`;
  if (metric.unit) return `${base} ${metric.unit}`;
  return base;
}

export function sortedTechnicians(data) {
  return [...(data.technicians || [])].sort((a, b) => a.rank - b.rank);
}
