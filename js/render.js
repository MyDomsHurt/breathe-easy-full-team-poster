/**
 * Bind poster data → DOM without changing layout geometry.
 * Every meaningful number and label is driven from data/poster.json.
 */
import {
  formatInt,
  formatDelta,
  formatMetricValue,
  sortedTechnicians,
} from "./data-loader.js";
import { renderWeeklyChart } from "./chart.js";
import { renderMetallicNumber, formatHeroNumber } from "./metallic-number.js";
import { resolveAsset } from "./asset-map.js";

function setText(el, text) {
  if (el != null && text != null) el.textContent = text;
}

function setHtml(el, html) {
  if (el != null && html != null) el.innerHTML = html;
}

/**
 * @param {object} data
 */
export function renderPoster(data) {
  const poster = document.getElementById("poster");
  if (!poster || !data) return;

  const copy = data.copy || {};
  const period = data.period || {};

  // ── Hero total (metallic digit sprites) ──
  const total = data.totalTeamPoints;
  setText(
    poster.querySelector('[data-field="totalTeamPoints"]'),
    formatHeroNumber(total)
  );
  const digitsEl = poster.querySelector('[data-field="totalTeamPointsDigits"]');
  if (digitsEl) renderMetallicNumber(digitsEl, total);

  // Plates + brand images (data URLs when embedded modules present)
  const heroImg = document.getElementById("hero-bg-img");
  if (heroImg) heroImg.src = resolveAsset("assets/waves/hero-bg.png");
  const midImg = poster.querySelector(".waves-mid img");
  if (midImg) midImg.src = resolveAsset("assets/waves/mid-bg.png");
  const skyImg = poster.querySelector(".skyline img");
  if (skyImg) skyImg.src = resolveAsset("assets/skyline/footer-bg.png");
  const wordmark = poster.querySelector(".header__wordmark");
  if (wordmark) wordmark.src = resolveAsset("assets/logos/wordmark.png");
  const badge = poster.querySelector(".header__badge");
  if (badge) badge.src = resolveAsset("assets/logos/skyline-badge.png");

  // ── Hero labels ──
  setText(poster.querySelector('[data-field="teamLabel"]'), copy.teamLabel || "TEAM BREATHE-EASY");
  setText(poster.querySelector('[data-field="totalLabel"]'), copy.totalLabel || "TOTAL TEAM POINTS");

  // ── Header slogan ──
  const sloganEl = poster.querySelector('[data-field="slogan"]');
  if (sloganEl && copy.slogan) {
    sloganEl.innerHTML = copy.slogan
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean)
      .join("<br />");
  }
  const wordmarkImg = poster.querySelector('[data-field="wordmarkAlt"]');
  if (wordmarkImg && copy.wordmarkAlt) {
    wordmarkImg.setAttribute("alt", copy.wordmarkAlt);
  }

  // ── Quote (live HTML on wave; not baked) ──
  if (copy.quote) {
    const q = poster.querySelector('[data-field="quote"]');
    if (q) {
      const bare = copy.quote.replace(/^["“]|["”]$/g, "");
      q.textContent = `“${bare}”`;
    }
  }
  setText(poster.querySelector('[data-field="quoteAttr"]'), copy.quoteAttr);

  // ── Leaderboard chrome ──
  setText(
    poster.querySelector('[data-field="leaderboardTitle"]'),
    copy.leaderboardTitle || "CREW LEADERBOARD"
  );
  setText(
    poster.querySelector('[data-field="periodLabel"]'),
    period.label || "THIS MONTH"
  );

  // ── Leaderboard rows ──
  const list = poster.querySelector('[data-field="technicians"]');
  if (list) {
    const techs = sortedTechnicians(data);
    list.innerHTML = techs
      .map(
        (t) => `
      <li class="leaderboard__row" data-rank="${t.rank}" data-id="${t.id || ""}"
          tabindex="0"
          aria-label="${t.name}, rank ${t.rank}, ${formatInt(t.points)} points, ${formatDelta(t.deltaPct)}">
        <span class="leaderboard__rank">${t.rank}</span>
        <img class="leaderboard__avatar" src="${resolveAsset(t.avatar || "")}" alt="" width="40" height="40" data-initial="${(t.name || "?")[0]}" />
        <span class="leaderboard__who">
          <span class="leaderboard__name">${t.name}</span>
          <span class="leaderboard__role">${t.role}</span>
        </span>
        <span class="leaderboard__points">${formatInt(t.points)}</span>
        <span class="leaderboard__delta">${formatDelta(t.deltaPct)}</span>
      </li>`
      )
      .join("");
    list.querySelectorAll("img.leaderboard__avatar").forEach((img) => {
      img.addEventListener("error", () => {
        const span = document.createElement("span");
        span.className = "leaderboard__avatar leaderboard__avatar--mono";
        span.textContent = img.dataset.initial || "?";
        img.replaceWith(span);
      });
    });
  }

  // ── Countdown ──
  const days = period.pointsResetInDays ?? 0;
  const tpl =
    period.resetTemplate || "POINTS RESET IN {n} DAY{s}";
  const resetText = tpl
    .replace("{n}", String(days))
    .replace("{s}", days === 1 ? "" : "S");
  setText(poster.querySelector('[data-field="pointsResetInDays"]'), resetText);

  // ── Chart titles + series ──
  setText(
    poster.querySelector('[data-field="chartTitle"]'),
    copy.chartTitle || "WEEKLY PERFORMANCE"
  );
  setText(
    poster.querySelector('[data-field="chartSub"]'),
    copy.chartSub || "TEAM POINTS OVER TIME"
  );
  const chartPlot = poster.querySelector('[data-field="weekly"]');
  if (chartPlot) {
    renderWeeklyChart(chartPlot, data.weekly || []);
  }

  // ── Snapshot ──
  setText(
    poster.querySelector('[data-field="snapshotTitle"]'),
    copy.snapshotTitle || "PERFORMANCE SNAPSHOT"
  );
  const deltaSuffix = copy.deltaSuffix || "vs last month";
  const snap = data.snapshot || {};
  const grid = poster.querySelector('[data-field="snapshot"]');
  if (grid) {
    // Prefer rebuilding cards from data order so all metrics stay live
    const entries = Object.entries(snap);
    if (entries.length) {
      grid.innerHTML = entries
        .map(([key, metric]) => {
          if (!metric) return "";
          return `
        <article class="metric" data-metric="${key}" data-value="${metric.value}" data-delta="${metric.deltaPct}" tabindex="0">
          <img class="metric__icon" src="${metric.icon || ""}" alt="" />
          <p class="metric__label">${metric.label || ""}</p>
          <p class="metric__value">${formatMetricValue(metric)}</p>
          <p class="metric__delta">${formatDelta(metric.deltaPct)} ${deltaSuffix}</p>
        </article>`;
        })
        .join("");
    }
  }

  // ── Tagline pill ──
  setText(
    poster.querySelector('[data-field="taglinePillLine1"]'),
    copy.taglinePillLine1
  );
  setText(
    poster.querySelector('[data-field="taglinePillLine2"]'),
    copy.taglinePillLine2
  );

  // ── Footer ──
  const footerLines = copy.footerLines || [];
  const footerEls = poster.querySelectorAll("[data-field^='footerLine']");
  footerEls.forEach((el, i) => {
    if (footerLines[i] != null) setText(el, footerLines[i]);
  });
  // Also support single containers
  if (footerLines[0]) {
    setText(poster.querySelector('[data-field="footerLine0"]'), footerLines[0]);
  }
  if (footerLines[1]) {
    setText(poster.querySelector('[data-field="footerLine1"]'), footerLines[1]);
  }

  poster.dataset.rendered = "true";
  poster.dispatchEvent(new CustomEvent("poster:rendered", { detail: data }));
}
