/* Load base64 asset files shipped for GitHub Pages */
const MANIFEST_URL = 'assets/b64/manifest.json';
let cache = null;

async function loadManifest() {
  if (cache) return cache;
  const res = await fetch(MANIFEST_URL, { cache: 'no-cache' });
  if (!res.ok) throw new Error('asset manifest missing');
  cache = await res.json();
  return cache;
}

export async function resolveAsset(path) {
  if (!path || path.startsWith('data:') || path.startsWith('http')) return path;
  const clean = path.replace(/^\.\//, '');
  try {
    const manifest = await loadManifest();
    const entry = manifest[clean] || manifest[path];
    if (!entry) return path;
    const res = await fetch(entry.file, { cache: 'force-cache' });
    if (!res.ok) return path;
    const b64 = (await res.text()).trim();
    return `data:${entry.mime};base64,${b64}`;
  } catch {
    return path;
  }
}

export async function applyEmbeddedAssets(root = document) {
  const imgs = [...root.querySelectorAll('img[src]')];
  await Promise.all(imgs.map(async (img) => {
    const src = img.getAttribute('src');
    if (!src || src.startsWith('data:') || src.startsWith('http')) return;
    const resolved = await resolveAsset(src);
    if (resolved !== src) img.setAttribute('src', resolved);
  }));
  const chart = root.querySelector('.chart');
  if (chart) {
    const g = await resolveAsset('assets/waves/chart-ground.png');
    if (g.startsWith('data:')) {
      chart.style.backgroundImage = `url("${g}"), linear-gradient(#f7f9fc,#f7f9fc)`;
      chart.style.backgroundSize = '100% 38%, auto';
      chart.style.backgroundPosition = 'center bottom, 0 0';
      chart.style.backgroundRepeat = 'no-repeat, no-repeat';
    }
  }
}
