# PROGRESS — Living Breathe-Easy Poster

## Stage 1 — Layout Blueprint + scaffold (2026-08-12)

### Completed
- Analysed reference poster (`784×1168`)
- Repo at `/Users/jefflamb/breathe-easy-poster/` with `/assets`, `/css`, `/js`, `/data`, `/docs`
- `docs/LAYOUT_BLUEPRINT.md` with zones, measured landmarks, z-order, tokens, asset list
- Shell `index.html` + `css/poster.css` percentage stage
- Reference copied to `assets/reference/poster.jpg`

### Visual comparison notes
- Wireframe stage only — structural map for review

### Next
Stage 2 assets

---

## Stage 2 — Asset extraction / recreation (2026-08-12)

### Completed
- **Logos:** `wordmark.png`, `skyline-badge.png` (+ SVG variants) from poster crops
- **Avatars:** matthew / tiago / nick / alun / iggi circular PNGs from leaderboard
- **Waves:** `hero-with-number.png`, `hero-bg.png` (number knocked out), SVG wave layers
- **Skyline:** `footer-bg.png` poster extract + SVG fallback
- **Icons:** wind, shield, droplet, leaf, trophy, skyline-mini SVGs
- **Numbers:** `total-24780.png` extracted metallic digits
- Metallic approach decision: **bake poster hero for static lock**; CSS metallic + `hero-bg.png` for live totals (`liveNumber` flag)

### Visual comparison notes
- Avatar crops match poster faces and rank ring colours
- Hero extract preserves exact wave + 3D number treatment
- SVG waves alone were too approximate → preferred poster PNG layers for contract fidelity

### Blockers / questions
- Arbitrary totals (not 24,780) need CSS number or digit pack when `liveNumber: true`
- Broader scoreboard repo still not found on disk; seed = poster JSON

### Next
Stage 3 static visual lock

---

## Stage 3 — Static visual lock (2026-08-12)

### Completed
- Composition with hardcoded poster seed values
- Hero: poster `hero-with-number.png` (logos + metallic 24,780 + waves + TOTAL label)
- Leaderboard card HTML with real avatars + rank colours
- Weekly chart SVG with poster series
- Snapshot 2×2 + tagline pill
- Skyline/water extract + footer copy
- Capture: `assets/reference/stage-capture.png`

### Visual comparison notes (vs poster)

| Region | Status | Notes |
|---|---|---|
| Header logos | **Strong** | Baked into hero extract |
| Metallic number | **Strong** | Baked poster art — exact treatment |
| Hero waves | **Strong** | Baked poster art |
| Quote | **Good** | HTML on dark wave; wrapping slightly different from poster |
| Leaderboard | **Good** | Position/style close; row density may need 1–2% nudge |
| Weekly chart | **Good** | Values/shape match; mountain wash approximate |
| Snapshot | **Good** | Icons + deltas correct; card radii/spacing close |
| Tagline pill | **Fair** | Content correct; type size/wrap vs poster |
| Skyline/water | **Strong** | Poster extract |
| Footer lines | **Good** | Present with coloured dots |

**Overall:** Clearly the same poster composition, not a redesign. Remaining deltas are type scale on quote/pill and fine spacing — good for human steer before further polish.

### Blockers / questions
- Please review `assets/reference/stage-capture.png` vs `assets/reference/poster.jpg` and call out any block that must move before calling lock final
- Confirm whether live total must support non-24,780 values immediately (enables `liveNumber` path)

### Next
Stage 4–5 data + interactivity (done in same session after seed lock)

---

## Stage 4 — Data contract (2026-08-12)

### Completed
- `data/poster.json` with full live field set + copy + meta
- Documented in README and blueprint

### Next
Wire render + interactivity

---

## Stage 5 — Living / interactive (2026-08-12)

### Completed
- `js/data-loader.js`, `render.js`, `chart.js`, `interactivity.js`, `main.js`
- Chart redraws from `weekly[]`
- Leaderboard + snapshot + countdown from JSON
- Hover/focus tooltips on rows, bars, metric cards
- Print CSS hides chrome
- Mobile: stage scales with aspect-ratio (no hierarchy reflow)
- `liveNumber: false` by default (preserves metallic poster art)

### Visual comparison notes
- Data pass must not shift block positions — only text/SVG inside locked frames
- Verify after JSON edit that layout geometry is unchanged

### Blockers / questions
- Serve over HTTP for `fetch` to work
- Changing `totalTeamPoints` alone does not change baked metallic art until `liveNumber: true`

### Next
Stage 6 polish + any fidelity fixes from human review

---

## Stage 6 — Polish (in progress)

### Completed
- README with run + data update instructions
- PROGRESS log through Stage 5

### Remaining / nice-to-have
- Human fidelity pass on capture vs poster
- Optional: digit sprite pack for dynamic metallic totals
- Optional: tighten quote/pill/leaderboard by 1–2% after review
- Clean debug assets under `assets/avatars/_*.png` if desired

### How to review now
```bash
cd /Users/jefflamb/breathe-easy-poster && python3 -m http.server 8765
# http://127.0.0.1:8765/
# Compare to assets/reference/poster.jpg and stage-capture.png
```

---

## Visual Lock Pass (2026-08-12) — layout fidelity only

**Scope:** Side-by-side comparison of original poster (`assets/reference/poster.jpg`) vs local live page. No features, no redesign — layout drift only. Deploy/GitHub work stopped.

**Comparison artefacts:**
- `assets/reference/stage-capture.png` — current browser capture
- `assets/reference/side-by-side.png` — original (left) vs live (right)

### Exactly what changed

#### Assets
1. **`assets/waves/mid-bg.png`** — re-extracted from poster (y ≈ 32.5–55.5%) with leaderboard region masked/inpainted so HTML card can sit on top. Includes **exact poster quote type + dark wave sculpture**.
2. **`assets/waves/chart-ground.png`** — refreshed crop of mountain wash under chart.
3. **`assets/skyline/footer-bg.png`** — fuller bottom strip from poster; footer text cleaned so HTML footer can sit cleanly.

#### HTML
4. Mid layer now uses `mid-bg.png` (not approximate SVG).
5. Quote block marked `quote--sr` — **visual quote is the poster extract**; HTML quote kept for accessibility only.
6. Tagline pill restructured to **two-line** layout (matches poster: line 1 slogan, line 2 “— EVERY TECHNICIAN…”).
7. Page chrome reduced (minimal title only) so it doesn’t compete with the poster stage.
8. Stage max width locked to **784px** (design width) instead of 900px so proportions match the source canvas.

#### CSS (`css/poster.css`) — position / spacing / density
9. **Leaderboard:** moved left/wider/taller (`left: 44%`, `width: 53%`, `top: 34.2%`, `height: 28.5%`); tighter internal row padding, smaller avatars/rank badges, denser footer.
10. **Chart:** larger and higher (`top: 52.8%`, `height: 29.2%`, `width: 45.5%`); reduced title/subtitle margins.
11. **Snapshot:** pulled up under leaderboard (`top: 63%`, denser grid gap); metric cards less padding, larger values, tighter label type.
12. **Tagline pill:** raised under snapshot (`top: 80.2%`); two-line text styles; compact height.
13. **Skyline/footer:** adjusted vertical band; footer type uppercase via CSS.
14. Quote CSS blob/radial background **removed** (was inventing a shape not in the poster).

### Honest assessment of remaining gaps

| Region | After pass | Remaining drift |
|---|---|---|
| Header logos | Strong (baked in hero art) | Minor type/scale vs pure vector |
| Metallic total + hero waves | Strong (baked art) | Slight extra white around number vs poster density of splash |
| Quote + dark wave | **Much improved** (poster extract) | Seam where LB was masked can show a soft gradient; not 100% continuous ribbon into card |
| Leaderboard | Better density & size | Still not identical: card corner radius, row hairline weight, trophy weight, and exact left edge vs wave still off slightly |
| Weekly chart | Larger / better placed | Plot margins, bar gradient, arrow weight, and mountain wash still approximate vs poster illustration |
| Performance Snapshot | Denser cards, better gap to LB | Card shadow, icon circle treatment, and inter-card gap still not pixel-matched |
| Tagline pill | Two-line structure correct | Icon weight and exact pill height/padding still slightly off |
| Skyline + water + footer | Improved extract | Water texture / reflection detail thinner than poster; footer type tracking slightly different |
| Overall breathing room | Tighter lower half | Live still reads **slightly airier** than the poster’s packed composition |

### Visual lock status

**Visual lock is NOT fully achieved.**

This pass closed the worst “inspired by” failures (fake quote blob, SVG mid-waves, loose snapshot/pill, wrong stage width). The page is now a **clear structural match** with several regions using poster pixels.

It is **not** yet a precise visual contract match end-to-end: chart illustration, residual mid-wave seam, metric card chrome, and overall density still deviate enough that a rigorous side-by-side still shows “live” vs “print art,” not identical composition.

### Recommended next fidelity steps (if lock must be true)
1. Use a single full-bleed poster mid+lower composite under the interactive cards (mask only interactive hit areas).
2. Or trace chart + snapshot frames as SVG paths from the poster at 1:1.
3. Human steers remaining % nudges using `assets/reference/side-by-side.png`.

### Next intended step
Human review of `assets/reference/side-by-side.png`. If lock bar is “as close as reasonably possible for CSS+extract hybrid,” accept and proceed to data/interactivity polish only. If bar is pixel-identical, continue with steps above — **no deploy until accepted.**

---

## Visual Lock Tightening Pass 2 (2026-08-12)

**Scope:** Density, mid-wave seam, snapshot chrome, chart mountain + skyline weight. No deploy. No features.

**References updated:**
- `assets/reference/stage-capture.png`
- `assets/reference/side-by-side.png` (original left · live right)

### Exactly what changed

#### 1. Overall density / breathing room
- Hero band slightly compressed; total number block slightly larger relative to stage.
- Leaderboard: larger footprint (`left 43.5%`, `width 53.8%`, `height 29%`), tighter internal row padding/type.
- Chart: taller/higher (`top 52.2%`, `height 30%`, `width 46%`), less internal padding.
- Snapshot: snugger under LB (`top 63.4%`, `height 15.8%`), smaller grid gaps.
- Tagline pill: raised (`top 79.8%`), tighter to snapshot.
- Skyline band starts higher (`top 82%`) so water/skyline fill more of the bottom and less empty air remains.
- Stage remains **784px** design width.

#### 2. Mid-wave seam beside leaderboard
- Rebuilt `assets/waves/mid-bg.png` from poster y≈30–63% full width.
- **Hard rectangular knockout** of the leaderboard card region, refilled by extending left-side wave profiles row-by-row so light/dark ribbons continue under/behind the HTML card.
- Soft edge blur on knockout so the card doesn’t hard-cut the ribbons.
- Alpha-cleared lower-left chart ghost so mid layer no longer doubles the weekly chart.

#### 3. Metric card chrome + Snapshot
- Metric cards: reduced padding (`~4.5–6.5%`), thinner border (`rgba` cool grey), subtler inset highlight + soft shadow (closer to poster card chrome).
- Title tracking tightened; label/value/delta sizes slightly reduced for denser packing.
- Grid gap reduced (~3.2–3.5%).

#### 4. Chart mountain + skyline/water
- `chart-ground.png`: re-cropped to **mountain/water only** under the plot (no residual bars); contrast/colour/sharpness boosted.
- Chart card uses light blue gradient fill + mountain wash at base + thin cool border.
- `footer-bg.png`: fuller bottom extract (y≈80.8–100%), text cleaned, contrast/colour/sharpness up for heavier skyline/water weight.

### Honest new verdict

| Priority | Result |
|---|---|
| Density | **Improved** — lower half packs closer; still slightly airier than print art in a few gaps |
| Mid-wave seam | **Improved** — continuous ribbon flow behind LB is now visible; not yet identical to poster’s freeform wave cut against the card edge |
| Snapshot chrome | **Improved** — denser cards, quieter borders; icon circle treatment still simpler than poster |
| Chart mountain + skyline | **Improved** — mountain wash + heavier skyline; chart plot still CSS/SVG not illustrated art |

### Visual lock status

**Visual lock is still NOT fully achieved.**

This pass closed the highest-impact remaining issues from the prior review:
- composition is denser
- quote↔leaderboard wave no longer reads as a dead white seam
- snapshot cards sit more like the poster block
- bottom decoration carries more weight

What still falls short of a true lock:
1. **Chart** remains a clean data SVG in a white card — poster has richer illustrated plot framing and mountain integration.
2. **Wave-to-card edge** is continuous behind the card but the poster’s exact organic silhouette against the navy card is still approximated.
3. **Snapshot icons** (soft circular icon wells) are still simplified vs poster.
4. **Overall density** is closer but a careful eye still finds a bit more air than the original in chart/snapshot corners and water band.

### Recommendation
Acceptable as a **high-fidelity interactive hybrid** if the bar is “reads as the same poster.”  
**Not** acceptable if the bar is pixel-contract lock. Next escalation would be full poster-underlay with punched interactive regions only.

### Next intended step
Human review of `assets/reference/side-by-side.png`. No deploy until visual lock is accepted.

---

## Hero number — data-driven metallic digits (2026-08-12)

**Priority:** Make the large hero total adaptive / living. Visual polish secondary.

### How the number is generated

1. **Digit assets** in `assets/numbers/digits/`:
   - **Poster-extracted (best quality):** `0.png`, `2.png`, `4.png`, `7.png`, `8.png` cut from the original metallic `24,780` on the poster.
   - **Comma:** `comma.png` from the gap region between 4 and 7 (small; somewhat weak).
   - **Synthesized (fallback quality):** `1.png`, `3.png`, `5.png`, `6.png`, `9.png` derived from the extracted set (warps/composites of 0/7/8) so *any* total can render.

2. **Assembly:** `js/metallic-number.js`
   - `formatHeroNumber(n)` → en-US string with thousands commas
   - `renderMetallicNumber(container, value)` → builds a strip of `<img class="hero-digit">` (and `hero-digit--comma`) from the digit sprites

3. **Data path:**
   - `data/poster.json` → `totalTeamPoints`
   - `js/main.js` loads JSON → `renderPoster(data)` in `js/render.js`
   - Always calls `renderMetallicNumber` on `[data-field="totalTeamPointsDigits"]`
   - Accessible text mirror: `[data-field="totalTeamPoints"]` (visually hidden)

4. **Background:** Hero plate is `assets/waves/hero-bg.png` (**number knocked out**). No longer uses `hero-with-number.png` for the live total.

### Confirmed: reading from data

| Check | Result |
|---|---|
| Default `totalTeamPoints: 24780` | Renders `24,780` digit strip |
| Temp change to `18950` | Renders `18,950` (screenshot `/tmp/hero-alt-18950.png`) |
| Layout stage width | Still 784px; rest of page unchanged in structure |

### Visual quality trade-offs

| Aspect | Note |
|---|---|
| Digits 0,2,4,7,8 | Closest to poster metallic look (direct crops) |
| Digits 1,3,5,6,9 | Noticeably lower fidelity (synthesized); visible when totals use those digits |
| Comma | Present and spaced, but not as sculpted as poster comma |
| Continuity | Digits are separate sprites with slight overlap CSS — not one seamless 3D extrusion like the original single artwork |
| Hero plate | `hero-bg` still has a soft light haze where the number was removed |

### Files touched
- `assets/numbers/digits/{0-9,comma}.png` (+ previews)
- `js/metallic-number.js` (new)
- `js/render.js`, `js/main.js`
- `index.html` (digit strip markup; hero-bg plate)
- `css/poster.css` (`.hero-total__digits`, `.hero-digit`)

### Status
**Hero total is living / data-driven.** Changing `totalTeamPoints` in `data/poster.json` updates the on-page number after refresh.

---

## Full living text/numbers pass (2026-08-12)

### Goal
Every meaningful letter and number on the poster is data-driven from `data/poster.json`. Decorative art only may keep baked type.

### Audit inventory

| Item | Before | After | Source field |
|---|---|---|---|
| Hero total `24,780` | Live (digits) | Live | `totalTeamPoints` |
| Team label | Baked in hero-bg | **Live HTML** | `copy.teamLabel` |
| Total Team Points label | Baked in hero-bg | **Live HTML** | `copy.totalLabel` |
| Header slogan | Baked + hidden | **Live HTML** | `copy.slogan` |
| Wordmark / skyline badge | Image brand marks | Image (brand) | decorative identity |
| Quote + attribution | Baked in mid-bg (hidden HTML) | **Live HTML** over wave | `copy.quote`, `copy.quoteAttr` |
| Leaderboard title / period | Static HTML | **Live** | `copy.leaderboardTitle`, `period.label` |
| Leaderboard ranks/names/roles/points/deltas | Live (re-render) | Live | `technicians[]` |
| Points reset countdown | Live | Live | `period.pointsResetInDays` + `period.resetTemplate` |
| Chart title / sub | Static HTML | **Live** | `copy.chartTitle`, `copy.chartSub` |
| Chart bars, labels, values | Live (`chart.js`) | Live | `weekly[]` |
| Snapshot title | Static HTML | **Live** | `copy.snapshotTitle` |
| Snapshot metrics/labels/deltas | Live (partial) | **Live rebuild** of grid | `snapshot.*` + `copy.deltaSuffix` |
| Tagline pill lines | Static HTML | **Live** | `copy.taglinePillLine1/2` |
| Footer lines | Static HTML | **Live** | `copy.footerLines[]` |
| Skyline / waves / mountain | Decorative images | Decorative | never need to change |

### What remains static (and why)

| Item | Why static is correct |
|---|---|
| Wordmark PNG + skyline badge PNG | Brand marks / logos — not operational data |
| Trophy icon, metric icons, wave/skyline art | Pure decoration |
| Page chrome “Breathe-Easy · Full Team Poster” | Dev UI outside poster stage |

### Implementation notes
- `js/render.js` binds **all** fields above; leaderboard list + snapshot grid are fully rebuilt from JSON.
- Quote text was stripped from `mid-bg.png`; hero label bands wiped/masked on `hero-bg.png` so live type is not doubled.
- Header logos are HTML; hero plate is masked at top so baked logo strip does not stack.

### Confirmed: data → page
Refresh after editing `data/poster.json` updates:
- Hero digits and labels
- Quote
- Leaderboard name/points/delta (e.g. `TESTLEAD` / `999` / `↑ 99%`)
- Chart week values (e.g. W1 `111`)
- Snapshot values (e.g. jobs `42`)
- Countdown (`POINTS RESET IN 2 DAYS`)
- Footer / tagline / section titles

### Trade-offs
- Live quote/labels are real text styled to match, not pixel-identical poster type.
- Residual soft haze may remain on wave plates where baked type was removed.
- Brand wordmark stays image-based by design.

### Status
**All meaningful poster numbers and copy are living.** Change `data/poster.json` and refresh to update the page.
