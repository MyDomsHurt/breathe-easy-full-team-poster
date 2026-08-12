/**
 * Weekly performance chart — SVG bars + line, poster proportions.
 */
import { formatInt } from "./data-loader.js";

/**
 * Poster uses a 0–6K axis even when W5 is 6,680 (bar can sit slightly over the top grid).
 */
function axisMax(seriesMax) {
  if (seriesMax <= 7000) return 6000; // poster default domain
  if (seriesMax <= 10000) return 10000;
  return Math.ceil(seriesMax / 2000) * 2000;
}

/**
 * @param {HTMLElement} container
 * @param {{ week: string, label?: string, points: number }[]} series
 */
export function renderWeeklyChart(container, series) {
  if (!container || !series?.length) return;

  const seriesMax = Math.max(...series.map((d) => d.points), 1);
  const maxVal = axisMax(seriesMax);
  const W = 400;
  const H = 220;
  const padL = 40;
  const padR = 16;
  const padT = 28;
  const padB = 36;
  const plotW = W - padL - padR;
  const plotH = H - padT - padB;
  const n = series.length;
  const slot = plotW / n;
  const barW = Math.min(36, slot * 0.55);

  const points = series.map((d, i) => {
    const cx = padL + slot * i + slot / 2;
    // Allow slight overshoot above top grid when points > maxVal (poster W5)
    const h = Math.min((d.points / maxVal) * plotH, plotH + 12);
    const y = padT + plotH - h;
    return { ...d, cx, y, h, barX: cx - barW / 2 };
  });

  const linePts = points.map((p) => `${p.cx},${p.y}`).join(" ");

  // Poster-like ticks: 0 / 2K / 4K / 6K (or scaled)
  const tickStep = maxVal / 3;
  const tickVals = [maxVal, maxVal - tickStep, maxVal - 2 * tickStep, 0].map((v) => ({
    v,
    label: v === 0 ? "0" : `${Math.round(v / 1000)}K`,
  }));

  const grid = tickVals
    .map((t) => {
      const y = padT + plotH * (1 - t.v / maxVal);
      return `<line x1="${padL}" y1="${y}" x2="${W - padR}" y2="${y}" />
            <text x="8" y="${y + 4}">${t.label}</text>`;
    })
    .join("");

  const bars = points
    .map(
      (p, i) => `
      <g class="chart-bar" data-week="${p.week}" data-points="${p.points}" tabindex="0" role="listitem"
         aria-label="${p.label || p.week}: ${formatInt(p.points)} points">
        <rect x="${p.barX}" y="${p.y}" width="${barW}" height="${p.h}" rx="4" fill="url(#barGrad)" />
        <text class="chart-val" x="${p.cx}" y="${p.y - 8}" text-anchor="middle">${formatInt(p.points)}</text>
        <text class="chart-x" x="${p.cx}" y="${H - 12}" text-anchor="middle">${p.label || p.week}</text>
      </g>`
    )
    .join("");

  const last = points[points.length - 1];

  container.innerHTML = `
    <svg viewBox="0 0 ${W} ${H}" role="list" aria-label="Weekly team points">
      <defs>
        <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#4a9ae8" />
          <stop offset="100%" stop-color="#1e6bc8" />
        </linearGradient>
        <marker id="arrow" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
          <path d="M0,0 L8,4 L0,8 Z" fill="#4a9ae8" />
        </marker>
      </defs>
      <g class="chart-grid" stroke="#d0d8e4" stroke-width="1" opacity="0.75" fill="#7a8ba0"
         font-size="11" font-family="system-ui,sans-serif">${grid}</g>
      ${bars}
      <polyline fill="none" stroke="#4a9ae8" stroke-width="2.5"
        points="${linePts}" marker-end="url(#arrow)" />
      <g fill="#4a9ae8">
        ${points.map((p) => `<circle cx="${p.cx}" cy="${p.y}" r="4" />`).join("")}
      </g>
    </svg>
  `;
}
