/**
 * Merge embedded base64 asset modules for GitHub Pages deploy.
 * Falls back to relative file paths when modules omit a key (local PNG tree).
 */
import { ASSETS_DIGITS_A } from "./assets-digits_a.js";
import { ASSETS_DIGITS_B } from "./assets-digits_b.js";
import { ASSETS_AVATARS } from "./assets-avatars.js";
import { ASSETS_LOGOS } from "./assets-logos.js";
import { ASSETS_HERO } from "./assets-hero.js";
import { ASSETS_MID } from "./assets-mid.js";
import { ASSETS_FOOTER } from "./assets-footer.js";

export const EMBEDDED = {
  ...ASSETS_DIGITS_A,
  ...ASSETS_DIGITS_B,
  ...ASSETS_AVATARS,
  ...ASSETS_LOGOS,
  ...ASSETS_HERO,
  ...ASSETS_MID,
  ...ASSETS_FOOTER,
};

export function resolveAsset(path) {
  if (!path || path.startsWith("data:") || path.startsWith("http")) return path;
  const clean = path.replace(/^\.\//, "");
  return EMBEDDED[clean] || EMBEDDED[path] || path;
}

export function applyEmbeddedAssets(root = document) {
  root.querySelectorAll("img[src]").forEach((img) => {
    const src = img.getAttribute("src");
    if (!src || src.startsWith("data:") || src.startsWith("http")) return;
    const resolved = resolveAsset(src);
    if (resolved !== src) img.setAttribute("src", resolved);
  });

  const chart = root.querySelector(".chart");
  if (chart) {
    const g = resolveAsset("assets/waves/chart-ground.png");
    if (g.startsWith("data:")) {
      chart.style.backgroundImage = `url("${g}"), linear-gradient(180deg, #ffffff 0%, #f5f9fd 72%, #eaf3fb 100%)`;
      chart.style.backgroundSize = "102% 28%, auto";
      chart.style.backgroundPosition = "center bottom, 0 0";
      chart.style.backgroundRepeat = "no-repeat, no-repeat";
    }
  }
}
