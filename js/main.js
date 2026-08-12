/**
 * Breathe-Easy living poster entry.
 * Loads data/poster.json → renders → binds interactivity.
 */
import { loadPosterData } from "./data-loader.js";
import { renderPoster } from "./render.js";
import { bindInteractivity } from "./interactivity.js";
import { applyEmbeddedAssets, resolveAsset } from "./asset-map.js";
import { setAssetResolver } from "./metallic-number.js";

async function init() {
  const poster = document.getElementById("poster");
  if (!poster) return;

  // Prefer embedded data URLs (Pages text-only deploy); falls back to file paths.
  setAssetResolver(resolveAsset);
  applyEmbeddedAssets(document);

  try {
    const data = await loadPosterData("data/poster.json");
    renderPoster(data);
    applyEmbeddedAssets(document); // after avatar/digit rebuild
    bindInteractivity(poster, data);
    document.documentElement.dataset.posterReady = "true";
  } catch (err) {
    console.error("[poster]", err);
    document.documentElement.dataset.posterReady = "error";
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
