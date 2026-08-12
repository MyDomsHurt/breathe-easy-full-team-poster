/**
 * Assemble the hero total from metallic digit sprites (poster-extracted 0–9 + comma).
 * Reads numeric value and builds <img> glyphs so any totalTeamPoints can render.
 */

const DIGIT_BASE = "assets/numbers/digits";

/** Optional resolver injected from asset-map (data URLs on Pages). */
let resolveAssetFn = (p) => p;

export function setAssetResolver(fn) {
  if (typeof fn === "function") resolveAssetFn = fn;
}

/** Map character → asset path or data URL */
function glyphFile(ch) {
  let path = null;
  if (ch === ",") path = `${DIGIT_BASE}/comma.png`;
  else if (ch >= "0" && ch <= "9") path = `${DIGIT_BASE}/${ch}.png`;
  if (!path) return null;
  return resolveAssetFn(path);
}

/**
 * Format integer with en-US thousands separators (commas).
 * @param {number|string} n
 * @returns {string}
 */
export function formatHeroNumber(n) {
  const num = Math.round(Number(n) || 0);
  return new Intl.NumberFormat("en-US").format(num);
}

/**
 * Render metallic digit strip into container.
 * @param {HTMLElement} container  .hero-total__digits
 * @param {number|string} value    totalTeamPoints
 */
export function renderMetallicNumber(container, value) {
  if (!container) return;
  const formatted = formatHeroNumber(value);
  const frag = document.createDocumentFragment();

  for (const ch of formatted) {
    const src = glyphFile(ch);
    if (!src) continue;
    if (ch === ",") {
      const img = document.createElement("img");
      img.className = "hero-digit hero-digit--comma";
      img.src = src;
      img.alt = "";
      img.decoding = "async";
      img.draggable = false;
      frag.appendChild(img);
    } else {
      const img = document.createElement("img");
      img.className = "hero-digit";
      img.src = src;
      img.alt = ch;
      img.decoding = "async";
      img.draggable = false;
      frag.appendChild(img);
    }
  }

  container.replaceChildren(frag);
  container.dataset.value = String(Math.round(Number(value) || 0));
  container.setAttribute("aria-label", `${formatted} total team points`);
}
