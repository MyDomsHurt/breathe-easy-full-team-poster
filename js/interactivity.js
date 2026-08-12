/**
 * Hover tooltips + keyboard focus for leaderboard, chart bars, snapshot cards.
 * Layout geometry stays fixed — only overlays appear.
 */
import { formatInt, formatDelta } from "./data-loader.js";

let tooltipEl = null;

function ensureTooltip() {
  if (tooltipEl) return tooltipEl;
  tooltipEl = document.createElement("div");
  tooltipEl.className = "be-tooltip";
  tooltipEl.setAttribute("role", "tooltip");
  document.body.appendChild(tooltipEl);
  return tooltipEl;
}

function showTooltip(target, html, event) {
  const tip = ensureTooltip();
  tip.innerHTML = html;
  tip.classList.add("is-visible");
  positionTooltip(tip, target, event);
}

function hideTooltip() {
  if (!tooltipEl) return;
  tooltipEl.classList.remove("is-visible");
}

function positionTooltip(tip, target, event) {
  const rect = target.getBoundingClientRect();
  const tipRect = tip.getBoundingClientRect();
  let x = (event?.clientX ?? rect.left + rect.width / 2) - tipRect.width / 2;
  let y = rect.top - tipRect.height - 10;
  if (y < 8) y = rect.bottom + 10;
  x = Math.max(8, Math.min(x, window.innerWidth - tipRect.width - 8));
  tip.style.left = `${x + window.scrollX}px`;
  tip.style.top = `${y + window.scrollY}px`;
}

/**
 * @param {HTMLElement} poster
 * @param {object} data
 */
export function bindInteractivity(poster, data) {
  if (!poster) return;

  // Re-bind after each render (rows/cards are rebuilt from data)
  poster.addEventListener("poster:rendered", () => {
    // no-op hook; callers re-invoke bindInteractivity after render
  });

  // Leaderboard rows
  poster.querySelectorAll(".leaderboard__row").forEach((row) => {
    const rank = row.getAttribute("data-rank");
    const name = row.querySelector(".leaderboard__name")?.textContent || "";
    const points = row.querySelector(".leaderboard__points")?.textContent || "";
    const delta = row.querySelector(".leaderboard__delta")?.textContent || "";
    const html = `<strong>${name}</strong><br/>Rank #${rank} · ${points} pts<br/>${delta} vs prior`;

    row.addEventListener("mouseenter", (e) => showTooltip(row, html, e));
    row.addEventListener("mousemove", (e) => positionTooltip(ensureTooltip(), row, e));
    row.addEventListener("mouseleave", hideTooltip);
    row.addEventListener("focus", (e) => showTooltip(row, html, e));
    row.addEventListener("blur", hideTooltip);
  });

  // Chart bars
  poster.querySelectorAll(".chart-bar").forEach((bar) => {
    const week = bar.getAttribute("data-week");
    const pts = bar.getAttribute("data-points");
    const html = `<strong>${week}</strong><br/>${formatInt(pts)} team points`;
    bar.addEventListener("mouseenter", (e) => showTooltip(bar, html, e));
    bar.addEventListener("mousemove", (e) => positionTooltip(ensureTooltip(), bar, e));
    bar.addEventListener("mouseleave", hideTooltip);
    bar.addEventListener("focus", (e) => showTooltip(bar, html, e));
    bar.addEventListener("blur", hideTooltip);
  });

  // Snapshot metrics
  poster.querySelectorAll(".metric").forEach((card) => {
    const label = card.querySelector(".metric__label")?.textContent || "";
    const value = card.querySelector(".metric__value")?.textContent || "";
    const delta = card.querySelector(".metric__delta")?.textContent || "";
    const html = `<strong>${label}</strong><br/>${value}<br/>${delta}`;
    card.setAttribute("tabindex", "0");
    card.addEventListener("mouseenter", (e) => showTooltip(card, html, e));
    card.addEventListener("mousemove", (e) => positionTooltip(ensureTooltip(), card, e));
    card.addEventListener("mouseleave", hideTooltip);
    card.addEventListener("focus", (e) => showTooltip(card, html, e));
    card.addEventListener("blur", hideTooltip);
  });

  // Escape hides tooltip
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") hideTooltip();
  });
}
