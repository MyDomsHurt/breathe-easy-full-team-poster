/** Merge chunked embedded assets for GitHub Pages (MCP text deploy). */
import { A0 } from "./parts/a000.js";
import { A1 } from "./parts/a001.js";
import { A2 } from "./parts/a002.js";
import { A3 } from "./parts/a003.js";
import { A4 } from "./parts/a004.js";
import { A5 } from "./parts/a005.js";
import { A6 } from "./parts/a006.js";
import { A7 } from "./parts/a007.js";
import { A8 } from "./parts/a008.js";
import { A9 } from "./parts/a009.js";
import { A10 } from "./parts/a010.js";
import { A11 } from "./parts/a011.js";
import { A12 } from "./parts/a012.js";
import { A13 } from "./parts/a013.js";
import { A14 } from "./parts/a014.js";
import { A15 } from "./parts/a015.js";
import { A16 } from "./parts/a016.js";
import { A17 } from "./parts/a017.js";
import { A18 } from "./parts/a018.js";
import { A19 } from "./parts/a019.js";
import { A20 } from "./parts/a020.js";
import { A21 } from "./parts/a021.js";

export const EMBEDDED = {
  ...A0,
  ...A1,
  ...A2,
  ...A3,
  ...A4,
  ...A5,
  ...A6,
  ...A7,
  ...A8,
  ...A9,
  ...A10,
  ...A11,
  ...A12,
  ...A13,
  ...A14,
  ...A15,
  ...A16,
  ...A17,
  ...A18,
  ...A19,
  ...A20,
  ...A21,
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
